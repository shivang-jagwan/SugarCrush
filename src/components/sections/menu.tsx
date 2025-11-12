"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Balancer from "react-wrap-balancer";

const MenuItemCard = ({ item }: { item: typeof menuItems[0] }) => {
  const placeholder = PlaceHolderImages.find(p => p.id === item.imageId);
  
  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
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
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-headline text-2xl font-bold text-foreground">{item.name}</h3>
        <div className="mt-2 flex gap-2">
          {item.badges.map((badge) => (
            <Badge key={badge} variant="secondary">{badge}</Badge>
          ))}
        </div>
        <div className="absolute bottom-6 right-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button asChild>
              <a href="#order">Order Now</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


export const Menu = () => {
  return (
    <section id="menu" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">
            Our Sweet Offerings
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            <Balancer>
              From classic cakes to delightful new treats, everything is 100% eggless and baked fresh just for you.
            </Balancer>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
