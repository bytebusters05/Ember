import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onBeginJourney, onExploreResources }) => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [currentSeason, setCurrentSeason] = useState('summer');

  useEffect(() => {
    const now = new Date();
    const hour = now?.getHours();
    const month = now?.getMonth();

    // Determine time of day
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay('afternoon');
    } else if (hour >= 17 && hour < 21) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }

    // Determine season
    if (month >= 2 && month <= 4) {
      setCurrentSeason('spring');
    } else if (month >= 5 && month <= 7) {
      setCurrentSeason('summer');
    } else if (month >= 8 && month <= 10) {
      setCurrentSeason('autumn');
    } else {
      setCurrentSeason('winter');
    }
  }, []);

  const getHeroContent = () => {
    const isEvening = timeOfDay === 'evening' || timeOfDay === 'night';
    
    return {
      title: isEvening ? 'Reflect and Recharge' : 'Start Your Day Mindfully',
      subtitle: isEvening 
        ? 'End your day with intention and peaceful reflection' :'Begin each moment with clarity and gentle awareness',
      image: isEvening 
        ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center'
        : 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop&crop=center',
      gradient: isEvening 
        ? 'from-purple-900/20 via-blue-900/30 to-indigo-900/40' :'from-orange-200/30 via-yellow-200/20 to-pink-200/30'
    };
  };

  const heroContent = getHeroContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-therapeutic-primary/5 to-therapeutic-secondary/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={heroContent?.image}
            alt={`${timeOfDay} wellness background`}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${heroContent?.gradient}`}></div>
          <div className="absolute inset-0 bg-background/20"></div>
        </div>
      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-therapeutic-primary/10 rounded-full organic-shape"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-therapeutic-secondary/15 rounded-full organic-shape" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-trust-builder/20 rounded-full organic-shape" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-conversion-accent/10 rounded-full organic-shape" style={{ animationDelay: '6s' }}></div>
      </div>
      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-therapeutic-primary rounded-2xl flex items-center justify-center breathing-pulse shadow-therapeutic">
            <img src="public/assets/images/Ember.png" alt="" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Ember</h1>
              <p className="text-lg text-muted-foreground">Your Thoughtful Companion</p>
            </div>
          </div>

          {/* Hero Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {heroContent?.title}
          </h2>

          {/* Hero Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroContent?.subtitle}
          </p>

          {/* Seasonal Message */}
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 mb-12 shadow-gentle">
            <Icon name="Leaf" size={20} className="text-therapeutic-primary" />
            <span className="text-sm font-medium text-foreground">
              {currentSeason === 'winter' && 'Winter wellness support available'}
              {currentSeason === 'spring' && 'Spring renewal and growth focus'}
              {currentSeason === 'summer' && 'Summer balance and energy guidance'}
              {currentSeason === 'autumn' && 'Autumn reflection and preparation'}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              variant="default"
              size="lg"
              onClick={onBeginJourney}
              className="bg-therapeutic-primary hover:bg-therapeutic-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-therapeutic hover-lift"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
            >
              Begin Your Journey
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onExploreResources}
              className="border-therapeutic-primary text-therapeutic-primary hover:bg-therapeutic-primary hover:text-white px-8 py-4 text-lg font-semibold hover-lift"
              iconName="BookOpen"
              iconPosition="left"
              iconSize={20}
            >
              Explore Resources
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-therapeutic-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Crisis Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-therapeutic-primary mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Users Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-therapeutic-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Licensed Therapists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-therapeutic-primary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm text-muted-foreground">Discover More</span>
          <Icon name="ChevronDown" size={24} className="text-therapeutic-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;