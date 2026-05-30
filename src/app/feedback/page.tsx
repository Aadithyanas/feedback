import { FeedbackForm } from "@/components/FeedbackForm";

export const metadata = {
  title: "Give Feedback | Student Feedback Portal",
  description: "Provide your valuable feedback on your courses.",
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-amber-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="relative z-10">
        <FeedbackForm />
      </div>
    </div>
  );
}
