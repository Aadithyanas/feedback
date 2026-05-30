import { Users, Star, GraduationCap, MessageCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats({ feedbacks }: { feedbacks: any[] }) {
  const totalFeedback = feedbacks.length;
  
  const averageOverall = totalFeedback 
    ? (feedbacks.reduce((acc, curr) => acc + curr.overall_rating, 0) / totalFeedback).toFixed(1)
    : "0.0";
    
  const averageTeaching = totalFeedback 
    ? (feedbacks.reduce((acc, curr) => acc + curr.teaching_clarity, 0) / totalFeedback).toFixed(1)
    : "0.0";

  const recommendationCount = feedbacks.filter((f) => f.recommend_teacher).length;
  const recommendationPercentage = totalFeedback 
    ? Math.round((recommendationCount / totalFeedback) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-white/80 backdrop-blur-sm border-amber-200/60 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-amber-900/70">Total Feedback</CardTitle>
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-950">{totalFeedback}</div>
          <p className="text-xs text-amber-900/60 mt-1">
            Responses collected
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-amber-200/60 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-amber-900/70">Average Rating</CardTitle>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Star className="w-4 h-4 text-orange-500 fill-current" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-950">{averageOverall}</div>
          <p className="text-xs text-amber-900/60 mt-1">
            Out of 5.0
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-amber-200/60 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-amber-900/70">Teaching Clarity</CardTitle>
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-rose-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-950">{averageTeaching}</div>
          <p className="text-xs text-amber-900/60 mt-1">
            Out of 5.0
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-amber-200/60 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-amber-900/70">Recommendation</CardTitle>
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-950">{recommendationPercentage}%</div>
          <p className="text-xs text-amber-900/60 mt-1">
            Would recommend
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
