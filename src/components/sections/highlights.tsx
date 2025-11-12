import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { bestSellers } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import Balancer from "react-wrap-balancer";

export const Highlights = () => {
  return (
    <section id="highlights" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">
            Our Bestsellers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            <Balancer>
              Loved by many, these are the treats that keep our customers coming back for more.
            </Balancer>
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {bestSellers.map((item) => {
              const placeholder = PlaceHolderImages.find(p => p.id === item.imageId);
              return (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden h-full flex flex-col">
                      <CardHeader className="p-0">
                        <div className="relative h-64 w-full">
                          {placeholder && (
                            <Image
                              src={placeholder.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              data-ai-hint={placeholder.imageHint}
                            />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow p-6">
                        <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                        <p className="text-xl font-semibold text-primary mt-2">{item.price}</p>
                      </CardContent>
                      <CardFooter>
                         <Button asChild className="w-full">
                            <a href="#order">Tap to Order</a>
                         </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};
