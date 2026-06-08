"use client";

import { RegistrationForm } from "@/components/RegistrationForm";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12"
      >
        <RegistrationForm />
      </motion.div>
    </div>
  );
}
