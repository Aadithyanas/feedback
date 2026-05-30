import { formatDistanceToNow } from "date-fns";
import { Star, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function FeedbackCard({ feedback }: { feedback: any }) {
  const getFeelingColor = (feeling: string) => {
    switch (feeling) {
      case "Excellent": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Good": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Average": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Needs Improvement": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm border-amber-200/60">
      <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
        <div className="flex gap-3 items-center">
          <Avatar className="h-10 w-10 border border-amber-200">
            <AvatarFallback className="bg-amber-100 text-amber-900/70">
              {feedback.anonymous || !feedback.student_name ? (
                <User className="h-5 w-5" />
              ) : (
                getInitials(feedback.student_name)
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-base font-semibold text-black">
              {feedback.anonymous || !feedback.student_name ? "Anonymous Student" : feedback.student_name}
            </CardTitle>
            <span className="text-xs text-amber-900/60">
              {formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Badge variant="secondary" className={`${getFeelingColor(feedback.feeling)} border-0 font-medium`}>
          {feedback.feeling}
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-4">
        <div>
          <div className="text-sm font-medium text-black/60 mb-1">Course</div>
          <div className="font-medium text-black">{feedback.course_name}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-medium text-black/60 mb-1">Overall</div>
            <div className="flex items-center text-orange-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="font-bold text-black">{feedback.overall_rating}</span>
              <span className="text-black/40 ml-0.5">/5</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-black/60 mb-1">Teaching</div>
            <div className="flex items-center text-orange-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="font-bold text-black">{feedback.teaching_clarity}</span>
              <span className="text-black/40 ml-0.5">/5</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-black/60 mb-1">Communication</div>
            <div className="flex items-center text-orange-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="font-bold text-black">{feedback.communication}</span>
              <span className="text-black/40 ml-0.5">/5</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-black/60 mb-1">Knowledge</div>
            <div className="flex items-center text-orange-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="font-bold text-black">{feedback.subject_knowledge}</span>
              <span className="text-black/40 ml-0.5">/5</span>
            </div>
          </div>
        </div>

        {feedback.liked_most && (
          <div>
            <div className="text-sm font-medium text-black/60 mb-1">Liked Most</div>
            <p className="text-sm text-black italic bg-amber-50/50 p-3 rounded-lg">"{feedback.liked_most}"</p>
          </div>
        )}

        {feedback.improvements && (
          <div>
            <div className="text-sm font-medium text-black/60 mb-1">Suggested Improvements</div>
            <p className="text-sm text-black italic bg-amber-50/50 p-3 rounded-lg">"{feedback.improvements}"</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 border-t border-amber-100 mt-4 px-6 py-3 bg-amber-50/30 rounded-b-xl flex items-center justify-between">
        <span className="text-xs text-amber-900/60 font-medium">Recommendation</span>
        {feedback.recommend_teacher ? (
          <div className="flex items-center text-green-600 dark:text-green-500 text-sm font-medium">
            <ThumbsUp className="w-4 h-4 mr-1.5" />
            Yes
          </div>
        ) : (
          <div className="flex items-center text-red-600 dark:text-red-500 text-sm font-medium">
            <ThumbsDown className="w-4 h-4 mr-1.5" />
            No
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
