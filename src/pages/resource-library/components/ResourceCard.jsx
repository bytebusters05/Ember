import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark, onStart, isBookmarked = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-surface';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'exercise': return 'Activity';
      case 'article': return 'BookOpen';
      case 'audio': return 'Headphones';
      case 'video': return 'Play';
      case 'worksheet': return 'FileText';
      default: return 'Book';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift transition-smooth shadow-gentle">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-therapeutic-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(resource?.type)} size={20} className="text-therapeutic-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{resource?.title}</h3>
            <p className="text-sm text-muted-foreground">{resource?.category}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(resource?.id)}
          className={isBookmarked ? 'text-therapeutic-primary' : 'text-muted-foreground'}
        >
          <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={18} />
        </Button>
      </div>
      {/* Description */}
      <p className="text-foreground mb-4 leading-relaxed">
        {isExpanded ? resource?.description : `${resource?.description?.slice(0, 120)}...`}
        {resource?.description?.length > 120 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-therapeutic-primary hover:underline ml-1 text-sm font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>{formatDuration(resource?.duration)}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource?.difficulty)}`}>
          {resource?.difficulty}
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Star" size={14} />
          <span>{resource?.rating}</span>
          <span>({resource?.reviews})</span>
        </div>
        {resource?.isNew && (
          <div className="px-2 py-1 bg-conversion-accent/10 text-conversion-accent rounded-full text-xs font-medium">
            New
          </div>
        )}
      </div>
      {/* Therapeutic Approach */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Brain" size={16} className="text-therapeutic-secondary" />
          <span className="text-sm font-medium text-foreground">Therapeutic Approach</span>
        </div>
        <p className="text-sm text-muted-foreground">{resource?.approach}</p>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {resource?.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-surface text-muted-foreground rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Action Button */}
      <Button
        variant="default"
        onClick={() => onStart(resource)}
        className="w-full bg-therapeutic-primary hover:bg-therapeutic-primary/90"
        iconName={resource?.type === 'audio' ? 'Play' : 'ArrowRight'}
        iconPosition="right"
      >
        {resource?.type === 'audio' ? 'Listen Now' : 
         resource?.type === 'video' ? 'Watch Now' : 
         resource?.type === 'exercise' ? 'Start Exercise' : 'Read Now'}
      </Button>
    </div>
  );
};

export default ResourceCard;