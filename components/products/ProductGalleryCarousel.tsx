"use client";

import { useRef, useEffect, useState } from "react";
import SlickSlider from "react-slick";
import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import ProductGalleryItem from "./ProductGalleryItem";
import ProductGalleryThumbnail from "./ProductGalleryThumbnail";

interface Props {
  galleries?: ProductGalleryItemType[];
}

const DEFAULT_IMAGE_DURATION = 2000;

const ProductGalleryCarousel: React.FC<Props> = ({ galleries = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const playersRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const dotsRef = useRef<HTMLUListElement | null>(null);
  const sliderRef = useRef<SlickSlider | null>(null);

  // scroll initial dot
  useEffect(() => {
    const dotsContainer = dotsRef.current;
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll<HTMLLIElement>("li");
    const firstDot = dots[0];
    if (firstDot) {
      firstDot.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  // slide autoplay based on media duration
  useEffect(() => {
    if (galleries.length === 0) return;

    const currentItem = galleries[currentSlide];
    if (!currentItem) return;

    let duration = DEFAULT_IMAGE_DURATION;

    if (currentItem.mediaType === "Video") {
      const video = playersRef.current.get(String(currentItem.id));
      if (video) {
        if (isNaN(video.duration) || video.duration === 0) {
          const handleLoaded = () => {
            const dur = video.duration * 1000;
            setTimeout(() => sliderRef.current?.slickNext(), dur);
            video.removeEventListener("loadedmetadata", handleLoaded);
          };
          video.addEventListener("loadedmetadata", handleLoaded);
          return;
        } else {
          duration = video.duration * 1000;
        }
      }
    }

    const timeoutId = setTimeout(() => {
      sliderRef.current?.slickNext();
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [currentSlide, galleries]);

  if (galleries.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center text-gray-500 py-8">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <SlickSlider
        ref={sliderRef}
        arrows={false}
        customPaging={(i) => (
          <div>
            <ProductGalleryThumbnail item={galleries[i]} />
          </div>
        )}
        dots
        dotsClass="!flex overflow-x-scroll scrollbar-hide gap-4 [&>li:not(.slick-active)]:opacity-50 [&>li.slick-active]:border [&>li.slick-active]:border-white [&>li.slick-active]:rounded-md"
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        rtl
        beforeChange={(_, next) => {
          const dotsContainer = dotsRef.current;
          if (!dotsContainer) return;
          const dots = dotsContainer.querySelectorAll<HTMLLIElement>("li");
          const activeDot = dots[next];
          if (activeDot) {
            activeDot.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          }
        }}
        afterChange={(current) => setCurrentSlide(current)}
        appendDots={(dots) => (
          <ul
            ref={dotsRef}
            className="!flex overflow-x-scroll scrollbar-hide gap-2"
          >
            {dots}
          </ul>
        )}
      >
        {galleries.map((item, index) => (
          <div key={item.id} className="relative h-64">
            <ProductGalleryItem
              item={item}
              playersRef={playersRef}
              isActive={index === currentSlide}
            />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ProductGalleryCarousel;
