import { numberWithCommas, toPersianDigits } from "@/helpers";
import { ProductItem } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: ProductItem;
}

const ProductListItem: React.FC<Props> = props => {

    const { product } = props;

    //const oldPrice = product.variants?.[0]?.items?.[0]?.regularPrice || 0;
    const oldPrice = 0;
    const price = product.variants?.[0]?.items?.[0]?.salePrice || 0;

    let discountPercentage = 0;

    if (price && oldPrice) {
        const discount = ((oldPrice - price) / oldPrice) * 100;
        discountPercentage = Math.floor(discount);
    }


    return (
        <div className="mb-4">
            <Link href={`/product/${product.slug}`} className="flex" >
                <Image
                    src={product.image.url || "/images/default-game.png"}
                    alt={product.name || ""}
                    width={112}
                    height={112}
                    className="block w-28 h-28 rounded-2xl"
                />

                <div className="p-2.5">
                    <h4 className="text-xs mb-5"> {toPersianDigits(product.name || "")} </h4>
                    <div className="flex gap-3 items-end pb-1">
                        {!!discountPercentage && (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-2 font-bold text-sm">
                                {toPersianDigits(discountPercentage?.toString())}
                                %
                            </div>
                        )}

                        {price ? (
                            <div className="text-xs text-left">
                            {!!oldPrice && (
                                <div className="text-[11px] mb-1 line-through">{numberWithCommas(oldPrice)} تومان </div>
                            )}
                            {numberWithCommas(price)} تومان
                        </div>
                        ):(
                            <div className="text-red-500 text-xs"> ناموجود </div>
                        )}

                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductListItem;