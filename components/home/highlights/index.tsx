/* eslint-disable  @typescript-eslint/no-explicit-any */

import { ServerAddress } from "@/enum/url";
import { useEffect, useRef, useState } from "react";
import HightlightItem from "./HightlightItem";
import { useAppDispatch } from "@/hooks/use-store";
import { setBodyScrollable } from "@/redux/stylesSlice";
import { HighlightItemType } from "@/types/highlight";
import { getStrapiHighlight } from "@/actions/strapi";
import ModalPortal from "@/components/shared/layout/ModalPortal";
import SlickSlider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import ArrowTopLeft from "@/components/icons/ArrowTopLeft";

type Props = {
    highlights: HighlightItemType[];
}

const Highlights: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const [highlights, setHighlights] = useState<HighlightItemType[]>(props.highlights.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));

    const [loading, setLoading] = useState<boolean>(false);

    const [activeItemId, setActiveItemId] = useState<number>();

    const activeHighlight = highlights.find(h => h.id === activeItemId);

    const fetchHighlightDetail = async (Keyword?: string) => {

        if (!Keyword) return;

        setLoading(true);
        const response: any = await getStrapiHighlight(`filters[Keyword][$eq]=${Keyword}&locale=fa&populate[Item][populate][Items][populate]=*`);
        if (response?.data?.data?.[0]?.Item?.Items) {
            setHighlights(prevState => {
                const updatingItem = prevState.find(h => h.Keyword === Keyword);
                const otherItems = prevState.filter(h => h.Keyword !== Keyword);
                if (updatingItem) {
                    return ([
                        ...otherItems,
                        {
                            ...updatingItem,
                            Items: response?.data?.data?.[0].Item.Items
                        }
                    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    )
                }
                return prevState;
            })
        }
        setLoading(false)
    }
    useEffect(() => {

        if (activeItemId) {
            dispatch(setBodyScrollable(false));
            const activeItem = highlights.find(item => item.id === activeItemId);
            if (!activeItem?.Items?.length) {
                fetchHighlightDetail(activeItem?.Keyword)
            }
        } else {
            dispatch(setBodyScrollable(true));
        }

    }, [activeItemId])

    const sliderRef = useRef(null);
    //const currentIndexRef = useRef(0);

    const settings = {
        dots: true,
        arrows: false,
        speed: 200,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
        afterChange: (currentSlideIndex: number) => {
            if (activeHighlight?.Items && currentSlideIndex === activeHighlight.Items.length - 1) {
                setTimeout(() => {
                    const activeHighlightIndex = highlights.findIndex(h => h.id === activeItemId);
                    if (activeHighlightIndex < highlights.length - 1) {
                        setActiveItemId(highlights[activeHighlightIndex + 1].id);
                    } else {
                        setActiveItemId(undefined);
                    }
                }, 4000)
            }
        }
    };

    if (highlights.length) {
        return (

            <section className="max-lg:hidden-scrollbar lg:styled-scrollbar lg:pb-2 overflow-x-auto overflow-y-clip py-3">
                <div className="flex items-start gap-3 px-3">
                    {highlights.map(highlight => (
                        <HightlightItem
                            open={() => { setActiveItemId(highlight.id) }}
                            Image={highlight.Item?.Image?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${highlight.Item.Image.url}` : "/images/default-game.png"}
                            Title={highlight.Item?.Title || ""}
                            key={highlight.id}
                        />
                    ))}
                </div>

                <ModalPortal
                    show={!!activeItemId}
                    selector='modal_portal'
                >
                    <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen">

                        <div className="relative w-full lg:max-w-lg lg:mx-auto h-screen">

                            <div className="bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0" onClick={() => { setActiveItemId(undefined) }} />

                            <div className={`bg-white pb-2 rounded-2xl absolute transition-all left-3 right-3 bottom-5`}>

                                {loading ? (
                                    <div className={`h-highlight bg-[#011425] mb-10 text-white items-center p-5 justify-center flex flex-col rounded-2xl`}>
                                        <Image src="/images/loading.gif" className="h-24 w-24 -mt-2" alt="loading" width={96} height={96} />
                                    </div>
                                ) : activeHighlight?.Items?.length ? <SlickSlider ref={sliderRef} {...settings} className="highlight-slider">
                                    {activeHighlight.Items.map(item => (
                                        <div key={item.id} dir="rtl">
                                            <div className="bg-[#011425] rounded-2xl relative">
                                                <Image
                                                    src={item.Image?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${item.Image?.url}` : "default-game.png"}
                                                    alt={item.Title || item.Subtitle || ""}
                                                    width={500}
                                                    height={700}
                                                    className="rounded-2xl w-full h-highlight object-cover "
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-5 pt-24 text-white bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                                                    <div className="text-center mb-5">
                                                        <div className="mb-2 text-xs font-bold">
                                                            {item.Header}
                                                        </div>
                                                        <b className="block mb-2 text-2xl font-bold">
                                                            {item.Title}
                                                        </b>
                                                        {!!item.Subtitle && <p className="text-xs">
                                                            {item.Subtitle}
                                                        </p>}
                                                    </div>
                                                    <Link href={item.Url} className="mx-4 text-sm block p-2 bg-gradient-to-t from-[#a839fe] to-[#fe81ff] rounded-full flex justify-between items-center">
                                                        <span className="block w-10" />
                                                        خرید
                                                        <span className="block bg-[#a93aff] p-3 rounded-full">
                                                            <ArrowTopLeft className="w-4 h-4 fill-current" />
                                                        </span>
                                                    </Link>

                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                </SlickSlider> : "اطلاعات یافت نشد"}

                                <div className="absolute flex gap-1 bottom-1 right-1 text-2xs items-center">
                                    <Image
                                        src={activeHighlight?.Item?.Image.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${activeHighlight.Item.Image.url}` : "/images/default-game.png"}
                                        alt={activeHighlight?.Item?.Title || ""}
                                        width={80}
                                        height={80}
                                        className="block w-10 h-10"
                                    />
                                    {activeHighlight?.Item?.Title}
                                </div>
                            </div>
                        </div>

                    </div>
                </ModalPortal>


            </section>
        )
    }

    return null;

}

export default Highlights;