import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const getRootMargin = () => {
      const height = typeof window !== 'undefined' ? window.innerHeight : 800;
      return `-${offset}px 0px -${height - offset - 100}px 0px`;
    };

    elements.forEach(element => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: getRootMargin(),
          threshold: 0.1,
        }
      );
      observer.observe(element);
      observers.set(element.id, observer);
    });

    const handleResize = () => {
      observers.forEach((observer, id) => {
        observer.disconnect();
        const element = document.getElementById(id);
        if (element) {
          const newObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  setActiveId(entry.target.id);
                }
              });
            },
            {
              rootMargin: getRootMargin(),
              threshold: 0.1,
            }
          );
          newObserver.observe(element);
          observers.set(id, newObserver);
        }
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, offset]);

  return activeId;
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  const { rootMargin = '0px 0px -50px 0px', threshold = 0.1 } = options;

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, rootMargin, threshold]);

  return [setElement, isIntersecting] as const;
}