import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key")
}

const UserSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const syncUserToDb = async () => {
        try {
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
            <Route path="/quiz" element={<div style={{padding: '8rem 2rem', textAlign: 'center'}}>Quiz</div>} />
            <Route path="/garbage-collection" element={<div style={{padding: '8rem 2rem', textAlign: 'center'}}>Garbage Collection</div>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
