import { ProductDetailData, ProductVariant } from "@/types/commerce";
import { useState } from "react";
import VariantItem from "./VariantItem";

type Props = {
    variant?: ProductDetailData["variants"];
}

const VariantSection: React.FC<Props> = props => {

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(props.variant?.[0]);

    return (
        <>
            <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
                انتخاب {props.variant?.[0]?.name}
            </label>

            <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">

                <div className="flex pr-4">
                    {props.variant?.map(variantItem => (
                        <div key={variantItem.slug} className="pl-3 last:pl-4">
                            <button
                                type="button"
                                className={`shrink-0 rounded-xl whitespace-nowrap px-4 h-16 border-0 outline-none font-semibold py-3 ${selectedVariant?.slug === variantItem.slug ? "bg-gradient-green text-neutral-800" : "bg-[#192a39]"}`}
                                disabled={!variantItem.slug}
                                onClick={() => { setSelectedVariant(variantItem || undefined) }}
                            >
                                {variantItem.value}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <VariantItem variant={selectedVariant} />
        </>
    )
}

export default VariantSection;