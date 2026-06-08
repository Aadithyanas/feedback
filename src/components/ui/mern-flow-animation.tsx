"use client";

import { motion } from "framer-motion";
import { Database, Server, Layout, ArrowRightLeft } from "lucide-react";

export function MernFlowAnimation() {
  return (
    <section className="w-full py-20 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Full-Stack Data Flow</h2>
          <p className="text-gray-500 max-w-2xl text-lg">
            Understand how data moves seamlessly from the database to the user's screen in modern MERN applications.
          </p>
        </div>

        {/* Animation Container */}
        <div className="relative w-full max-w-4xl mx-auto bg-gray-50/50 border border-gray-100 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
          
          {/* Database Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-24 h-24 bg-white border-2 border-green-200 rounded-2xl shadow-xl flex items-center justify-center relative">
              <Database className="w-10 h-10 text-green-600" />
              <div className="absolute -inset-2 bg-green-500/20 rounded-2xl blur-xl -z-10" />
            </div>
            <h3 className="mt-4 font-bold text-gray-900">MongoDB</h3>
            <span className="text-xs text-gray-500 font-mono">NoSQL Database</span>
          </div>

          {/* Connection Line 1 */}
          <div className="hidden md:block relative h-px bg-gray-200 flex-1 mx-4">
            {/* Animated Data Packet (Backend to DB) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"
              animate={{ left: ["100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Animated Data Packet (DB to Backend) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </div>
          <ArrowRightLeft className="md:hidden text-gray-300 w-8 h-8" />

          {/* Backend Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-2xl shadow-xl flex items-center justify-center relative">
              <Server className="w-10 h-10 text-gray-700" />
              <div className="absolute -inset-2 bg-gray-500/20 rounded-2xl blur-xl -z-10" />
            </div>
            <h3 className="mt-4 font-bold text-gray-900">Node & Express</h3>
            <span className="text-xs text-gray-500 font-mono">API Server</span>
          </div>

          {/* Connection Line 2 */}
          <div className="hidden md:block relative h-px bg-gray-200 flex-1 mx-4">
            {/* Animated Data Packet (Frontend to Backend) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              animate={{ left: ["100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
            {/* Animated Data Packet (Backend to Frontend) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
          </div>
          <ArrowRightLeft className="md:hidden text-gray-300 w-8 h-8" />

          {/* Frontend Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-24 h-24 bg-white border-2 border-blue-200 rounded-2xl shadow-xl flex items-center justify-center relative">
              <Layout className="w-10 h-10 text-blue-500" />
              <div className="absolute -inset-2 bg-blue-500/20 rounded-2xl blur-xl -z-10" />
            </div>
            <h3 className="mt-4 font-bold text-gray-900">React.js</h3>
            <span className="text-xs text-gray-500 font-mono">Client Interface</span>
          </div>

        </div>
      </div>
    </section>
  );
}
