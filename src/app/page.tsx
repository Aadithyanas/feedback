import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, MessageSquareHeart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#fdfbf7] to-amber-50/50 p-4">
      <div className="max-w-3xl text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-xl shadow-amber-500/10 mb-4 ring-1 ring-amber-100">
          <MessageSquareHeart className="w-8 h-8 text-amber-600" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-amber-950">
          Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">Feedback</span> Portal
        </h1>
        
        <p className="text-xl text-amber-900/70 max-w-2xl mx-auto leading-relaxed">
          Help us improve our teaching experience. Your honest feedback shapes the future of our courses and helps educators grow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/feedback">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
              Give Feedback
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-amber-200 bg-white/50 backdrop-blur-sm hover:bg-amber-50 transition-all text-amber-900 hover:text-amber-950">
              <BarChart2 className="mr-2 w-5 h-5 text-amber-600" />
              View Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
