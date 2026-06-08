"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, CalendarCheck, Zap } from "lucide-react";

const serviceLabels: Record<string, string> = {
  interview_training: "Interview Training",
  resume_reviews: "Resume Reviews",
  portfolio_reviews: "Portfolio Reviews",
  career_guidance: "Career Guidance",
  mern_stack_coaching: "MERN Stack Coaching",
  ai_ml_coaching: "AI / ML Coaching",
  nextjs_coaching: "Next.js Coaching",
  python_coaching: "Python Coaching",
  java_spring_coaching: "Java / Spring Coaching",
  devops_coaching: "DevOps Coaching",
};

interface RegistrationStatsProps {
  registrations: any[];
}

export function RegistrationStats({ registrations }: RegistrationStatsProps) {
  const total = registrations.length;

  // Most popular service
  const serviceCounts: Record<string, number> = {};
  registrations.forEach((r) => {
    r.registration_for?.forEach((s: string) => {
      serviceCounts[s] = (serviceCounts[s] || 0) + 1;
    });
  });
  const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0];

  // Total unique services selected
  const totalSelections = Object.values(serviceCounts).reduce((a, b) => a + b, 0);

  // Today's registrations
  const today = new Date().toDateString();
  const todayCount = registrations.filter(
    (r) => new Date(r.created_at).toDateString() === today
  ).length;

  const stats = [
    {
      label: "Total Registrations",
      value: total,
      icon: Users,
      bg: "from-amber-50 to-orange-50",
    },
    {
      label: "Most Popular",
      value: topService ? serviceLabels[topService[0]] || topService[0] : "N/A",
      subtext: topService ? `${topService[1]} registrations` : "",
      icon: TrendingUp,
      bg: "from-orange-50 to-red-50",
    },
    {
      label: "Total Selections",
      value: totalSelections,
      subtext: "across all registrations",
      icon: Zap,
      bg: "from-yellow-50 to-amber-50",
    },
    {
      label: "Today",
      value: todayCount,
      subtext: "new registrations",
      icon: CalendarCheck,
      bg: "from-emerald-50 to-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-amber-100/60 bg-white/90 backdrop-blur-sm overflow-hidden"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div
                className={`p-2.5 bg-gradient-to-br ${stat.bg} rounded-xl`}
              >
                <stat.icon
                  className="w-5 h-5 text-amber-600"
                />
              </div>
            </div>
            <p className="text-xs font-medium text-amber-800/50 uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-amber-950 truncate">
              {stat.value}
            </p>
            {stat.subtext && (
              <p className="text-xs text-amber-800/40 mt-0.5">{stat.subtext}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
