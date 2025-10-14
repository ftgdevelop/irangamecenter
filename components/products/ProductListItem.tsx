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

    const {salePrice, currencyType, regularPrice} = product.minVariant?.items?.[0] || {};

    let discountPercentage = 0;

    if (salePrice && regularPrice) {
        const discount = ((regularPrice - salePrice) / regularPrice) * 100;
        discountPercentage = Math.floor(discount);
    }

    return (
        <div className="mb-[15px] bg-[#011425] rounded-2xl">
            <Link href={`/product/${product.slug}`} className="flex" onClick={()=>{if(props.onClick){props.onClick()}}}>
                <Image
                    src={product.filePath || "/images/default-game.png"}
                    alt={product.fileAltAttribute || product.name || ""}
                    width={72}
                    height={72}
                    className="block w-18 h-18 rounded-2xl"
                    title={product.fileTitleAttribute || product.name}
                />

                <div className="px-2.5 py-1.5 grow">
                    <h4 className="text-xs mb-2"> {toPersianDigits(product.name || "")} </h4>
                    <div className="flex gap-2 items-center justify-between pb-1">

                        <div className="flex gap-3 items-center">
                            {!!discountPercentage && (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-1 font-bold text-sm">
                                    {toPersianDigits(discountPercentage?.toString())}
                                    %
                                </div>
                            )}

                            {salePrice ? (
                                <div className="text-xs text-left">
                                {!!regularPrice && (
                                    <div className="text-[11px] line-through">{numberWithCommas(regularPrice)} {currencyType} </div>
                                )}
                                {numberWithCommas(salePrice)} {currencyType}
                            </div>
                            ):(
                                <div className="text-red-500 text-xs"> ناموجود </div>
                            )}
                        </div>

                        <div className="flex gap-1 text-[9px]">
                            {product.esrb?.image && <Image src={product.esrb?.image} alt={product.esrb.title || ""} title={product.esrb.description || ""} className="w-7 h-7" width={100} height={100} />}
                            {product.pegi?.image && <Image src={product.pegi?.image} alt={product.pegi.title || ""} title={product.pegi.description || ""} className="w-7 h-7" width={100} height={100} />}
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductListItem;