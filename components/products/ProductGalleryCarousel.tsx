"use client";

import { useRef } from "react";
import SlickSlider from "react-slick";
import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import ProductGalleryItem from "./ProductGalleryItem";
import ProductGalleryThumbnail from "./ProductGalleryThumbnail";

interface Props {
  galleries?: ProductGalleryItemType[];
}

const ProductGalleryCarousel: React.FC<Props> = ({ galleries = [] }) => {
  const playersRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const dotsRef = useRef<HTMLUListElement | null>(null); 

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
        arrows={false}
        customPaging={(i) => (
          <div>
            <ProductGalleryThumbnail item={galleries[i]} />
          </div>
        )}
        dots={true}
        dotsClass="!flex overflow-x-scroll scrollbar-hide gap-2
[&>li:not(.slick-active)]:opacity-50
[&>li.slick-active]:border [&>li.slick-active]:border-white [&>li.slick-active]:rounded-md"
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        rtl
        autoplay
        autoplaySpeed={4000}
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
        appendDots={(dots) => (
          <ul
            ref={dotsRef}
            className="!flex overflow-x-scroll scrollbar-hide gap-2"
          >
            {dots}
          </ul>
        )}
      >
        {galleries.map((item) => (
          <div key={item.id} className="relative h-64">
            <ProductGalleryItem item={item} playersRef={playersRef} />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ProductGalleryCarousel;
