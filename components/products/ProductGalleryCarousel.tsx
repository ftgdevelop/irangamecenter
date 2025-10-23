'use client';

import { useRef, useEffect, useState } from 'react';
import SlickSlider from 'react-slick';
import type { ProductGalleryItem as ProductGalleryItemType } from '@/types/commerce';
import ProductGalleryItem from './ProductGalleryItem';

interface Props {
  galleries?: ProductGalleryItemType[];
}

const DEFAULT_IMAGE_DURATION = 2000;

const ProductGalleryCarousel: React.FC<Props> = ({ galleries = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullScreen] = useState(false);
  const playersRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const sliderRef = useRef<SlickSlider | null>(null);

  useEffect(() => {
    if (galleries.length === 0 || isFullscreen) return;

    const currentItem = galleries[currentSlide];
    if (!currentItem) return;

    let duration = DEFAULT_IMAGE_DURATION;

    if (currentItem.mediaType === 'Video') {
      const video = playersRef.current.get(String(currentItem.id));
      if (video) {
        if (isNaN(video.duration) || video.duration === 0) {
          const handleLoaded = () => {
            const dur = video.duration * 1000;
            setTimeout(() => sliderRef.current?.slickNext(), dur);
            video.removeEventListener('loadedmetadata', handleLoaded);
          };
          video.addEventListener('loadedmetadata', handleLoaded);
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
  }, [currentSlide, galleries, isFullscreen]);

  useEffect(() => {
    const playerMap = playersRef.current;
    if (!playerMap || playerMap.size === 0) return;

    const handleEnded = () => sliderRef.current?.slickNext();

    playerMap.forEach((video) => {
      if (video) video.addEventListener('ended', handleEnded);
    });

    return () => {
      playerMap.forEach((video) => {
        if (video) video.removeEventListener('ended', handleEnded);
      });
    };
  }, [galleries, currentSlide]);

useEffect(() => {
  const container = document.getElementById('gallery-fullscreen-container');
  if (!container) return;

  interface FullscreenElement extends HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }

  const el = container as FullscreenElement;

  if (isFullscreen) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(); // Safari
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen(); // IE/Edge legacy
    }
  } else {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}, [isFullscreen]);

  // Sync fullscreen state if user presses ESC
  useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  if (galleries.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center text-gray-500 py-8">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  const sliderSettings = {
    dots: false,
    arrows: false,
    slide: '.slick-slideshow__slide',
    slidesToShow: 1,
    centerMode: !isFullscreen,
    centerPadding: isFullscreen ? '0px' : '50px',
    afterChange: (current: number) => setCurrentSlide(current),
    initialSlide: currentSlide,
    rtl: true,
    responsive: [
      {
        breakpoint: 470,
        settings: {
          centerPadding: isFullscreen ? '0px' : '20px',
        },
      },
      {
        breakpoint: 430,
        settings: {
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <div
      id="gallery-fullscreen-container"
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center'
          : ''
      }`}
    >
      {isFullscreen && (
        <button
          onClick={() => setIsFullScreen(false)}
          className="absolute top-4 right-4 z-50 text-white text-3xl"
        >
          ✕
        </button>
      )}

      <div
        className={`${
          isFullscreen
            ? 'relative w-screen h-svh px-2'
            : 'w-full h-[184px] px-1'
        }`}
        ref={(el) => {
          if (el) {
            const slickList = el.querySelector<HTMLElement>('.slick-list');
            if (slickList && !isFullscreen) {
              slickList.style.paddingLeft = '0px';
            }
          }
        }}
      >
        <SlickSlider
          className="[&_.slick-slider>div]:w-full"
          ref={sliderRef}
          {...sliderSettings}
        >
          {galleries.map((item, index) => (
            <div
              key={item.id}
              className={`relative ${
                isFullscreen ? 'h-svh py-10 w-screen' : 'w-full h-[184px] px-1'
              }`}
            >
              <ProductGalleryItem
                item={item}
                playersRef={playersRef}
                isActive={index === currentSlide}
                onClick={() => {
                  if (index === currentSlide) {
                    setCurrentSlide(index);
                    setIsFullScreen((prev) => !prev);
                  }
                }}
                isFullscreen={isFullscreen}
              />
            </div>
          ))}
        </SlickSlider>
      </div>
    </div>
  );
};

export default ProductGalleryCarousel;
