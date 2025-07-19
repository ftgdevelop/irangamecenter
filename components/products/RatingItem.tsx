import { toPersianDigits } from "@/helpers";
import {RatingItemType } from "@/types/commerce";

type Props = {
    rating?: RatingItemType;
    index?: number;
}

const RatingItem: React.FC<Props> = props => {
    
    const {rating} = props;
    if (!rating) return null;

    if(!rating.total || !rating.value) return null;

    return(
        <>
            {!!props.index && <div className="w-px shrink-0 bg-white/50 h-8 self-center" />}
            <div className="shrink-0 min-w-20 flex flex-col items-center gap-2 p-2">
                <div className="font-bold text-xs whitespace-nowrap" dir="ltr">
                    {toPersianDigits(rating.value.toString())}/{toPersianDigits(rating.total.toString())}
                </div>
                <div className="font-semibold text-sm text-[#a93aff]">{rating.type}</div>
            </div>
        </>
    )
}

export default RatingItem;