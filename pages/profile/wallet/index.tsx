import ArrowRight from "@/components/icons/ArrowRight"
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import Loading from "@/components/icons/Loading";
import Plus from "@/components/icons/Plus";
import { numberWithCommas } from "@/helpers";
import { useAppSelector } from "@/hooks/use-store";
import Image from "next/image";
import Link from "next/link"

const Wallet = () => {

    const userBalanceLoading = useAppSelector(state => state.authentication.balanceLoading);
    const userBalance = useAppSelector(state => state.authentication.balance);

    const items: {
        label: string;
        href: string;
        iconUrl: string;
    }[] = [
            {
                href: "/profile/wallet/transactions",
                iconUrl: "/images/icons/2color/wallet-search-2.svg",
                label: "تراکنش های من"
            }, {
                href: "/profile/wallet/faq",
                iconUrl: "/images/icons/2color/info-circle-2.svg",
                label: "سوالات متداول"
            }
        ]

    return (
        <>
            <header className="flex items-center gap-5 p-4 text-xs">
                <Link href="/profile" className="w-6 h-6">
                    <ArrowRight />
                </Link>
                کیف پول
            </header>
            <div className="px-3.5">
                <div className="px-3 py-5 bg-gradient-to-t from-[#01212e] to-[#102c33] rounded-xl">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center text-xs" >
                            <Image
                                src="/images/icons/2color/wallet-2.svg"
                                alt="wallet icon"
                                className="w-7 h-7 grow-0 shrink-0"
                                width={28}
                                height={28}
                            />
                            موجودی کیف پول

                        </div>

                        {userBalanceLoading ? (
                            <Loading className="w-5 h-5 fill-current" />
                        ) : userBalance ? (
                            <div className="text-green-400 text-xs font-semibold">
                                {numberWithCommas(userBalance)} تومان
                            </div>
                        ) : <div className="text-green-400 text-xs font-semibold"> 0 </div>}

                    </div>
                    <Link
                        href="/profile/wallet/charge"
                        className="mt-3 h-12 rounded-full bg-gradient-to-t from-[#028d7e] to-[#99feac] text-white text-xs flex gap-2 justify-center items-center"
                    >
                        <Plus className="w-4 h-4 fill-current" />
                        شارژ کیف پول
                    </Link>
                </div>

                {items.map(item => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex gap-3 items-center rounded-xl"
                    >
                        <Image
                            src={item.iconUrl}
                            alt={item.label}
                            className="w-7 h-7 grow-0 shrink-0"
                            width={28}
                            height={28}
                        />
                        <div className="grow flex justify-between items-center px-3 py-5 border-b border-white/10 text-xs">
                            {item.label}
                            <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
                        </div>
                    </Link>
                ))}

            </div>
        </>
    )
}

export default Wallet;