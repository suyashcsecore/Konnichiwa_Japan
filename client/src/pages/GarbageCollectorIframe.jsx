import { useEffect, useState } from 'react';

function GarbageCollectorIframe() {
  const [city, setCity] = useState(localStorage.getItem('selectedCity') || 'Tokyo');

  useEffect(() => {
    // Scroll to top on mount just in case
    window.scrollTo(0, 0);

    const handleCityChange = () => {
      setCity(localStorage.getItem('selectedCity') || 'Tokyo');
    };

    window.addEventListener('cityChanged', handleCityChange);
    return () => window.removeEventListener('cityChanged', handleCityChange);
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-70px)] pt-[70px] relative">
      <iframe 
        src={`/garbage_collector/index.html?city=${encodeURIComponent(city)}`} 
        title="Garbage Collector Gamification"
        className="w-full min-h-[calc(100vh-70px)] border-none bg-white block"
        allow="camera"
      />
    </div>
  );
}

export default GarbageCollectorIframe;
