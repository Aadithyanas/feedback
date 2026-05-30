"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Loader2, ArrowLeft } from "lucide-react";
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
    <div className="flex gap-1">
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
            className={`w-8 h-8 ${
              star <= (hover || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-300 dark:text-slate-700"
            } transition-colors`}
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
      course_name: "",
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <Star className="w-10 h-10 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Thank You!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          Your feedback has been successfully submitted and will help us improve our teaching experience.
        </p>
        <Button onClick={() => router.push("/dashboard")}>
          View Dashboard
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
      
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Course Feedback</CardTitle>
          <CardDescription>
            Please share your honest feedback about the teaching experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-800/50">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Submit Anonymously</FormLabel>
                        <FormDescription>
                          Hide your name from this submission
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
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
                            <FormLabel>Your Name (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
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
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Introduction to Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="overall_rating"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Overall Rating</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teaching_clarity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teaching Clarity</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject_knowledge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Knowledge</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feeling"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you feel about the teaching?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a mood" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent 🤩</SelectItem>
                          <SelectItem value="Good">Good 🙂</SelectItem>
                          <SelectItem value="Average">Average 😐</SelectItem>
                          <SelectItem value="Needs Improvement">Needs Improvement 😔</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recommend_teacher"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 col-span-1 md:col-span-2 mt-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Would you recommend this teacher?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="liked_most"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>What did you like most?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us what worked well..." 
                          className="resize-none h-24"
                          maxLength={500}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-right">
                        {(field.value?.length || 0)}/500
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="improvements"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>What can be improved?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us how we can do better..." 
                          className="resize-none h-24"
                          maxLength={500}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-right">
                        {(field.value?.length || 0)}/500
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <Button type="submit" className="w-full h-12 text-lg rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
