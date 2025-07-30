/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import Add from "@/components/icons/Add";
import { getProducts, ProductSortKeywords } from "@/actions/commerce";
import { GetAllProductsParams, ProductItem } from "@/types/commerce";
import ProductListItem from "@/components/products/ProductListItem";
import ModalPortal from "@/components/shared/layout/ModalPortal";
import Filter2 from "@/components/icons/Filter2";
import SortIcon from "@/components/icons/SortIcon";
import CheckboxGroup from "@/components/shared/CheckboxGroup";
import Sort from "@/components/products/Sort";
import { useRouter } from "next/router";

type ProductsDataType = {
    totalCount?: number;
    items?: ProductItem[];
}

type Props = {
    productsData?: ProductsDataType;
}
const Products: NextPage<Props> = props => {

    const router = useRouter();

    const urlVariantSlug = router.query?.VariantSlug;

    const [products, setProducts] = useState<ProductItem[]>(props.productsData?.items || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [slideInFilters, setSlideInFilters] = useState<boolean>(true);

    const [openSort, setOpenSort] = useState<boolean>(false);
    const [slideInSort, setSlideInSort] = useState<boolean>(true);

    const [selectedSort, setSelectedSort] = useState<ProductSortKeywords | undefined>(undefined);

    useEffect(() => {
        if (openFilters) {
            setSlideInFilters(true);
        }
    }, [openFilters]);

    useEffect(() => {
        if (!slideInFilters) {
            setTimeout(() => { setOpenFilters(false) }, 300)
        }
    }, [slideInFilters]);


    useEffect(() => {
        if (openSort) {
            setSlideInSort(true);
        }
    }, [openSort]);

    useEffect(() => {
        if (!slideInSort) {
            setTimeout(() => { setOpenSort(false) }, 300)
        }
    }, [slideInSort]);

    useEffect(() => {

        const fetchData = async (sort: ProductSortKeywords) => {

            setLoading(true);

            const parameters: GetAllProductsParams = {
                SkipCount: 0,
                MaxResultCount: 10,
                sort: sort
            }

            if (urlVariantSlug) {
                //TODO what if there is multiple variants in url??
                parameters.VariantSlug = urlVariantSlug as string;
            }
            
            const productsResponse: any = await getProducts(parameters);
            if (productsResponse?.data?.result?.items) {
                setProducts(productsResponse.data.result.items);
                document.addEventListener('scroll', checkIsInView);
                window.addEventListener("resize", checkIsInView);
            }
            setLoading(false);
        }

        if (selectedSort) {
            setProducts([]);
            fetchData(selectedSort);
        }
    }, [selectedSort]);

    const loadMoreWrapper = useRef<HTMLButtonElement>(null);

    const removeListener = () => {
        document.removeEventListener('scroll', checkIsInView);
        window.removeEventListener("resize", checkIsInView);
    }

    useEffect(() => {
        if (fetchMode) {
            if (products.length < 30) {
                addItems();
            } else {
                removeListener();
            }
        }
    }, [fetchMode, products.length]);

    const addItems = async () => {

        const page = Math.ceil(products.length / 10) + 1;

        if (props.productsData?.totalCount && products.length >= props.productsData?.totalCount) {
            removeListener();
            return;
        }
        setLoading(true);

        const productsResponse: any = await getProducts({
            MaxResultCount: 10,
            SkipCount: (page - 1) * 10
        });
        if (productsResponse?.data?.result?.items) {
            setProducts(prevProducts => [...prevProducts, ...productsResponse.data.result.items]);
        } else {
            removeListener();
        }
        setLoading(false);
        setFetchMode(false);
    }

    const checkIsInView = () => {
        const targetTop = loadMoreWrapper.current?.getBoundingClientRect().top;
        const screenHeight = screen.height;
        if (targetTop && targetTop < (3 * screenHeight / 5) && !fetchMode) {
            setFetchMode(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', checkIsInView);
        window.addEventListener("resize", checkIsInView);

        return (() => {
            document.removeEventListener('scroll', checkIsInView);
            window.removeEventListener("resize", checkIsInView);
        });
    }, []);

    return (
        <>
            <BreadCrumpt
                wrapperClassName="bg-[#192a39] px-4 py-3 mb-4"
                textColorClass="text-neutral-300"
                items={[{ label: "محصولات", link: "" }]}
            />

            <div className="flex gap-3 px-4 mb-4">
                <button
                    type="button"
                    className="inline-flex gap-2 items-center bg-[#192a39] rounded-full px-5 py-2.5 text-sm"
                    onClick={() => { setOpenFilters(true) }}
                >
                    <Filter2 className="w-5 h-5 fill-current" />
                    فیلتر
                </button>
                <button
                    type="button"
                    className="inline-flex gap-2 items-center bg-[#192a39] rounded-full px-5 py-2.5 text-sm"
                    onClick={() => { setOpenSort(true) }}
                >
                    <SortIcon className="w-5 h-5 fill-current" />
                    جدیدترین ها
                </button>
            </div>

            <hr className="m-4 border-white/25" />

            <div className="px-4 mb-12">

                {products?.map(item => <ProductListItem product={item} key={item.id} />)}

                {!!loading && [1, 2, 3, 4, 5].map(item => (
                    <div className="grid grid grid-cols-4 gap-3 mb-4" key={item}>
                        <Skeleton
                            type="image"
                            className="aspect-square rounded-large"
                        />
                        <div className="col-span-3">
                            <Skeleton className="h-4 w-full mt-5 mb-4" />
                            <Skeleton className="w-1/2" />
                        </div>
                    </div>
                ))}

                {!!(props.productsData?.totalCount && products.length < props.productsData.totalCount) && <button
                    ref={loadMoreWrapper}
                    type="button"
                    className="text-sm text-[#ca54ff] bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3"
                    onClick={addItems}
                >
                    <Add />
                    مطالب بیشتر
                </button>}

            </div>

            <Contacts />

            <ModalPortal
                show={openFilters}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                    <div className="relative w-full lg:max-w-lg lg:mx-auto h-screen">

                        <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setSlideInFilters(false) }} />

                        <div className={`bg-[#192a39] text-white rounded-2xl absolute transition-all left-5 right-5 ${slideInFilters ? "bottom-5" : "-bottom-[80vh]"}`}>

                            <div className="px-4 py-5">

                                <h5 className="font-semibold mb-4"> فیلتر بر اساس دسته بندی ها </h5>

                                <CheckboxGroup
                                    items={[{ label: "دسته بندی 1", value: "cat1" }, { label: "دسته بندی 2", value: "cat2" }, { label: "دسته بندی 3", value: "cat3" }]}
                                    onChange={console.log}
                                    values={["cat1", "cat3"]}
                                />

                                <h5 className="font-semibold my-4"> فیلتر بر اساس برچسب ها </h5>

                                <CheckboxGroup
                                    items={[{ label: "برچسب 1", value: "cat1" }, { label: "برچسب 2", value: "cat2" }, { label: "برچسب 3", value: "cat3" }]}
                                    onChange={console.log}
                                    values={["cat1", "cat3"]}
                                />


                                <div className="flex gap-3 mt-5">
                                    <button
                                        type="button"
                                        className="bg-[#011425] rounded-full px-5 py-3 text-sm"
                                        onClick={() => { setSlideInFilters(false) }}
                                    >
                                        بستن
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-violet-500 rounded-full px-5 py-3 text-sm grow"
                                        onClick={() => { setSlideInFilters(false) }}
                                    >
                                        اعمال تغییرات
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </ModalPortal>

            <ModalPortal
                show={openSort}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                    <div className="relative w-full lg:max-w-lg lg:mx-auto h-screen">

                        <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setSlideInSort(false) }} />

                        <div className={`bg-[#192a39] text-white rounded-2xl absolute transition-all left-5 right-5 ${slideInSort ? "bottom-5" : "-bottom-[80vh]"}`}>
                            <Sort
                                setSlideInSort={setSlideInSort}
                                activeKeyword={selectedSort}
                                onChange={(key: ProductSortKeywords) => { setSelectedSort(key) }}
                            />

                        </div>
                    </div>

                </div>
            </ModalPortal>

        </>
    )
}

export async function getServerSideProps(context: any) {

    if (!process.env.PROJECT_SERVER_BLOG) {
        return (
            {
                props: {
                    moduleDisabled: true
                },
            }
        )
    }

    const parameters: GetAllProductsParams = {
        SkipCount: 0,
        MaxResultCount: 10
    }

    if (context?.query?.VariantSlug) {
        parameters.VariantSlug = context.query.VariantSlug;
    }

    const productsResponse: any = await getProducts(parameters);

    return (
        {
            props: {
                productsData: productsResponse?.data?.result || null
            }
        }
    )
}


export default Products;