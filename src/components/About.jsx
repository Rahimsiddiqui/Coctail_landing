import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("h2", { type: "lines" });

    const paragraphsSplit = SplitText.create(".animate-para", {
      type: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 65%",
      },
    });

    tl.from(titleSplit.lines, {
      opacity: 0,
      yPercent: 35,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.06,
    })
      .from(
        paragraphsSplit.lines,
        {
          opacity: 0,
          yPercent: 35,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
        },
        "-=1.2",
      )
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          yPercent: 35,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=1.2",
      );
  }, []);

  return (
    <section id="about">
      <div className="mb-16 px-5 md:px-0">
        <div className="content">
          <div className="md:col-span-8">
            <div className="badge">Best Cocktails</div>
            <h2>
              Where every details matters <span className="text-white">-</span>{" "}
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p className="animate-para">
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className="md:text-3xl animate-para text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm animate-para text-white-100">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-4" />
        </div>
      </div>
    </section>
  );
};

export default About;
