import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AssessmentForm from './components/AssessmentForm';
import TherapistCard from './components/TherapistCard';
import SchedulingInterface from './components/SchedulingInterface';
import PreparationTools from './components/PreparationTools';
import InsuranceVerification from './components/InsuranceVerification';

const ProfessionalConnect = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [assessmentData, setAssessmentData] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [insuranceInfo, setInsuranceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock therapist data
  const mockTherapists = [
    {
      id: 1,
      name: "Sarah Chen",
      credentials: "PhD, LCSW",
      experience: 8,
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      specialties: ["Anxiety", "Depression", "Work Stress", "Relationships"],
      approach: "Combines CBT with mindfulness-based approaches, focusing on practical skill-building and emotional regulation.",
      sessionTypes: ["video", "phone", "in-person"],
      acceptsInsurance: true,
      rate: 120,
      rating: 4.9,
      matchScore: 95,
      acceptingNew: true,
      nextAvailable: "Jan 18, 2025",
      licensedStates: ["CA", "NY", "TX"],
      responseTime: "Within 24 hours",
      testimonial: {
        text: "Dr. Chen helped me develop practical strategies for managing my anxiety. Her approach is both compassionate and evidence-based.",
        duration: "6 months of therapy"
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      credentials: "PsyD, Licensed Psychologist",
      experience: 12,
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Trauma", "PTSD", "Depression", "Grief"],
      approach: "Specializes in EMDR and trauma-informed therapy, creating a safe space for processing difficult experiences.",
      sessionTypes: ["video", "in-person"],
      acceptsInsurance: true,
      rate: 140,
      rating: 4.8,
      matchScore: 88,
      acceptingNew: true,
      nextAvailable: "Jan 20, 2025",
      licensedStates: ["CA", "NV", "AZ"],
      responseTime: "Within 12 hours",
      testimonial: {
        text: "Dr. Rodriguez provided a safe environment to work through my trauma. His expertise in EMDR was life-changing.",
        duration: "1 year of therapy"
      }
    },
    {
      id: 3,
      name: "Emily Thompson",
      credentials: "LMFT, MA",
      experience: 6,
      photo: "https://images.unsplash.com/photo-1594824388853-e0c8e0e8b7b5?w=400&h=400&fit=crop&crop=face",
      specialties: ["Relationships", "Couples Therapy", "Communication", "Anxiety"],
      approach: "Uses Gottman Method and EFT to help couples and individuals build stronger, more fulfilling relationships.",
      sessionTypes: ["video", "phone", "in-person"],
      acceptsInsurance: false,
      rate: 100,
      rating: 4.7,
      matchScore: 82,
      acceptingNew: true,
      nextAvailable: "Jan 16, 2025",
      licensedStates: ["CA", "OR", "WA"],
      responseTime: "Within 6 hours",
      testimonial: {
        text: "Emily helped my partner and I communicate better and rebuild trust. Her approach is gentle but effective.",
        duration: "4 months of couples therapy"
      }
    },
    {
      id: 4,
      name: "David Park",
      credentials: "PhD, LCSW",
      experience: 15,
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      specialties: ["Work Stress", "Burnout", "Career Transitions", "Executive Coaching"],
      approach: "Integrates cognitive-behavioral techniques with career counseling to address workplace mental health challenges.",
      sessionTypes: ["video", "phone"],
      acceptsInsurance: true,
      rate: 160,
      rating: 4.9,
      matchScore: 91,
      acceptingNew: false,
      nextAvailable: "Feb 1, 2025",
      licensedStates: ["CA", "NY", "IL"],
      responseTime: "Within 48 hours",
      testimonial: {
        text: "Dr. Park helped me navigate a difficult career transition while managing severe burnout. His insights were invaluable.",
        duration: "8 months of therapy"
      }
    },
    {
      id: 5,
      name: "Lisa Martinez",
      credentials: "LCSW, MSW",
      experience: 10,
      photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
      specialties: ["Eating Disorders", "Body Image", "Anxiety", "Depression"],
      approach: "Specializes in eating disorder recovery using DBT skills and body-positive approaches to healing.",
      sessionTypes: ["video", "in-person"],
      acceptsInsurance: true,
      rate: 130,
      rating: 4.8,
      matchScore: 79,
      acceptingNew: true,
      nextAvailable: "Jan 22, 2025",
      licensedStates: ["CA", "FL", "TX"],
      responseTime: "Within 24 hours",
      testimonial: {
        text: "Lisa created a judgment-free space where I could work on my relationship with food and my body. She truly understands.",
        duration: "1.5 years of therapy"
      }
    }
  ];

  useEffect(() => {
    // Scroll to top when view changes
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleAssessmentComplete = (data) => {
    setAssessmentData(data);
    setIsLoading(true);
    
    // Simulate matching process
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('matches');
    }, 2000);
  };

  const handleScheduleAppointment = (therapist) => {
    setSelectedTherapist(therapist);
    setCurrentView('scheduling');
  };

  const handleViewProfile = (therapist) => {
    setSelectedTherapist(therapist);
    setCurrentView('profile');
  };

  const handleScheduleComplete = (appointmentData) => {
    console.log('Appointment scheduled:', appointmentData);
    setCurrentView('confirmation');
  };

  const handleInsuranceVerification = (data) => {
    setInsuranceInfo(data);
    setCurrentView('assessment');
  };

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-br from-therapeutic-primary/5 to-therapeutic-secondary/5 rounded-2xl">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-20 h-20 bg-therapeutic-primary rounded-full flex items-center justify-center mx-auto mb-6 breathing-pulse">
            <Icon name="UserCheck" size={40} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Connect with Licensed Professionals
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Bridge the gap between self-help and professional care. Our AI-powered matching system connects you with licensed therapists who specialize in your specific needs, making professional mental health support accessible and personalized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => setCurrentView('insurance')}
              iconName="Shield"
              iconPosition="left"
              className="text-lg px-8 py-4"
            >
              Start with Insurance Verification
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentView('assessment')}
              iconName="Brain"
              iconPosition="left"
              className="text-lg px-8 py-4"
            >
              Take Matching Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How Professional Connect Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive approach ensures you find the right therapist for your unique needs and circumstances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              icon: 'FileText',
              title: 'Complete Assessment',
              description: 'Answer questions about your concerns, preferences, and goals to help us understand your needs.'
            },
            {
              step: 2,
              icon: 'Search',
              title: 'AI-Powered Matching',
              description: 'Our algorithm analyzes your responses to match you with 3-5 licensed therapists who specialize in your areas of focus.'
            },
            {
              step: 3,
              icon: 'Calendar',
              title: 'Schedule Consultation',
              description: 'Review therapist profiles and schedule a consultation with your preferred match. Video, phone, or in-person options available.'
            },
            {
              step: 4,
              icon: 'Heart',
              title: 'Begin Your Journey',
              description: 'Start therapy with confidence, knowing you\'re matched with a professional who understands your specific needs.'
            }
          ]?.map((item) => (
            <div key={item?.step} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-therapeutic-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item?.icon} size={24} color="white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-conversion-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item?.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item?.title}</h3>
              <p className="text-muted-foreground">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Professional Connect</h2>
          <p className="text-lg text-muted-foreground">
            We make finding the right therapist easier, more affordable, and more effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: 'Target',
              title: 'Precision Matching',
              description: 'Our AI analyzes 50+ factors to match you with therapists who specialize in your specific concerns and preferences.',
              color: 'therapeutic-primary'
            },
            {
              icon: 'Shield',
              title: 'Insurance Simplified',
              description: 'We verify your coverage, find in-network providers, and handle the paperwork so you can focus on healing.',
              color: 'trust-builder'
            },
            {
              icon: 'Clock',
              title: 'Fast Access',
              description: 'Most clients are matched and scheduled within 48 hours. Crisis support available immediately.',
              color: 'conversion-accent'
            },
            {
              icon: 'Video',
              title: 'Flexible Sessions',
              description: 'Choose from video, phone, or in-person sessions based on your comfort and schedule.',
              color: 'therapeutic-secondary'
            },
            {
              icon: 'BookOpen',
              title: 'Session Preparation',
              description: 'Guided tools help you prepare for sessions and share your MindfulBot insights with your therapist.',
              color: 'therapeutic-primary'
            },
            {
              icon: 'Users',
              title: 'Ongoing Support',
              description: 'Continue using MindfulBot alongside therapy for comprehensive mental health support.',
              color: 'trust-builder'
            }
          ]?.map((feature, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-therapeutic transition-all duration-300 hover-lift">
              <div className={`w-12 h-12 bg-${feature?.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                <Icon name={feature?.icon} size={24} className={`text-${feature?.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature?.title}</h3>
              <p className="text-muted-foreground">{feature?.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-surface rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from people who found their perfect therapeutic match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "The matching process was incredible. I was connected with a therapist who truly understood my anxiety around work. The combination of MindfulBot and professional therapy has been life-changing.",
              author: "Sarah M.",
              role: "Marketing Professional",
              duration: "6 months"
            },
            {
              quote: "I was skeptical about online therapy matching, but the assessment was thorough and my therapist was perfect for my needs. The insurance verification saved me hours of phone calls.",
              author: "Michael R.",
              role: "Graduate Student",
              duration: "4 months"
            },
            {
              quote: "Finding a therapist who specializes in eating disorders and accepts my insurance felt impossible. Professional Connect made it simple and I started therapy within a week.",
              author: "Emma L.",
              role: "Teacher",
              duration: "1 year"
            }
          ]?.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start space-x-2 mb-4">
                <Icon name="Quote" size={20} className="text-therapeutic-primary flex-shrink-0 mt-1" />
                <p className="text-foreground italic">"{testimonial?.quote}"</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{testimonial?.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial?.role}</p>
                </div>
                <span className="text-xs text-muted-foreground">{testimonial?.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 bg-gradient-to-r from-therapeutic-primary to-therapeutic-secondary rounded-2xl text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect with a Professional?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards professional mental health support. Our matching process takes just 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setCurrentView('assessment')}
              iconName="ArrowRight"
              iconPosition="right"
              className="text-lg px-8 py-4"
            >
              Start Assessment Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentView('preparation')}
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-therapeutic-primary"
              iconName="BookOpen"
              iconPosition="left"
            >
              Explore Preparation Tools
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMatches = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Your Therapist Matches</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Based on your assessment, we've found {mockTherapists?.length} licensed therapists who specialize in your areas of focus.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setCurrentView('assessment')}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Retake Assessment
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentView('preparation')}
            iconName="BookOpen"
            iconPosition="left"
          >
            Session Preparation Tools
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockTherapists?.map((therapist) => (
          <TherapistCard
            key={therapist?.id}
            therapist={therapist}
            onSchedule={handleScheduleAppointment}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          Don't see the right fit? We can help you find more options.
        </p>
        <Button
          variant="outline"
          iconName="Search"
          iconPosition="left"
        >
          Expand Search Criteria
        </Button>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-therapeutic-primary rounded-full flex items-center justify-center mb-6 breathing-pulse">
        <Icon name="Brain" size={32} color="white" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Finding Your Perfect Matches</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Our AI is analyzing your responses and matching you with licensed therapists who specialize in your areas of focus.
      </p>
      <div className="flex space-x-2">
        {[0, 1, 2]?.map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-therapeutic-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={40} className="text-success" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Appointment Confirmed!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your consultation with Dr. {selectedTherapist?.name} has been scheduled. You'll receive a confirmation email with all the details shortly.
      </p>
      
      <div className="bg-surface rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-therapeutic-primary" />
            <span className="text-sm text-foreground">Confirmation email sent to your inbox</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={16} className="text-therapeutic-primary" />
            <span className="text-sm text-foreground">Intake forms will arrive 24 hours before your session</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Video" size={16} className="text-therapeutic-primary" />
            <span className="text-sm text-foreground">Technical setup instructions included for video sessions</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-therapeutic-primary" />
            <span className="text-sm text-foreground">Calendar invite with session details</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          onClick={() => setCurrentView('preparation')}
          iconName="BookOpen"
          iconPosition="left"
        >
          Prepare for Your Session
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentView('overview')}
          iconName="Home"
          iconPosition="left"
        >
          Return to Overview
        </Button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    if (isLoading) return renderLoading();

    switch (currentView) {
      case 'overview':
        return renderOverview();
      case 'insurance':
        return (
          <InsuranceVerification
            onVerificationComplete={handleInsuranceVerification}
          />
        );
      case 'assessment':
        return (
          <AssessmentForm
            onComplete={handleAssessmentComplete}
          />
        );
      case 'matches':
        return renderMatches();
      case 'scheduling':
        return (
          <SchedulingInterface
            therapist={selectedTherapist}
            onSchedule={handleScheduleComplete}
            onBack={() => setCurrentView('matches')}
          />
        );
      case 'preparation':
        return <PreparationTools />;
      case 'confirmation':
        return renderConfirmation();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderCurrentView()}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-therapeutic-primary rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={16} color="white" />
                </div>
                <span className="text-xl font-bold text-foreground">MindfulBot</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Bridging the gap between self-help and professional care through AI-powered mental wellness support.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Professional Care</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Find a Therapist</a></li>
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Insurance Verification</a></li>
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Session Preparation</a></li>
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Crisis Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-therapeutic-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} MindfulBot. All rights reserved. Licensed mental health professionals available 24/7.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalConnect;