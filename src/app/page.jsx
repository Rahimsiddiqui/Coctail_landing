"use client";

// Plugins
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="min-h-screen bg-black"></div>
    </main>
  );
}
