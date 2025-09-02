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
import { openFilter } from "@/redux/productsSlice";
import Filter from "@/components/icons/Filter";
import { DownCaretThick } from "@/components/icons/DownCaretThick";
import { selectedFilter } from "@/helpers/productsHelper";

type ProductsDataType = {
    totalCount?: number;
    items?: ProductItem[];
}

type Props = {
    productsData?: ProductsDataType;
    slugs?: string;
    page?: number;
    parameters___?: any;
}
const Products: NextPage<Props> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const slugs: string[] = (router?.query?.slugs as string[]) || [];

    const [products, setProducts] = useState<ProductItem[]>(props.productsData?.items || []);
    const [fetchMode, setFetchMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setProducts(props.productsData?.items || []);
    // }, [props.queryPage]);

    const changePageHandel = (p: number) => {
        const otherSlugs = slugs?.filter(item => !(item.includes("page-")));
        const segments = ["/products", ...otherSlugs, `page-${p}`];
        const newUrl = segments.join("/");
        router.push({
            pathname: newUrl,
        });
    }

    const selectedPage = +(slugs?.find(x => x.includes("page-"))?.split("page-")?.[1] || 0);

    const changeSortHandel = (val: ProductSortKeywords) => {
        const otherSlugs = slugs?.filter(item => !(item.includes("sort-")));
        const segments = ["/products", ...otherSlugs, `sort-${val}`];
        const newUrl = segments.join("/");
        router.push({
            pathname: newUrl,
        });
    }

    const selectedSort = slugs?.find(x => x.includes("sort-"))?.split("sort-")?.[1] as ProductSortKeywords;

    const filtered_developers = selectedFilter(slugs, "developers");
    const filtered_esrbs = selectedFilter(slugs, "esrbs");
    const filtered_gameplays = selectedFilter(slugs, "gameplays");
    const filtered_genres = selectedFilter(slugs, "genres");
    const filtered_pegis = selectedFilter(slugs, "pegis");
    const filtered_playerPerspectives = selectedFilter(slugs, "playerPerspectives");
    const filtered_publishers = selectedFilter(slugs, "publishers");
    const filtered_themes = selectedFilter(slugs, "themes");
    const filtered_variants = selectedFilter(slugs, "variants");

    useEffect(() => {

        const fetchData = async (params: GetAllProductsParams) => {

            setLoading(true);
            setProducts([]);

            const productsResponse: any = await getProducts(params);
            if (productsResponse?.data?.result?.items) {
                setProducts(productsResponse.data.result.items);
                document.addEventListener('scroll', checkIsInView);
                window.addEventListener("resize", checkIsInView);
            }
            setLoading(false);
        }

        const parameters: GetAllProductsParams = {
            SkipCount: 0,
            MaxResultCount: 10
        }

        if (selectedSort) {
            parameters.sort = selectedSort;
        }

        if (filtered_developers?.length) {
            parameters.Developer = filtered_developers;
        }
        if (filtered_esrbs?.length) {
            parameters.Esrb = filtered_esrbs;
        }
        if (filtered_gameplays?.length) {
            parameters.Gameplay = filtered_gameplays;
        }
        if (filtered_genres?.length) {
            parameters.Genres = filtered_genres;
        }
        if (filtered_pegis?.length) {
            parameters.Pegi = filtered_pegis;
        }
        if (filtered_playerPerspectives?.length) {
            parameters.PlayerPerspective = filtered_playerPerspectives;
        }
        if (filtered_publishers?.length) {
            parameters.Publisher = filtered_publishers;
        }
        if (filtered_themes?.length) {
            parameters.Theme = filtered_themes;
        }
        if (filtered_variants?.length) {
            parameters.VariantSlug = filtered_variants;
        }
        if (filtered_pegis?.length) {
            parameters.Pegi = filtered_pegis;
        }

        fetchData(parameters);

    }, [
        selectedSort,
        filtered_developers?.length,
        filtered_esrbs?.length,
        filtered_gameplays?.length,
        filtered_genres?.length,
        filtered_pegis?.length,
        filtered_playerPerspectives?.length,
        filtered_publishers?.length,
        filtered_themes?.length,
        filtered_variants?.length
    ]);


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

        if (props.productsData?.totalCount && products.length >= props.productsData?.totalCount) {
            removeListener();
            return;
        }
        setLoading(true);

        const parameters :GetAllProductsParams = {
            MaxResultCount: 10,
            SkipCount: (page - 1) * 10
        };

        if (selectedSort) {
            parameters.sort = selectedSort;
        }

        if (filtered_developers?.length) {
            parameters.Developer = filtered_developers;
        }
        if (filtered_esrbs?.length) {
            parameters.Esrb = filtered_esrbs;
        }
        if (filtered_gameplays?.length) {
            parameters.Gameplay = filtered_gameplays;
        }
        if (filtered_genres?.length) {
            parameters.Genres = filtered_genres;
        }
        if (filtered_pegis?.length) {
            parameters.Pegi = filtered_pegis;
        }
        if (filtered_playerPerspectives?.length) {
            parameters.PlayerPerspective = filtered_playerPerspectives;
        }
        if (filtered_publishers?.length) {
            parameters.Publisher = filtered_publishers;
        }
        if (filtered_themes?.length) {
            parameters.Theme = filtered_themes;
        }
        if (filtered_variants?.length) {
            parameters.VariantSlug = filtered_variants;
        }
        if (filtered_pegis?.length) {
            parameters.Pegi = filtered_pegis;
        }

        const productsResponse: any = await getProducts(parameters);

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

    // useEffect(() => {
    //     if (!props.queryPage) {
    //         document.addEventListener('scroll', checkIsInView);
    //         window.addEventListener("resize", checkIsInView);
    //     } else {
    //         document.removeEventListener('scroll', checkIsInView);
    //         window.removeEventListener("resize", checkIsInView);
    //     }

    //     return (() => {
    //         document.removeEventListener('scroll', checkIsInView);
    //         window.removeEventListener("resize", checkIsInView);
    //     });
    // }, [props.queryPage]);

    // useEffect(() => {
    //     const fetchData = async (params: GetAllProductsParams) => {
    //         const productsResponse: any = await getProducts(params);
    //         const allProducts: ProductItem[] = productsResponse?.data?.result?.items;
    //     }
    //     const parameters: GetAllProductsParams = {
    //         SkipCount: props.queryPage ? (props.queryPage - 1) * 10 : 0,
    //         MaxResultCount: 10
    //     }
    //     if (selectedFilters.developers.length) {
    //         parameters.Developer = selectedFilters.developers;
    //     }
    //     if (selectedFilters.esrbs.length) {
    //         parameters.Esrb = selectedFilters.esrbs;
    //     }
    //     if (selectedFilters.gameplays.length) {
    //         parameters.Gameplay = selectedFilters.gameplays;
    //     }
    //     if (selectedFilters.genres.length) {
    //         parameters.Genres = selectedFilters.genres;
    //     }
    //     if (selectedFilters.name.length) {
    //         parameters.Search = selectedFilters.name;
    //     }

    //     if (selectedFilters.pegis.length) {
    //         parameters.Pegi = selectedFilters.pegis;
    //     }
    //     if (selectedFilters.playerPerspectives.length) {
    //         parameters.PlayerPerspective = selectedFilters.playerPerspectives;
    //     }
    //     if (selectedFilters.publishers.length) {
    //         parameters.Publisher = selectedFilters.publishers;
    //     }
    //     if (selectedFilters.themes.length) {
    //         parameters.Theme = selectedFilters.themes;
    //     }
    //     if (selectedFilters.variants.length) {
    //         parameters.VariantSlug = selectedFilters.variants;
    //     }

    //     fetchData(parameters);

    // }, [
    //     selectedFilters.developers.length,
    //     selectedFilters.esrbs.length,
    //     selectedFilters.gameplays.length,
    //     selectedFilters.genres.length,
    //     selectedFilters.name.length,
    //     selectedFilters.pegis.length,
    //     selectedFilters.playerPerspectives.length,
    //     selectedFilters.playerPerspectives.length,
    //     selectedFilters.publishers.length,
    //     selectedFilters.themes.length,
    //     selectedFilters.variants.length
    // ]);


    const isFiltered = filtered_developers?.length || filtered_esrbs?.length || filtered_gameplays?.length || filtered_genres?.length || filtered_pegis?.length || filtered_playerPerspectives?.length || filtered_publishers?.length || filtered_themes?.length || filtered_variants?.length;


    const activeFilterColor = "bg-gradient-to-t from-[#fe4c69] to-[#ff9a90]"
    return (
        <>
            <BreadCrumpt
                wrapperClassName="bg-[#192a39] px-4 py-3 mb-4"
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

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_variants?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("variants")) }}
                    >
                        Platform
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_playerPerspectives?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("playerPerspectives")) }}
                    >
                        زاویه دید
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_publishers?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("publishers")) }}
                    >
                        ناشر
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_developers?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("developers")) }}
                    >
                        توسعه دهنده
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_genres?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("genres")) }}
                    >
                        ژانر
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_themes?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("themes")) }}
                    >
                        تم بازی
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_gameplays?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("gameplays")) }}
                    >
                        حالت بازی
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_pegis?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("pegis")) }}
                    >
                        رده بندی سنی اروپا
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        type="button"
                        className={`inline-flex gap-2 items-center justify-between rounded-full px-5 py-2.5 text-2xs select-none ${filtered_esrbs?.length ? activeFilterColor : "bg-[#192a39]"}`}
                        onClick={() => { dispatch(openFilter("esrbs")) }}
                    >
                        رده بندی سنی آمریکا
                        <DownCaretThick className="w-3 h-3 fill-current" />
                    </button>

                    <div className="w-1 shrink-0" />

                </div>
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
                            onChange={e => { changePageHandel(e) }}
                            totalItems={props.productsData.totalCount}
                            itemsPerPage={10}
                            currentPage={selectedPage || 5}
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

            <FilterProducts />

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

    const filtered_developers = selectedFilter(slugs, "developers");
    const filtered_esrbs = selectedFilter(slugs, "esrbs");
    const filtered_gameplays = selectedFilter(slugs, "gameplays");
    const filtered_genres = selectedFilter(slugs, "genres");
    const filtered_pegis = selectedFilter(slugs, "pegis");
    const filtered_playerPerspectives = selectedFilter(slugs, "playerPerspectives");
    const filtered_publishers = selectedFilter(slugs, "publishers");
    const filtered_themes = selectedFilter(slugs, "themes");
    const filtered_variants = selectedFilter(slugs, "variants");


    const parameters: GetAllProductsParams = {
        SkipCount: selectedPage ? (selectedPage - 1) * 10 : 0,
        MaxResultCount: 10
    }

    if (selectedSort) {
        parameters.sort = selectedSort;
    }

    if (filtered_developers?.length) {
        parameters.Developer = filtered_developers;
    }
    if (filtered_esrbs?.length) {
        parameters.Esrb = filtered_esrbs;
    }
    if (filtered_gameplays?.length) {
        parameters.Gameplay = filtered_gameplays;
    }
    if (filtered_genres?.length) {
        parameters.Genres = filtered_genres;
    }
    if (filtered_pegis?.length) {
        parameters.Pegi = filtered_pegis;
    }
    if (filtered_playerPerspectives?.length) {
        parameters.PlayerPerspective = filtered_playerPerspectives;
    }
    if (filtered_publishers?.length) {
        parameters.Publisher = filtered_publishers;
    }
    if (filtered_themes?.length) {
        parameters.Theme = filtered_themes;
    }
    if (filtered_variants?.length) {
        parameters.VariantSlug = filtered_variants;
    }
    if (filtered_pegis?.length) {
        parameters.Pegi = filtered_pegis;
    }

    const productsResponse: any = await getProducts(parameters);

    return (
        {
            props: {
                productsData: productsResponse?.data?.result || null,
                slugs: slugs || null,
                page: selectedPage || null,
                parameters___: parameters || null
            }
        }
    )
}


export default Products;