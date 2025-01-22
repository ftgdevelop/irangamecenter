import Image from "next/image";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import ClipRadius from "@/public/images/icons/ClipRadius";

type Props = {
    imageUrl?: string;
    title: string;
    subtitle?: string;
    url: string;
    wrapperClassName?: string;
}

const BannerLinkWideItem:React.FC<Props> = props => {
    return (
        <div className={`relative ${props.wrapperClassName || ""}`}>
            <Image
                src={props.imageUrl || "/images/default-game.png"}
                alt={props.title}
                width={600}
                height={300}
                className="rounded-[24] w-full h-[120] object-cover"
            />
            <Link href={props.url} className="h-[72] px-4 bg-[#1b2c3b] absolute bottom-0 left-0 flex justify-between gap-5 items-center rounded-bl-[23] rounded-tr-[24]">

                <ClipRadius className="absolute bottom-full left-0 fill-[#1b2c3b] w-[24] h-[24]" />
                <ClipRadius className="absolute bottom-0 left-full fill-[#1b2c3b] w-[24] h-[24]" />

                <div>
                    <strong className="font-semibold block"> {props.title} </strong>
                    {props.subtitle && <span className="text-xs"> {props.subtitle} </span>}
                </div>
                <ArrowTopLeft className="w-5 h-5 fill-current" />
            </Link>

        </div>
    )
}

export default BannerLinkWideItem;