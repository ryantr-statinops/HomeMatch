"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog } from "@base-ui/react/dialog";
import type { RoomImage } from "@/types/room";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ImageViewerProps = {
  images: RoomImage[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
};

export default function ImageViewer({
  images,
  initialIndex,
  open,
  onClose,
}: ImageViewerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: initialIndex });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose(); }} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 data-open:fade-in data-closed:fade-out" />
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center data-open:fade-in data-closed:fade-out">
          {/* Close button */}
          <Dialog.Close className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70">
            <X size={24} />
          </Dialog.Close>

          {/* Counter */}
          <div className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Carousel */}
          <div className="w-full max-w-5xl px-4">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative min-w-0 shrink-0 grow-0 basis-full"
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={img.url}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
