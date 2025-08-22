import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const CurrentMoodAssessment = ({ onMoodChange, currentMood }) => {
  const [isAssessing, setIsAssessing] = useState(false);
  const [selectedMood, setSelectedMood] = useState(currentMood || "");

  const moodOptions = [
    {
      value: "energetic",
      label: "Energetic",
      emoji: "⚡",
      color: "bg-yellow-500",
      description: "Feeling motivated and ready to take on challenges",
    },
    {
      value: "happy",
      label: "Happy",
      emoji: "😊",
      color: "bg-green-500",
      description: "Content and positive about life",
    },
    {
      value: "calm",
      label: "Calm",
      emoji: "😌",
      color: "bg-blue-500",
      description: "Peaceful and centered",
    },
    {
      value: "neutral",
      label: "Neutral",
      emoji: "😐",
      color: "bg-gray-500",
      description: "Balanced, neither particularly up nor down",
    },
    {
      value: "tired",
      label: "Tired",
      emoji: "😴",
      color: "bg-indigo-500",
      description: "Low energy, need rest",
    },
    {
      value: "stressed",
      label: "Stressed",
      emoji: "😰",
      color: "bg-orange-500",
      description: "Feeling overwhelmed or under pressure",
    },
    {
      value: "sad",
      label: "Sad",
      emoji: "😔",
      color: "bg-blue-600",
      description: "Feeling down or melancholy",
    },
    {
      value: "frustrated",
      label: "Frustrated",
      emoji: "😤",
      color: "bg-red-500",
      description: "Annoyed or irritated by circumstances",
    },
  ];

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setIsAssessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1200));

    onMoodChange(mood);
    setIsAssessing(false);
  };

  const currentMoodData = moodOptions.find((m) => m.value === currentMood);

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 shadow-lg border border-border"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-therapeutic-primary rounded-xl flex items-center justify-center animate-pulse">
          <Icon name="Gauge" size={22} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            How are you feeling right now?
          </h2>
          <p className="text-sm text-muted-foreground">
            This will personalize your dashboard
          </p>
        </div>
      </div>

      {/* Mood State */}
      <AnimatePresence mode="wait">
        {currentMoodData && !isAssessing ? (
          <motion.div
            key="currentMood"
            className="text-center py-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-7xl mb-4">{currentMoodData.emoji}</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              You're feeling {currentMoodData.label.toLowerCase()}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {currentMoodData.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMood("")}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Update Mood
            </Button>
          </motion.div>
        ) : isAssessing ? (
          <motion.div
            key="assessing"
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-16 h-16 bg-therapeutic-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Icon
                name="Brain"
                size={32}
                className="text-therapeutic-primary"
              />
            </motion.div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Personalizing your experience...
            </h3>
            <p className="text-sm text-muted-foreground">
              Adapting dashboard based on your current mood
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="moodOptions"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {moodOptions.map((mood) => (
              <motion.button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-5 rounded-xl border-2 transition-all duration-200 shadow-sm ${
                  selectedMood === mood.value
                    ? "border-therapeutic-primary bg-therapeutic-primary/10"
                    : "border-border hover:border-therapeutic-primary/50 hover:bg-surface"
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div
                  className={`text-sm font-medium ${
                    selectedMood === mood.value
                      ? "text-therapeutic-primary"
                      : "text-foreground"
                  }`}
                >
                  {mood.label}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      {currentMoodData && (
        <motion.div
          className="mt-6 p-4 bg-surface rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Icon
              name="Lightbulb"
              size={16}
              className="text-conversion-accent"
            />
            <span className="text-sm font-medium text-foreground">
              Mood-based suggestions
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your dashboard has been personalized based on your current mood.
            Recommended actions and content will reflect what might be most
            helpful right now.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CurrentMoodAssessment;
