/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getProducts } from "@/actions/commerce";
import { useAppDispatch } from "@/hooks/use-store";
import { setAvailableFilters } from "@/redux/productsSlice";
import { GetAllProductsParams, ProductItem } from "@/types/commerce";
import { useEffect } from "react";

const CalculateAvailableFilters = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {

            const parameters: GetAllProductsParams = {
                skipCount: 0,
                maxResultCount: 300
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
            const variants: {
                id: number;
                value?: string;
                slug?: string;
            }[] = [];

            if (allProducts?.length) {
                for (const item of allProducts) {

                    if (item.variants?.length) {
                        for (const g of item.variants) {
                            if (g.slug && !(variants.find(d => d.slug === g.slug))) {
                                variants.push({
                                    id: g.id,
                                    value: g.value,
                                    slug: g.slug
                                });
                            }
                        }
                    }

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
                themes,
                variants
            }))

        }
        fetchData();
    }, []);

    return null;
}

export default CalculateAvailableFilters;