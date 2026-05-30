"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeedbackChart({ feedbacks }: { feedbacks: any[] }) {
  const data = useMemo(() => {
    const courses: Record<string, { total: number; count: number }> = {};

    feedbacks.forEach((f) => {
      const course = f.course_name.length > 20 ? f.course_name.substring(0, 20) + "..." : f.course_name;
      if (!courses[course]) {
        courses[course] = { total: 0, count: 0 };
      }
      courses[course].total += f.overall_rating;
      courses[course].count += 1;
    });

    return Object.entries(courses).map(([name, stats]) => ({
      name,
      average: Number((stats.total / stats.count).toFixed(2)),
    }));
  }, [feedbacks]);

  if (feedbacks.length === 0) {
    return (
      <Card className="h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60">
        <CardHeader>
          <CardTitle>Average Ratings by Course</CardTitle>
          <CardDescription>Not enough data to display chart.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 border-amber-200/60 shadow-md bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-amber-950">Average Ratings by Course</CardTitle>
        <CardDescription className="text-amber-900/60">
          Comparing overall ratings across different courses.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="average" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
