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

  const chapters = [
    {
      id: 1,
      title: "The Quiet Mornings",
      subtitle: "Observing before explaining",
      content: "Japan is not one story. Start with the one you can walk into. The early hours in Tokyo are surprisingly quiet. Before the trains fill up, you can hear the soft sweeping of brooms outside storefronts and the gentle hum of vending machines. It's a moment of clarity before the neon rail after dark.",
      image: "https://images.unsplash.com/photo-1542051812871-7575009377f8?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Shrine Index",
      subtitle: "Restraint as contrast",
      content: "A calm monochrome archive with strict typography and generous negative space. The museum-like restraint found in everyday Japanese architecture teaches you to appreciate the breathing room. Notice the tiny red registration marks, the paper shadows, the wooden thresholds.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "The Wayfinding",
      subtitle: "Paper lantern editorial",
      content: "A midnight city guide with electric signage and luminous transit lines. The terracotta signal guides you through the labyrinth of Shibuya and Shinjuku. The layout of the city behaves like an asymmetric chapter header, cutting across imagery and leading you forward.",
      image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-soft relative pb-32">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-[70px] left-0 right-0 h-1 bg-japan-red origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-japan-red font-bold tracking-[0.2em] text-sm uppercase mb-6">Field Guide</p>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-8 leading-tight">
            Life in <br/><span className="text-japan-red italic">Japan</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A living field guide to everyday Japan for curious first-time visitors and future residents. 
            Told through atmosphere, useful context, and room for personal stories.
          </p>
        </motion.div>
      </section>

      {/* Editorial Chapters */}
      <div className="max-w-6xl mx-auto px-6 relative mt-16">
        
        {/* Vertical Rail */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-japan-red/20 hidden md:block"></div>

        {chapters.map((chapter, index) => (
          <div key={chapter.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 mb-32 relative`}>
            
            {/* Chapter Bead */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg-soft border-2 border-japan-red items-center justify-center text-japan-red font-bold text-sm z-10 shadow-[0_0_15px_rgba(230,0,18,0.3)]">
              {chapter.id}
            </div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full text-left"
            >
              <div className="md:hidden w-8 h-8 rounded-full bg-japan-red text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg">
                {chapter.id}
              </div>
              <p className="text-japan-red font-bold tracking-widest text-xs uppercase mb-3">{chapter.subtitle}</p>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">{chapter.title}</h2>
              <p className="text-gray-600 leading-loose text-lg">{chapter.content}</p>
            </motion.div>

            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="relative group p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(230,0,18,0.15)] hover:border-japan-red/30">
                <div className="absolute top-8 -left-4 w-8 h-px bg-japan-red hidden md:block"></div>
                <img 
                  src={chapter.image} 
                  alt={chapter.title} 
                  className="w-full h-[400px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Lifestyle;
