import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GroupChallenges = ({ challenges, onJoinChallenge }) => {
  const getChallengeIcon = (type) => {
    const icons = {
      gratitude: 'Heart',
      mindfulness: 'Brain',
      exercise: 'Activity',
      journaling: 'PenTool',
      connection: 'Users'
    };
    return icons?.[type] || 'Target';
  };

  const getChallengeColor = (type) => {
    const colors = {
      gratitude: 'bg-pink-100 text-pink-600 border-pink-200',
      mindfulness: 'bg-purple-100 text-purple-600 border-purple-200',
      exercise: 'bg-green-100 text-green-600 border-green-200',
      journaling: 'bg-blue-100 text-blue-600 border-blue-200',
      connection: 'bg-orange-100 text-orange-600 border-orange-200'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const calculateProgress = (current, total) => {
    return Math.round((current / total) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-therapeutic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-therapeutic-primary" />
          <span>Group Challenges</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
        >
          Create Challenge
        </Button>
      </div>
      <div className="space-y-4">
        {challenges?.map((challenge) => (
          <div
            key={challenge?.id}
            className={`border rounded-lg p-4 transition-smooth hover-lift ${getChallengeColor(challenge?.type)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-gentle">
                  <Icon name={getChallengeIcon(challenge?.type)} size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{challenge?.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{challenge?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{challenge?.duration}</div>
                <div className="text-xs text-muted-foreground">{challenge?.participants} joined</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {challenge?.currentDay}/{challenge?.totalDays} days
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-2 shadow-inner">
                <div
                  className="bg-therapeutic-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress(challenge?.currentDay, challenge?.totalDays)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Started {challenge?.startDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{challenge?.participants} participants</span>
                </div>
              </div>
              
              <Button
                variant={challenge?.isJoined ? "outline" : "default"}
                size="sm"
                onClick={() => onJoinChallenge(challenge?.id)}
                iconName={challenge?.isJoined ? "Check" : "Plus"}
                iconPosition="left"
                iconSize={14}
              >
                {challenge?.isJoined ? "Joined" : "Join"}
              </Button>
            </div>

            {challenge?.recentActivity && (
              <div className="mt-3 pt-3 border-t border-white/50">
                <div className="text-xs text-muted-foreground">
                  <Icon name="Activity" size={12} className="inline mr-1" />
                  {challenge?.recentActivity}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Award" size={16} className="text-therapeutic-primary" />
          <span className="font-medium text-foreground">Challenge Rewards</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete challenges to earn community badges, unlock new features, and inspire others on their wellness journey.
        </p>
      </div>
    </div>
  );
};

export default GroupChallenges;