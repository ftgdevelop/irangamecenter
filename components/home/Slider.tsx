import ClipRadius from "@/public/images/icons/ClipRadius";
import Image from "next/image";
import ArrowTopLeft from "../icons/ArrowTopLeft";
import Link from "next/link";
import SlickSlider from "react-slick";

const Slider = () => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section className="py-3 px-3">

            <SlickSlider {...settings}>
                {[1, 2, 3, 4].map(item => (
                    <div className="relative" key={item} dir="rtl">
                        <Image
                            src="/mock-images/call-of.jpg"
                            alt="call of duty"
                            width={500}
                            height={300}
                            className="rounded-large w-full min-h-52 object-cover"
                        />
                        <span className="absolute top-0 right-0 pt-2 pb-3 pr-3 pl-5 block rounded-bl-large rounded-tr-large text-xs bg-[#011425]/75" >
                            شارژ در سریع ترین زمان
                        </span>

                        <div className="absolute bottom-0 right-0 pr-3 pt-2 pb-3 pl-16 left-0 bg-gradient-to-l from-[#011425]/75 to-[#011425]/10">
                            <strong className="block mb-1 text-xl font-semibold truncate">
                                شارژ سی پی کالاف دیوتی موبایل
                            </strong>
                            <p className="text-xs truncate">
                                بهترین و پرطرفدارترین بازی موبایل
                            </p>
                        </div>

                        <div
                            className="absolute -bottom-px -left-px h-17 w-17 bg-[#011425] rounded-tr-large"
                        >
                            <ClipRadius className="absolute bottom-full left-0 fill-[#011425] w-[32] h-[32]" />
                            <ClipRadius className="absolute bottom-0 left-full fill-[#011425] w-[32] h-[32]" />

                            <Link href="#" className="w-12 h-12 bg-[#1b2c3b] cursor-pointer select-none rounded-full absolute bottom-1 left-1 flex items-center justify-center">
                                <ArrowTopLeft className="fill-white w-5 h-5" />
                            </Link>

                        </div>

                    </div>
                ))}

            </SlickSlider>

        </section>
    )
}

export default Slider;