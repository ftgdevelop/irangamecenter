import Image from "next/image";
import SlickSlider from "react-slick";

import { ProductItem } from "@/types/commerce";
import ProductListItem from "./ProductListItem";

type Props = {
    products: ProductItem[];
    title?: string;
};
const SimilarProductsCarousel: React.FC<Props> = props => {

    function chunkArray<T>(arr: T[], size: number): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    const products: ProductItem[][] = chunkArray(props.products, 3);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1.2,
        slidesToScroll: 1,
        rtl: true
    };

    if (!products?.length) {
        return null
    }

    return (
        <section className="bg-[#192b39] py-6 pr-[7.5px]">

            <h3 className="px-[7.5px] text-[#ff7189] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/curl.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                {props.title || "محصولات مشابه"}
            </h3>

            {products.length > 1 ? (
                <div dir="ltr">
                    <SlickSlider {...settings} className="similar-products-carousel">
                        {products.map(productsGroup => (
                            <div className="px-[7.5px]" key={productsGroup[0].id} dir="rtl">
                                {productsGroup.map(product => <ProductListItem key={product.id} product={product} />)}
                            </div>
                        ))}
                    </SlickSlider>
                </div>
            ) : (
                <div className="px-4" dir="rtl">
                    {products[0].map(product => <ProductListItem key={product.id} product={product} />)}
                </div>
            )}

        </section>
    )
}

export default SimilarProductsCarousel;