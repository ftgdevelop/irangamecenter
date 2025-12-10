import { numberWithCommas, toPersianDigits } from "@/helpers";
import Image from "next/image";
import Link from "next/link";

type Items = {
    imageUrl?: string;
    imageAlt?: string;
    imageTitle?: string;
    title: string;
    subtitle?: string;
    url: string;
    price?: number;
    oldPrice?: number;    
}

type Props = {
    items ?: Items[]
    title: string;
    titleIconUrl?: string;
}

const Promotion : React.FC<Props> = props => {

    function calculateDiscountPercentage(price: number, oldPrice: number): number {
        if (price && oldPrice) {
            const discount = ((oldPrice - price) / oldPrice) * 100;
            return Math.floor(discount);
        }
        return 0
    }

    if (!(props.items?.length)){
        return null
    }

    return (
        <section className="bg-[#192b39] py-6">

            <h3 className="px-3 text-[#fff0b5] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/offer.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                پیشنهاد ویژه
            </h3>

            <div className="styled-scrollbar overflow-x-auto overflow-y-clip">

                <div className="flex items-start px-3 pb-4">
                    {props.items.map(item => {
                        const discount = calculateDiscountPercentage(item.price||0, item.oldPrice||0);
                        return (
                            <div
                                key={item.title}
                                className="pl-2"
                            >
                                <Link
                                    prefetch={false}
                                    href={item.url}
                                    className="inline-block shrink-0 bg-[#011425] rounded-2xl w-40"
                                >
    
                                    <Image
                                        src={item.imageUrl || "/images/default-game.png"}
                                        alt={item.imageAlt || item.imageTitle || item.title}
                                        width={160}
                                        height={160}
                                        className="block w-40 h-40 rounded-2xl"
                                    />
    
                                    <div className="p-2.5">
                                        <h4 className="text-xs mb-3"> {toPersianDigits(item.title)} </h4>
                                        <div className="flex gap-2 items-end justify-between pb-1">
                                            {discount ? (
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 text-center pt-2 font-bold text-sm">
                                                    {toPersianDigits(discount.toString())}
                                                    %
                                                </div>
                                            ) : (
                                                <div />
                                            )}
    
                                            {!!item.price && <div className="text-xs text-left">
                                                {item.oldPrice && (
                                                    <div className="text-[11px] mb-1 line-through">{numberWithCommas(item.oldPrice)} تومان </div>
                                                )}
                                                {numberWithCommas(item.price)} تومان
                                            </div>}
    
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Promotion;