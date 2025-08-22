import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import MoodCheckIn from "./components/MoodCheckIn";
import MoodTrendChart from "./components/MoodTrendChart";
import RecommendedActions from "./components/RecommendedActions";
import ProgressMilestones from "./components/ProgressMilestones";
import QuickAccessTiles from "./components/QuickAccessTiles";
import CurrentMoodAssessment from "./components/CurrentMoodAssessment";
import StreakCounter from "./components/StreakCounter";
import AchievementBadges from "./components/AchievementBadges";
import Icon from "../../components/AppIcon";
import AudioBot from "./components/AudioBot";
const WellnessDashboard = () => {
  const [currentMood, setCurrentMood] = useState("");
  const [todaysMood, setTodaysMood] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);
  const [dashboardTheme, setDashboardTheme] = useState("default");

  // Mock data for mood history
  const [moodData] = useState([
    { date: "2025-08-15", mood: "happy", intensity: 7 },
    { date: "2025-08-16", mood: "calm", intensity: 6 },
    { date: "2025-08-17", mood: "anxious", intensity: 4 },
    { date: "2025-08-18", mood: "neutral", intensity: 5 },
    { date: "2025-08-19", mood: "happy", intensity: 8 },
    { date: "2025-08-20", mood: "calm", intensity: 7 },
    { date: "2025-08-21", mood: "frustrated", intensity: 3 },
    { date: "2025-08-22", mood: "happy", intensity: 6 },
  ]);

  // Mock streak data
  const [streakData] = useState({
    checkIn: 8,
    mindfulness: 12,
    community: 3,
    resources: 5,
  });

  // Mock achievements
  const [unlockedBadges] = useState([
    "first_checkin",
    "week_warrior",
    "mood_tracker",
    "helper",
    "skill_builder",
  ]);

  // Check if user has checked in today
  useEffect(() => {
    const today = new Date()?.toDateString();
    const todaysEntry = moodData?.find(
      (entry) => new Date(entry.date)?.toDateString() === today
    );
    if (todaysEntry) {
      setTodaysMood(todaysEntry);
    }
  }, [moodData]);

  // Update dashboard theme based on current mood
  useEffect(() => {
    const moodThemes = {
      happy: "bg-gradient-to-br from-yellow-50 to-orange-100",
      calm: "bg-gradient-to-br from-blue-50 to-cyan-100",
      energetic: "bg-gradient-to-br from-green-50 to-emerald-100",
      sad: "bg-gradient-to-br from-purple-50 to-pink-100",
      anxious: "bg-gradient-to-br from-indigo-50 to-blue-100",
      frustrated: "bg-gradient-to-br from-red-50 to-orange-100",
      tired: "bg-gradient-to-br from-gray-50 to-slate-100",
      neutral: "bg-background",
    };

    setDashboardTheme(moodThemes?.[currentMood] || "bg-background");
  }, [currentMood]);

  const handleMoodSubmit = (moodData) => {
    setTodaysMood(moodData);
    setCurrentMood(moodData?.mood);
  };

  const handleMoodChange = (mood) => {
    setCurrentMood(mood);
  };

  const handleActionComplete = (actionId) => {
    setCompletedActions((prev) => [...prev, actionId]);
  };

  const handleCrisisSupport = () => {
    alert(
      `Crisis Support Activated\n\nImmediate help is available 24/7:\n• National Crisis Hotline: 988\n• Text HOME to 741741\n• Emergency Services: 911\n\nYou are not alone. Help is available.`
    );
  };

  return (
    <div
      className={`min-h-screen ${dashboardTheme} transition-all duration-700`}
    >
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  🌿 Welcome back to your wellness journey
                </h1>
                <p className="text-lg text-muted-foreground">
                  {new Date()?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Streak */}
              <motion.div
                className="hidden md:flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-right">
                  <div className="text-2xl font-bold text-therapeutic-primary">
                    {streakData?.checkIn}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <motion.div
                  className="w-12 h-12 bg-therapeutic-primary rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Icon name="Flame" size={24} color="white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Current Mood Assessment */}
          {!currentMood && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CurrentMoodAssessment
                onMoodChange={handleMoodChange}
                currentMood={currentMood}
              />
            </motion.div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MoodCheckIn
                  onMoodSubmit={handleMoodSubmit}
                  todaysMood={todaysMood}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <MoodTrendChart moodData={moodData} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <RecommendedActions
                  currentMood={currentMood}
                  completedActions={completedActions}
                  onActionComplete={handleActionComplete}
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AudioBot />
              </motion.div>
              {currentMood && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <CurrentMoodAssessment
                    onMoodChange={handleMoodChange}
                    currentMood={currentMood}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ProgressMilestones
              streakData={streakData}
              achievements={unlockedBadges}
            />
            <AchievementBadges
              achievements={unlockedBadges}
              unlockedBadges={unlockedBadges}
            />
          </motion.div>

          {/* Emergency Support Banner */}
          <motion.div
            className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Phone" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    24/7 Crisis Support Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    If you're experiencing thoughts of self-harm or need
                    immediate support, help is available right now.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCrisisSupport}
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2"
              >
                <Icon name="Phone" size={18} />
                <span>Get Help Now</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
