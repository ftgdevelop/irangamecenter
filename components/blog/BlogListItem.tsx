import Image from "next/image";
import Link from "next/link";
import { BlogListItemType } from "@/types/blog";
import { dateDisplayFormat, toPersianDigits } from "@/helpers";

type Props = {
    data: BlogListItemType;
    wrapperClassName?: string;
};
const BlogListItem: React.FC<Props> = props => {

    const { data } = props;

    return (
        <Link prefetch={false} href={`/blog/${data.slug}`} className={`flex gap-3 ${props.wrapperClassName || ""}`}>
            <Image
                src={data.postMainMediaUrl || "/images/default-game.png"}
                alt={data.title || ""}
                width={488}
                height={214}
                className="h-18 w-18 rounded-2xl aspect-square object-cover text-[9px]"
            />
            <div className="grow py-2">
                <strong className="block mb-1 text-sm">
                    {data.title}
                </strong>
                {!!data.creationTime && <div className="block mt-2 text-xs">
                    {toPersianDigits(dateDisplayFormat({
                        date: data.creationTime,
                        format: "timeAgo",
                        locale: "fa"
                    }))}
                </div>}
            </div>
        </Link>
    )
}

export default BlogListItem;