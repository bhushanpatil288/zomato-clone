import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  HeroSection,
  StatsBarSection,
  CategoriesSection,
  OffersSection,
  PopularRestaurantsSection,
  HowItWorksSection,
  ZomatoGoldBanner,
  CitiesSection,
  TestimonialsSection,
  NewsLetterSections,
} from '../components/HomePage/';

/* ─── HOME PAGE ───────────────────────────────────────── */
export default function HomePage() {

  const dark = useSelector(state => state.theme.dark);

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:ital,wght@0,700;0,900;1,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div style={{ fontFamily: '\'Outfit\', sans-serif' }} className={dark ? 'dark' : ''}>
      <div className="bg-[#f8f8f8] dark:bg-[#0f0f0f] text-gray-900 dark:text-white">
        <HeroSection />

        <StatsBarSection />

        <CategoriesSection />

        <OffersSection />

        <PopularRestaurantsSection />

        <HowItWorksSection />

        <ZomatoGoldBanner />

        <CitiesSection />

        <TestimonialsSection />

        <NewsLetterSections />

      </div>
    </div>
  );
}
