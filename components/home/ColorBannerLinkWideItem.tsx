import Image from "next/image";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import ClipRadius from "@/public/images/icons/ClipRadius";

type Props = {
    imageUrl?: string;
    imageAlt?: string;
    imageTitle?: string;
    title: string;
    subtitle?: string;
    url: string;
    bg: string;
    wrapperClassName?: string;
}

const ColorBannerLinkWideItem:React.FC<Props> = props => {
    return (
        <div 
            className={`relative h-100 rounded-2xl flex items-center justify-center pl-24 ${props.wrapperClassName || ""}`}
            style={{backgroundColor: props.bg}}
        >
            <Image
                src={props.imageUrl || "/images/default-game.png"}
                alt={props.imageAlt || props.imageTitle || props.title}
                width={200}
                height={60}
                className="w-1/2 h-10 object-contain"
            />
            <Link href={props.url} className="h-17 w-1/3 min-w-32 px-3 bg-white text-neutral-700 absolute bottom-0 left-0 flex justify-between items-center rounded-bl-2xl rounded-tr-2xl">

                <ClipRadius className="absolute bottom-full left-0 fill-white w-4 h-4" />
                <ClipRadius className="absolute bottom-0 left-full fill-white w-4 h-4" />

                <div>
                    <strong className="font-semibold block text-sm truncate"> {props.title} </strong>
                    {props.subtitle && <span className="text-xs truncate"> {props.subtitle} </span>}
                </div>
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
            </Link>

        </div>
    )
}

export default ColorBannerLinkWideItem;