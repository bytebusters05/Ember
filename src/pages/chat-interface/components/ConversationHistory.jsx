import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHistory = ({ conversations, onSelectConversation, currentConversationId, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const conversationDate = new Date(date);
    const diffTime = Math.abs(now - conversationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return conversationDate?.toLocaleDateString();
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: 'Smile',
      sad: 'Frown',
      anxious: 'AlertCircle',
      angry: 'Zap',
      calm: 'Heart',
      neutral: 'Minus'
    };
    return moodIcons?.[mood] || 'Circle';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'text-yellow-500',
      sad: 'text-blue-500',
      anxious: 'text-orange-500',
      angry: 'text-red-500',
      calm: 'text-green-500',
      neutral: 'text-gray-500'
    };
    return moodColors?.[mood] || 'text-gray-500';
  };

  const getBreakthroughBadge = (hasBreakthrough) => {
    if (!hasBreakthrough) return null;
    return (
      <div className="flex items-center space-x-1 bg-therapeutic-primary/10 text-therapeutic-primary px-2 py-1 rounded-full">
        <Icon name="Star" size={12} />
        <span className="text-xs font-medium">Breakthrough</span>
      </div>
    );
  };

  const displayedConversations = isExpanded ? conversations : conversations?.slice(0, 5);

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Conversation History</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Your journey of growth and reflection
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {displayedConversations?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start your first conversation to begin your wellness journey
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {displayedConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation?.id)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 hover-lift ${
                  currentConversationId === conversation?.id
                    ? 'bg-therapeutic-primary/10 border border-therapeutic-primary/20' :'hover:bg-surface'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getMoodIcon(conversation?.mood)} 
                      size={16} 
                      className={getMoodColor(conversation?.mood)}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {conversation?.mode?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(conversation?.date)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {conversation?.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {conversation?.messageCount} messages
                      </span>
                    </div>
                    {conversation?.moodScore && (
                      <div className="flex items-center space-x-1">
                        <Icon name="TrendingUp" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {conversation?.moodScore}/10
                        </span>
                      </div>
                    )}
                  </div>
                  {getBreakthroughBadge(conversation?.hasBreakthrough)}
                </div>

                {/* Progress Indicators */}
                {conversation?.skillsPracticed && conversation?.skillsPracticed?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {conversation?.skillsPracticed?.slice(0, 3)?.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-therapeutic-secondary/10 text-therapeutic-secondary px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {conversation?.skillsPracticed?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{conversation?.skillsPracticed?.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isExpanded && conversations?.length > 5 && (
        <div className="p-3 border-t border-border text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-therapeutic-primary"
          >
            View {conversations?.length - 5} more conversations
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;