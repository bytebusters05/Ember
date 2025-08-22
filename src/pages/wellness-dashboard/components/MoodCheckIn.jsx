import React, { useState } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';

const MoodCheckin = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedDailyMood, setSelectedDailyMood] = useState(null);

  const moods = [
    { name: 'Energetic', emoji: '⚡️' },
    { name: 'Happy', emoji: '😊' },
    { name: 'Calm', emoji: '😌' },
    { name: 'Neutral', emoji: '😐' },
    { name: 'Tired', emoji: '😴' },
    { name: 'Stressed', emoji: '😤' },
    { name: 'Sad', emoji: '😞' },
    { name: 'Frustrated', emoji: '😠' },
  ];

  const dailyMoods = [
    { name: 'Happy', emoji: '😊' },
    { name: 'Calm', emoji: '😌' },
    { name: 'Neutral', emoji: '😐' },
    { name: 'Sad', emoji: '😞' },
    { name: 'Stressed', emoji: '😤' },
    { name: 'Tired', emoji: '😴' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-8">
        {/* How are you feeling right now? section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mr-4">
              <Icon name="HeartPulse" size={24} className="text-therapeutic-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">How are you feeling right now?</h2>
              <p className="text-sm text-muted-foreground">This will personalize your dashboard.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                  selectedMood === mood.name
                    ? 'bg-therapeutic-primary border-therapeutic-primary text-white shadow-lg'
                    : 'bg-surface border-border hover:border-therapeutic-primary/50'
                }`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className={`mt-2 text-sm font-medium ${selectedMood === mood.name ? 'text-white' : 'text-foreground'}`}>
                  {mood.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Check-In section */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
          <div className="flex items-start mb-4">
             <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mr-4">
              <Icon name="CalendarCheck" size={24} className="text-therapeutic-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Daily Check-In</h2>
              <p className="text-sm text-muted-foreground">How are you feeling today?</p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {dailyMoods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedDailyMood(mood.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                  selectedDailyMood === mood.name
                    ? 'bg-therapeutic-primary border-therapeutic-primary text-white shadow-lg'
                    : 'bg-surface border-border hover:border-therapeutic-primary/50'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className={`mt-2 text-xs font-medium ${selectedDailyMood === mood.name ? 'text-white' : 'text-foreground'}`}>
                  {mood.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mr-4">
              <Icon name="Zap" size={24} className="text-conversion-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              <p className="text-sm text-muted-foreground">Your one-click wellness tools.</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button
              variant="custom"
              className="w-full justify-start text-left h-auto p-4 bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20 hover:border-red-500/30"
            >
              <div className="flex items-start space-x-3">
                <Icon name="Phone" size={20} />
                <div className="flex flex-col">
                  <span className="font-semibold">Crisis Support</span>
                  <span className="text-xs font-normal opacity-80">Immediate help when you need it most.</span>
                </div>
              </div>
            </Button>
            <Button
              variant="custom"
              className="w-full justify-start text-left h-auto p-4 bg-blue-500/10 border-blue-500/20 text-blue-600 hover:bg-blue-500/20 hover:border-blue-500/30"
            >
               <div className="flex items-start space-x-3">
                <Icon name="MessageCircle" size={20} />
                <div className="flex flex-col">
                  <span className="font-semibold">Chat with MindfulBot</span>
                  <span className="text-xs font-normal opacity-80">Your AI companion is here to listen.</span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCheckin;