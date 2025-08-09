import { ProductVariant } from "@/types/commerce";
import { ReactNode, useEffect, useState } from "react";
import SimplePortal from "../shared/layout/SimplePortal";
import { numberWithCommas } from "@/helpers";
import Image from "next/image";

type Props = {
    variant?: ProductVariant;
}

const VariantItem: React.FC<Props> = props => {

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(props.variant?.children?.[0]);

    useEffect(() => {
        setSelectedVariant(props.variant?.children?.[0]);
    }, [props.variant?.slug]);


    let childElement: ReactNode = "";
    if (selectedVariant?.children?.length) {
        childElement = <VariantItem variant={selectedVariant} />;
    } else {
        const currency = selectedVariant?.items?.[0]?.currencyType;
        childElement = (
            <SimplePortal
                selector="fixed_bottom_portal"
            >
                <footer className="min-h-20 Z-10 fixed bottom-0 left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 flex flex-wrap justify-between gap-2 items-center w-full md:max-w-lg">
                    <button
                        type="button"
                        className="bg-violet-500 text-white rounded-full px-4 py-3 text-xs flex gap-2 items-center font-semibold"
                    >
                        <Image src="/images/icons/bag.svg" alt="shopping bag" width={24} height={24} className="w-6 h-6" />
                        افزودن به سبد خرید
                    </button>

                    <div className="text-left text-white">
                        {!!selectedVariant?.items?.[0]?.regularPrice && (<div className="flex flex-wrap gap-2 mb-1">
                            {!!selectedVariant?.items?.[0]?.profitPercentage && (
                                <span
                                    className="text-[#fe9f00] text-2xs font-semibold"
                                >
                                    {selectedVariant?.items?.[0]?.profitPercentage} % تخفیف
                                </span>
                            )}
                            <span className="text-xs"> {numberWithCommas(selectedVariant.items[0].regularPrice)} {currency}</span>
                        </div>)}

                        {!!selectedVariant?.items?.[0]?.salePrice && <b className="text-base font-semibold block"> {numberWithCommas(selectedVariant.items[0].salePrice)} {currency} </b>}
                    </div>
                </footer>
                <div className="h-20" />
            </SimplePortal>
        )
    }

    return (
        <>
            <label className="text-sm pointer-events-none mb-3 block px-4 mt-7">
                انتخاب {props.variant?.children?.[0]?.name}
            </label>

            <div className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip pb-3 pl-3">

                <div className="flex pr-4">
                    {props.variant?.children?.map(variantItem => (
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

            {childElement}
        </>
    )

}

export default VariantItem;