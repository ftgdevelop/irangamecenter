import Link from "next/link";
import Image from "next/image";

type Items = {
    imageUrl?: string;
    imageAlt?: string;
    imageTitle?: string;
    title: string;
    subtitle?: string;
    url: string;
}
type Props = {
    items: Items[]
}

const BannerLinks: React.FC<Props> = props => {
    return (
        <div className="p-3">
            {props.items?.map(item => (
                <Link prefetch={false} href={item.url} className="relative block mb-4" key={item.title}>
                    <Image
                        src={item.imageUrl || "/images/default-game.png"}
                        alt={item.title || item.imageAlt || item.imageTitle || ""}
                        width={430}
                        height={130}
                        className="rounded-3xl w-full h-32 object-cover border border-white/25"
                    />
                </Link>
            ))}
        </div>
    )
}

export default BannerLinks;