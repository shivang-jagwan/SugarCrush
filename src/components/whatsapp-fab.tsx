"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppFAB = () => {
  return (
    <motion.a
      href="https://wa.me/910000000000" // Replace with actual WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <MessageCircle className="h-8 w-8" />
    </motion.a>
  );
};
