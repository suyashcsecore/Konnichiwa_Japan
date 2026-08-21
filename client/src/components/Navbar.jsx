import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-gray-900' : 'text-gray-600';
  };

  return (
    <nav className="fixed top-0 w-full z-50 py-4 bg-white/85 backdrop-blur-md border-b border-japan-red/15">
      <div className="w-full px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="group flex items-center gap-3 no-underline">
          <div className="w-7 h-7 rounded-full bg-japan-red shrink-0 shadow-[0_2px_10px_rgba(230,0,18,0.3)] transition-transform duration-300 group-hover:scale-110"></div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Konnichiwa <span className="text-japan-red">Japan</span>
          </span>
        </Link>
        
        <div className="flex gap-8 items-center">
          <Link to="/" className={`font-medium transition-colors duration-200 hover:text-gray-900 ${isActive('/')}`}>Home</Link>
          <Link to="/lifestyle" className={`font-medium transition-colors duration-200 hover:text-gray-900 ${isActive('/lifestyle')}`}>Lifestyle</Link>
          <Link to="/quiz" className={`font-medium transition-colors duration-200 hover:text-gray-900 ${isActive('/quiz')}`}>Quiz</Link>
          <Link to="/garbage-collection" className={`font-medium transition-colors duration-200 hover:text-gray-900 ${isActive('/garbage-collection')}`}>Garbage Collection</Link>
        </div>

        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 text-gray-900 border border-japan-red/15 bg-transparent hover:bg-black/5">Log in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-5 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 bg-japan-red text-white border-none hover:bg-japan-red-hover hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(230,0,18,0.3)]">Sign up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium text-sm hidden sm:inline-block">Welcome, {user?.firstName || 'Traveler'}</span>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
