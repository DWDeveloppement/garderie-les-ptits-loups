"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseAnimateOnceOptions {
  /** Seuil de visibilité pour déclencher l'animation (0-1) */
  threshold?: number;
  /** Marge autour de l'élément observé */
  rootMargin?: string;
  /** Délai avant le déclenchement de l'animation (ms) */
  delay?: number;
  /** Désactiver l'animation */
  disabled?: boolean;
}

interface UseAnimateOnceReturn {
  /** Ref à attacher à l'élément à observer */
  ref: React.RefObject<HTMLElement | null>;
  /** true si l'animation a été déclenchée */
  hasAnimated: boolean;
  /** true si l'élément est actuellement visible */
  isInView: boolean;
  /** Réinitialiser l'état d'animation (pour tests/debug) */
  reset: () => void;
}

/**
 * Hook pour déclencher une animation une seule fois quand un élément
 * entre dans le viewport. L'animation ne se répète pas lors du scroll.
 */
export function useAnimateOnce(
  options: UseAnimateOnceOptions = {}
): UseAnimateOnceReturn {
  const {
    threshold = 0.2,
    rootMargin = "0px",
    delay = 0,
    disabled = false,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const reset = useCallback(() => {
    setHasAnimated(false);
    setIsInView(false);
  }, []);

  useEffect(() => {
    if (disabled || hasAnimated || !ref.current) return;

    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          
          // Appliquer le délai si spécifié
          if (delay > 0) {
            setTimeout(() => {
              setHasAnimated(true);
            }, delay);
          } else {
            setHasAnimated(true);
          }
          
          // Arrêter d'observer une fois l'animation déclenchée
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [disabled, hasAnimated, threshold, rootMargin, delay]);

  return { ref, hasAnimated, isInView, reset };
}

/**
 * Hook pour animer plusieurs éléments avec un délai en cascade
 */
interface UseStaggeredAnimationOptions extends UseAnimateOnceOptions {
  /** Nombre d'éléments à animer */
  itemCount: number;
  /** Délai entre chaque élément (ms) */
  staggerDelay?: number;
}

interface UseStaggeredAnimationReturn {
  /** Ref à attacher au conteneur parent */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Array de booleans indiquant si chaque élément doit être animé */
  animatedItems: boolean[];
  /** true si tous les éléments ont été animés */
  allAnimated: boolean;
  /** Réinitialiser toutes les animations */
  reset: () => void;
}

export function useStaggeredAnimation(
  options: UseStaggeredAnimationOptions
): UseStaggeredAnimationReturn {
  const {
    itemCount,
    staggerDelay = 100,
    threshold = 0.2,
    rootMargin = "0px",
    disabled = false,
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const [animatedItems, setAnimatedItems] = useState<boolean[]>(
    Array(itemCount).fill(false)
  );
  const [triggered, setTriggered] = useState(false);

  const allAnimated = animatedItems.every(Boolean);

  const reset = useCallback(() => {
    setAnimatedItems(Array(itemCount).fill(false));
    setTriggered(false);
  }, [itemCount]);

  useEffect(() => {
    if (disabled || triggered || !containerRef.current) return;

    const element = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          
          // Animer chaque élément avec un délai en cascade
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setAnimatedItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * staggerDelay);
          }
          
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [disabled, triggered, itemCount, staggerDelay, threshold, rootMargin]);

  return { containerRef, animatedItems, allAnimated, reset };
}
