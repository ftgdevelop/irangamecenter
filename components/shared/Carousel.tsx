import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  MutableRefObject,
} from "react";

type Props = {
  wrapperClassName?: string;
  items: { content: ReactNode; key: string | number }[];
  showDots?: boolean;
  dotsWrapperClassName?: string;
  peek?: number;
  infinite?: boolean;
  emblaApiRef?: MutableRefObject<EmblaCarouselType | null>;
  onSlideChange?: (index: number) => void;
};

const Carousel: React.FC<Props> = ({
  wrapperClassName,
  items,
  showDots = true,
  dotsWrapperClassName,
  peek = 0,
  infinite = false,
  emblaApiRef,
  onSlideChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: infinite,
    direction: "rtl",
    dragFree: false,
    align: "start",
    containScroll: "trimSnaps",
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

  return (
    <div className={wrapperClassName}>
      <div className="overflow-hidden embla" ref={emblaRef}>
        <div className="flex embla__container">
          {items.map((item) => (
            <div
              key={item.key}
              className="embla__slide"
              style={{ flex: `0 0 calc(100% - ${peek}%)` }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {showDots && (
        <div
          className={`flex justify-center gap-2 mt-3 ${
            dotsWrapperClassName || ""
          }`}
        >
          {snapPoints.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-3 rounded-full transition-all ${
                selectedIndex === i
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