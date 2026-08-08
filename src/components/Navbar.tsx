"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Builder ID", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between pointer-events-none">
      <Link href="/" className="flex items-center gap-1 sm:gap-2 group pointer-events-auto">
        <span className="font-mono text-lg sm:text-xl font-bold tracking-widest text-primary group-hover:text-primary/80 transition-colors">
          HH
          <span className="text-secondary ml-1 font-sans italic text-xl sm:text-2xl -rotate-12 inline-block">गोवा</span>
        </span>
      </Link>

      <div className="flex items-center gap-0.5 sm:gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-xl pointer-events-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.name}
              href={link.path}
              className={`relative px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-sm font-medium transition-colors rounded-full z-10
                ${isActive ? "text-black" : "text-muted-foreground hover:text-white"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-primary rounded-full z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
