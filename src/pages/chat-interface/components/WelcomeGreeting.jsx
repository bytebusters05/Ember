import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeGreeting = ({ userProfile, recentMoodData, onStartConversation, className = '' }) => {
  const getTimeOfDayGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMoodTrend = () => {
    if (!recentMoodData || recentMoodData?.length === 0) return null;
    
    const recent = recentMoodData?.slice(-3);
    const average = recent?.reduce((sum, mood) => sum + mood?.score, 0) / recent?.length;
    
    if (average >= 7) return { trend: 'positive', message: 'You\'ve been feeling quite well lately' };
    if (average >= 5) return { trend: 'neutral', message: 'Your mood has been fairly balanced' };
    return { trend: 'challenging', message: 'I notice you\'ve been having some challenging days' };
  };

  const getPersonalizedMessage = () => {
    const moodTrend = getMoodTrend();
    const lastCheckIn = recentMoodData?.[recentMoodData?.length - 1];
    
    if (!lastCheckIn) {
      return "I'm here to support you on your wellness journey. How are you feeling today?";
    }
    
    const daysSinceLastCheckIn = Math.floor((new Date() - new Date(lastCheckIn.date)) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastCheckIn === 0) {
      return `I see you checked in earlier today with a mood of ${lastCheckIn?.score}/10. How are things going now?`;
    } else if (daysSinceLastCheckIn === 1) {
      return `Yesterday you were feeling ${lastCheckIn?.score}/10. I'm curious to hear how today is treating you.`;
    } else {
      return `It's been ${daysSinceLastCheckIn} days since our last check-in. ${moodTrend?.message || 'I\'m here whenever you need support.'} What's on your mind today?`;
    }
  };

  const quickStartOptions = [
    {
      title: 'Daily Check-in',
      description: 'Share how you\'re feeling today',
      icon: 'Heart',
      mode: 'daily-checkin',
      color: 'bg-therapeutic-primary'
    },
    {
      title: 'Need Support',
      description: 'I\'m struggling and need help',
      icon: 'Shield',
      mode: 'crisis-support',
      color: 'bg-accent'
    },
    {
      title: 'Learn Skills',
      description: 'Practice coping strategies',
      icon: 'BookOpen',
      mode: 'skill-building',
      color: 'bg-therapeutic-secondary'
    },
    {
      title: 'Just Talk',
      description: 'Open conversation',
      icon: 'MessageCircle',
      mode: 'open-reflection',
      color: 'bg-trust-builder'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Greeting Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-12 h-12 bg-therapeutic-primary rounded-full flex items-center justify-center breathing-pulse">
          <Icon name="Brain" size={24} color="white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {getTimeOfDayGreeting()}, {userProfile?.firstName || 'friend'}!
          </h2>
          <p className="text-muted-foreground">
            {getPersonalizedMessage()}
          </p>
        </div>
      </div>
      {/* Mood Trend Insight */}
      {getMoodTrend() && (
        <div className="mb-6 p-4 bg-surface rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              getMoodTrend()?.trend === 'positive' ? 'bg-green-100' :
              getMoodTrend()?.trend === 'neutral' ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              <Icon 
                name={
                  getMoodTrend()?.trend === 'positive' ? 'TrendingUp' :
                  getMoodTrend()?.trend === 'neutral' ? 'Minus' : 'Heart'
                } 
                size={16} 
                className={
                  getMoodTrend()?.trend === 'positive' ? 'text-green-600' :
                  getMoodTrend()?.trend === 'neutral' ? 'text-yellow-600' : 'text-blue-600'
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Recent Pattern</p>
              <p className="text-sm text-muted-foreground">{getMoodTrend()?.message}</p>
            </div>
          </div>
        </div>
      )}
      {/* Quick Start Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          How can I support you today?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickStartOptions?.map((option) => (
            <Button
              key={option?.mode}
              variant="outline"
              onClick={() => onStartConversation(option?.mode)}
              className="h-auto p-4 justify-start hover-lift"
            >
              <div className="flex items-start space-x-3 w-full">
                <div className={`w-10 h-10 ${option?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={option?.icon} size={20} color="white" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-medium text-sm text-foreground">{option?.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{option?.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Encouragement Message */}
      <div className="mt-6 p-4 bg-therapeutic-primary/5 rounded-lg border border-therapeutic-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Sparkles" size={16} className="text-therapeutic-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">Remember</p>
            <p className="text-muted-foreground text-xs">
              Every conversation is a step forward in your wellness journey. I'm here to listen without judgment and support you however you need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeGreeting;