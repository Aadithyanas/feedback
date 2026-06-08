"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, Terminal, Code2, BrainCircuit } from "lucide-react";

const aiTools = [
  {
    name: "ChatGPT / Claude",
    description: "Code generation and architectural planning.",
    icon: <Bot className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200",
    delay: 0,
  },
  {
    name: "GitHub Copilot",
    description: "Real-time AI pair programming inside your IDE.",
    icon: <Code2 className="w-8 h-8 text-gray-800" />,
    color: "bg-gray-100 border-gray-300",
    delay: 0.1,
  },
  {
    name: "v0 / Cursor",
    description: "UI generation and deep codebase understanding.",
    icon: <Terminal className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200",
    delay: 0.2,
  },
  {
    name: "AI Debuggers",
    description: "Automated bug finding and log analysis.",
    icon: <BrainCircuit className="w-8 h-8 text-rose-600" />,
    color: "bg-rose-50 border-rose-200",
    delay: 0.3,
  },
];

export function AiToolsSection() {
  return (
    <section className="w-full py-16 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" /> AI Integration
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Explore the Future of Coding</h2>
          <p className="text-gray-500 max-w-2xl text-lg mx-auto">
            Learn to use industry-standard AI tools to write cleaner code, fix bugs faster, and ship production-ready applications in record time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: tool.delay, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`p-6 rounded-3xl border shadow-sm flex flex-col gap-4 cursor-default ${tool.color}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white border shadow-sm flex items-center justify-center">
                {tool.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
