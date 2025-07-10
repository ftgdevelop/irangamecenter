import { numberWithCommas, toPersianDigits } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import Tab from "../shared/Tab";
import Add from "../icons/Add";
import { ProductItem } from "@/types/commerce";
import React from "react";

type Props = {
    products : ProductItem[];
};

const BestSellers:React.FC<Props> = props => {

    const content = (
        <div className="py-5">
            {props.products?.map(item => {
                const oldPrice = 2959000;
                const price = 2559000;

                let discountPercentage = 0;

                if (price && oldPrice) {
                    const discount = ((oldPrice - price) / oldPrice) * 100;
                    discountPercentage =  Math.floor(discount);
                }

                return(
                    <div key={item.id} className="mb-4">
                        <Link href={`/products/${item.slug}`} className="flex" >
                            <Image
                                src={item.image.url || "/images/default-game.png"}
                                alt={item.name || ""}
                                width={128}
                                height={128}
                                className="block w-32 h-32 rounded-2xl"
                            />

                            <div className="p-2.5">
                                <h4 className="text-xs mb-5"> {toPersianDigits(item.name || "")} </h4>
                                <div className="flex gap-3 items-end pb-1">
                                    {!!discountPercentage && (
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-2 font-bold text-sm">
                                            {toPersianDigits(discountPercentage?.toString())}
                                            %
                                        </div>
                                    )}

                                    <div className="text-xs text-left">
                                        {oldPrice && (
                                            <div className="text-[11px] mb-1 line-through">{numberWithCommas(oldPrice)} تومان </div>
                                        )}
                                        {numberWithCommas(price)} تومان
                                    </div>

                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}

            <button
                type="button"
                className="text-sm text-[#ca54ff] bg-[#161b39] w-full px-5 py-3 flex rounded-full justify-center gap-3 "
            >
                <Add />
                محصولات بیشتر
            </button>
        </div>
    );

    return (
        <section className="py-6">

            <h3 className="px-3 text-[#ca54ff] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/joystick.svg" alt="best sellers" width={36} height={36} className="w-9 h-9" />
                محصولات پرفروش
            </h3>

            <Tab
                items={[
                    { key: 1, children: content, label: "کالاف دیوتی" },
                    { key: 2, children: "پلی استیشن", label: "پلی استیشن" },
                    { key: 3, children: "پابجی موبایل", label: "پابجی موبایل" },
                    { key: 4, children: "ایکس باکس", label: "ایکس باکس" },
                    { key: 5, children: "پابجی موبایل", label: "پابجی موبایل" },
                    { key: 6, children: "ایکس باکس", label: "ایکس باکس" }
                ]}
                style="3"
                wrapperClassName="mx-3"
                scrollTabs
            />


        </section>
    )
}

export default BestSellers;