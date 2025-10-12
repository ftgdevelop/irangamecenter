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
        customPaging={(i) => {
          return (
            <div>
              <ProductGalleryThumbnail item={galleries[i]} />
            </div>
          );
        }}
        dots={true}
        dotsClass="overflow-x-scroll overflow-y-hidden !flex h-full gap-2 
[&_.slick-active]:border [&_.slick-active]:border-white [&_.slick-active]:rounded-md"
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        rtl
      >
        {galleries.map((item) => {
          return (
            <div key={item.id} className="relative h-64">
              <ProductGalleryItem item={item} playersRef={playersRef} />
            </div>
          );
        })}
      </SlickSlider>
    </div>
  );
};

export default ProductGalleryCarousel;
