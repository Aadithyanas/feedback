"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Target,
  FileText,
  FolderKanban,
  Compass,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

const serviceOptions: { id: string; label: string; num: string; icon: ReactNode }[] = [
  {
    id: "interview_training",
    label: "Interview Training & Mock Interviews",
    num: "01",
    icon: <Target className="w-4 h-4" />,
  },
  {
    id: "resume_reviews",
    label: "Resume Reviews",
    num: "02",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "portfolio_reviews",
    label: "Portfolio Reviews",
    num: "03",
    icon: <FolderKanban className="w-4 h-4" />,
  },
  {
    id: "career_guidance",
    label: "Career Guidance",
    num: "04",
    icon: <Compass className="w-4 h-4" />,
  },
  {
    id: "mern_stack_coaching",
    label: "MERN Stack Coaching",
    num: "05",
    icon: <Code2 className="w-4 h-4" />,
  },
];

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  institution_name: z.string().min(2, "Institution name is required"),
  institution_type: z.string().min(1, "Please select institution type"),
  registration_for: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  tech_stacks: z.array(z.string()),
  experience_level: z.string().min(1, "Please select your experience level"),
  additional_notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      institution_name: "",
      institution_type: "",
      registration_for: [],
      tech_stacks: [],
      experience_level: "",
      additional_notes: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        ...data,
        additional_notes: data.additional_notes || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Registration submitted successfully!");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to submit registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[60vh] border border-gray-200 bg-white/40 backdrop-blur-md shadow-xl rounded-[16px]"
      >
        <div className="w-16 h-16 bg-blue-100 border border-blue-200 flex items-center justify-center mb-8 rounded-full">
          <CheckCircle2 className="w-8 h-8 text-blue-600" />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-blue-600 uppercase mb-2">
          [status:registration_complete]
        </span>
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-black">
          RECORDS SAVED
        </h2>
        <p className="text-gray-500 mb-8 max-w-md text-xs font-mono tracking-wide uppercase leading-relaxed">
          Thank you. Your entry has been logged into the portal database. We will review your files shortly.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button
              variant="outline"
              className="font-mono text-[10px] tracking-widest uppercase rounded-xl border-gray-300 hover:border-gray-400 text-black"
            >
              [01] Back to Home
            </Button>
          </Link>
          <Link href="/feedback">
            <Button className="font-mono text-[10px] tracking-widest uppercase rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              [02] Give Feedback
            </Button>
          </Link>
        </div>
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
              // registration.form.v1
            </span>
            <CardTitle className="text-3xl font-black tracking-tight text-black uppercase">
              COACHING REGISTRAR
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 font-mono uppercase tracking-wide">
              Submit your diagnostics to allocate coaching services.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 font-mono"
            >
              {/* Personal Information Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>[SECTION A]</span>
                  <span>Personal Details</span>
                </div>
                <div className="h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Full Name *</FormLabel>
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

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="JOHN@EXAMPLE.COM"
                          className="h-12 border-gray-300 bg-white text-black rounded-xl focus-visible:ring-0 focus-visible:border-blue-600 transition-colors shadow-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="h-12 border-gray-300 bg-white text-black rounded-xl focus-visible:ring-0 focus-visible:border-blue-600 transition-colors shadow-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Experience Level *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-gray-300 bg-white text-black rounded-xl focus:ring-0 focus:border-blue-600 transition-colors font-mono uppercase text-xs shadow-sm">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-gray-200 rounded-xl text-black font-mono uppercase text-xs shadow-lg">
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Institution Section */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>[SECTION B]</span>
                  <span>Education Profile</span>
                </div>
                <div className="h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="institution_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Institution Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.G. MIT, STANFORD"
                          className="h-12 border-gray-300 bg-white text-black rounded-xl focus-visible:ring-0 focus-visible:border-blue-600 transition-colors shadow-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Institution Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-gray-300 bg-white text-black rounded-xl focus:ring-0 focus:border-blue-600 transition-colors font-mono uppercase text-xs shadow-sm">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-gray-200 rounded-xl text-black font-mono uppercase text-xs shadow-lg">
                          <SelectItem value="college">College / University</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="bootcamp">Bootcamp</SelectItem>
                          <SelectItem value="self_learner">Self-Learner</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Services Section */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>[SECTION C]</span>
                  <span>Allocation Options *</span>
                </div>
                <div className="h-px bg-gray-200" />
              </div>

              <FormField
                control={form.control}
                name="registration_for"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {serviceOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="registration_for"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(option.id);
                            return (
                              <FormItem>
                                <FormControl>
                                  <label
                                    className={`
                                      flex items-center gap-4 p-4 border cursor-pointer transition-colors duration-200 rounded-xl shadow-sm
                                      ${
                                        isChecked
                                          ? "border-blue-600 bg-blue-50 text-blue-900"
                                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                      }
                                    `}
                                  >
                                    <Checkbox
                                      checked={isChecked}
                                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-sm"
                                      onCheckedChange={(checked) => {
                                        const updated = checked
                                          ? [...field.value, option.id]
                                          : field.value.filter(
                                              (v: string) => v !== option.id
                                            );
                                        field.onChange(updated);
                                      }}
                                    />
                                    <span className="font-mono text-[10px] text-gray-400 select-none">
                                      [{option.num}]
                                    </span>
                                    <span className="text-sm font-semibold tracking-tight uppercase flex-grow">
                                      {option.label}
                                    </span>
                                  </label>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-red-500 text-[10px]" />
                  </FormItem>
                )}
              />

              {/* Additional Notes */}
              <FormField
                control={form.control}
                name="additional_notes"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel className="text-[10px] uppercase tracking-widest text-gray-600">Additional Specs (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="PROVIDE ADDITIONAL NOTES OR PROJECT METRICS..."
                        className="resize-none h-28 border-gray-300 bg-white text-black rounded-xl focus-visible:ring-0 focus-visible:border-blue-600 transition-colors shadow-sm"
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-14 font-mono text-xs uppercase tracking-widest rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving System Records...
                  </>
                ) : (
                  <>
                    Commit Registration Logs
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
