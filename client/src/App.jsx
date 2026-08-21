import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuizHome from './pages/QuizHome';
import QuizPage from './pages/QuizPage';
import QuizResult from './pages/QuizResult';
import PuzzleHome from './pages/PuzzleHome';
import GarbagePuzzle from './pages/GarbagePuzzle';
import MannersGame from './pages/MannersGame';
import PackingGame from './pages/PackingGame';
import SurvivalMission from './pages/SurvivalMission';
import MemoryGame from './pages/MemoryGame';
import CultureGame from './pages/CultureGame';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key")
}

const UserSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const hasSynced = React.useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !hasSynced.current) {
      const syncUserToDb = async () => {
        try {
          hasSynced.current = true; // Mark as synced to prevent multiple calls
          await fetch('http://localhost:5000/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImageUrl: user.imageUrl,
            }),
          });
          console.log("User successfully synced to backend!");
        } catch (error) {
          console.error("Error syncing user to backend:", error);
          hasSynced.current = false; // Reset if failed so it can try again
        }
      };
      syncUserToDb();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
};

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <UserSync />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lifestyle" element={<div style={{padding: '8rem 2rem', textAlign: 'center'}}>Lifestyle</div>} />
            <Route path="/learn-japanese" element={<QuizHome />} />
            <Route path="/learn-japanese/:level" element={<QuizPage />} />
            <Route path="/learn-japanese/result" element={<QuizResult />} />
            <Route path="/puzzles" element={<PuzzleHome />} />
            <Route path="/puzzles/garbage" element={<GarbagePuzzle />} />
            <Route path="/puzzles/manners" element={<MannersGame />} />
            <Route path="/puzzles/packing" element={<PackingGame />} />
            <Route path="/puzzles/survival" element={<SurvivalMission />} />
            <Route path="/puzzles/memory" element={<MemoryGame />} />
            <Route path="/puzzles/culture" element={<CultureGame />} />
            <Route path="/garbage-collection" element={<GarbagePuzzle />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
