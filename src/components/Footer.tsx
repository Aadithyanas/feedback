import Link from "next/link";
import { Code, Globe, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="EduPortal Logo" className="w-8 h-8 rounded-full" />
            <span className="font-heading font-bold text-2xl text-black">
              EduPortal
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Learn smarter, build faster, and grow limitless with AI + MERN stack.
          </p>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-3 text-sm">
            <h4 className="font-bold text-gray-900">Platform</h4>
            <Link href="/Register" className="text-gray-500 hover:text-blue-600 transition-colors">Register</Link>
            <Link href="/feedback" className="text-gray-500 hover:text-blue-600 transition-colors">Feedback</Link>
            <Link href="/login" className="text-gray-500 hover:text-blue-600 transition-colors">Admin Login</Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h4 className="font-bold text-gray-900">Socials</h4>
            <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Globe className="w-4 h-4" /> Twitter
            </Link>
            <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Code className="w-4 h-4" /> GitHub
            </Link>
            <Link href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-4 h-4" /> LinkedIn
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} EduPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
