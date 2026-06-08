import { CheckCircle2 } from "lucide-react";

const curriculumModules = [
  {
    title: "Phase 1: Frontend Mastery with React",
    description: "We start by building a strong foundation in modern frontend development. You'll move past basic HTML/CSS and dive deep into React.js, learning component-driven architecture, state management with Hooks and Redux, and responsive styling using Tailwind CSS. By the end of this phase, you'll be building dynamic, interactive user interfaces that look professional and function flawlessly.",
  },
  {
    title: "Phase 2: Backend Architecture & APIs",
    description: "Next, we transition to the server-side with Node.js and Express.js. You'll learn how to design RESTful APIs, handle authentication and authorization (JWT), manage middleware, and process client requests securely. We focus on writing clean, scalable backend code that can handle real-world traffic.",
  },
  {
    title: "Phase 3: Database Design with MongoDB",
    description: "Data is the core of any application. In this module, you'll master MongoDB, learning how to design NoSQL database schemas, write efficient queries, and use Mongoose for object data modeling. We cover complex aggregations, indexing for performance, and data relationship management.",
  },
  {
    title: "Phase 4: AI Integration & Workflow",
    description: "What makes this course unique is our focus on AI. You won't just learn to code; you'll learn to code 10x faster. We dedicate entire sessions to mastering GitHub Copilot, leveraging ChatGPT and Claude for complex architectural planning, and using specialized AI debuggers. You'll learn the art of prompt engineering specifically for software development.",
  },
];

export function CurriculumSection() {
  return (
    <section className="w-full py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col gap-12">
        
        <div className="flex flex-col gap-4">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Course Curriculum</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Comprehensive Training for Real-World Demands
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Our 2-month intensive coaching program is meticulously designed to take you from basic concepts to building production-ready applications. We don't just teach syntax; we teach the underlying software engineering principles, system design, and the modern AI-assisted workflows that top tech companies expect from their developers today.
          </p>
        </div>

        <div className="flex flex-col gap-8 mt-8">
          {curriculumModules.map((mod, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="mt-1">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-gray-900">{mod.title}</h3>
                <p className="text-gray-600 leading-relaxed text-md">
                  {mod.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Beyond the Code</h3>
          <p className="text-gray-600 leading-relaxed">
            Technical skills alone aren't enough to stand out in today's job market. That's why our curriculum includes mandatory mock interviews, resume reviews, and portfolio building sessions. You will graduate not just with a certificate, but with a deployed, AI-integrated MERN stack application that proves your capabilities to employers.
          </p>
        </div>

      </div>
    </section>
  );
}
