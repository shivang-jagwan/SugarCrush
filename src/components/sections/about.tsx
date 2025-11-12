import Image from "next/image";
import { Heart } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const bakerImage = PlaceHolderImages.find(p => p.id === "baker-photo");

export const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="flex justify-center">
            {bakerImage && (
              <div className="relative w-80 h-96 rounded-lg shadow-2xl rotate-3 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                <Image
                  src={bakerImage.imageUrl}
                  alt={bakerImage.description}
                  fill
                  className="object-cover rounded-lg"
                  data-ai-hint={bakerImage.imageHint}
                />
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground">
              Made with ❤️ in Dehradun
            </h2>
            <div className="flex justify-center md:justify-start items-center gap-4 my-6">
              <div className="h-px w-20 bg-primary"></div>
              <Heart className="h-6 w-6 text-primary" />
              <div className="h-px w-20 bg-primary"></div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What started as a home passion turned into a city favorite for eggless cakes! Every creation from SugarCrushBakers is a piece of art, baked from scratch with the finest ingredients and a whole lot of love. We believe in making your special moments a little sweeter, one cake at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
