"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { galleryImages } from "@/config/couple";

export default function MemoryGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = useState<string>("");

  const handleOpenLightbox = (src: string, caption: string) => {
    setSelectedImage(src);
    setSelectedCaption(caption);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="memories" className="relative w-full py-24 bg-[#050507] overflow-hidden px-6">
      {/* Background radial highlight */}
      <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-wine-dark/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-2 mb-16">
          <span className="text-rose tracking-[0.25em] text-[10px] md:text-xs uppercase font-medium">
            Captured chapters
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 mt-1">
            Little Moments, Big Memories
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-rose to-transparent mt-4" />
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => handleOpenLightbox(image.src, image.caption)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group break-inside-avoid shadow-lg border border-white/5"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden bg-zinc-900 rounded-3xl" style={{ aspectRatio: index % 3 === 0 ? "4/5" : index % 3 === 1 ? "1/1" : "3/2" }}>
                {/* Note: You can swap image paths in config/couple.ts and place files in public/memories/ */}
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />

                {/* Text and Zoom icon overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 pointer-events-none">
                  {/* Zoom indicator icon */}
                  <div className="self-end w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-zinc-100">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Caption */}
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[10px] tracking-widest uppercase text-rose-light font-medium">
                      View Memory
                    </span>
                    <p className="font-serif text-sm text-zinc-100 font-light leading-relaxed">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 cursor-pointer focus:outline-none transition-colors duration-300"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
              className="relative max-w-4xl max-h-[80vh] w-full aspect-[4/5] sm:aspect-auto sm:h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            >
              <div className="relative w-full h-full bg-zinc-950 flex-grow">
                <Image
                  src={selectedImage}
                  alt={selectedCaption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Lightbox Bottom Caption Bar */}
              <div className="w-full bg-[#060608]/90 backdrop-blur-md border-t border-white/5 py-4 px-6 text-center">
                <p className="font-serif text-base md:text-lg text-zinc-100 font-light italic leading-relaxed">
                  {selectedCaption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
