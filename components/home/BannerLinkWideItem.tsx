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
    wrapperClassName?: string;
}

const BannerLinkWideItem:React.FC<Props> = props => {
    return (
        <div className={`relative ${props.wrapperClassName || ""}`}>
            <Image
                src={props.imageUrl || "/images/default-game.png"}
                alt={props.imageAlt || props.imageTitle || props.title}
                width={600}
                height={300}
                className="rounded-3xl w-full h-32 object-cover"
            />
            <Link href={props.url} className="h-20 px-4 bg-[#1b2c3b] absolute bottom-0 left-0 flex justify-between gap-7 items-center rounded-bl-3xl rounded-tr-3xl">

                <ClipRadius className="absolute bottom-full left-0 fill-[#1b2c3b] w-6 h-6" />
                <ClipRadius className="absolute bottom-0 left-full fill-[#1b2c3b] w-6 h-6" />

                <div className="w-20">
                    <strong className="font-semibold block text-sm truncate"> {props.title} </strong>
                    {props.subtitle && <span className="text-xs truncate"> {props.subtitle} </span>}
                </div>
                <ArrowTopLeft className="w-3.5 h-3.5 fill-current" />
            </Link>

        </div>
    )
}

export default BannerLinkWideItem;