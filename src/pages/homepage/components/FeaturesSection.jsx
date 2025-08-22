import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturesSection = ({ onFeatureClick }) => {
  const features = [
    {
      id: 'ai-checkins',
      icon: 'MessageCircle',
      title: 'AI-Powered Check-ins',
      description: 'Daily mood tracking with intelligent insights and personalized recommendations based on your emotional patterns.',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?w=400&h=300&fit=crop',
      benefits: ['Emotion detection', 'Pattern recognition', 'Personalized insights', 'Progress tracking'],
      route: '/chat-interface'
    },
    {
      id: 'wellness-plans',
      icon: 'TrendingUp',
      title: 'Personalized Wellness Plans',
      description: 'Customized mental health strategies tailored to your unique needs, goals, and progress milestones.',
      image: 'https://img.freepik.com/free-photo/wellness-diet-plan-healthy-living-icon_53876-121317.jpg?semt=ais_hybrid&w=740&q=80',
      benefits: ['Custom goal setting', 'Progress visualization', 'Adaptive strategies', 'Milestone celebrations'],
      route: '/wellness-dashboard'
    },
    {
      id: 'professional-bridge',
      icon: 'UserCheck',
      title: 'Professional Bridge',
      description: 'Seamless connection to licensed therapists with AI-powered matching based on your specific needs and preferences.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      benefits: ['Therapist matching', 'Session preparation', 'Continuity of care', 'Professional credentials'],
      route: '/professional-connect'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Your Complete Mental Wellness Toolkit
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining cutting-edge AI technology with evidence-based therapeutic approaches 
            to support your journey toward better mental health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="bg-card rounded-2xl shadow-gentle hover:shadow-therapeutic transition-all duration-300 hover-lift overflow-hidden"
            >
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-therapeutic"
                    style={{ backgroundColor: '#f29819' }}
                  >
                    <Icon name={feature?.icon} size={24} color="white" />
                  </div>
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature?.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-2 mb-6">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} color="#f29819" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => onFeatureClick(feature?.route)}
                  style={{
                    borderColor: '#f29819',
                    color: '#f29819'
                  }}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                  className="hover:bg-[#f29819] hover:text-white"
                >
                  Explore Feature
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-surface rounded-xl hover-lift transition-smooth">
            <Icon name="BookOpen" size={32} color="#f29819" className="mx-auto mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Resource Library</h4>
            <p className="text-sm text-muted-foreground">CBT exercises, mindfulness practices, and educational content</p>
          </div>
          
          <div className="text-center p-6 bg-surface rounded-xl hover-lift transition-smooth">
            <Icon name="Users" size={32} color="#f29819" className="mx-auto mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Community Garden</h4>
            <p className="text-sm text-muted-foreground">Anonymous peer support and shared experiences</p>
          </div>
          
          <div className="text-center p-6 bg-surface rounded-xl hover-lift transition-smooth">
            <Icon name="Shield" size={32} color="#f29819" className="mx-auto mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Crisis Support</h4>
            <p className="text-sm text-muted-foreground">Immediate intervention and emergency resources</p>
          </div>
          
          <div className="text-center p-6 bg-surface rounded-xl hover-lift transition-smooth">
            <Icon name="BarChart3" size={32} color="#f29819" className="mx-auto mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Progress Analytics</h4>
            <p className="text-sm text-muted-foreground">Visual insights and pattern recognition</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
