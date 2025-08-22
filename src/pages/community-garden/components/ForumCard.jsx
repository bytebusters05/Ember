import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ForumCard = ({ forum, onJoinForum }) => {
  const getForumIcon = (type) => {
    const icons = {
      anxiety: 'Heart',
      depression: 'Sun',
      student: 'BookOpen',
      workplace: 'Briefcase',
      parent: 'Baby'
    };
    return icons?.[type] || 'MessageCircle';
  };

  const getForumColor = (type) => {
    const colors = {
      anxiety: 'bg-blue-100 text-blue-600',
      depression: 'bg-yellow-100 text-yellow-600',
      student: 'bg-green-100 text-green-600',
      workplace: 'bg-purple-100 text-purple-600',
      parent: 'bg-pink-100 text-pink-600'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getForumColor(forum?.type)}`}>
            <Icon name={getForumIcon(forum?.type)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{forum?.name}</h3>
            <p className="text-sm text-muted-foreground">{forum?.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>{forum?.memberCount}</span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Active Discussions</span>
          <span className="font-medium text-foreground">{forum?.activeThreads}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Posts Today</span>
          <span className="font-medium text-foreground">{forum?.postsToday}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Activity</span>
          <span className="font-medium text-foreground">{forum?.lastActivity}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {forum?.moderators?.slice(0, 3)?.map((mod, index) => (
            <div
              key={index}
              className="w-6 h-6 bg-therapeutic-primary rounded-full flex items-center justify-center"
              title={`Moderator: ${mod?.name}`}
            >
              <Icon name="Shield" size={12} color="white" />
            </div>
          ))}
          <span className="text-xs text-muted-foreground">
            {forum?.moderators?.length} moderator{forum?.moderators?.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onJoinForum(forum?.id)}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          Join Discussion
        </Button>
      </div>
    </div>
  );
};

export default ForumCard;