import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiscussionThread = ({ thread, onViewThread, onReply }) => {
  const getMoodColor = (mood) => {
    const colors = {
      anxious: 'bg-red-100 text-red-600',
      sad: 'bg-blue-100 text-blue-600',
      hopeful: 'bg-green-100 text-green-600',
      stressed: 'bg-orange-100 text-orange-600',
      grateful: 'bg-purple-100 text-purple-600',
      neutral: 'bg-gray-100 text-gray-600'
    };
    return colors?.[mood] || 'bg-gray-100 text-gray-600';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-10 h-10 bg-therapeutic-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-foreground">{thread?.author}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(thread?.mood)}`}>
                {thread?.mood}
              </div>
              {thread?.hasTriggerWarning && (
                <div className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  TW
                </div>
              )}
            </div>
            <h3 className="font-semibold text-foreground mb-2 hover:text-therapeutic-primary cursor-pointer" onClick={() => onViewThread(thread?.id)}>
              {thread?.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {thread?.preview}
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTimeAgo(thread?.timestamp)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={16} />
            <span>{thread?.replyCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={16} />
            <span>{thread?.supportCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span>{thread?.viewCount}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(thread?.id)}
            iconName="Reply"
            iconPosition="left"
            iconSize={14}
          >
            Reply
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewThread(thread?.id)}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            View
          </Button>
        </div>
      </div>
      {thread?.lastReply && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="CornerDownRight" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Latest reply by</span>
            <span className="font-medium text-foreground">{thread?.lastReply?.author}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{formatTimeAgo(thread?.lastReply?.timestamp)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionThread;