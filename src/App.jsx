import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Methodology from './components/Methodology.jsx';
import KnowledgeBanner from './components/KnowledgeBanner.jsx';
import Courses from './components/Courses.jsx';
import LanguageBanner from './components/LanguageBanner.jsx';
import GalleryCarousel from './components/GalleryCarousel.jsx';
import Testimonials from './components/Testimonials.jsx';
import VideoCarousel from './components/VideoCarousel.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import FloatingContact from './components/FloatingContact.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-ec-canvas text-ec-text-main font-sans antialiased selection:bg-ec-blue-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Methodology />
        <KnowledgeBanner />
        <Courses />
        <LanguageBanner />
        <GalleryCarousel />
        <Testimonials />
        <VideoCarousel />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
