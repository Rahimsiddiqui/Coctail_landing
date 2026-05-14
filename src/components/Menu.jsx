"use client";

import { allCocktails } from "../../constants";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef(null);
  const tlRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

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
    })
      .from("#title", {
        opacity: 0,
        yPercent: 35,
        duration: 0.5,
      }, "-=0.25")
      .from(".details", {
        opacity: 0,
        yPercent: 35,
        duration: 0.5,
      }, "-=0.25");
  
    return () => tl.kill();
  }, [currentIdx]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (idx) => {
    if (isAnimating) return;
  
    setIsAnimating(true);
  
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
            onClick={() => goToSlide(currentIdx - 1)}
            aria-label={`Previous cocktail: ${prevCocktail.name}`}
          >
            {prevCocktail.name}
            <img
              src="/images/right-arrow.png"
              alt=""
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIdx + 1)}
            aria-label={`Next cocktail: ${nextCocktail.name}`}
          >
            {nextCocktail.name}
            <img
              src="/images/left-arrow.png"
              alt=""
              aria-hidden="true"
            />
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
