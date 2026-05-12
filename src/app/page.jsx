// Plugins
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Components
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
    </main>
  );
}
