import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Compass, Camera, Wind } from 'lucide-react';
import fuji from '../assets/fuji.jpg';
import pagoda from '../assets/pagoda.jpg';
import torii from '../assets/torii.jpg';
import leaves from '../assets/leaves.jpg';
import village from '../assets/village.jpg';
import bamboo from '../assets/bamboo.jpg';
import spring from '../assets/spring.jpg';
import summer from '../assets/summer.jpg';
import autumn from '../assets/autumn.jpg';
import winter from '../assets/winter.jpg';
import food from '../assets/food.jpg';
import tokyo from '../assets/tokyo.jpg';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#FFF5F7]">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={village} 
            alt="Traditional Japanese Village" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-japan-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-japan-red"></span>
            </span>
            <span className="text-white/90 font-medium text-xs tracking-[0.2em] uppercase">
              Welcome to Japan
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Experience the <span className="text-japan-red">Soul</span> of the Rising Sun
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md">
            "A journey of a thousand miles begins with a single step." Discover the perfect harmony between ancient tradition and modern innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/lifestyle" className="flex items-center gap-2 px-8 py-4 rounded-full bg-japan-red text-white font-medium hover:bg-japan-red-hover transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(230,0,18,0.4)]">
              Explore Lifestyle <ArrowRight size={20} />
            </Link>
            <Link to="/learn-japanese" className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/20 text-white font-medium backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
              Take the Culture Quiz
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto relative">
        {/* Decorative Background Glows */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-japan-red/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="text-center mb-20 relative">
          <span className="text-japan-red font-semibold tracking-[0.2em] uppercase text-sm mb-3 block">Discover</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Captivating Beauty</h2>
          <div className="w-12 h-1 bg-japan-red mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Immerse yourself in breathtaking landscapes that have inspired poets and artists for centuries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img src={pagoda} alt="Nachi Falls and Pagoda" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 relative">
              <div className="absolute -top-6 right-6 w-12 h-12 bg-japan-red text-white rounded-full flex items-center justify-center shadow-lg">
                <Compass size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sacred Harmony</h3>
              <p className="text-gray-600 italic mb-4">"Where the roar of the waterfall meets the silence of the temple."</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Discover the deep spiritual connection of the Japanese people with nature. Ancient pagodas standing resilient amidst lush forests and thunderous waterfalls represent the perfect balance.
              </p>
              <button className="text-japan-red font-semibold flex items-center gap-1 hover:gap-2 transition-all">Read more <ArrowRight size={16} /></button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 lg:translate-y-8">
            <div className="h-64 overflow-hidden">
              <img src={torii} alt="Fushimi Inari Torii Gates" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 relative">
              <div className="absolute -top-6 right-6 w-12 h-12 bg-japan-red text-white rounded-full flex items-center justify-center shadow-lg">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pathways of the Gods</h3>
              <p className="text-gray-600 italic mb-4">"A thousand vermilion gates leading to the divine."</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Walk through the mesmerizing Torii gates of Kyoto. Each gate represents a prayer or a thankfulness, painting a striking vermilion path against the wooded mountainside.
              </p>
              <button className="text-japan-red font-semibold flex items-center gap-1 hover:gap-2 transition-all">Explore Kyoto <ArrowRight size={16} /></button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img src={leaves} alt="Autumn Leaves at a Temple" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 relative">
              <div className="absolute -top-6 right-6 w-12 h-12 bg-japan-red text-white rounded-full flex items-center justify-center shadow-lg">
                <Camera size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Momiji Seasons</h3>
              <p className="text-gray-600 italic mb-4">"The fleeting beauty of autumn leaves ablaze."</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Experience 'Momijigari', the tradition of hunting for autumn colors. The crisp air and the vibrant tapestry of red and gold leaves bring a poetic, melancholy beauty to the historic temples.
              </p>
              <button className="text-japan-red font-semibold flex items-center gap-1 hover:gap-2 transition-all">View Gallery <ArrowRight size={16} /></button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 lg:translate-y-8">
            <div className="h-64 overflow-hidden">
              <img src={bamboo} alt="Arashiyama Bamboo Grove" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 relative">
              <div className="absolute -top-6 right-6 w-12 h-12 bg-japan-red text-white rounded-full flex items-center justify-center shadow-lg">
                <Wind size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Whispering Woods</h3>
              <p className="text-gray-600 italic mb-4">"Listen to the ancient voices in the swaying stalks."</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Step into the otherworldly Arashiyama Bamboo Grove. As the wind passes through the densely packed stalks, it creates a serene, natural melody recognized as one of the Soundscapes of Japan.
              </p>
              <button className="text-japan-red font-semibold flex items-center gap-1 hover:gap-2 transition-all">Listen now <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Majestic Fuji Section */}
      <section className="w-full bg-[#FFFcfc] py-32 relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-japan-red/5 whitespace-nowrap pointer-events-none select-none z-0">
          富士山
        </div>
        
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative group">
            <img src={fuji} alt="Mount Fuji" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-japan-red font-semibold tracking-[0.2em] uppercase text-sm mb-3 block">Symbol of Japan</span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Majestic <br /><span className="text-japan-red">Mount Fuji</span>
            </h2>
            <div className="w-12 h-1 bg-japan-red mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
              Rising 3,776 meters into the sky, Fuji-san is not just Japan's highest peak—it is a cultural icon, a spiritual sanctuary, and an eternal muse for artists and poets.
            </p>
            <p className="text-gray-500 italic border-l-4 border-japan-red/40 pl-6 mb-10 text-lg">
              "He who climbs Mt. Fuji once is a wise man; he who climbs it twice is a fool." <br />
              <span className="text-sm font-medium text-gray-400 not-italic mt-2 block">— Japanese Proverb</span>
            </p>
            <div className="flex flex-wrap items-center gap-8 bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">3,776<span className="text-sm text-gray-500 font-normal">m</span></div>
                <div className="text-xs uppercase tracking-widest text-japan-red font-semibold mt-1">Elevation</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1707</div>
                <div className="text-xs uppercase tracking-widest text-japan-red font-semibold mt-1">Last Eruption</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 text-japan-red">UNESCO</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">World Heritage</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Seasons Section */}
      <section className="w-full bg-[#FFF5F7] py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-japan-red font-semibold tracking-[0.2em] uppercase text-sm mb-3 block">Four Faces of Japan</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Rhythm of the Seasons</h2>
            <div className="w-12 h-1 bg-japan-red mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">From the ephemeral pink canopy of spring to the silent white blankets of winter, Japan completely transforms four times a year.</p>
          </div>

          <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] w-full gap-4">
            {/* Spring */}
            <div className="group relative flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <img src={spring} alt="Spring" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-japan-red/90 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 lg:-translate-x-4 lg:group-hover:translate-x-0">春</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white whitespace-nowrap drop-shadow-md">Spring</h3>
                </div>
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-lg mt-2 font-light lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      The fleeting beauty of sakura blooming across the nation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summer */}
            <div className="group relative flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <img src={summer} alt="Summer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-japan-red/90 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 lg:-translate-x-4 lg:group-hover:translate-x-0">夏</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white whitespace-nowrap drop-shadow-md">Summer</h3>
                </div>
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-lg mt-2 font-light lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      Vibrant matsuri festivals, fireworks, and lush green mountains.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Autumn */}
            <div className="group relative flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <img src={autumn} alt="Autumn" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-japan-red/90 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 lg:-translate-x-4 lg:group-hover:translate-x-0">秋</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white whitespace-nowrap drop-shadow-md">Autumn</h3>
                </div>
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-lg mt-2 font-light lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      A fiery landscape of red and gold momiji leaves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Winter */}
            <div className="group relative flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <img src={winter} alt="Winter" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-japan-red/90 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 lg:-translate-x-4 lg:group-hover:translate-x-0">冬</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white whitespace-nowrap drop-shadow-md">Winter</h3>
                </div>
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-lg mt-2 font-light lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      Silent, pristine snowscapes blanketing traditional villages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Section */}
      <section className="w-full bg-gray-950 text-white py-32 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-japan-red/10 to-transparent pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 relative z-10">
          <div className="w-full lg:w-1/2">
            <span className="text-japan-red font-semibold tracking-[0.2em] uppercase text-sm mb-3 block">Washoku</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              A Taste of <br />Tradition
            </h2>
            <div className="w-12 h-1 bg-japan-red mb-8 rounded-full"></div>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
              Recognized as an Intangible Cultural Heritage by UNESCO, traditional Japanese cuisine is based on a deep respect for nature and the changing seasons.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
              From the meticulous preparation of Edomae sushi to the soul-warming umami of ramen, every dish tells a story of centuries of perfection.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="px-6 py-3 border border-gray-800 rounded-full text-sm font-medium tracking-widest uppercase hover:border-japan-red hover:bg-japan-red/10 hover:text-japan-red transition-all duration-300 cursor-pointer">
                Sushi (寿司)
              </div>
              <div className="px-6 py-3 border border-gray-800 rounded-full text-sm font-medium tracking-widest uppercase hover:border-japan-red hover:bg-japan-red/10 hover:text-japan-red transition-all duration-300 cursor-pointer">
                Ramen (ラーメン)
              </div>
              <div className="px-6 py-3 border border-gray-800 rounded-full text-sm font-medium tracking-widest uppercase hover:border-japan-red hover:bg-japan-red/10 hover:text-japan-red transition-all duration-300 cursor-pointer">
                Matcha (抹茶)
              </div>
              <div className="px-6 py-3 border border-gray-800 rounded-full text-sm font-medium tracking-widest uppercase hover:border-japan-red hover:bg-japan-red/10 hover:text-japan-red transition-all duration-300 cursor-pointer">
                Wagyu (和牛)
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer transition-shadow duration-700 hover:shadow-[0_20px_80px_rgba(230,0,18,0.2)]">
              <img src={food} alt="Sushi" className="w-full h-[500px] object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent transition-opacity duration-700 group-hover:opacity-70"></div>
              <div className="absolute bottom-8 left-8 transition-transform duration-700 ease-out group-hover:-translate-y-2">
                <div className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-1 transition-colors duration-500 group-hover:text-japan-red">Delicacy</div>
                <div className="text-2xl font-bold drop-shadow-md">The Art of Sushi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokyo Neon Section */}
      <section className="group relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={tokyo} alt="Tokyo Neon" className="w-full h-full object-cover scale-105 transition-transform duration-[15000ms] ease-out group-hover:scale-125" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-transparent to-gray-950/80 transition-opacity duration-1000 group-hover:opacity-60"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[900px] px-8 transition-transform duration-1000 ease-out group-hover:-translate-y-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 p-12 md:p-16 rounded-[3rem] text-center shadow-[0_8px_32px_rgba(0,0,0,0.37)] w-full relative overflow-hidden transition-all duration-1000 group-hover:bg-white/10 group-hover:shadow-[0_0_80px_rgba(230,0,18,0.4)] group-hover:border-white/40">
            {/* Decorative Top Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-japan-red to-transparent transition-all duration-1000 group-hover:w-full group-hover:via-red-400"></div>
            
            <div className="flex justify-center gap-4 mb-6 text-japan-red font-semibold text-xs tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-red-400">
              <span>Technology</span> • <span>Fashion</span> • <span>Nightlife</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-700 group-hover:tracking-tight">
              TOKYO <span className="text-japan-red font-light transition-colors duration-700 group-hover:text-red-400">NIGHTS</span>
            </h2>
            <div className="text-white/40 text-xl md:text-2xl tracking-[0.8em] mb-10 font-light uppercase ml-4 transition-all duration-700 group-hover:tracking-[1.2em] group-hover:text-white/80">東京の夜</div>
            
            <p className="text-lg text-white/80 mb-12 font-light leading-relaxed max-w-2xl mx-auto transition-opacity duration-700 group-hover:text-white">
              Step into the future where ancient traditions seamlessly blend with electric energy. Discover towering skyscrapers, cutting-edge technology, and hidden alleyway izakayas that define the world's most vibrant metropolis.
            </p>
            
            <Link to="/lifestyle" className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold transition-all duration-500 bg-white text-black hover:bg-japan-red hover:text-white hover:scale-110 hover:shadow-[0_0_40px_rgba(230,0,18,0.8)]">
              Discover Lifestyle <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* Quote Section */}
      <section className="w-full bg-gradient-to-br from-[#b31b27] to-[#7a0f18] py-20 px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <svg className="w-12 h-12 text-white/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-2xl md:text-4xl text-white font-medium leading-relaxed mb-6">
            Japan is not just a destination; it's a feeling. It's the tranquility of a Zen garden, the neon pulse of Tokyo, and the timeless grace of its people.
          </p>
          <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
