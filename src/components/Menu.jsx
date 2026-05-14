"use client";

import { allCocktails } from "../../constants";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  useGSAP(() => {
    const ctl = gsap.timeline();

    ctl
      .from(".cocktail img", {
        opacity: 0,
        xPercent: 40 * direction,
        scale: 0.8,
        duration: 0.6,
      })
      .from(
        "#title",
        {
          opacity: 0,
          yPercent: 35,
          duration: 0.5,
        },
        "-=0.25",
      )
      .from(".details", { opacity: 0, yPercent: 35, duration: 0.5 }, "-=0.25");
  }, [currentIdx]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (idx) => {
    const newIdx = (idx + totalCocktails) % totalCocktails;
    setDirection(idx > currentIdx ? -1 : 1);

    setCurrentIdx(newIdx);
  };

  const getCocktailAt = (idxOffset) => {
    return allCocktails[
      (currentIdx + idxOffset + totalCocktails) % totalCocktails
    ];
  };

  const prevCocktail = getCocktailAt(-1);
  const currCocktail = getCocktailAt(0);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="Left Leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="Right Leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, idx) => {
          const isActive = idx === currentIdx;

          return (
            <button
              key={cocktail.id}
              onClick={() => goToSlide(idx)}
              className={
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }
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
            onClick={() => goToSlide(currentIdx - 1)}
          >
            {prevCocktail.name}
            <img
              src="/images/right-arrow.png"
              alt="Right Arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIdx + 1)}
          >
            {nextCocktail.name}
            <img
              src="/images/left-arrow.png"
              alt="Left Arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img
            src={currCocktail.image}
            alt="Current Cocktail Image"
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
