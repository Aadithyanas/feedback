"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FeedbackCard } from "./FeedbackCard";
import { DashboardStats } from "./DashboardStats";
import { FeedbackChart } from "./FeedbackChart";
import { Loader2, LayoutDashboard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function DashboardClient() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();

    const channel = supabase
      .channel("feedbacks_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedbacks" },
        (payload) => {
          setFeedbacks((current) => [payload.new, ...current]);
          toast.success("New feedback received!", {
            description: `A new feedback was submitted for ${payload.new.course_name}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to load feedbacks.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-6">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-amber-900/70 hover:text-amber-950 mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-amber-700" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-amber-950">Live Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-amber-900/70">Live Updates Active</span>
          </div>
        </div>

        <DashboardStats feedbacks={feedbacks} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-amber-950">Recent Feedbacks</h2>
            {feedbacks.length === 0 ? (
              <div className="text-center p-12 bg-white/50 rounded-xl border border-dashed border-amber-300">
                <p className="text-amber-900/70">No feedbacks collected yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedbacks.map((feedback, idx) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <FeedbackCard feedback={feedback} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FeedbackChart feedbacks={feedbacks} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
