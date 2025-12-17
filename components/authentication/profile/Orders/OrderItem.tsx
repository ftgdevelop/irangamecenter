import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import { dateDiplayFormat, numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { OrderListItemType } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";
import StatusTag from "./StatusTag";

type Props = {
    order?: OrderListItemType;
}
const OrderItem : React.FC<Props> = props => {

    const {order} = props;

    return(
        <div className="border-b border-neutral-300 dark:border-white/25 py-5 text-xs">
            <div className="flex justify-between items-center mb-3">

                <StatusTag status={order?.status} />

                <Link href={`/profile/orders/${order?.id}`} className="flex items-center justify-center bg-[#f59f00] dark:bg-[#231c51] h-7 w-7 rounded-full">
                    <ArrowTopLeft className="fill-white w-3 h-3" />
                </Link>
            </div>

            <div className="mb-2">
                <span className="dark:font-white/50 ml-2"> شماره سفارش </span> 
                <span className="font-semibold"> {order?.id} </span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
                {order?.creationTime && (
                    <div> 
                        <span className="dark:font-white/50 ml-2"> تاریخ ثبت سفارش </span> 
                        <span className="font-semibold"> {dateDiplayFormat({
                            date:order.creationTime,
                            format:"dd mm yyyy",
                            locale:"fa"
                        })} </span> 
                    </div>
                )}

                <div>
                    <span className="dark:font-white/50 ml-2"> مبلغ </span> 
                    <span className="font-semibold"> {numberWithCommas(order?.payableAmount || 0)} {getCurrencyLabelFa(order?.currencyType)} </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {order?.items.filter(x => x.product.filePath).map(item => (
                    <Image
                        key={item.product.filePath} 
                        src={item.product.filePath!}
                        alt={item.product.fileAltAttribute || ""}
                        className="w-16 h-16 object-contain rounded-lg"
                        width={64}
                        height={64}
                    />
                ))}
            </div>

        </div>
    )
}

export default OrderItem;