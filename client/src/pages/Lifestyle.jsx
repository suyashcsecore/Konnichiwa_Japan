import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

function Lifestyle() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F5] relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-[70px] left-0 right-0 h-1 bg-japan-red origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      
      {/* Life in Japan Embedded App */}
      <div className="w-full min-h-[calc(100vh-70px)] pt-[70px]">
        <iframe 
          src="/life-in-japan-landing/dist/public/index.html" 
          title="Life in Japan Field Guide"
          className="w-full min-h-[calc(100vh-70px)] border-none bg-white block"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}

export default Lifestyle;
