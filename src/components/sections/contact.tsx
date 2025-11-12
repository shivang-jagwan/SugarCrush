"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
  { icon: Phone, href: "tel:+910000000000", name: "Phone" },
  { icon: Mail, href: "mailto:hello@sugarcrush.com", name: "Email" },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-foreground">
            Let’s Bake Happiness Together 💕
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            <Balancer>
              Have a question, or ready to order? We'd love to hear from you.
            </Balancer>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
               <div className="relative w-full h-96 lg:h-full">
                {/* 
                  NOTE: Google Maps integration requires an API key. 
                  This is a static image placeholder. To enable the interactive map, 
                  you would replace this with the @vis.gl/react-google-maps component 
                  and provide an API key in a .env.local file.
                  Example: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"
                */}
                <Image
                  src="https://picsum.photos/seed/map/1200/800"
                  alt="Map showing bakery location in Dehradun"
                  fill
                  className="object-cover"
                  data-ai-hint="city map"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                  <div className="bg-glass text-card-foreground p-6 rounded-lg text-center">
                     <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                     <h3 className="font-bold text-xl">Find Us In Dehradun</h3>
                     <p className="text-sm">Visit us for a sweet treat!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4 text-center lg:text-left">
                <p className="text-lg flex items-center justify-center lg:justify-start gap-3"><Phone className="text-primary"/> <span>+91 123 456 7890</span></p>
                <p className="text-lg flex items-center justify-center lg:justify-start gap-3"><Mail className="text-primary"/> <span>hello@sugarcrushbakers.com</span></p>
                <p className="text-lg flex items-center justify-center lg:justify-start gap-3"><MapPin className="text-primary"/> <span>Dehradun, Uttarakhand, India</span></p>
            </div>
            <div className="flex justify-center lg:justify-start gap-4">
                {socialLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-full bg-card">
                            <link.icon className="h-6 w-6" />
                        </Button>
                    </motion.a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
