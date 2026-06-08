"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  student_name: z.string().optional(),
  course_name: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  overall_rating: z.number().min(1, { message: "Please select a rating." }).max(5),
  teaching_clarity: z.number().min(1, { message: "Please rate teaching clarity." }).max(5),
  communication: z.number().min(1, { message: "Please rate communication." }).max(5),
  subject_knowledge: z.number().min(1, { message: "Please rate subject knowledge." }).max(5),
  feeling: z.enum(["Excellent", "Good", "Average", "Needs Improvement"], {
    message: "Please select how you feel about the teaching.",
  }),
  liked_most: z.string().max(500).optional(),
  improvements: z.string().max(500).optional(),
  recommend_teacher: z.boolean(),
  anonymous: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5 pt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="p-1 focus:outline-none transition-transform hover:scale-110"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hover || value)
                ? "fill-blue-600 text-blue-600"
                : "text-gray-200"
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
};

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      course_name: "MERN Stack",
      overall_rating: 0,
      teaching_clarity: 0,
      communication: 0,
      subject_knowledge: 0,
      feeling: undefined,
      liked_most: "",
      improvements: "",
      recommend_teacher: true,
      anonymous: false,
    },
  });

  const isAnonymous = form.watch("anonymous");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        student_name: data.anonymous ? null : data.student_name || null,
        liked_most: data.liked_most || null,
        improvements: data.improvements || null,
      };

      const { error } = await supabase.from("feedbacks").insert(payload);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast.success("Feedback submitted successfully!");
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[60vh] border border-gray-200 bg-white/40 backdrop-blur-md select-none rounded-[16px] shadow-xl"
      >
        <div className="w-16 h-16 bg-blue-100 border border-blue-200 flex items-center justify-center mb-8 rounded-full">
          <CheckCircle2 className="w-8 h-8 text-blue-600" />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-blue-600 uppercase mb-2">
          [status:feedback_complete]
        </span>
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-black">
          FEEDBACK RECORDED
        </h2>
        <p className="text-gray-500 mb-8 max-w-md text-xs font-mono tracking-wide uppercase leading-relaxed">
          Thank you. Your feedback has been committed to the database ledger. Returning to dashboard.
        </p>
        <Button 
          onClick={() => router.push("/dashboard")}
          className="font-mono text-[10px] tracking-widest uppercase rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          [01] View Dashboard
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 select-none">
      <Link 
        href="/" 
        className="inline-flex items-center font-mono text-[10px] tracking-widest text-gray-500 hover:text-black mb-8 transition-colors uppercase"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-2" />
        Return to Home
      </Link>
      
      <Card className="border border-gray-200 bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <CardHeader className="border-b border-gray-100 pb-6 bg-gray-50/50">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-widest text-blue-600 uppercase">
              // feedback.form.v1
            </span>
            <CardTitle className="text-3xl font-black tracking-tight text-black uppercase">
              COURSE FEEDBACK
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 font-mono uppercase tracking-wide">
              Log metrics regarding teaching performance and clarity.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-mono">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Submit Anonymously Switch */}
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between p-4 border border-gray-200 bg-white rounded-xl shadow-sm col-span-1 md:col-span-2">
                      <div className="space-y-1">
                        <FormLabel className="text-[10px] uppercase tracking-widest text-gray-700">Submit Anonymously</FormLabel>
                        <FormDescription className="text-[9px] text-gray-400 uppercase tracking-wider">
                          Omit student identifiers from this record
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          className="data-[state=checked]:bg-blue-600 border-gray-300"
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <AnimatePresence>
                  {!isAnonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="col-span-1 md:col-span-2"
                    >
                      <FormField
                        control={form.control}
                        name="student_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Your Name (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="JOHN DOE" 
                                className="h-12 border-gray-300 bg-white text-black rounded-xl focus-visible:ring-0 focus-visible:border-blue-600 transition-colors shadow-sm"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-[10px]" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <FormField
                  control={form.control}
                  name="course_name"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Course Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly 
                          className="h-12 border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed font-semibold rounded-xl shadow-sm focus-visible:ring-0" 
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                {/* Rating Sections */}
                <div className="space-y-3 pt-2 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                    <span>[SECTION A]</span>
                    <span>Performance Ratings</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                </div>

                <FormField
                  control={form.control}
                  name="overall_rating"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Overall Rating *</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teaching_clarity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Teaching Clarity *</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Communication *</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject_knowledge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Subject Knowledge *</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feeling"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Evaluation Mood *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger className="h-12 border-gray-300 bg-white text-black rounded-xl shadow-sm focus:ring-0 focus:border-blue-600 transition-colors font-mono uppercase text-xs">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg text-black font-mono uppercase text-xs">
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Average">Average</SelectItem>
                          <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                {/* Switch section for recommendation */}
                <FormField
                  control={form.control}
                  name="recommend_teacher"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between p-4 border border-gray-200 bg-white rounded-xl shadow-sm col-span-1 md:col-span-2 mt-4">
                      <div className="space-y-1">
                        <FormLabel className="text-[10px] uppercase tracking-widest text-gray-700">Recommend Teacher</FormLabel>
                        <FormDescription className="text-[9px] text-gray-400 uppercase tracking-wider">
                          Would you recommend this course to peer candidates?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          className="data-[state=checked]:bg-blue-600 border-gray-300"
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Additional Text Areas */}
                <div className="space-y-3 pt-4 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                    <span>[SECTION B]</span>
                    <span>Written Specifications</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                </div>

                <FormField
                  control={form.control}
                  name="liked_most"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Positive Highlights</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="OUTLINE POSITIVE HIGHLIGHTS..." 
                          className="resize-none h-24 border-gray-300 bg-white text-black rounded-xl shadow-sm focus-visible:ring-0 focus-visible:border-blue-600 transition-colors"
                          maxLength={500}
                          {...field} 
                        />
                      </FormControl>
                      <p className="text-[9px] text-gray-400 text-right">
                        {(field.value?.length || 0)}/500
                      </p>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="improvements"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">System Improvements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="SPECIFY RECOMMENDED SYSTEM IMPROVEMENTS..." 
                          className="resize-none h-24 border-gray-300 bg-white text-black rounded-xl shadow-sm focus-visible:ring-0 focus-visible:border-blue-600 transition-colors"
                          maxLength={500}
                          {...field} 
                        />
                      </FormControl>
                      <p className="text-[9px] text-gray-400 text-right">
                        {(field.value?.length || 0)}/500
                      </p>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-14 font-mono text-xs uppercase tracking-widest rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Metrics...
                  </>
                ) : (
                  "Commit Feedback Logs"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
