import { useEffect } from 'react';

function GarbageCollectorIframe() {
  useEffect(() => {
    // Scroll to top on mount just in case
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <iframe 
        src="/garbage_collector/index.html" 
        title="Garbage Collector Gamification"
        className="w-full h-full border-none absolute inset-0"
        allow="camera"
      />
    </div>
  );
}

export default GarbageCollectorIframe;
