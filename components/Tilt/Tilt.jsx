import { useRef, useEffect } from 'react';

const Tilt = ({ children, className, options = {}, ...rest }) => {
  const tiltRef = useRef(null);

  // Default options merged with any provided options
  const tiltOptions = {
    max: 5,
    perspective: 1000,
    speed: 400,
    scale: 1.0,
    yOffset: -10,
    ...options,
  };

  const { max, perspective, speed, scale, yOffset } = tiltOptions;

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      element.style.transition = `transform 0.1s ease-out, box-shadow ${speed / 1000}s ease`;
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      element.style.transform = `perspective(${perspective}px) rotateX(${-yPct * max}deg) rotateY(${xPct * max}deg) scale(${scale}) translateY(${yOffset}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transition = `transform ${speed / 1000}s ease, box-shadow ${speed / 1000}s ease`;
      element.style.transform = `perspective(${perspective}px) rotateX(0) rotateY(0) scale(1) translateY(0)`;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [max, perspective, speed, scale, yOffset]);

  return (
    <div ref={tiltRef} className={className} {...rest}>
      {children}
    </div>
  );
};

export default Tilt;