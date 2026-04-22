import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Hero from '../components/hero/Hero';
import FeaturedDrops from '../components/sections/FeaturedDrops';
import Collections from '../components/sections/Collections';
import DropCalendar from '../components/sections/DropCalendar';
import Syndicate from '../components/sections/Syndicate';
import CTA from '../components/sections/CTA';
import MarqueeBand from '../components/sections/MarqueeBand';
import TechSpecs from '../components/sections/TechSpecs';
import EditorialGrid from '../components/sections/EditorialGrid';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle Hash Navigation on Mount
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // slight delay to let lenis compute bounds
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <main className="relative bg-vault-black min-h-screen">
      <Hero />
      <MarqueeBand />
      <FeaturedDrops />
      <TechSpecs />
      <Collections />
      <MarqueeBand />
      <DropCalendar />
      <Syndicate />
      <EditorialGrid />
      <CTA />
    </main>
  );
}
