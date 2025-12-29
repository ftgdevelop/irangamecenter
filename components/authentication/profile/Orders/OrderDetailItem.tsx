import ArrowTopLeft from "@/components/icons/ArrowTopLeft";
import HourGlass from "@/components/icons/HourGlass";
import { numberWithCommas, toPersianDigits } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { OrderDetailItemType } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";

type Props = {
    itemData : OrderDetailItemType;
    orderId: number;
}

const OrderDetailItem : React.FC<Props> = props => {
    
    const {itemData: data} = props;

    const subtitleItems : string[] = [];
    if(data.variant?.description){
        subtitleItems.push(data.variant.description);
    }
    if(data.variant?.attributes?.length){
        subtitleItems.push(...data.variant.attributes);
    }

    return(
        <div className="mb-7">
            <div className="flex gap-3 mb-5">
                <Image src={data.variant?.filePath || data.product?.filePath || "/images/default-game.png"} alt={data.product.name} className="aspect-square shrink-0 grow-0 w-1/4 max-w-24 rounded-2xl" width={96} height={96} />
                <div className="grow text-xs">
                    <h5 className="text-sm font-semibold mb-2"> {data.product.name} </h5>
                    {!!subtitleItems.length && <div className="mb-2"> {subtitleItems.join(", ")} </div>}
                    <div className="flex justify-between items-center mb-2">
                        <div> مبلغ : <b className="font-semibold"> {numberWithCommas(data.unitPrice)} {getCurrencyLabelFa(data.currencyType)} </b> </div>
                        <div className="text-red-400"> <b className="font-semibold"> {numberWithCommas(data.unitDiscountAmount)} {getCurrencyLabelFa(data.currencyType)} </b> تخفیف </div>
                    </div>
                    <div> تعداد : <b> {toPersianDigits(data.quantity.toString())} عدد </b></div>
                </div>
            </div>

            <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm flex items-center gap-1"> 
                        <HourGlass className="w-4.5 h-4.5 fill-none stroke-current" /> 
                        {data.currentTimeline?.description || "نامشخص"}
                    </div>
                    <button
                        type="button"
                        className="outline-none flex gap-2 items-center text-xs"
                    >
                        مراحل انجام
                        <ArrowTopLeft className="w-3 h-3 fill-current" />
                    </button>
                </div>

                <div className="h-3 w-full rounded-full bg-[#eaeaea] dark:bg-gradient-dark-green relative">
                    <span className="bg-gradient-green block absolute h-full rounded-full right-0 top-0" style={{width:(data.currentTimeline?.progressPercent || 0) + "%"}} />
                </div>

            </div>

            <Link
                href={`/profile/orders/${props.orderId}/${data.id}`}
                className="block text-center bg-gradient-violet text-white rounded-full px-3 w-full text-sm py-3"
            >
                ثبت اطلاعات اکانت
            </Link>
        </div>
    )
}

export default OrderDetailItem;