import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrisisSupportBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleCrisisSupport = () => {
    console.log('Crisis support activated');
    // In a real app, this would trigger crisis intervention protocols
  };

  const handleEmergencyCall = () => {
    console.log('Emergency services contacted');
    // In a real app, this would initiate emergency contact
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-accent text-white shadow-2xl border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center breathing-pulse">
              <Icon name="Phone" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">24/7 Crisis Support Available</h3>
              <p className="text-white/80 text-sm">
                Immediate help is always here when you need it most
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-white/80 text-sm">
              <Icon name="Clock" size={16} />
              <span>Available now • {formatTime(currentTime)}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpanded}
              className="border-white/30 text-white hover:bg-white/10"
              iconName={isExpanded ? "ChevronDown" : "ChevronUp"}
              iconPosition="right"
              iconSize={16}
            >
              {isExpanded ? 'Less Info' : 'More Info'}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handleCrisisSupport}
              className="bg-white text-accent hover:bg-white/90 font-semibold"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Get Help Now
            </Button>

            <button
              onClick={() => setIsVisible(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            >
              <Icon name="X" size={16} color="white" />
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pb-6 border-t border-white/20 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Immediate Support */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <Icon name="Zap" size={18} />
                  <span>Immediate Support</span>
                </h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={handleCrisisSupport}
                    className="border-white/30 text-white hover:bg-white/10 justify-start"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Chat with Crisis Counselor
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={handleEmergencyCall}
                    className="border-white/30 text-white hover:bg-white/10 justify-start"
                    iconName="Phone"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Call Crisis Hotline
                  </Button>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={18} />
                  <span>Emergency Contacts</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>National Suicide Prevention:</span>
                    <span className="font-mono">988</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crisis Text Line:</span>
                    <span className="font-mono">Text HOME to 741741</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Emergency Services:</span>
                    <span className="font-mono">911</span>
                  </div>
                </div>
              </div>

              {/* Quick Coping Tools */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <Icon name="Heart" size={18} />
                  <span>Quick Coping Tools</span>
                </h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="border-white/30 text-white hover:bg-white/10 justify-start"
                    iconName="Wind"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Breathing Exercise
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="border-white/30 text-white hover:bg-white/10 justify-start"
                    iconName="Anchor"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Grounding Technique
                  </Button>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-white flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/90">
                  <p className="font-medium mb-1">Important Notice:</p>
                  <p>
                    If you're experiencing thoughts of self-harm or suicide, please reach out immediately. You're not alone, and help is available 24/7. Our crisis counselors are trained professionals 
                    ready to provide immediate support and connect you with local resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrisisSupportBanner;