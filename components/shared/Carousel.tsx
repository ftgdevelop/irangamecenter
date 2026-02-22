import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  MutableRefObject,
} from "react";
import CaretLeft from "../icons/CaretLeft";
import CaretRight from "../icons/CaretRight";

type Props = {
  wrapperClassName?: string;
  items: { content: ReactNode; key: string | number }[];
  gap?: boolean;
  showDots?: boolean;
  showArrow?: boolean;
  dotsWrapperClassName?: string;
  peek?: number;
  infinite?: boolean;
  emblaApiRef?: MutableRefObject<EmblaCarouselType | null>;
  onSlideChange?: (index: number) => void;
  numberOfSlides?: number;
};

const Carousel: React.FC<Props> = ({
  wrapperClassName,
  items,
  showDots = true,
  dotsWrapperClassName,
  peek = 0,
  showArrow,
  infinite = false,
  emblaApiRef,
  onSlideChange,
  numberOfSlides,
  gap
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: infinite,
    direction: "rtl",
    dragFree: false,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: numberOfSlides
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onSlideChange?.(index);
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;

    if (emblaApiRef) {
      emblaApiRef.current = emblaApi;
    }

    setSnapPoints(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect, emblaApiRef]);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className={wrapperClassName}>
      <div className="relative overflow-hidden embla" ref={emblaRef}>
        <div className={`flex embla__container ${gap?"gap-3":""}`}>
          {items.map((item) => (
            <div
              key={item.key}
              className="embla__slide"
              style={{ flex: numberOfSlides ? `0 0 calc(${100/numberOfSlides}% - ${ gap? 10 : 0}px)` : `0 0 calc(100% - ${peek}%)` }}
            >
              {item.content}
            </div>
          ))}
        </div>

        {showArrow && (
          <>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center left-3 border-none outline-none bg-black/75 hover:bg-black/90"
              aria-label="بعدی"
            >
              <CaretLeft className="w-5 h-5 fill-white block" />
            </button>
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center right-3 border-none outline-none bg-black/75 hover:bg-black/90"
              aria-label="قبلی"
            >
              <CaretRight className="w-5 h-5 fill-white block" />
            </button>
          </>
        )}
      </div>


      {showDots && snapPoints.length>1 && (
        <div
          className={`flex justify-center gap-3 mt-3 ${
            dotsWrapperClassName || ""
          }`}
        >
          {snapPoints.map((_, i) => (
            <button
              aria-label="slider pagination button"
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-3 rounded-full transition-all ${
                selectedIndex === i
                  ? "w-7 bg-[#fe1940]"
                  : "w-3 bg-gray-400 hover:bg-gray-600 dark:bg-white dark:hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;