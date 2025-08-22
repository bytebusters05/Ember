import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessStories = ({ stories, onViewStory, onShareStory }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  const getStoryIcon = (category) => {
    const icons = {
      anxiety: 'Heart',
      depression: 'Sun',
      stress: 'Zap',
      relationships: 'Users',
      work: 'Briefcase',
      general: 'Star'
    };
    return icons?.[category] || 'Star';
  };

  const getStoryColor = (category) => {
    const colors = {
      anxiety: 'text-blue-600',
      depression: 'text-yellow-600',
      stress: 'text-red-600',
      relationships: 'text-purple-600',
      work: 'text-green-600',
      general: 'text-therapeutic-primary'
    };
    return colors?.[category] || 'text-therapeutic-primary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-therapeutic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Star" size={20} className="text-conversion-accent" />
          <span>Success Stories</span>
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onShareStory}
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
        >
          Share Your Story
        </Button>
      </div>
      <div className="space-y-4">
        {stories?.map((story) => (
          <div
            key={story?.id}
            className="border border-border rounded-lg p-4 hover-lift transition-smooth cursor-pointer"
            onClick={() => onViewStory(story?.id)}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-conversion-accent/10 rounded-full flex items-center justify-center">
                <Icon name={getStoryIcon(story?.category)} size={20} className={getStoryColor(story?.category)} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground">{story?.title}</span>
                  <div className="px-2 py-1 bg-surface rounded-full text-xs font-medium text-muted-foreground">
                    {story?.category}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {story?.preview}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatTimeAgo(story?.timestamp)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} className="text-red-500" />
                  <span>{story?.hearts}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={14} />
                  <span>{story?.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Share" size={14} />
                  <span>{story?.shares}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-sm">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{story?.readTime} min read</span>
              </div>
            </div>

            {story?.milestone && (
              <div className="mt-3 p-2 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">Milestone: {story?.milestone}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={16} className="text-conversion-accent" />
          <span className="font-medium text-foreground">Share Your Journey</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Your story could inspire someone else. Share your progress, breakthrough moments, or lessons learned.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onShareStory}
          iconName="Edit"
          iconPosition="left"
          iconSize={14}
          className="w-full sm:w-auto"
        >
          Write Your Story
        </Button>
      </div>
    </div>
  );
};

export default SuccessStories;