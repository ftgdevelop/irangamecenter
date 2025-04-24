import { dateDiplayFormat, numberWithCommas, toPersianDigits } from "@/helpers";
import Image from "next/image";

type Props = {
    amount: number;
    creationTime: string;
    id: number;
    type: string;
}

const TransactionItem: React.FC<Props> = props => {
    return (
        <div className="grid grid-cols-6 gap-2 items-center" >

            <Image
                alt="transaction-icon"
                src={props.amount > 0 ? "/images/icons/transactionInc.svg" : "/images/icons/transactionDec.svg"}
                width={74}
                height={74}
            />

            <div className="col-span-5 flex justify-between items-center w-full">
                <div className="text-xs">
                    <div className="mb-2 font-semibold break-all" >
                        {props.type}
                    </div>
                    <div className="text-2xs">
                        <span className="ml-3"> {props.amount > 0 ? "دریافت موفق" : "پرداخت موفق"}  </span> <span className="whitespace-nowrap">
                            {toPersianDigits(dateDiplayFormat({
                                date: props.creationTime,
                                format: "yyyy/mm/dd h:m",
                                locale: "fa"
                            }))}
                        </span>
                    </div>
                </div>
                <div className={`font-semibold text-sm whitespace-nowrap ${props.amount > 0 ? "text-[#d35cfe]" : "text-[#ff163e]"}`}>
                    {numberWithCommas(Math.abs(props.amount) / 10)} <span className="text-2xs"> تومان </span> <span className="base"> {props.amount > 0 ? "+" : "-"} </span>
                </div>
            </div>
        </div>
    )
}

export default TransactionItem;