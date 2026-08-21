import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Play, 
  ArrowRight, 
  BookOpen, 
  MapPin, 
  Coffee, 
  Train, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Menu,
  X,
  Bookmark,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function Home() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);

      // Simple chapter tracker
      if (currentScroll < 600) setActiveChapter("hero");
      else if (currentScroll < 1400) setActiveChapter("overview");
      else if (currentScroll < 2200) setActiveChapter("video");
      else if (currentScroll < 3000) setActiveChapter("quiz");
      else setActiveChapter("archive");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuizSubmit = (optionIndex: number) => {
    setQuizAnswer(optionIndex);
    setQuizSubmitted(true);
    if (optionIndex === 1) {
      toast.success("Correct! Bowing (Ojigi) is the universal sign of respect and greeting in Japan.");
    } else {
      toast.info("Good guess! Actually, bowing (Ojigi) is the primary greeting custom.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2A29] relative selection:bg-[#C65A43]/20 selection:text-[#C65A43] font-sans">
      
      {/* Fancy Progress Bar & Chapter Bead */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-[#E8E2D5]">
        <div 
          className="h-full bg-[#C65A43] transition-all duration-150 ease-out relative" 
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2C2A29] rounded-full border-2 border-[#C65A43] shadow-md hidden md:block" />
        </div>
      </div>

      {/* Slim Vertical Chapter Rail (Left side indicator) */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-6 py-6 px-3 bg-[#F4F0EA]/80 backdrop-blur-md rounded-full border border-[#E0D8C9] shadow-sm">
        <span className="text-[10px] font-mono tracking-widest text-[#8C857B] [writing-mode:vertical-lr] rotate-180">INDEX</span>
        <div className="w-[1px] h-12 bg-[#D8CFBF]" />
        {[
          { id: "hero", label: "01" },
          { id: "overview", label: "02" },
          { id: "video-section", label: "03" },
          { id: "quiz", label: "04" },
          { id: "placeholder-grid", label: "05" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono transition-all ${
              activeChapter === item.id 
                ? "bg-[#C65A43] text-white font-bold scale-110 shadow-sm" 
                : "text-[#6B635B] hover:text-[#2C2A29] hover:bg-[#E8E2D5]"
            }`}
          >
            {item.label}
          </a>
        ))}
      </aside>

      {/* Navigation */}
      <header className="sticky top-1.5 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E2D5]/60 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#2C2A29] flex items-center justify-center text-[#FBF9F5] font-serif font-bold text-xl tracking-tighter shadow-sm border border-black/10">
              日
            </div>
            <div>
              <div className="font-serif-display text-xl font-bold tracking-wide block leading-none flex items-center gap-2">
                <span>LIFE IN JAPAN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C65A43]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C857B] font-medium">Editorial Field Guide</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B635B]">
            <a href="#overview" className="hover:text-[#C65A43] transition-colors">Overview</a>
            <a href="#video-section" className="hover:text-[#C65A43] transition-colors">Cinematic Tour</a>
            <a href="#quiz" className="hover:text-[#C65A43] transition-colors">Etiquette Quiz</a>
            <a href="#placeholder-grid" className="hover:text-[#C65A43] transition-colors">Archive</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#D8CFBF] text-[#2C2A29] hover:bg-[#2C2A29] hover:text-[#FBF9F5] transition-all text-xs tracking-wider uppercase font-semibold"
              onClick={() => toast("Feature coming soon: Submit your own story to the Japan Field Guide archive.")}
            >
              Share Story
            </Button>
            <Button 
              size="sm" 
              className="bg-[#C65A43] hover:bg-[#A84631] text-white shadow-sm text-xs tracking-wider uppercase font-semibold"
              onClick={() => {
                document.getElementById("quiz")?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Take Quiz
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-[#2C2A29]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#FBF9F5] border-b border-[#E8E2D5] px-6 py-6 space-y-4 shadow-xl"
          >
            <a href="#overview" className="block font-medium text-lg text-[#2C2A29]" onClick={() => setMobileMenuOpen(false)}>Overview</a>
            <a href="#video-section" className="block font-medium text-lg text-[#2C2A29]" onClick={() => setMobileMenuOpen(false)}>Cinematic Tour</a>
            <a href="#quiz" className="block font-medium text-lg text-[#2C2A29]" onClick={() => setMobileMenuOpen(false)}>Etiquette Quiz</a>
            <a href="#placeholder-grid" className="block font-medium text-lg text-[#2C2A29]" onClick={() => setMobileMenuOpen(false)}>Archive</a>
            <div className="pt-4 flex flex-col gap-3">
              <Button variant="outline" className="w-full border-[#D8CFBF]" onClick={() => setMobileMenuOpen(false)}>Share Story</Button>
              <Button className="w-full bg-[#C65A43] text-white" onClick={() => setMobileMenuOpen(false)}>Take Quiz</Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Headings & Copy (Scroll Left animation) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#EFECE6] border border-[#E0D8C9] text-xs font-mono tracking-widest text-[#C65A43]">
              <Sparkles size={13} />
              <span>VOL. 01 — THE ARCHIPELAGO JOURNEY</span>
            </div>

            <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#2C2A29] leading-[1.05]">
              Life in <span className="text-[#C65A43] italic font-serif">Japan.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#5A534B] font-normal leading-relaxed max-w-2xl font-sans">
              An intimate visual and cultural field guide exploring the delicate balance between ancient tradition and hyper-modern rhythm. Discover alleyways, seasonal quiet, and daily rituals across the four main islands.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-[#2C2A29] hover:bg-[#433F3D] text-[#FBF9F5] px-8 py-6 text-base font-medium rounded shadow-md group"
                onClick={() => document.getElementById("video-section")?.scrollIntoView({ behavior: 'smooth' })}
              >
                Watch Cinematic Tour
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-[#D8CFBF] bg-transparent text-[#2C2A29] hover:bg-[#EFECE6] px-8 py-6 text-base font-medium rounded"
                onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Chapters
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E8E2D5]">
              <div>
                <p className="font-serif-display text-3xl font-bold text-[#2C2A29]">47</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C857B]">Prefectures</p>
              </div>
              <div>
                <p className="font-serif-display text-3xl font-bold text-[#2C2A29]">2,000+</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C857B]">Years of Craft</p>
              </div>
              <div>
                <p className="font-serif-display text-3xl font-bold text-[#2C2A29]">100%</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C857B]">Immersive</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Frame with Pop-in Animation & Rice-paper texture */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-[#D8CFBF] bg-[#EAE4D7] aspect-[4/5] group p-3 bg-white">
              <div className="w-full h-full relative overflow-hidden rounded">
                <img 
                  src="/manus-storage/life-in-japan-hero_8f6b2120.jpg" 
                  alt="Tokyo street at dusk with lanterns and mist" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high-end Unsplash Japan editorial photo if storage image is still processing
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8A89B] mb-1">Plate 01 — Asakusa Evening</span>
                  <h3 className="font-serif-display text-2xl font-bold">Rain on the Stone Lanterns</h3>
                  <p className="text-xs text-gray-200 mt-1 opacity-90 font-sans">Where timber storefronts meet the Tokyo sky.</p>
                </div>
              </div>
            </div>
            
            {/* Clipped Field Note sticker */}
            <motion.div 
              initial={{ rotate: -2, y: 10 }}
              animate={{ rotate: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-[#C65A43] text-white p-5 rounded shadow-xl hidden sm:block max-w-[220px] border border-white/20"
            >
              <p className="font-serif-display text-base italic leading-snug">"Quiet moments in a restless megacity."</p>
              <span className="text-[10px] font-mono uppercase tracking-widest mt-2 block opacity-85">— Field Note 04</span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Section: Overview Chapters with Alternating Scroll Left/Right */}
      <section id="overview" className="py-28 bg-[#F4F0EA] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C65A43]">THE CURATED CHAPTERS</span>
            <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-[#2C2A29]">
              Navigating Daily Life & Culture
            </h2>
            <p className="text-[#6B635B] text-base md:text-lg font-sans">
              Structured insights designed for travelers, expatriates, and design enthusiasts seeking authentic depth.
            </p>
          </div>

          <div className="space-y-28">
            
            {/* Item 1: Scroll Left */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FBF9F5] p-8 md:p-12 rounded-xl border border-[#D8CFBF] shadow-sm"
            >
              <div className="lg:col-span-5 relative">
                <div className="rounded-lg overflow-hidden shadow border border-[#D8CFBF] aspect-[4/3] bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&q=80&w=1000" 
                    alt="Tokyo train station and transit" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-[#2C2A29] text-white text-[10px] font-mono px-3 py-1 rounded">
                  CHAPTER 01
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-[#C65A43] font-mono font-semibold text-xs tracking-widest uppercase">
                  <Train size={15} />
                  <span>Transit & Megacities</span>
                </div>
                <h3 className="font-serif-display text-3xl md:text-4xl font-bold text-[#2C2A29]">
                  Precision, Punctuality, and the Art of Quiet Commutes
                </h3>
                <p className="text-[#5A534B] text-base leading-relaxed font-sans">
                  Navigating the world's most sophisticated railway network is an exercise in mindfulness. From Shinkansen bullet trains gliding at 300 km/h with sub-second precision to local Yamanote loops, transit in Japan is seamlessly integrated into urban existence.
                </p>
                <ul className="space-y-2.5 text-sm text-[#5A534B] font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C65A43]" />
                    Suica & Pasmo digital integration on smartphones
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C65A43]" />
                    Etiquette rules: silent phone calls and queue discipline
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Item 2: Scroll Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FBF9F5] p-8 md:p-12 rounded-xl border border-[#D8CFBF] shadow-sm"
            >
              <div className="lg:col-span-7 space-y-6 lg:order-1 order-2">
                <div className="flex items-center gap-2 text-[#C65A43] font-mono font-semibold text-xs tracking-widest uppercase">
                  <Coffee size={15} />
                  <span>Culinary Rituals</span>
                </div>
                <h3 className="font-serif-display text-3xl md:text-4xl font-bold text-[#2C2A29]">
                  From Neighborhood Izakayas to Michelin-Starred Omakase
                </h3>
                <p className="text-[#5A534B] text-base leading-relaxed font-sans">
                  Japanese gastronomy is governed by seasonality (shun) and meticulous knife work. Whether grabbing a steaming bowl of tonkotsu ramen from a counter ticket machine or participating in a multi-course kaiseki dinner, every meal tells a story of craftsmanship.
                </p>
                <ul className="space-y-2.5 text-sm text-[#5A534B] font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C65A43]" />
                    Seasonal ingredients and regional specialties
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C65A43]" />
                    Dining customs: saying "Itadakimasu" and chopstick etiquette
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5 relative lg:order-2 order-1">
                <div className="rounded-lg overflow-hidden shadow border border-[#D8CFBF] aspect-[4/3] bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1000" 
                    alt="Japanese food and ramen culture" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-[#2C2A29] text-white text-[10px] font-mono px-3 py-1 rounded">
                  CHAPTER 02
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section: Cinematic Video Component */}
      <section id="video-section" className="py-28 bg-[#22201E] text-[#FBF9F5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C65A43_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8A89B]">CINEMATIC EXPERIENCE</span>
            <h2 className="font-serif-display text-4xl md:text-6xl font-bold tracking-tight">
              A Glimpse into Daily Life
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-sans">
              Watch our curated video preview capturing morning commuter flows, neon-lit alleyways in Shinjuku, and serene bamboo forests in Kyoto.
            </p>
          </div>

          {/* Video Player / Placeholder with Pop-in */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black aspect-video relative group"
          >
            {isPlayingVideo ? (
              <div className="w-full h-full flex items-center justify-center bg-zinc-950 relative">
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="Life in Japan Cinematic Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                <button 
                  onClick={() => setIsPlayingVideo(false)}
                  className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-black text-white p-2.5 rounded-full transition-colors border border-white/20"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full relative cursor-pointer" onClick={() => setIsPlayingVideo(true)}>
                <img 
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1600" 
                  alt="Kyoto bamboo forest cinematic backdrop" 
                  className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-between p-8 md:p-12">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#C65A43] text-white text-[11px] font-mono font-semibold px-3 py-1 rounded tracking-widest uppercase">
                      4K Field Footage
                    </span>
                    <span className="text-xs text-gray-300 font-mono">03:45 MIN</span>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#C65A43] text-white flex items-center justify-center mx-auto shadow-2xl transition-transform duration-300 group-hover:scale-110 border-2 border-white/20">
                      <Play size={32} className="ml-1 fill-current" />
                    </div>
                    <div>
                      <h3 className="font-serif-display text-2xl md:text-3xl font-bold">Echoes of the Floating World</h3>
                      <p className="text-sm text-gray-300 mt-1 font-sans">Click to play embedded cinematic tour preview</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-4 font-mono">
                    <span>Location: Kyoto & Tokyo</span>
                    <span>Soundtrack: Ambient Rain & Koto</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Section: Interactive Etiquette Quiz */}
      <section id="quiz" className="py-28 bg-[#F4F0EA] border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#FBF9F5] rounded-2xl p-8 md:p-12 shadow-xl border border-[#D8CFBF]">
            <div className="flex items-center gap-2 text-[#C65A43] font-mono font-semibold text-xs tracking-widest uppercase mb-3">
              <HelpCircle size={16} />
              <span>Interactive Field Quiz</span>
            </div>
            
            <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-[#2C2A29] mb-4">
              Do’s & Don’ts in Daily Japanese Life
            </h2>
            <p className="text-[#6B635B] text-base mb-8 font-sans">
              Test your cultural awareness before you travel or move. Here is a quick question from our daily etiquette module:
            </p>

            <div className="bg-[#F4F0EA] p-6 md:p-8 rounded-xl border border-[#E0D8C9] mb-6">
              <h3 className="font-medium text-lg text-[#2C2A29] mb-6">
                Question 1: What is the most appropriate customary greeting when meeting someone for the first time in a professional or formal social setting?
              </h3>

              <div className="space-y-3.5">
                {[
                  { text: "A firm handshake with direct eye contact", index: 0 },
                  { text: "A respectful bow (Ojigi) with slight eye aversion", index: 1 },
                  { text: "A casual wave and a warm smile", index: 2 }
                ].map((opt) => (
                  <button
                    key={opt.index}
                    disabled={quizSubmitted}
                    onClick={() => handleQuizSubmit(opt.index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between text-sm md:text-base ${
                      quizSubmitted 
                        ? opt.index === 1 
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium"
                          : quizAnswer === opt.index 
                            ? "bg-rose-50 border-rose-300 text-rose-900" 
                            : "bg-white border-[#E0D8C9] text-gray-400 opacity-60"
                        : "bg-white border-[#D8CFBF] hover:border-[#C65A43] text-[#2C2A29]"
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.index === 1 && (
                      <CheckCircle2 className="text-emerald-600 shrink-0 ml-2" size={20} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {quizSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#EFECE6] p-6 rounded-xl border border-[#D8CFBF] flex items-start gap-4"
              >
                <div className="p-2 bg-[#C65A43] text-white rounded-full mt-0.5 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-[#2C2A29]">Cultural Context Note</h4>
                  <p className="text-sm text-[#5A534B] leading-relaxed font-sans">
                    Bowing (Ojigi) shows humility and respect. The depth and duration depend on the relationship and social hierarchy. Handshakes are increasingly common in international business, but bowing remains the bedrock of Japanese greeting culture.
                  </p>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 border-[#C65A43] text-[#C65A43] hover:bg-[#C65A43] hover:text-white text-xs"
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswer(null);
                      }}
                    >
                      Reset Quiz
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Section: Archive Placeholders */}
      <section id="placeholder-grid" className="py-28 bg-[#FBF9F5] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C65A43]">Visual Archive & Placeholders</span>
              <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-[#2C2A29]">
                More Stories in Preparation
              </h2>
            </div>
            <p className="text-[#6B635B] max-w-md mt-4 md:mt-0 text-sm md:text-base font-sans">
              Reserved placeholder modules for upcoming photo essays, community stories, and interactive map tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-[#F4F0EA] border-[#D8CFBF] overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-[4/3] bg-[#EAE4D7] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=800" 
                    alt="Yanaka old Tokyo street" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2.5 py-1 rounded">
                    SLOT #04
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#C65A43] uppercase tracking-wider">Neighborhood Guide</span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2C2A29]">Yanaka & Old Tokyo</h3>
                  <p className="text-sm text-[#5A534B] font-sans">
                    A photographic walkthrough of Shitamachi districts where traditional wooden houses and artisan bakeries thrive.
                  </p>
                  <button 
                    onClick={() => toast("Feature coming soon: Yanaka photo essay full article.")}
                    className="text-xs font-mono font-bold text-[#2C2A29] flex items-center gap-1 hover:text-[#C65A43] pt-2 transition-colors"
                  >
                    <span>Read Preview</span>
                    <ArrowRight size={14} />
                  </button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-[#F4F0EA] border-[#D8CFBF] overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-[4/3] bg-[#EAE4D7] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" 
                    alt="Autumn momiji leaves" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2.5 py-1 rounded">
                    SLOT #05
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#C65A43] uppercase tracking-wider">Seasonal Rhythm</span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2C2A29]">Autumn Momiji & Onsens</h3>
                  <p className="text-sm text-[#5A534B] font-sans">
                    A visual guide to volcanic hot springs in Nagano and the crimson fire of maple leaves across mountain passes.
                  </p>
                  <button 
                    onClick={() => toast("Feature coming soon: Seasonal Onsen guide.")}
                    className="text-xs font-mono font-bold text-[#2C2A29] flex items-center gap-1 hover:text-[#C65A43] pt-2 transition-colors"
                  >
                    <span>Read Preview</span>
                    <ArrowRight size={14} />
                  </button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-[#F4F0EA] border-[#D8CFBF] overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-[4/3] bg-[#EAE4D7] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800" 
                    alt="Tokyo modern architecture" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2.5 py-1 rounded">
                    SLOT #06
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#C65A43] uppercase tracking-wider">Community Stories</span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2C2A29]">Expatriate Voices</h3>
                  <p className="text-sm text-[#5A534B] font-sans">
                    Unfiltered conversations with designers, architects, and creators who made Tokyo and Kyoto their permanent home.
                  </p>
                  <button 
                    onClick={() => toast("Feature coming soon: Community story submissions.")}
                    className="text-xs font-mono font-bold text-[#2C2A29] flex items-center gap-1 hover:text-[#C65A43] pt-2 transition-colors"
                  >
                    <span>Read Preview</span>
                    <ArrowRight size={14} />
                  </button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#22201E] text-[#FBF9F5] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#C65A43] flex items-center justify-center text-white font-serif font-bold text-lg">
                日
              </div>
              <span className="font-serif-display text-2xl font-bold tracking-wide">LIFE IN JAPAN</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-sans">
              An independent editorial project documenting the textures, rhythms, and quiet wonders of contemporary Japanese life.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8A89B]">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300 font-sans">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#video-section" className="hover:text-white transition-colors">Cinematic Tour</a></li>
              <li><a href="#quiz" className="hover:text-white transition-colors">Etiquette Quiz</a></li>
              <li><a href="#placeholder-grid" className="hover:text-white transition-colors">Archive Placeholders</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8A89B]">Project Status</h4>
            <p className="text-sm text-gray-300 font-sans">
              Foundation Release. Built with responsive layout, scroll animations, video section, and interactive quiz teaser.
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-white/10 text-[11px] font-mono text-[#E8A89B]">
                Version 1.0.0-release
              </span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-mono">
          <p>© 2026 Life in Japan Editorial Project. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" onClick={(e) => { e.preventDefault(); toast("Privacy policy viewable on full release."); }} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast("Terms of service viewable on full release."); }} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast("Editorial contact info: editor@lifeinjapan.guide"); }} className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
