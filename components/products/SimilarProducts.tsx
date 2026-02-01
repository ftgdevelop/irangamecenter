/* eslint-disable  @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { PlatformSlugTypes, ProductItemExtented } from "@/types/commerce";
import ProductListItem from "./ProductListItem";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getSimilarsBySlug } from "@/actions/commerce";
import { useRouter } from "next/router";

const Carousel = dynamic(() => import("../shared/Carousel"), {
    ssr: false,
});

type Props = {
    productSlug: string;
};
const SimilarProducts: React.FC<Props> = props => {

    const [similarProducts, setSimilarProducts] = useState<ProductItemExtented[]>([]);
  
    const router = useRouter();

    const {query} = router;

    const queryVariant = query.variant;
    const queryPlatform = query.platform as PlatformSlugTypes || undefined;

    useEffect(() => {
    
        const fetchData = async (s: string) => {
            const response: any = await getSimilarsBySlug({
                acceptLanguage:"fa-IR",
                slug: s,
                platform: queryPlatform ,
                variantId: queryVariant? +queryVariant : undefined
            });
            if (response.data?.result.length) {
                setSimilarProducts(response.data.result);
            }
        }

        if (props.productSlug) {
            fetchData(props.productSlug);
        }
    }, [props.productSlug]);


    function chunkArray<T>(arr: T[], size: number): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    const products: ProductItemExtented[][] = chunkArray(similarProducts, 3);

    if (!products?.length) {
        return null
    }

    if (!props.productSlug) return null;

    return (
        <section className="bg-[#e8ecf0] dark:bg-[#192b39] py-6 pr-[7.5px] relative">

            <h3 className="px-[7.5px] text-[#ff7189] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/curl.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                محصولات مشابه
            </h3>

            {products.length > 1 ? (
                <Carousel
                    peek={15}
                    showDots
                    infinite
                    items={products.map(productsGroup => (
                        {
                            key: productsGroup[0].id,
                            content: (
                                <div className="px-[7.5px]" dir="rtl">
                                    {productsGroup.map(product => <ProductListItem key={product.id} product={product} />)}
                                </div>
                            )
                        }
                    ))}
                    dotsWrapperClassName="absolute top-6 left-4"
                />
            ) : (
                <div className="px-4" dir="rtl">
                    {products[0].map(product => <ProductListItem key={product.id} product={product} />)}
                </div>
            )}

        </section>
    )
}

export default SimilarProducts;
