import { numberWithCommas, toPersianDigits } from "@/helpers";
import Image from "next/image";
import Link from "next/link";

const Promotion = () => {

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
                discountPercentage: 8
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

        ]

    return (
        <section className="bg-[#192b39] py-6">

            <h3 className="px-3 text-[#fff0b5] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/offer.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                پیشنهاد ویژه
            </h3>

            <div className="styled-scrollbar overflow-x-auto overflow-y-clip">

                <div className="flex items-start px-3 pb-4">
                    {items.map(item => (
                        <div
                            key={item.title}
                            className="pl-2"
                        >
                            <Link
                                href="#"
                                className="inline-block shrink-0 bg-[#011425] rounded-2xl w-40"
                            >

                                <Image
                                    src={item.image}
                                    alt={item.imageAlt || item.title}
                                    width={160}
                                    height={160}
                                    className="block w-40 h-40 rounded-2xl"
                                />

                                <div className="p-2.5">
                                    <h4 className="text-xs mb-3"> {toPersianDigits(item.title)} </h4>
                                    <div className="flex gap-2 items-end justify-between pb-1">
                                        {item.discountPercentage ? (
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-2 font-bold text-sm">
                                                {toPersianDigits(item.discountPercentage?.toString())}
                                                %
                                            </div>
                                        ) : (
                                            <div />
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
                </div>
            </div>
        </section>
    )
}

export default Promotion;