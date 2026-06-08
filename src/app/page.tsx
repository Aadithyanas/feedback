import { HeroSection } from "@/components/ui/hero-section-shadcnui";
import { TechStack } from "@/components/ui/tech-stack";
import { MernFlowAnimation } from "@/components/ui/mern-flow-animation";
import { AiToolsSection } from "@/components/ui/ai-tools-section";
import { CurriculumSection } from "@/components/ui/curriculum-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden text-black pt-32 flex flex-col justify-between">
      {/* Layered Gradient Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#60B1FF] opacity-30 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-[#319AFF] opacity-20 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full flex flex-col gap-12">
        
        {/* Framer Motion Hero Section */}
        <HeroSection />

        {/* Tech Stack Banner */}
        <TechStack />

        {/* Detailed Curriculum Text Content */}
        <CurriculumSection />

        {/* Animated MERN Data Flow */}
        <MernFlowAnimation />

        {/* AI Tools Section */}
        <AiToolsSection />

        {/* How We Make Magic Section */}
        <FeaturesSection />

      </div>

      {/* Standard Footer */}
      <Footer />
    </main>
  );
}
