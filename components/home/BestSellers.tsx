import { numberWithCommas, toPersianDigits } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import Tab from "../shared/Tab";
import Add from "../icons/Add";

const BestSellers = () => {

    const items: {
        image: string;
        imageAlt?: string;
        title: string;
        url: string;
        price: number;
        oldPrice?: number;
        discountPercentage?: number;
    }[] = [
            {
                url: "#",
                title: "خرید 10000 cp کال اف دیوتی موبایل",
                image: "/mock-images/pro1.jpg",
                imageAlt: "",
                price: 2559000,
                oldPrice: 2959000,
                discountPercentage: 10
            },
            {
                url: "#",
                title: "گیفت کارت 50 دلاری نینتندو",
                image: "/mock-images/pro2.jpg",
                price: 4000000,
                oldPrice: 4200000,
                discountPercentage: 5
            },
            {
                url: "#",
                title: "شارژ اکانت پلی استیشن پلاس یکساله",
                image: "/mock-images/pro3.jpg",
                price: 2559000,
                discountPercentage: 0
            },
            {
                url: "#",
                title: "گیفت کارت 50 دلاری نینتندو",
                image: "/mock-images/pro2.jpg",
                price: 4000000,
                oldPrice: 4200000,
                discountPercentage: 5
            },
            {
                url: "#",
                title: "گیفت کارت 50 دلاری نینتندو",
                image: "/mock-images/pro2.jpg",
                price: 4000000,
                oldPrice: 4200000,
                discountPercentage: 5
            },
            {
                url: "#",
                title: "شارژ اکانت پلی استیشن پلاس یکساله",
                image: "/mock-images/pro3.jpg",
                price: 2559000,
                discountPercentage: 8
            },
            {
                url: "#",
                title: "گیفت کارت 50 دلاری نینتندو",
                image: "/mock-images/pro2.jpg",
                price: 4000000,
                oldPrice: 4200000,
                discountPercentage: 5
            }

        ];


    const content = (
        <div className="py-5">
            {items.map(item => (
                <div
                    key={item.title}
                    className="mb-4"
                >
                    <Link
                        href="#"
                        className="flex"
                    >

                        <Image
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            width={160}
                            height={160}
                            className="block w-32 h-32 rounded-2xl"
                        />

                        <div className="p-2.5">
                            <h4 className="text-xs mb-5"> {toPersianDigits(item.title)} </h4>
                            <div className="flex gap-3 items-end pb-1">
                                {!!item.discountPercentage && (
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-2 font-bold text-sm">
                                        {toPersianDigits(item.discountPercentage?.toString())}
                                        %
                                    </div>
                                )}

                                <div className="text-xs text-left">
                                    {item.oldPrice && (
                                        <div className="text-[11px] mb-1 line-through">{numberWithCommas(item.oldPrice)} تومان </div>
                                    )}
                                    {numberWithCommas(item.price)} تومان
                                </div>

                            </div>
                        </div>
                    </Link>
                </div>
            ))}

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