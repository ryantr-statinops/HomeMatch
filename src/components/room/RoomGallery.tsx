"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { RoomImage } from "@/types/room";
import { ChevronLeft, ChevronRight, ImageOff, Maximize2 } from "lucide-react";
import ImageViewer from "@/components/room/ImageViewer";

type RoomGalleryProps = {
  images: RoomImage[];
};

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[1/1] items-center justify-center rounded-xl bg-gray-100">
        <ImageOff size={48} className="text-accent-light/50" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl">
      {/* Main Carousel */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative min-w-0 shrink-0 grow-0 basis-full cursor-pointer"
                onClick={() => {
                  setViewerIndex(images.indexOf(img));
                  setViewerOpen(true);
                }}
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={img.url}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-left-top"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add(
                          "flex",
                          "items-center",
                          "justify-center",
                        );
                        const fallback = document.createElement("div");
                        fallback.className = "text-accent-light/50";
                        fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><circle cx="10" cy="8" r="2"/><path d="m2 14 4.5-4.5 3 3L16 6l6 6"/></svg>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-accent" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-accent" />
            </button>
          </>
        )}

        {/* Expand button */}
        <button
          onClick={() => {
            setViewerIndex(selectedIndex);
            setViewerOpen(true);
          }}
          className="absolute bottom-3 right-3 rounded-full bg-black/50 p-1.5 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/70 active:scale-90"
          aria-label="View fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 py-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 px-1 pb-1">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => scrollTo(index)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedIndex
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <img
                src={img.url}
                alt=""
                referrerPolicy="no-referrer"
                className="h-16 w-16 object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            </button>
          ))}
        </div>
      )}

      <ImageViewer
        images={images}
        initialIndex={viewerIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
}
