"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Balancer from "react-wrap-balancer";

const GalleryImage = ({ imageId, alt, imageHint }: { imageId: string, alt: string, imageHint: string }) => {
  const placeholder = PlaceHolderImages.find(p => p.id === imageId);

  if (!placeholder) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
          layoutId={`card-container-${imageId}`}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="aspect-[3/4]">
            <Image
              src={placeholder.imageUrl}
              alt={alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={imageHint}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
        <div className="relative aspect-video w-full">
            <Image
              src={placeholder.imageUrl}
              alt={alt}
              fill
              className="object-contain"
            />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Gallery = () => {
  return (
    <section id="gallery" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">
            A Feast for the Eyes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            <Balancer>
              Take a peek at some of our favorite creations. Each one tells a story of celebration and sweetness.
            </Balancer>
          </p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, i) => {
            const placeholder = PlaceHolderImages.find(p => p.id === image.imageId);
            if (!placeholder) return null;
            return (
                <GalleryImage 
                    key={i} 
                    imageId={image.imageId} 
                    alt={image.alt}
                    imageHint={placeholder.imageHint}
                />
            );
          })}
        </div>
      </div>
    </section>
  );
};
