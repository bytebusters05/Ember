import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const MoodCheckIn = ({ onMoodSubmit, todaysMood }) => {
  const [selectedMood, setSelectedMood] = useState(todaysMood?.mood || '');
  const [intensity, setIntensity] = useState(todaysMood?.intensity || 5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy', color: 'text-yellow-500' },
    { emoji: '😌', label: 'Calm', value: 'calm', color: 'text-blue-500' },
    { emoji: '😐', label: 'Neutral', value: 'neutral', color: 'text-gray-500' },
    { emoji: '😔', label: 'Sad', value: 'sad', color: 'text-blue-600' },
    { emoji: '😰', label: 'Anxious', value: 'anxious', color: 'text-orange-500' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated', color: 'text-red-500' }
  ];

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    onMoodSubmit({
      mood: selectedMood,
      intensity,
      timestamp: new Date()?.toISOString(),
      date: new Date()?.toDateString()
    });

    setIsSubmitting(false);
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-surface to-card rounded-2xl p-6 shadow-xl border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          className="w-12 h-12 bg-therapeutic-primary rounded-xl flex items-center justify-center text-white"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon name="Heart" size={22} color="white" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Daily Check-In</h2>
          <p className="text-sm text-muted-foreground">How are you feeling today?</p>
        </div>
      </div>

      {/* If already checked in */}
      {todaysMood ? (
        <motion.div 
          className="text-center py-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-7xl mb-4">
            {moodOptions.find(m => m.value === todaysMood?.mood)?.emoji}
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            You’re feeling {moodOptions.find(m => m.value === todaysMood?.mood)?.label.toLowerCase()}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Intensity: {todaysMood?.intensity}/10
          </p>
          <p className="text-xs text-muted-foreground">
            Checked in at {new Date(todaysMood.timestamp)?.toLocaleTimeString()}
          </p>
        </motion.div>
      ) : (
        <>
          {/* Mood options */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {moodOptions.map((mood, idx) => (
              <motion.button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                  ${selectedMood === mood.value
                    ? 'border-therapeutic-primary bg-therapeutic-primary/10'
                    : 'border-border hover:border-therapeutic-primary/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className={`text-sm font-semibold ${
                  selectedMood === mood.value ? 'text-therapeutic-primary' : 'text-foreground'
                }`}>
                  {mood.label}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Intensity Slider */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Intensity Level: {intensity}/10
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood}
            loading={isSubmitting}
            className="w-full rounded-lg text-white font-medium bg-therapeutic-primary hover:bg-therapeutic-primary/90 transition-all"
            iconName="Check"
            iconPosition="left"
          >
            Submit Check-In
          </Button>
        </>
      )}
    </motion.div>
  );
};

export default MoodCheckIn;
