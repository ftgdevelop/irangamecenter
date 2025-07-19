/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import Add from "@/components/icons/Add";
import { getProducts } from "@/actions/commerce";
import { ProductItem } from "@/types/commerce";
import ProductListItem from "@/components/products/ProductListItem";

type ProductsDataType = {
    totalCount?: number;
    items?: ProductItem[];
}

type Props = {
    productsData?: ProductsDataType;
}
const Products: NextPage<Props> = props => {

    const [products, setProducts] = useState<ProductItem[]>(props.productsData?.items || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);


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
            MaxResultCount:10,
            SkipCount: (page-1)*10
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

        </>
    )
}

export async function getServerSideProps() {

    if (!process.env.PROJECT_SERVER_BLOG) {
        return (
            {
                props: {
                    moduleDisabled: true
                },
            }
        )
    }

    const productsResponse: any = await getProducts({ SkipCount: 0, MaxResultCount: 10 });

    return (
        {
            props: {
                productsData: productsResponse?.data?.result || null
            }
        }
    )
}


export default Products;