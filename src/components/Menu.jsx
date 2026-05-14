"use client";

import { allCocktails } from "../../constants";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef(null);
  const tlRef = useRef(null);

  const [displayIdx, setDisplayIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalCocktails = allCocktails.length;

  const getCocktailAt = (idxOffset) => {
    return allCocktails[
      (displayIdx + idxOffset + totalCocktails) % totalCocktails
    ];
  };

  const prevCocktail = getCocktailAt(-1);
  const currCocktail = getCocktailAt(0);
  const nextCocktail = getCocktailAt(1);

  const goToSlide = (idx) => {
    if (isAnimating) return;

    const newIdx = (idx + totalCocktails) % totalCocktails;
    if (newIdx === displayIdx) return;

    setIsAnimating(true);
    setDirection(idx > displayIdx ? -1 : 1);

    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayIdx(newIdx);
      },
    });

    tlRef.current = tl;

    tl.to(
      [".cocktail img", "#title", ".details"],
      {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out",
      },
      0,
    );
  };

  useGSAP(() => {
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tlRef.current = tl;

    tl.from(".cocktail img", {
      opacity: 0,
      xPercent: 40 * direction,
      scale: 0.8,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        "#title",
        {
          opacity: 0,
          yPercent: 35,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.25",
      )
      .from(
        ".details",
        {
          opacity: 0,
          yPercent: 35,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.25",
      );

    return () => tl.kill();
  }, [displayIdx]);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="Decorative left leaf"
        id="m-left-leaf"
        aria-hidden="true"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="Decorative right leaf"
        id="m-right-leaf"
        aria-hidden="true"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, idx) => {
          const isActive = idx === displayIdx;

          return (
            <button
              key={cocktail.id}
              onClick={() => goToSlide(idx)}
              className={
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }
              aria-current={isActive ? "page" : undefined}
              aria-label={`View ${cocktail.name}`}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(displayIdx - 1)}
            aria-label={`Previous cocktail: ${prevCocktail.name}`}
          >
            {prevCocktail.name}
            <img src="/images/right-arrow.png" alt="" aria-hidden="true" />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(displayIdx + 1)}
            aria-label={`Next cocktail: ${nextCocktail.name}`}
          >
            {nextCocktail.name}
            <img src="/images/left-arrow.png" alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail">
          <img
            src={currCocktail.image}
            alt={`${currCocktail.name} cocktail`}
            className="object-container"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currCocktail.title}</h2>
            <p>{currCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
