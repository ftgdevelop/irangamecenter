import Image from "next/image";
import Link from "next/link";
import SlickSlider from "react-slick";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import { BlogItemType } from "@/types/blog";
import { toPersianDigits } from "@/helpers";
import parse from 'html-react-parser';

type Props = {
    blogs : BlogItemType[];
    title?: string;
};
const BlogsCarousel: React.FC<Props> = props => {

  
    const items: {
        image: string;
        imageAlt?: string;
        title: string;
        subTitle?: string;
        url: string;
        date: string
    }[] = props.blogs.map(blog=>({
            image:blog.jetpack_featured_media_url || "/images/no-image.jpg",
            title:blog.title.rendered ||"",
            url:`/blogs/${blog.slug}`,
            imageAlt:blog.title.rendered || "",
            subTitle:blog.excerpt.rendered||"",
            date: toPersianDigits(blog.date)
    }));

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    if (!items?.length){
        return null
    }

    return (
        <section className="bg-[#192b39] py-6">

            <h3 className="px-4 text-[#ff7189] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/blog.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                {props.title || "مجله خبری ایران گیم سنتر"}
            </h3>

            {items.length > 1 ? (
                <SlickSlider {...settings}>
                    {items.map(item => (
                        <div className="px-4" key={item.title} dir="rtl">
                            <div className="bg-[#011425] rounded-large">
                                <Image
                                    src={item.image || "default-game.png"}
                                    alt={item.imageAlt || item.title}
                                    width={488}
                                    height={214}
                                    className="rounded-large w-full min-h-52 object-cover"
                                />

                                <Link href={item.url} className="relative pl-10 p-5 block justify-between gap-3 items-center">
                                    <strong className="block mb-1 text-sm">
                                        {item.title}
                                    </strong>
                                    {!!item.subTitle && <div className="text-xs truncate-content-p">
                                        {parse(item.subTitle)}
                                    </div>}
                                    <ArrowTopLeft className="w-4 h-4 fill-current absolute top-1/2 left-4 -translate-y-1/2" />
                                </Link>

                            </div>
                        </div>
                    ))}
                </SlickSlider>
            ):(
                <div className="px-4 pb-6" key={items[0]?.title} dir="rtl">
                    <div className="bg-[#011425] rounded-large">
                        <Image
                            src={items[0]?.image || "default-game.png"}
                            alt={items[0]?.imageAlt || items[0]?.title}
                            width={488}
                            height={214}
                            className="rounded-large w-full min-h-52 object-cover"
                        />

                        <Link href={items[0]?.url} className="relative pl-10 p-5 block justify-between gap-3 items-center">
                            <strong className="block mb-1 text-sm">
                                {items[0]?.title}
                            </strong>
                            {!!items[0]?.subTitle && <div className="text-xs truncate-content-p">
                                {parse(items[0]?.subTitle)}
                            </div>}
                            <ArrowTopLeft className="w-4 h-4 fill-current absolute top-1/2 left-4 -translate-y-1/2" />
                        </Link>

                    </div>
                </div>
            )}

        </section>
    )
}

export default BlogsCarousel;