import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressMilestones = ({ streakData, achievements }) => {
  const milestones = [
    {
      id: 'check_in_streak',
      title: `${streakData?.checkIn} day check-in streak!`,
      description: 'Consistency is key to building emotional awareness',
      icon: 'Calendar',
      progress: Math.min((streakData?.checkIn / 7) * 100, 100),
      color: 'bg-therapeutic-primary',
      achieved: streakData?.checkIn >= 7
    },
    {
      id: 'mindfulness_practice',
      title: `${streakData?.mindfulness} mindfulness sessions`,
      description: 'Building your mental wellness toolkit',
      icon: 'Brain',
      progress: Math.min((streakData?.mindfulness / 10) * 100, 100),
      color: 'bg-therapeutic-secondary',
      achieved: streakData?.mindfulness >= 10
    },
    {
      id: 'community_engagement',
      title: `${streakData?.community} community interactions`,
      description: 'Connecting with others on similar journeys',
      icon: 'Users',
      progress: Math.min((streakData?.community / 5) * 100, 100),
      color: 'bg-trust-builder',
      achieved: streakData?.community >= 5
    }
  ];

  const recentAchievements = [
    {
      id: 'first_week',
      title: 'First Week Complete!',
      description: 'You\'ve completed your first week of daily check-ins',
      icon: 'Award',
      date: '2025-08-15',
      color: 'text-yellow-600'
    },
    {
      id: 'breathing_master',
      title: 'Breathing Exercise Expert',
      description: 'Completed 10 breathing exercises',
      icon: 'Wind',
      date: '2025-08-18',
      color: 'text-blue-600'
    },
    {
      id: 'community_helper',
      title: 'Community Helper',
      description: 'Provided support to 3 community members',
      icon: 'Heart',
      date: '2025-08-20',
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center animate-pulse">
          <Icon name="Trophy" size={24} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Progress Milestones</h2>
          <p className="text-sm text-muted-foreground">Celebrating your wellness journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex flex-col h-full rounded-xl p-4 border border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${milestone.color} rounded-xl flex items-center justify-center`}>
                  <Icon name={milestone.icon} size={20} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{milestone.description}</p>
                </div>
              </div>
              {milestone.achieved && (
                <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
                  <Icon name="Check" size={12} />
                  <span>Achieved</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center mb-3">
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 ${milestone.color} rounded-full transition-all duration-500`}
                  style={{ width: `${milestone.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {milestone.progress.toFixed(0)}% complete
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Star" size={16} className="text-warning" />
          <span>Recent Achievements</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex flex-col h-full items-center p-3 bg-surface rounded-xl">
              <div className={`w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-2`}>
                <Icon name={achievement.icon} size={20} className={achievement.color} />
              </div>
              <h4 className="text-sm font-medium text-foreground text-center">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground text-center">{achievement.description}</p>
              <span className="text-xs text-muted-foreground mt-1">{new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressMilestones;
