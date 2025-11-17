import useEmblaCarousel from "embla-carousel-react";
import React, { useState, useEffect, useCallback, ReactNode } from "react";

type Props = {
    wrapperClassName?: string;
    items: { content: ReactNode; key: string | number }[];
    showDots?: boolean;
    dotsWrapperClassName?: string;
    peek?: number; // درصدی از اسلاید بعدی که دیده می‌شود
    infinite?: boolean;
};

const Carousel: React.FC<Props> = (props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: props.infinite || false,
        direction: "rtl",
        dragFree: false,
        align: "start",
        containScroll: "trimSnaps"
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [snapPoints, setSnapPoints] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        setSnapPoints(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const scrollTo = (index: number) => {
        emblaApi?.scrollTo(index);
    };


    return (
        <div className={props.wrapperClassName}>

            <div className="overflow-hidden embla" ref={emblaRef}>
                <div className="flex embla__container">
                    {props.items.map((item) => (
                        <div
                            style={{
                                flex: `0 0 calc(${100}% - ${props.peek || 0}%)`,
                            }}
                            className={`embla__slide `} key={item.key}>
                            {item.content}
                        </div>
                    ))}
                </div>
            </div>

            {props.showDots && (
                <div className={`flex justify-center gap-2 mt-3 ${props.dotsWrapperClassName || ""}`}>
                    {snapPoints.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-3 rounded-full transition-all ${selectedIndex === index
                                ? "w-7 bg-[#fe1940]"
                                : "w-3 bg-white hover:bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default Carousel;
