import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import QuizHome from './pages/QuizHome';
import QuizPage from './pages/QuizPage';
import QuizResult from './pages/QuizResult';
import Lifestyle from './pages/Lifestyle';
import HealthHome from './pages/HealthHome';
import GarbageCollectorIframe from './pages/GarbageCollectorIframe';
import PuzzleHome from './pages/PuzzleHome';
import GarbagePuzzle from './pages/GarbagePuzzle';
import MannersGame from './pages/MannersGame';
import PackingGame from './pages/PackingGame';
import SurvivalMission from './pages/SurvivalMission';
import MemoryGame from './pages/MemoryGame';
import CultureGame from './pages/CultureGame';
import HealthPassport from './pages/HealthPassport';
import MedicalTranslator from './pages/MedicalTranslator';
import DoctorCommunication from './pages/DoctorCommunication';
import EmergencyCard from './pages/EmergencyCard';
import MedicalHistory from './pages/MedicalHistory';
import QRMedicalCard from "./pages/QRMedicalCard";
import HospitalFinder from "./pages/HospitalFinder";
import HospitalVisitGuide from "./pages/HospitalVisitGuide";
import './index.css';
import './health.css';

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
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/health" element={<HealthHome />} />
            <Route path="/health/passport" element={<HealthPassport />} />
            <Route path="/health/translator" element={<MedicalTranslator />} />
            <Route path="/health/doctor" element={<DoctorCommunication />} />
            <Route path="/health/emergency" element={<EmergencyCard />} />
            <Route path="/health/history" element={<MedicalHistory />} />
            <Route path="/learn-japanese" element={<QuizHome />} />
            <Route path="/learn-japanese/:level" element={<QuizPage />} />
            <Route path="/learn-japanese/result" element={<QuizResult />} />
            <Route path="/puzzles" element={<PuzzleHome />} />
            <Route path="/garbage-collector" element={<GarbageCollectorIframe />} />
            <Route path="/puzzles/garbage" element={<GarbagePuzzle />} />
            <Route path="/puzzles/manners" element={<MannersGame />} />
            <Route path="/puzzles/packing" element={<PackingGame />} />
            <Route path="/puzzles/survival" element={<SurvivalMission />} />
            <Route path="/puzzles/memory" element={<MemoryGame />} />
            <Route path="/puzzles/culture" element={<CultureGame />} />
            <Route path="/garbage-collection" element={<GarbagePuzzle />} />
            <Route
                path="/health/qr-card"
                element={<QRMedicalCard />}
            />
            <Route
            path="/health/hospitals"
            element={<HospitalFinder />}
            />
            <Route
  path="/health/hospital-guide"
  element={<HospitalVisitGuide />}
/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
