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
                className="rounded-2xl w-full h-24 object-cover"
            />
            <Link href={props.url} className="h-16 px-4 bg-[#1b2c3b] absolute bottom-0 left-0 flex justify-between gap-7 items-center rounded-bl-2xl rounded-tr-2xl">

                <ClipRadius className="absolute bottom-full left-0 fill-[#1b2c3b] w-4 h-4" />
                <ClipRadius className="absolute bottom-0 left-full fill-[#1b2c3b] w-4 h-4" />

                <div className="w-20">
                    <strong className="font-semibold block text-sm truncate"> {props.title} </strong>
                    {props.subtitle && <span className="text-xs truncate"> {props.subtitle} </span>}
                </div>
                <ArrowTopLeft className="w-4 h-4 fill-current" />
            </Link>

        </div>
    )
}

export default BannerLinkWideItem;