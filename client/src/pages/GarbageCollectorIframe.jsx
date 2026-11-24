import { useEffect, useState } from 'react';

function GarbageCollectorIframe() {
  const [city, setCity] = useState(localStorage.getItem('selectedCity') || 'Tokyo');
  const apiBase = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    // Scroll to top on mount just in case
    window.scrollTo(0, 0);

    const handleCityChange = () => {
      setCity(localStorage.getItem('selectedCity') || 'Tokyo');
    };

    window.addEventListener('cityChanged', handleCityChange);
    return () => window.removeEventListener('cityChanged', handleCityChange);
  }, []);

  const iframeSrc = `/garbage_collector/index.html?city=${encodeURIComponent(city)}${apiBase ? `&api=${encodeURIComponent(apiBase)}` : ''}`;

  return (
    <div className="w-full min-h-[calc(100vh-70px)] pt-[70px] relative">
      <iframe 
        src={iframeSrc} 
        title="Garbage Collector Gamification"
        className="w-full min-h-[calc(100vh-70px)] border-none bg-white block"
        allow="camera"
      />
    </div>
  );
}

export default GarbageCollectorIframe;
