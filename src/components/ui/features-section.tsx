import { GraduationCap, BrainCircuit, Sparkles, Rocket, Zap, ShieldCheck, TrendingUp, CheckCircle } from "lucide-react";

const mainFeatures = [
  {
    title: "Learn MERN Stack Step by Step",
    description: "From basics to building full-stack applications.",
    icon: <GraduationCap className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Use AI Tools to Supercharge Development",
    description: "Write better code, fix bugs, generate ideas, and save time.",
    icon: <BrainCircuit className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Discover More AI Tools",
    description: "Explore trending & useful AI tools to boost your productivity.",
    icon: <Sparkles className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Make Perfect Applications",
    description: "Build responsive, secure, and production-ready web apps.",
    icon: <Rocket className="w-6 h-6 text-green-600" />,
  },
];

const bottomBenefits = [
  {
    title: "LEARN SMARTER",
    description: "Concepts that stick for a lifetime.",
    icon: <GraduationCap className="w-8 h-8 text-gray-800" />,
  },
  {
    title: "BUILD FASTER",
    description: "Modern skills for real-world projects.",
    icon: <Zap className="w-8 h-8 text-red-500" />,
  },
  {
    title: "DEPLOY CONFIDENTLY",
    description: "Build secure & scalable production-ready applications.",
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
  },
  {
    title: "GROW LIMITLESS",
    description: "Future-ready skills for endless opportunities.",
    icon: <TrendingUp className="w-8 h-8 text-red-500" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-20 flex flex-col gap-24">
      {/* How We Make Magic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="inline-flex flex-col">
            <span className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">From Learning To</span>
            <h2 className="text-5xl font-black text-green-700 leading-tight">BUILDING <br/><span className="text-red-600">MAGIC!</span></h2>
          </div>
          
          <div className="inline-flex px-4 py-2 bg-green-50 border border-green-200 text-green-800 rounded-full font-medium text-sm w-fit mt-2">
            Learn. Discover. Build. Deploy.
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Learn <strong className="text-green-700">MERN Stack</strong> from Basic to Industry Level and combine the power of <strong className="text-red-600">AI tools</strong> to build smart, modern, and high-quality web applications.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-red-600 text-white font-bold text-lg px-6 py-3 rounded-t-2xl w-fit">
            HOW WE MAKE MAGIC
          </div>
          <div className="flex flex-col gap-6 p-8 border border-gray-100 rounded-b-2xl rounded-tr-2xl bg-white shadow-xl shadow-red-500/5">
            {mainFeatures.map((feature, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-gray-900 text-lg">{feature.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">
        {bottomBenefits.map((benefit, i) => (
          <div key={i} className="flex gap-4 items-start p-6 border border-gray-100 bg-gray-50/50 rounded-2xl">
            <div className="mt-1">
              {benefit.icon}
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 text-sm">{benefit.title}</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final Callout */}
      <div className="flex items-center justify-center pt-8 border-t border-gray-100 max-w-4xl mx-auto w-full">
        <p className="text-xl font-medium text-gray-600 flex items-center gap-2">
          <span className="text-red-500 text-2xl">♡</span> SMALL INVESTMENT TODAY, <strong className="text-gray-900">BIG FUTURE</strong> TOMORROW!
        </p>
      </div>
    </section>
  );
}
