"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { testimonials } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Quote, Star } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
        )}
      />
    ))}
  </div>
);

export const Reviews = () => {
  return (
    <section id="reviews" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">
            Sweet Words from Our Customers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            <Balancer>
              We're blushing! Here's what people are saying about their SugarCrushBakers experience.
            </Balancer>
          </p>
        </div>
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          opts={{ align: "start", loop: true }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const placeholder = PlaceHolderImages.find(p => p.id === testimonial.imageId);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="h-full">
                      <CardContent className="flex flex-col items-center text-center justify-center p-8 h-full">
                        <Quote className="h-10 w-10 text-primary mb-4" />
                        <p className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</p>
                        <div className="mt-6 flex flex-col items-center">
                          {placeholder && (
                            <Image
                              src={placeholder.imageUrl}
                              alt={testimonial.name}
                              width={64}
                              height={64}
                              className="rounded-full mb-4"
                              data-ai-hint={placeholder.imageHint}
                            />
                          )}
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <StarRating rating={testimonial.rating} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
