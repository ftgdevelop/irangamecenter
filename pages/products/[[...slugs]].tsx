/* eslint-disable  @typescript-eslint/no-explicit-any */

import { NextPage } from "next";
import Contacts from "@/components/shared/Contacts";
import BreadCrumpt from "@/components/shared/BreadCrumpt";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/shared/Skeleton";
import { getProducts, ProductSortKeywords } from "@/actions/commerce";
import { GetAllProductsParams, GetProductsDataType, GetProductsResponseType, ProductItem } from "@/types/commerce";
import ProductListItem from "@/components/products/ProductListItem";
import SortProducts from "@/components/products/SortProducts";
import { useRouter } from "next/router";
import Pagination2 from "@/components/shared/Pagination2";
import { useAppDispatch } from "@/hooks/use-store";
import { openFilter } from "@/redux/productsSlice";
import Filter from "@/components/icons/Filter";
import { DownCaretThick } from "@/components/icons/DownCaretThick";
import ProductsFliter from "@/components/products/ProductsFliter";
import { groupByPrefix } from "@/helpers";
import AvailableFilterTag from "@/components/products/AvailableFilterTag";
import BackOrderFilterTag from "@/components/products/BackOrderFilterTag";

type Props = {
    productsData?: GetProductsDataType;
    slugs?: string[];
    page?: number;
    parameters: GetAllProductsParams;
}
const Products: NextPage<Props> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [products, setProducts] = useState<ProductItem[]>(props.productsData?.pagedResult?.items || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);


    //TODO: remove this useEffect:
    useEffect(() => {
        const fetchDatas = async () => {
            const parameters = { ...props.parameters };
            await getProducts(parameters);
        }
        fetchDatas();
    }, [router.asPath]);


    useEffect(() => {
        setProducts(props.productsData?.pagedResult?.items || []);
        if (props.productsData?.pagedResult?.items) {
            document.addEventListener('scroll', checkIsInView);
            window.addEventListener("resize", checkIsInView);
        }
    }, [router.asPath]);

    const changePageHandel = (p: number) => {
        const otherSlugs = props.slugs?.filter(item => !(item.includes("page-"))) || [];
        const segments = ["/products", ...otherSlugs, `page-${p}`];
        const newUrl = segments.join("/");
        router.push({
            pathname: newUrl,
        });
    }

    const selectedPage = +(props.slugs?.find(x => x.includes("page-"))?.split("page-")?.[1] || 0);

    const changeSortHandel = (val: ProductSortKeywords) => {
        const otherSlugs = props.slugs?.filter(item => !(item.includes("sort-"))) || [];
        const segments = ["/products", ...otherSlugs, `sort-${val}`];
        const newUrl = segments.join("/");
        router.push({
            pathname: newUrl,
        });
    }

    const selectedSort = props.slugs?.find(x => x.includes("sort-"))?.split("sort-")?.[1] as ProductSortKeywords;

    const selectedFilterSlugs = props.slugs?.filter(x => (!x.includes("sort-") && !x.includes("page-"))) || [];

    const loadMoreWrapper = useRef<HTMLDivElement>(null);

    const removeListener = () => {
        document.removeEventListener('scroll', checkIsInView);
        window.removeEventListener("resize", checkIsInView);
    }

    useEffect(() => {
        if (fetchMode) {
            if (products.length < 50 && !props.page) {
                addItems();
            } else {
                removeListener();
            }
        }
    }, [fetchMode, products.length]);

    const addItems = async () => {

        const page = Math.ceil(products.length / 10) + 1;

        if (props.productsData?.pagedResult?.totalCount && products.length >= props.productsData.pagedResult.totalCount) {
            removeListener();
            return;
        }
        setLoading(true);

        const parameters = { ...props.parameters };
        parameters.skipCount = (page - 1) * 10;

        const productsResponse: GetProductsResponseType = await getProducts(parameters);

        if (productsResponse?.data?.result?.pagedResult?.items) {
            setProducts(prevProducts => [...prevProducts, ...productsResponse?.data?.result?.pagedResult?.items || []]);
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


    const isFiltered = !!selectedFilterSlugs.length;


    const activeFilterColor = "bg-gradient-to-t from-[#fe4c69] to-[#ff9a90]"
    return (
        <>
            <BreadCrumpt
                wrapperClassName="bg-[#192a39] px-4 py-3 mb-4 mt-[76px]"
                textColorClass="text-neutral-300"
                items={[{ label: "محصولات", link: "" }]}
            />

            <div className="max-lg:hidden-scrollbar lg:styled-scrollbar md:pb-3 md:-mb-3 overflow-x-auto overflow-y-clip pl-3">
                <div className="flex gap-3 pr-4 whitespace-nowrap">

                    <SortProducts
                        activeKeyword={selectedSort}
                        onChange={(key: ProductSortKeywords) => { changeSortHandel(key) }}
                    />

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center rounded-full px-5 py-2.5 text-2xs select-none ${isFiltered ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("all")) }}
                    >
                        <Filter className="w-4.5 h-4.5 fill-current" />
                        فیلتر
                    </button>

                    <AvailableFilterTag />

                    <BackOrderFilterTag />

                    {props.productsData?.facets?.map(facet => (
                        <button
                            key={facet.key}
                            type="button"
                            className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${props.slugs?.find(x => x.includes(facet.key)) ? activeFilterColor : "bg-[#192a39]"}`}
                            onClick={() => {
                                dispatch(openFilter(facet.key))
                            }}
                        >
                            {facet.label}
                            <DownCaretThick className="w-3 h-3 fill-current" />
                        </button>
                    ))}

                    <div className="w-1 shrink-0" />

                </div>
            </div>

            <hr className="m-4 border-white/25" />

            <div className="px-4 mb-12">

                {products?.map(item => <ProductListItem product={item} key={item.id} />)}

                {!!loading && [1, 2, 3, 4, 5].map(item => (
                    <div className="flex gap-3 mb-4" key={item}>
                        <Skeleton
                            dark
                            type="image"
                            className="w-18 h-18 block shrink-0 rounded-2xl"
                        />
                        <div className="w-full">
                            <Skeleton className="h-4 w-full mt-2 mb-4" dark />
                            <Skeleton className="w-1/2" dark />
                        </div>
                    </div>
                ))}

                {!!(props.productsData?.pagedResult?.totalCount && products.length < props.productsData.pagedResult.totalCount) && (
                    <div ref={loadMoreWrapper}>
                        {products.length < 50 && !selectedPage ? (
                            <br />
                        ) : (
                            <Pagination2
                                onChange={e => { changePageHandel(e) }}
                                totalItems={props.productsData.pagedResult.totalCount}
                                itemsPerPage={10}
                                currentPage={selectedPage || 5}
                            />
                        )}
                    </div>
                )}

            </div>

            <Contacts />

            {!!(props.productsData?.facets?.length) && <ProductsFliter filters={props.productsData?.facets} />}

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

    const { query } = context;
    const slugs = query.slugs as string[];

    const selectedPage = +(slugs?.find(x => x.includes("page-"))?.split("page-")?.[1] || 0);

    const selectedSort = slugs?.find(x => x.includes("sort-"))?.split("sort-")?.[1] as ProductSortKeywords;

    const selectedFilterSlugs = slugs?.filter(x => (!x.includes("sort-") && !x.includes("page-"))) || [];

    const selectedDynamicFilterSlugs = selectedFilterSlugs?.filter(x => (!x.includes("search-") && !x.includes("onlyAvailable") && !x.includes("onBackOrder"))) || [];

    const selectedDynamicFiltersArray = groupByPrefix(selectedDynamicFilterSlugs);


    const parameters: GetAllProductsParams = {
        skipCount: selectedPage ? (selectedPage - 1) * 10 : 0,
        maxResultCount: 10
    }

    if (selectedSort) {
        switch (selectedSort) {
            case "HighPrice":
                parameters.sortBy = "asc";
                parameters.orderBy = "Price";
                break;
            case "LowPrice":
                parameters.sortBy = "desc";
                parameters.orderBy = "Price";
                break;
            case "Sale":
                parameters.sortBy = "asc";
                parameters.orderBy = "Sale";
                break;
            case "Visitor":
                parameters.sortBy = "asc";
                parameters.orderBy = "Visitor";
                break;
            default:
                break;
        }
    }

    for (const key in selectedDynamicFiltersArray) {
        parameters[key] = selectedDynamicFiltersArray[key];
    }

    if (selectedFilterSlugs.find(x => x.includes("onlyAvailable"))) {
        parameters.onlyAvailable = true;
    }
    if (selectedFilterSlugs.find(x => x.includes("onBackOrder"))) {
        parameters.statuses = ["OnBackOrder"];
    }

    const productsResponse: GetProductsResponseType = await getProducts(parameters);

    return (
        {
            props: {
                productsData: productsResponse?.data?.result || null,
                slugs: slugs || null,
                page: selectedPage || null,
                parameters: parameters || null
            }
        }
    )
}


export default Products;