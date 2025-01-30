import Image from "next/image";
import Link from "next/link";
import SlickSlider from "react-slick";
import ArrowTopLeft from "../icons/ArrowTopLeft";

const Blog = () => {

    const items: {
        image: string;
        imageAlt?: string;
        title: string;
        subTitle?: string;
        url: string;
    }[] = [
            {
                url: "#",
                title: "FC 25 : در عمق بازی فوتبال جدید EA Sport",
                image: "/mock-images/blog.jpg",
                imageAlt: "",
                subTitle: "7 ساعت پیش"
            },
            {
                url: "#",
                title: "FC 25 : در عمق بازی فوتبال جدید EA Sport 2",
                image: "/mock-images/blog.jpg",
                imageAlt: "",
                subTitle: "4 ساعت پیش"
            },
            {
                url: "#",
                title: "FC 25 : در عمق بازی فوتبال جدید EA Sport 2",
                image: "/mock-images/blog.jpg",
                imageAlt: "",
                subTitle: "4 ساعت پیش"
            },
            {
                url: "#",
                title: "FC 25 : در عمق بازی فوتبال جدید EA Sport 2",
                image: "/mock-images/blog.jpg",
                imageAlt: "",
                subTitle: "4 ساعت پیش"
            }

        ];

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section className="bg-[#192b39] py-6">

            <h3 className="px-3 text-[#ff7189] font-bold flex gap-2 items-center text-md mb-4">
                <Image src="/images/icons/blog.svg" alt="offer" width={36} height={36} className="w-9 h-9" />
                مجله خبری ایران گیم سنتر
            </h3>

            <SlickSlider {...settings}>
                {items.map(item => (
                    <div className="px-3" key={item.title} dir="rtl">
                        <div className="bg-[#011425] rounded-large">
                            <Image
                                src={item.image || "default-game.png"}
                                alt={item.imageAlt || item.title}
                                width={500}
                                height={300}
                                className="rounded-large w-full min-h-52 object-cover"
                            />

                            <Link href={item.url} className="p-5 flex justify-between gap-3 items-center">
                                <div>
                                    <strong className="block mb-1 text-sm truncate">
                                        {item.title}
                                    </strong>
                                    {!!item.subTitle && <p className="text-xs truncate">
                                        {item.subTitle}
                                    </p>}
                                </div>
                                <ArrowTopLeft className="w-4 h-4 fill-current" />
                            </Link>

                        </div>
                    </div>
                ))}

            </SlickSlider>


        </section>
    )
}

export default Blog;