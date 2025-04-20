import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react';

export function LazyImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [inView, setInView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.8 } /** 🚀 Trigger when 80% is visible */,
    );
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  return <img {...props} ref={imageRef} src={inView ? props.src : '/vite.svg'} />;
}
