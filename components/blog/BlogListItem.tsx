import Image from "next/image";
import Link from "next/link";
import { BlogItemType } from "@/types/blog";
import { dateDiplayFormat, toPersianDigits } from "@/helpers";

type Props = {
    data: BlogItemType;
    wrapperClassName?: string;
};
const BlogListItem: React.FC<Props> = props => {

    const { data } = props;

    return (
        <Link prefetch={false} href={`/blog/${data.slug}`} className={`flex gap-3 ${props.wrapperClassName || ""}`}>
            <Image
                src={data.jetpack_featured_media_url || "/images/no-image.jpg"}
                alt={data.title?.rendered || ""}
                width={488}
                height={214}
                className="h-18 w-18 rounded-2xl aspect-square object-cover"
            />
            <div className="grow py-3">
                <strong className="block mb-1 text-sm">
                    {data.title?.rendered}
                </strong>
                {!!data.date && <div className="block mt-2 text-xs">
                    {toPersianDigits(dateDiplayFormat({
                        date: data.date,
                        format: "timeAgo",
                        locale: "fa"
                    }))}
                </div>}
            </div>
        </Link>
    )
}

export default BlogListItem;