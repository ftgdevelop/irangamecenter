import ClipRadius from "@/public/images/icons/ClipRadius";
import Image from "next/image";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import SlickSlider from "react-slick";
import { ServerAddress } from "@/enum/url";

type Props = {
    items: {
        Url?: string;
        Title?: string;
        ImageAlternative?: string;
        ImageTitle?: string;
        id: number;
        Description?: string;
        Subtitle?: string;
        Image: {
            url: string;
        }
    }[];
}

const Slider: React.FC<Props> = props => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (props.items.length === 1) {

        const item = props.items[0];

        return (
            <section className="py-3 px-3">
                <div className="relative" dir="rtl">
                    <Image
                        src={ServerAddress.Type! + ServerAddress.Strapi + item.Image!.url!}
                        alt={item.ImageAlternative || item.Title || ""}
                        title={item.ImageTitle}
                        width={500}
                        height={300}
                        className="rounded-large w-full min-h-52 object-cover"
                    />
                    <span className="absolute top-0 right-0 pt-2 pb-3 pr-3 pl-5 block rounded-bl-large rounded-tr-large text-xs bg-[#011425]/75" >
                        {item.Description}
                    </span>

                    <div className="absolute bottom-0 right-0 pr-3 pt-2 pb-3 pl-16 left-0 bg-gradient-to-l from-[#011425]/75 to-[#011425]/10">
                        <strong className="block mb-1 text-xl font-semibold truncate">
                            {item.Title}
                        </strong>
                        <p className="text-xs truncate">
                            {item.Subtitle}
                        </p>
                    </div>

                    <div
                        className="absolute -bottom-px -left-px h-16 w-16 bg-[#011425] rounded-tr-large"
                    >
                        <ClipRadius className="absolute bottom-full left-0 fill-[#011425] w-8 h-8" />
                        <ClipRadius className="absolute bottom-0 left-full fill-[#011425] w-8 h-8" />

                        <Link href={item.Url || "#"} className="w-12 h-12 bg-[#1b2c3b] cursor-pointer select-none rounded-full absolute bottom-1 left-1 flex items-center justify-center">
                            <ArrowTopLeft className="fill-white w-3.5 h-3.5" />
                        </Link>

                    </div>

                </div>
            </section>
        )
    }

    if (props.items.length) {
        return (
            <section className="py-3 px-3">

                <SlickSlider {...settings}>
                    {props.items.map(item => (
                        <div className="relative" key={item.id} dir="rtl">
                            <Image
                                src={ServerAddress.Type! + ServerAddress.Strapi + item.Image!.url!}
                                alt={item.ImageAlternative || item.Title || ""}
                                title={item.ImageTitle}
                                width={500}
                                height={300}
                                className="rounded-large w-full min-h-52 object-cover"
                            />
                            <span className="absolute top-0 right-0 pt-2 pb-3 pr-3 pl-5 block rounded-bl-large rounded-tr-large text-xs bg-[#011425]/75" >
                                {item.Description}
                            </span>

                            <div className="absolute bottom-0 right-0 pr-3 pt-2 pb-3 pl-16 left-0 bg-gradient-to-l from-[#011425]/75 to-[#011425]/10">
                                <strong className="block mb-1 text-xl font-semibold truncate">
                                    {item.Title}
                                </strong>
                                <p className="text-xs truncate">
                                    {item.Subtitle}
                                </p>
                            </div>

                            <div
                                className="absolute -bottom-px -left-px h-16 w-16 bg-[#011425] rounded-tr-large"
                            >
                                <ClipRadius className="absolute bottom-full left-0 fill-[#011425] w-8 h-8" />
                                <ClipRadius className="absolute bottom-0 left-full fill-[#011425] w-8 h-8" />

                                <Link href={item.Url || "#"} className="w-12 h-12 bg-[#1b2c3b] cursor-pointer select-none rounded-full absolute bottom-1 left-1 flex items-center justify-center">
                                    <ArrowTopLeft className="fill-white w-3.5 h-3.5" />
                                </Link>

                            </div>

                        </div>
                    ))}
                </SlickSlider>

            </section>
        )
    }

    return null;

}

export default Slider;