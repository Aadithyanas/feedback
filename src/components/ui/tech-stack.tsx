import { Database, Server, Layout, Box } from "lucide-react";

const techStack = [
  {
    name: "MongoDB",
    role: "Database",
    icon: <Database className="w-8 h-8 text-green-600 mb-3" />,
    color: "border-green-200 bg-green-50/50",
  },
  {
    name: "Express.js",
    role: "Backend",
    icon: <Server className="w-8 h-8 text-gray-700 mb-3" />,
    color: "border-gray-200 bg-gray-50/50",
  },
  {
    name: "React.js",
    role: "Frontend",
    icon: <Layout className="w-8 h-8 text-blue-500 mb-3" />,
    color: "border-blue-200 bg-blue-50/50",
  },
  {
    name: "Node.js",
    role: "Runtime",
    icon: <Box className="w-8 h-8 text-green-700 mb-3" />,
    color: "border-green-200 bg-green-50/50",
  },
];

export function TechStack() {
  return (
    <section className="w-full py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {techStack.map((tech) => (
          <div 
            key={tech.name}
            className={`flex flex-col items-center justify-center p-6 border rounded-2xl transition-transform hover:-translate-y-1 ${tech.color}`}
          >
            {tech.icon}
            <h3 className="font-bold text-lg text-gray-900">{tech.name}</h3>
            <p className="text-sm text-gray-600">{tech.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
