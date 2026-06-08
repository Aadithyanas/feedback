"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/coaching", label: "Coaching" },
  { href: "/feedback", label: "Feedback" },
];

export function Navbar() {
  const pathname = usePathname();

  // Hide navbar on login page & admin dashboard
  if (pathname.startsWith("/dashboard") || pathname === "/login") {
    return null;
  }

  return (
    <div className="fixed top-[30px] left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <header 
        className="pointer-events-auto flex items-center justify-between gap-6 md:gap-8 px-6 py-3 w-fit rounded-[16px] backdrop-blur-[50px] bg-white/30 inner-highlight"
        style={{ border: "1px solid rgba(0,0,0,0.1)" }}
      >
        {/* Logo */}
        <Link href="/" className="font-heading font-bold text-xl text-black">
          EduPortal
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-black" : "text-black/60 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
}
