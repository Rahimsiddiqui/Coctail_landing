"use client";

// Plugins
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cocktails from "@/components/Cocktails";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
    </main>
  );
}
