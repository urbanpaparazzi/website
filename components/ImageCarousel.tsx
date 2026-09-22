"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "@sanity/icons/ChevronLeft";
import { ChevronRightIcon } from "@sanity/icons/ChevronRight";

interface GalleryImage {
  _key?: string;
  asset?: { _ref: string; _type: string };
  url?: string;
}

interface ImageCarouselProps {
  images: GalleryImage[];
  title: string;
  autoSwipeInterval?: number;
}

export default function ImageCarousel({
  images,
  title,
  autoSwipeInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % images.length);
    }, autoSwipeInterval);

    return () => clearInterval(interval);
  }, [autoSwipeInterval, images.length, isAutoPlay]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timeout = setTimeout(() => setIsAutoPlay(true), 8000);
    return () => clearTimeout(timeout);
  }, [currentIndex, images.length]);

  if (images.length === 0) return null;

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative mt-6 aspect-4/3 w-full overflow-hidden rounded-lg bg-black sm:aspect-video">
      {currentImage.url && (
        <Image
          key={currentImage._key || currentIndex}
          src={currentImage.url}
          alt={`${title} - Image ${currentIndex + 1} of ${images.length}`}
          fill
          priority={currentIndex === 0}
          sizes="(max-width: 640px) 100vw, 768px"
          className="object-contain"
        />
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white sm:left-4"
            aria-label="Previous image"
          >
            <ChevronLeftIcon width={24} height={24} />
          </button>
          <button
            type="button"
            onClick={() => goTo((currentIndex + 1) % images.length)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white sm:right-4"
            aria-label="Next image"
          >
            <ChevronRightIcon width={24} height={24} />
          </button>
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white sm:bottom-4 sm:right-4">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}