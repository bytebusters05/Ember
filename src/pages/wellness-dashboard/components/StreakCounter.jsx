import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakCounter = ({ streaks }) => {
  const streakItems = [
    { id: 'daily_checkin', title: 'Daily Check-ins', count: streaks?.checkIn || 0, icon: 'Calendar', color: 'bg-blue-500', target: 30, unit: 'days' },
    { id: 'mindfulness', title: 'Mindfulness Practice', count: streaks?.mindfulness || 0, icon: 'Brain', color: 'bg-purple-500', target: 21, unit: 'sessions' },
    { id: 'community', title: 'Community Engagement', count: streaks?.community || 0, icon: 'Users', color: 'bg-green-500', target: 10, unit: 'interactions' },
    { id: 'resources', title: 'Learning Streak', count: streaks?.resources || 0, icon: 'BookOpen', color: 'bg-yellow-500', target: 14, unit: 'resources' }
  ];

  const getProgress = (count, target) => Math.min((count / target) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {streakItems.map((item) => (
        <div
          key={item.id}
          onClick={() => alert('Details not available now')}
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
        >
          {/* Top row: Icon + Count */}
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color} text-white`}>
              <Icon name={item.icon} size={20} />
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-foreground">{item.count}</div>
              <div className="text-xs text-muted-foreground">{item.unit}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-2">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${getProgress(item.count, item.target)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Target: {item.target} {item.unit}</span>
              <span>{getProgress(item.count, item.target).toFixed(0)}%</span>
            </div>
          </div>

          {/* Bottom row: dots + active */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {[...Array(Math.min(item.count, 3))].map((_, idx) => (
                <div key={idx} className={`w-3 h-3 rounded-full ${item.color}`} />
              ))}
              {item.count > 3 && <span className="text-xs text-muted-foreground">+{item.count - 3}</span>}
            </div>
            {item.count > 0 && (
              <div className="flex items-center space-x-1 text-xs text-green-500 font-semibold">
                <Icon name="TrendingUp" size={12} />
                <span>Active</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreakCounter;
