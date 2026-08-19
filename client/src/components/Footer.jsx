import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 py-20 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-japan-red to-transparent opacity-50"></div>

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link to="/" className="group flex items-center gap-3 no-underline mb-6">
              <div className="w-7 h-7 rounded-full bg-japan-red shrink-0 shadow-[0_2px_10px_rgba(230,0,18,0.3)] transition-transform duration-300 group-hover:scale-110"></div>
              <span className="text-3xl font-bold tracking-tight text-white">
                Konnichiwa <span className="text-japan-red">Japan</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed pr-4">
              Your ultimate guide to the Japanese lifestyle, culture, and moving to Japan. Experience the soul of the Rising Sun.
            </p>
            <div className="flex gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-japan-red/50 hover:text-white transition-all cursor-pointer text-sm">Twitter</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-japan-red/50 hover:text-white transition-all cursor-pointer text-sm">Instagram</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-japan-red/50 hover:text-white transition-all cursor-pointer text-sm">Email</span>
            </div>
          </div>

          {/* Links Col */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/lifestyle" className="hover:text-japan-red transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-japan-red/0 group-hover:bg-japan-red transition-all"></span>Lifestyle</Link></li>
              <li><Link to="/quiz" className="hover:text-japan-red transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-japan-red/0 group-hover:bg-japan-red transition-all"></span>Culture Quiz</Link></li>
              <li><Link to="/garbage-collection" className="hover:text-japan-red transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-japan-red/0 group-hover:bg-japan-red transition-all"></span>Garbage Rules</Link></li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Resources</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="hover:text-japan-red transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-japan-red/0 group-hover:bg-japan-red transition-all"></span>Visa Guide</a></li>
              <li><a href="#" className="hover:text-japan-red transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-japan-red/0 group-hover:bg-japan-red transition-all"></span>Language</a></li>
              <li><a href="#" className="hover:text-japan-red transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-japan-red/0 group-hover:bg-japan-red transition-all"></span>Housing</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Join the Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">Get the latest insights on moving to and living in Japan delivered straight to your inbox.</p>
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 overflow-hidden focus-within:border-japan-red/50 focus-within:bg-white/10 transition-all">
              <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-white px-4 w-full text-sm placeholder:text-gray-600" />
              <button className="bg-japan-red text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:bg-japan-red-hover transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Konnichiwa Japan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
