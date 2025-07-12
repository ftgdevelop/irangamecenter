import {RatingItemType } from "@/types/commerce";
import Image from "next/image";

type Props = {
    rating?: RatingItemType;
}

const RatingItem: React.FC<Props> = props => {
    
    const {rating} = props;
    if (!rating) return null;

    let logoSrc : string = "";


    switch (rating.type){
        case "Eurogamer":
            logoSrc = "/images/logos/Eurogamer.svg";
            break;
        case "GameSpot":
            logoSrc = "/images/logos/GameSpot.svg";
            break;
        case "IGN":
            logoSrc = "/images/logos/IGN.svg";
            break;
        case "Metacritic":
            logoSrc = "/images/logos/Metacritic.svg";
            break;
        case "Steam":
            logoSrc = "/images/logos/Steam.svg";
            break;
        default:
            logoSrc = "";

    }

    return(
        <div className="shrink-0 min-w-24 flex flex-col items-center gap-2 bg-white rounded-xl p-2 text-neutral-700">
            {logoSrc ? (
                <Image 
                    src={logoSrc}
                    alt={rating.type}
                    width={100}
                    height={28}
                    className="h-7 w-auto block"
                />
            ):(
                <div className="font-semibold text-sm">{rating.type}</div>
            )}
            <div className="font-bold text-xs whitespace-nowrap">
                {rating?.value} از {rating?.total}
            </div>
        </div>
    )
}

export default RatingItem;