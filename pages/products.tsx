/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import { getProducts, ProductSortKeywords } from "@/actions/commerce";
import { GetAllProductsParams, ProductItem } from "@/types/commerce";
import ProductListItem from "@/components/products/ProductListItem";
import SortProducts from "@/components/products/SortProducts";
import { useRouter } from "next/router";
import FilterProducts from "@/components/products/FilterProducts";
import Pagination2 from "@/components/shared/Pagination2";
import { useAppDispatch } from "@/hooks/use-store";
import { setAvailableFilters } from "@/redux/productsSlice";

type ProductsDataType = {
    totalCount?: number;
    items?: ProductItem[];
}

type Props = {
    productsData?: ProductsDataType;
    queryPage?: number;
}
const Products: NextPage<Props> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { pathname, query } = router;

    const urlVariantSlug = router.query?.VariantSlug;

    const [products, setProducts] = useState<ProductItem[]>(props.productsData?.items || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const [selectedSort, setSelectedSort] = useState<ProductSortKeywords | undefined>(undefined);

    useEffect(() => {
        setProducts(props.productsData?.items || []);
    }, [props.queryPage]);

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


    useEffect(() => {
        const fetchData = async () => {

            const parameters: GetAllProductsParams = {
                SkipCount: 0,
                MaxResultCount: 300
            }
            const productsResponse: any = await getProducts(parameters);

            const allProducts: ProductItem[] = productsResponse?.data?.result?.items;

            const publishers: ProductItem["publisher"][] = [];
            const developers: ProductItem["developer"][] = [];
            const gameplays: ProductItem["gameplay"] = [];
            const genres: ProductItem["genres"] = [];
            const themes: ProductItem["theme"] = [];
            const playerPerspectives: ProductItem["playerPerspective"] = [];
            const pegis: ProductItem["pegi"][] = [];
            const esrbs: ProductItem["esrb"][] = [];
            // const tags: ProductItem["tags"] = [];



            if (allProducts.length) {
                for (const item of allProducts) {

                    if (item.developer?.slug && !(developers.find(d => d?.slug === item.developer?.slug))) {
                        developers.push(item.developer);
                    }

                    if (item.publisher?.slug && !(publishers.find(d => d?.slug === item.publisher?.slug))) {
                        publishers.push(item.publisher);
                    }

                    if (item.pegi?.keyword && !(pegis.find(d => d?.keyword === item.pegi?.keyword))) {
                        pegis.push(item.pegi);
                    }

                    if (item.esrb?.keyword && !(esrbs.find(d => d?.keyword === item.esrb?.keyword))) {
                        esrbs.push(item.esrb);
                    }

                    if (item.gameplay?.length) {
                        for (const g of item.gameplay) {
                            if (g.keyword && !(gameplays.find(d => d.keyword === g.keyword))) {
                                gameplays.push(g);
                            }
                        }
                    }

                    if (item.genres?.length) {
                        for (const g of item.genres) {
                            if (g.keyword && !(genres.find(d => d.keyword === g.keyword))) {
                                genres.push(g);
                            }
                        }
                    }

                    if (item.theme?.length) {
                        for (const t of item.theme) {
                            if (t.keyword && !(themes.find(d => d.keyword === t.keyword))) {
                                themes.push(t);
                            }
                        }
                    }

                    if (item.playerPerspective?.length) {
                        for (const p of item.playerPerspective) {
                            if (p.keyword && !(playerPerspectives.find(d => d.keyword === p.keyword))) {
                                playerPerspectives.push(p);
                            }
                        }
                    }

                    // if (item.tags?.length) {
                    //     for (const t of item.tags) {
                    //         if (t.slug && !(tags.find(d => d.slug === t.slug))) {
                    //             tags.push(t);
                    //         }
                    //     }
                    // }

                }

            }

            dispatch(setAvailableFilters({
                developers,
                esrbs,
                gameplays,
                genres,
                pegis,
                playerPerspectives,
                publishers,
                themes
            }))

        }

        fetchData();

    }, [])

    const loadMoreWrapper = useRef<HTMLDivElement>(null);

    const removeListener = () => {
        document.removeEventListener('scroll', checkIsInView);
        window.removeEventListener("resize", checkIsInView);
    }

    useEffect(() => {
        if (fetchMode) {
            if (products.length < 50 && !props.queryPage) {
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
        if (!props.queryPage) {
            document.addEventListener('scroll', checkIsInView);
            window.addEventListener("resize", checkIsInView);
        } else {
            document.removeEventListener('scroll', checkIsInView);
            window.removeEventListener("resize", checkIsInView);
        }

        return (() => {
            document.removeEventListener('scroll', checkIsInView);
            window.removeEventListener("resize", checkIsInView);
        });
    }, [props.queryPage]);

    return (
        <>
            <BreadCrumpt
                wrapperClassName="bg-[#192a39] px-4 py-3 mb-4"
                textColorClass="text-neutral-300"
                items={[{ label: "محصولات", link: "" }]}
            />

            <div className="flex gap-3 px-4 mb-4">

                <FilterProducts
                    onChange={a => {
                        console.log(a);
                        debugger;
                    }}
                    activeKeyword={""}
                />

                <SortProducts
                    activeKeyword={selectedSort}
                    onChange={(key: ProductSortKeywords) => { setSelectedSort(key) }}
                />

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

                {!!(props.productsData?.totalCount && products.length < props.productsData.totalCount) && (
                    <div ref={loadMoreWrapper}>
                        <Pagination2
                            onChange={e => {
                                router.push({
                                    pathname: pathname,
                                    query: { ...query, page: e },
                                })
                            }}
                            totalItems={props.productsData.totalCount}
                            itemsPerPage={10}
                            currentPage={query.page ? +query.page : 5}
                        />
                    </div>
                )}


                {/* {!!(props.productsData?.totalCount && products.length < props.productsData.totalCount) && <button
                    ref={loadMoreWrapper}
                    type="button"
                    className="text-sm text-[#ca54ff] bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3"
                    onClick={addItems}
                >
                    <Add />
                    مطالب بیشتر
                </button>} */}

            </div>

            <Contacts />

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

    const queryPage = context?.query?.page;

    const parameters: GetAllProductsParams = {
        SkipCount: queryPage ? (queryPage - 1) * 10 : 0,
        MaxResultCount: 10
    }

    if (context?.query?.VariantSlug) {
        parameters.VariantSlug = context.query.VariantSlug;
    }

    const productsResponse: any = await getProducts(parameters);

    return (
        {
            props: {
                productsData: productsResponse?.data?.result || null,
                queryPage: queryPage || null
            }
        }
    )
}


export default Products;