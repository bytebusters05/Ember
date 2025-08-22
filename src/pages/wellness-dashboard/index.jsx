import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import MoodTrendChart from "./components/MoodTrendChart";
import RecommendedActions from "./components/RecommendedActions";
import ProgressMilestones from "./components/ProgressMilestones";
import QuickAccessTiles from "./components/QuickAccessTiles";
import StreakCounter from "./components/StreakCounter";
import AchievementBadges from "./components/AchievementBadges";
import Icon from "../../components/AppIcon";
import Audiobot from "./components/AudioBot";

// Functional MoodCheckin Component (Integrated)
const MoodCheckinFunctional = ({ onMoodChange, currentMood, onDailyMoodSubmit, todaysMood, onViewReport }) => {
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
        <div className="space-y-8">
            {/* How are you feeling right now? section */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-soft">
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
                            onClick={() => onMoodChange(mood.name.toLowerCase())}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                                currentMood === mood.name.toLowerCase()
                                    ? 'bg-therapeutic-primary border-therapeutic-primary text-white shadow-lg'
                                    : 'bg-surface border-border hover:border-therapeutic-primary/50'
                            }`}
                        >
                            <span className="text-4xl">{mood.emoji}</span>
                            <span className={`mt-2 text-sm font-medium ${currentMood === mood.name.toLowerCase() ? 'text-white' : 'text-foreground'}`}>
                                {mood.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Daily Check-In section */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mr-4">
                            <Icon name="CalendarCheck" size={24} className="text-therapeutic-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Daily Check-In</h2>
                            <p className="text-sm text-muted-foreground">
                                {todaysMood ? `Today's report is saved. You're feeling ${todaysMood.mood}.` : 'How are you feeling today?'}
                            </p>
                        </div>
                    </div>
                    {todaysMood && (
                        <button onClick={onViewReport} className="text-sm font-medium text-therapeutic-primary hover:underline">
                            View Report
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {dailyMoods.map((mood) => (
                        <button
                            key={mood.name}
                            onClick={() => onDailyMoodSubmit({ mood: mood.name.toLowerCase(), intensity: 5 })} // Example intensity
                            disabled={!!todaysMood}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                                todaysMood?.mood === mood.name.toLowerCase()
                                    ? 'bg-therapeutic-primary border-therapeutic-primary text-white shadow-lg'
                                    : 'bg-surface border-border hover:border-therapeutic-primary/50'
                            }`}
                        >
                            <span className="text-3xl">{mood.emoji}</span>
                            <span className={`mt-2 text-xs font-medium ${todaysMood?.mood === mood.name.toLowerCase() ? 'text-white' : 'text-foreground'}`}>
                                {mood.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// New Daily Report Modal Component
const DailyReportModal = ({ isOpen, onClose, moodReport }) => {
    if (!isOpen || !moodReport) return null;

    const moodEmojis = {
        happy: '😊', calm: '😌', neutral: '😐', sad: '😞', stressed: '😤', tired: '😴',
        energetic: '⚡️', anxious: '😟', frustrated: '😠'
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card border border-border rounded-lg w-full max-w-md shadow-therapeutic"
            >
                <div className="p-6 text-center">
                    <div className="text-6xl mb-4">{moodEmojis[moodReport.mood]}</div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Daily Report Saved!</h2>
                    <p className="text-muted-foreground mb-6">
                        You've checked in for today, feeling <span className="font-semibold text-foreground">{moodReport.mood}</span>.
                        That's a great step in your wellness journey.
                    </p>
                    <div className="bg-surface p-4 rounded-lg text-left">
                        <h3 className="font-semibold text-foreground mb-2">Recommended Action</h3>
                        <p className="text-sm text-muted-foreground">
                            Based on your mood, we suggest trying a 5-minute guided meditation to continue your day with mindfulness.
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-surface/50 border-t border-border">
                    <button
                        onClick={onClose}
                        className="w-full bg-therapeutic-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-therapeutic-primary/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


const WellnessDashboard = () => {
    const [currentMood, setCurrentMood] = useState("neutral");
    const [todaysMood, setTodaysMood] = useState(null);
    const [completedActions, setCompletedActions] = useState([]);
    const [dashboardTheme, setDashboardTheme] = useState("bg-background");
    const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State for the report modal

    // Mock data for mood history
    const [moodData, setMoodData] = useState([
        { date: "2025-07-15", mood: "happy", intensity: 7 },
        { date: "2025-07-16", mood: "calm", intensity: 6 },
        { date: "2025-07-17", mood: "anxious", intensity: 4 },
        { date: "2025-07-18", mood: "neutral", intensity: 5 },
        { date: "2025-07-19", mood: "happy", intensity: 8 },
        { date: "2025-07-20", mood: "calm", intensity: 7 },
        { date: "2025-07-21", mood: "frustrated", intensity: 3 },
        { date: "2025-07-22", mood: "happy", intensity: 6 },
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
        const today = new Date().toDateString();
        const todaysEntry = moodData.find(
            (entry) => new Date(entry.date).toDateString() === today
        );
        if (todaysEntry) {
            setTodaysMood(todaysEntry);
            setCurrentMood(todaysEntry.mood);
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
        setDashboardTheme(moodThemes[currentMood] || "bg-background");
    }, [currentMood]);

    const handleDailyMoodSubmit = (moodDataSubmitted) => {
        if (todaysMood) return;
        const newEntry = { ...moodDataSubmitted, date: new Date().toISOString().split('T')[0] };
        setTodaysMood(newEntry);
        setCurrentMood(newEntry.mood);
        setMoodData(prevData => [...prevData, newEntry]);
        setIsReportModalOpen(true); // Open the report modal
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
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
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

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <MoodCheckinFunctional
                                    onMoodChange={handleMoodChange}
                                    currentMood={currentMood}
                                    onDailyMoodSubmit={handleDailyMoodSubmit}
                                    todaysMood={todaysMood}
                                    onViewReport={() => setIsReportModalOpen(true)}
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
                        <div className="space-y-8">
                            
                                <Audiobot />
                           
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
            <DailyReportModal 
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                moodReport={todaysMood}
            />
        </div>
    );
};

export default WellnessDashboard;
