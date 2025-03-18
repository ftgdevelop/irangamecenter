import ArrowRight from "@/components/icons/ArrowRight"
import Loading from "@/components/icons/Loading";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import OnlinePayment from "@/components/payment/OnlinePayment ";
import { numberWithCommas, persianNumbersToEnglish, rialsToLettersToman } from "@/helpers";
import { useAppSelector } from "@/hooks/use-store";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";

const Charge = () => {

    const userBalanceLoading = useAppSelector(state => state.authentication.balanceLoading);
    const userBalance = useAppSelector(state => state.authentication.balance);

    const [amount, setAmount] = useState<string>("");

    return (
        <>
            <header className="flex items-center gap-5 p-4 text-xs">
                <Link href="/profile/wallet" className="w-6 h-6">
                    <ArrowRight />
                </Link>
                شارژ کیف پول
            </header>
            <div className="px-3.5">

                <div className="flex justify-between items-center px-3 py-5 bg-gradient-to-t from-[#01212e] to-[#102c33] rounded-xl mb-10">
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


                <h4 className="text-center text-sm mb-3"> مبلغ افزایش شارژ </h4>

                <div className="bg-[#192a39] text-white h-14 relative rounded-full w-full flex justify-between items-center p-2 mb-4">
                    <button
                        type="button"
                        className="shrink-0 h-10 w-10 rounded-full bg-gradient-to-t from-[#028d7e] to-[#99feac] text-white text-xs flex gap-2 justify-center items-center"
                        onClick={() => {
                            setAmount(prevAmout => (+prevAmout + 500000).toString())
                        }}
                    >
                        <Plus className="w-5 h-5 fill-white" />
                    </button>
                    <div className={`grid grid-cols-2 ${+amount > 1000000000 ? "pr-14" : +amount > 10000000 ? "pr-10" : +amount > 10000 ? "pr-5" : +amount > 100 ? "pr-1" : ""}`}>
                        <input
                            type="text"
                            className="bg-transparent text-left min-w-0 w-auto grow-0 border-none outline-none"
                            dir="ltr"
                            value={numberWithCommas(+amount)}
                            onChange={e => { setAmount(persianNumbersToEnglish(e.target.value).replaceAll(",", "")) }}
                        />
                        <span className="pr-2 text-xs text-right self-center"> ریال </span>
                    </div>

                    <button
                        type="button"
                        className={`shrink-0 h-10 w-10 rounded-full text-white text-xs flex gap-2 justify-center items-center ${+amount >= 500000 ? "bg-gradient-to-t from-[#028d7e] to-[#99feac]" : "bg-neutral-300"}`}
                        onClick={() => {
                            if (+amount >= 500000) {
                                setAmount(prevAmout => (+prevAmout - 500000).toString())
                            }
                        }}
                    >
                        <Minus className="w-5 h-5 fill-white" />
                    </button>
                </div>

                {!!(+amount) && <p className="text-xs px-5 mb-4">
                    {rialsToLettersToman(+amount)}
                </p>}

                <div className="flex gap-2 justify-between">
                    {[1000000, 2000000, 3000000].map(item => (
                        <button
                            key={item}
                            type="button"
                            className="border border-white/25 px-2.5 py-1 text-sm rounded-full outline-none bg-transparent focus:bg-white/15"
                            onClick={() => { setAmount(item.toString()) }}
                        >
                            {numberWithCommas(item)} <span className="text-xs"> ریال </span>
                        </button>
                    ))}
                </div>

                <OnlinePayment amount={+amount} />

            </div>
        </>
    )
}

export default Charge;