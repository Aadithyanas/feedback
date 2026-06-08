"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Building2,
} from "lucide-react";
import { format } from "date-fns";

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

const experienceColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-blue-100 text-blue-800 border-blue-200",
  advanced: "bg-purple-100 text-purple-800 border-purple-200",
};

interface RegistrationCardProps {
  registration: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    institution_name: string;
    institution_type: string;
    registration_for: string[];
    experience_level: string;
    additional_notes: string | null;
    created_at: string;
  };
}

export function RegistrationCard({ registration }: RegistrationCardProps) {
  return (
    <Card className="border-amber-100/80 bg-white/90 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <CardTitle className="text-base text-amber-950">
                {registration.full_name}
              </CardTitle>
              <div className="flex items-center gap-1 text-xs text-amber-800/50 mt-0.5">
                <Calendar className="w-3 h-3" />
                {format(new Date(registration.created_at), "MMM d, yyyy · h:mm a")}
              </div>
            </div>
          </div>
          <Badge
            className={`text-xs font-medium border ${
              experienceColors[registration.experience_level] || "bg-gray-100 text-gray-800"
            }`}
          >
            {registration.experience_level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 text-amber-800/70">
            <Mail className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate">{registration.email}</span>
          </div>
          <div className="flex items-center gap-2 text-amber-800/70">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            {registration.phone}
          </div>
          <div className="flex items-center gap-2 text-amber-800/70">
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            {registration.institution_name}
            <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0">
              {registration.institution_type}
            </Badge>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-medium text-amber-800/50 mb-1.5 uppercase tracking-wide">
            Registered For
          </p>
          <div className="flex flex-wrap gap-1.5">
            {registration.registration_for.map((s) => (
              <Badge
                key={s}
                className="bg-amber-50 text-amber-800 border-amber-200 text-[11px] font-medium"
              >
                {serviceLabels[s] || s}
              </Badge>
            ))}
          </div>
        </div>


        {/* Notes */}
        {registration.additional_notes && (
          <div className="pt-2 border-t border-amber-100">
            <p className="text-xs text-amber-800/60 italic leading-relaxed">
              &ldquo;{registration.additional_notes}&rdquo;
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
