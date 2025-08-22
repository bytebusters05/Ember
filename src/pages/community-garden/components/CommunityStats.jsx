import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Active Members',
      value: stats?.activeMembers,
      icon: 'Users',
      color: 'text-therapeutic-primary'
    },
    {
      label: 'Posts This Week',
      value: stats?.weeklyPosts,
      icon: 'MessageSquare',
      color: 'text-therapeutic-secondary'
    },
    {
      label: 'Support Given',
      value: stats?.supportGiven,
      icon: 'Heart',
      color: 'text-trust-builder'
    },
    {
      label: 'Success Stories',
      value: stats?.successStories,
      icon: 'Star',
      color: 'text-conversion-accent'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-therapeutic">
      <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="TrendingUp" size={20} className="text-therapeutic-primary" />
        <span>Community Impact</span>
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-surface flex items-center justify-center ${item?.color}`}>
              <Icon name={item?.icon} size={24} />
            </div>
            <div className="text-2xl font-bold text-foreground">{item?.value}</div>
            <div className="text-sm text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={16} className="text-therapeutic-primary" />
          <span className="font-medium text-foreground">This Week's Highlights</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• 23 new members joined our anxiety support circle</li>
          <li>• 15 success stories shared in depression recovery</li>
          <li>• New parent wellness group reached 100 members</li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityStats;