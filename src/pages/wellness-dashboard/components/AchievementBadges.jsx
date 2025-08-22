import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementBadges = ({ achievements, unlockedBadges }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const badgeCategories = [
    { id: 'all', label: 'All Badges', icon: 'Award' },
    { id: 'consistency', label: 'Consistency', icon: 'Calendar' },
    { id: 'growth', label: 'Growth', icon: 'TrendingUp' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'milestone', label: 'Milestones', icon: 'Flag' }
  ];

  const allBadges = [
    // Consistency
    { id: 'first_checkin', title: 'First Steps', description: 'Completed your first daily check-in', icon: 'Play', category: 'consistency', color: 'from-green-400 to-emerald-600', requirement: 'Complete 1 daily check-in', rarity: 'common' },
    { id: 'week_warrior', title: 'Week Warrior', description: '7 consecutive days of check-ins', icon: 'Calendar', category: 'consistency', color: 'from-blue-400 to-indigo-600', requirement: '7 day check-in streak', rarity: 'uncommon' },
    { id: 'month_master', title: 'Month Master', description: '30 consecutive days of wellness tracking', icon: 'Crown', category: 'consistency', color: 'from-purple-400 to-violet-600', requirement: '30 day check-in streak', rarity: 'rare' },

    // Growth
    { id: 'mood_tracker', title: 'Mood Detective', description: 'Identified patterns in your mood data', icon: 'Search', category: 'growth', color: 'from-yellow-400 to-amber-600', requirement: 'Track moods for 14 days', rarity: 'common' },
    { id: 'skill_builder', title: 'Skill Builder', description: 'Completed 10 wellness exercises', icon: 'Zap', category: 'growth', color: 'from-orange-400 to-red-600', requirement: 'Complete 10 exercises', rarity: 'uncommon' },
    { id: 'mindfulness_master', title: 'Mindfulness Master', description: 'Practiced mindfulness for 21 days', icon: 'Brain', category: 'growth', color: 'from-indigo-400 to-purple-600', requirement: '21 mindfulness sessions', rarity: 'rare' },

    // Community
    { id: 'helper', title: 'Community Helper', description: 'Supported 5 community members', icon: 'Heart', category: 'community', color: 'from-pink-400 to-rose-600', requirement: 'Help 5 community members', rarity: 'uncommon' },
    { id: 'mentor', title: 'Wellness Mentor', description: 'Became a trusted community guide', icon: 'Users', category: 'community', color: 'from-teal-400 to-cyan-600', requirement: 'Mentor 3 new members', rarity: 'rare' },

    // Milestones
    { id: 'professional_connect', title: 'Professional Connection', description: 'Connected with a licensed therapist', icon: 'UserCheck', category: 'milestone', color: 'from-emerald-400 to-green-600', requirement: 'Connect with professional', rarity: 'uncommon' },
    { id: 'crisis_navigator', title: 'Crisis Navigator', description: 'Successfully navigated a difficult period', icon: 'Shield', category: 'milestone', color: 'from-red-400 to-pink-600', requirement: 'Complete crisis support', rarity: 'epic' }
  ];

  const rarityGlow = {
    common: 'shadow-[0_0_12px_rgba(156,163,175,0.4)]',
    uncommon: 'shadow-[0_0_16px_rgba(34,197,94,0.5)]',
    rare: 'shadow-[0_0_18px_rgba(59,130,246,0.5)]',
    epic: 'shadow-[0_0_22px_rgba(147,51,234,0.6)]'
  };

  const filteredBadges = selectedCategory === 'all'
    ? allBadges
    : allBadges.filter(b => b.category === selectedCategory);

  const unlockedCount = unlockedBadges?.length || 0;
  const totalCount = allBadges.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <motion.div 
      className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Icon name="Award" size={22} color="white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Achievement Badges</h2>
            <p className="text-sm text-gray-600">
              {unlockedCount} / {totalCount} badges earned ({completionPercentage}%)
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
        <motion.div 
          className="h-3 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {badgeCategories.map(cat => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
            iconName={cat.icon}
            iconPosition="left"
            iconSize={14}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredBadges.map(badge => {
            const isUnlocked = unlockedBadges?.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`relative p-5 rounded-xl border 
                  ${isUnlocked 
                    ? `bg-gradient-to-br ${badge.color} text-white ${rarityGlow[badge.rarity]}`
                    : 'bg-gray-100 text-gray-400 border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20">
                    <Icon name={badge.icon} size={22} color="white" />
                  </div>
                  {isUnlocked && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white/30 rounded-full p-1"
                    >
                      <Icon name="Check" size={16} color="white" />
                    </motion.div>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{badge.title}</h3>
                <p className="text-sm opacity-90">{badge.description}</p>
                <p className="mt-2 text-xs opacity-80">{badge.requirement}</p>
                {!isUnlocked && (
                  <div className="absolute bottom-3 right-3 text-xs flex items-center gap-1 opacity-70">
                    <Icon name="Lock" size={12} />
                    <span>Locked</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AchievementBadges;
