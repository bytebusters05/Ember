import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CommunityFeed from './components/CommunityFeed';
import CrisisSupportBanner from './components/CrisisSupportBanner';
import WellnessChatbot from '../../components/WellnessChatbot';

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userDistressLevel, setUserDistressLevel] = useState('normal');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const savedDistressLevel = localStorage.getItem('userDistressLevel') || 'normal';
    setUserDistressLevel(savedDistressLevel);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginJourney = () => {
    console.log('Starting user journey with mood assessment');
    navigate('/chat-interface');
  };

  const handleExploreResources = () => {
    navigate('/resource-library');
  };

  const handleFeatureClick = (route) => navigate(route);
  const handleViewCommunity = () => navigate('/community-garden');

  const getAdaptiveStyles = () => {
    switch (userDistressLevel) {
      case 'crisis':
        return {
          backgroundColor: 'var(--color-error)',
          primaryColor: 'var(--color-error)',
          secondaryColor: 'var(--color-warning)',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--color-warning)',
          primaryColor: '#f29819',
          secondaryColor: '#f29819',
        };
      default:
        return {
          backgroundColor: 'var(--color-background)',
          primaryColor: '#f29819',
          secondaryColor: '#f29819',
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#f29819] rounded-2xl flex items-center justify-center breathing-pulse shadow-lg mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading Ember</h2>
          <p className="text-muted-foreground">Preparing your wellness journey...</p>
        </div>
      </div>
    );
  }

  const adaptiveStyles = getAdaptiveStyles();

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        '--adaptive-primary': adaptiveStyles?.primaryColor,
        '--adaptive-secondary': adaptiveStyles?.secondaryColor,
      }}
    >
      <Header />
      <main className="pt-16">
        <HeroSection
          onBeginJourney={handleBeginJourney}
          onExploreResources={handleExploreResources}
        />
        <TrustBar />
        <FeaturesSection onFeatureClick={handleFeatureClick} />
        <TestimonialsSection />
        <CommunityFeed onViewCommunity={handleViewCommunity} />

        <footer className="bg-card border-t border-border py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <img src="public/assets/images/logo_ember.png" alt="" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Ember</h3>
                    <p className="text-sm text-muted-foreground">Your Thoughtful Companion</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transforming mental wellness through compassionate AI technology 
                  and evidence-based therapeutic approaches.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/wellness-dashboard" className="text-muted-foreground hover:text-[#f29819] transition-colors">Dashboard</a></li>
                  <li><a href="/chat-interface" className="text-muted-foreground hover:text-[#f29819] transition-colors">Chat Interface</a></li>
                  <li><a href="/resource-library" className="text-muted-foreground hover:text-[#f29819] transition-colors">Resources</a></li>
                  <li><a href="/community-garden" className="text-muted-foreground hover:text-[#f29819] transition-colors">Community</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/professional-connect" className="text-muted-foreground hover:text-[#f29819] transition-colors">Find a Therapist</a></li>
                  <li>
  <button
    onClick={() => window.location.href = "tel:112"}
    className="text-muted-foreground hover:text-[#f29819] transition-colors"
  >
    Crisis Support (112)
  </button>
</li>

                  <li><a href="/contact" className="text-muted-foreground hover:text-[#f29819] transition-colors">Help Center</a></li>
                  <li><a href="/contact" className="text-muted-foreground hover:text-[#f29819] transition-colors">Contact Us</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="public/assets/words/Privacy Policy.docx" className="text-muted-foreground hover:text-[#f29819] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-[#f29819] transition-colors">Terms of Service</a></li>
                 
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Ember. All rights reserved by ByteBusters.
              </p>
              <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                {/* Social icons */}
                {['Twitter','LinkedIn','Instagram'].map((platform, idx) => (
                  <a key={idx} href="#" className="text-muted-foreground hover:text-[#f29819] transition-colors">
                    <span className="sr-only">{platform}</span>
                    {/* SVG icons can remain the same */}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

<WellnessChatbot userDistressLevel={userDistressLevel} />
      <CrisisSupportBanner />
    </div>
  );
};
export default Homepage;
