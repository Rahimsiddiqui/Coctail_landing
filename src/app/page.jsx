"use client";

// Plugins
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cocktails from "@/components/Cocktails";
import About from "@/components/About";
import Art from "@/components/Art";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
}
