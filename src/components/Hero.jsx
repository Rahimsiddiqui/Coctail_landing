import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".animate", { type: "lines" });

    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });

    gsap.fromTo(
      heroSplit.chars,
      {
        opacity: 0,
        yPercent: 35,
      },
      {
        yPercent: 0,
        duration: 2,
        ease: "expo.out",
        stagger: 0.06,
        opacity: 1,
      },
    );

    gsap.fromTo(
      paragraphSplit.lines,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        opacity: 1,
        delay: 0.8,
      },
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: "true",
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p className="animate">Cool. Crisp. Classic.</p>
              <p className="subtitle animate">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle animate">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a className="animate transition-colors" href="#cocktails">
                View cocktails
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
