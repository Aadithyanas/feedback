"use client";

import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-[500px] flex-col items-center justify-center px-4 py-16 text-center"
    >
      <motion.div variants={itemVariants} className="mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-gray-600">
          <GraduationCap className="h-4 w-4" />
          2 Month Coaching
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mb-6 text-5xl font-bold tracking-tight md:text-7xl text-black"
      >
        AI + MERN STACK
        <br />
        <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          DEVELOPMENT
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-8 max-w-2xl text-lg text-gray-600"
      >
        Learn MERN Stack from Basic to Industry Level and combine the power of AI tools to build smart, modern, and high-quality web applications.
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-4">
        <Link href="/coaching">
          <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl">
            Start Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/feedback">
          <Button size="lg" variant="outline" className="rounded-xl border-gray-300">
            Create Magic
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 flex items-center gap-8 text-sm text-gray-500"
      >
        <div>
          <div className="text-2xl font-bold text-gray-900">
            ₹2,000
          </div>
          <div>Fee Only</div>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <div className="text-2xl font-bold text-gray-900">1 Hour</div>
          <div>Daily Class</div>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <div className="text-2xl font-bold text-gray-900">
            Daily
          </div>
          <div>Assignments</div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-16 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
          alt="Students collaborating"
          width={1200}
          height={600}
          className="w-full h-auto object-cover max-h-[500px]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
