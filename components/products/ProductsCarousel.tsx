import Image from "next/image";

import { ProductItemExtented } from "@/types/commerce";
import ProductListItem from "./ProductListItem";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("../shared/Carousel"), {
  ssr: false,
});

type Props = {
    products: ProductItemExtented[];
    title?: string;
    numberOfSlides?: number;
};
const ProductsCarousel: React.FC<Props> = props => {

    function chunkArray<T>(arr: T[], size: number): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    const products: ProductItemExtented[][] = chunkArray(props.products, 3);

    if (!products?.length) {
        return null
    }

    return (
        <section className={`bg-[#e8ecf0] dark:bg-[#192b39] py-6 lg:px-5 relative ${products.length > 1 ?"pr-1.5":"px-1.5"}`}>

            <h3 className="text-[#ff7189] font-bold flex gap-2 items-center text-md mb-4 px-1.5">
                <Image src="/images/icons/curl.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                {props.title || "محصولات مشابه"}
            </h3>

            {products.length > 1 ? (
                <Carousel
                    numberOfSlides={props.numberOfSlides}
                    peek={15}
                    showDots
                    infinite
                    items={products.map(productsGroup => (
                        {
                            key: productsGroup[0].id,
                            content: (
                                <div className="flex flex-col gap-3 px-1.5" dir="rtl">
                                    {productsGroup.map(product => <ProductListItem key={product.id} product={product} />)}
                                </div>
                            )
                        }
                    ))}
                    dotsWrapperClassName="absolute top-6 left-4"
                />
            ) : (
                <div className="flex flex-col gap-3 px-1.5" dir="rtl">
                    {products[0].map(product => <ProductListItem key={product.id} product={product} />)}
                </div>
            )}

        </section>
    )
}

export default ProductsCarousel;