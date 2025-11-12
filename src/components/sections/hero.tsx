"use client";

import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Sprinkle = () => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const duration = Math.random() * 5 + 5; // 5 to 10 seconds
    const delay = Math.random() * 5;
    const size = Math.random() * 6 + 4; // 4px to 10px
    const rotation = Math.random() * 360;

    setStyle({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
      animation: `fall ${duration}s linear ${delay}s infinite`,
      backgroundColor: `hsl(345, 100%, ${Math.random() * 20 + 70}%)`
    });
  }, []);

  return <div className="absolute rounded-full" style={style}></div>;
};

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background/50 -z-10">
        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
        {Array.from({ length: 50 }).map((_, i) => (
          <Sprinkle key={i} />
        ))}
      </div>
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
          variants={itemVariants}
        >
          <Balancer>Fresh, Eggless, Homemade Goodness 🍰</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
          variants={itemVariants}
        >
          <Balancer>
            Delicious cakes, cupcakes, and more — baked with love at SugarCrushBakers.
          </Balancer>
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="text-lg py-7 px-8">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Menu
            </motion.a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg py-7 px-8 bg-card">
            <motion.a
              href="https://wa.me/910000000000" // Replace with actual number
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Order on WhatsApp
            </motion.a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
