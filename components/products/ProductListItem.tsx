import { numberWithCommas, toPersianDigits } from "@/helpers";
import { ProductItem } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: ProductItem;
    onClick?: ()=> void;
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
        <div className="mb-4 bg-[#011425] rounded-2xl">
            <Link href={`/product/${product.slug}`} className="flex" onClick={()=>{if(props.onClick){props.onClick()}}}>
                <Image
                    src={product.filePath || "/images/default-game.png"}
                    alt={product.fileAltAttribute || product.name || ""}
                    width={72}
                    height={72}
                    className="block w-18 h-18 rounded-2xl"
                    title={product.fileTitleAttribute || product.name}
                />

                <div className="px-2.5 py-2">
                    <h4 className="text-xs mb-3"> {toPersianDigits(product.name || "")} </h4>
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