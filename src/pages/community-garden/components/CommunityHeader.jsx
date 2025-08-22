import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityHeader = ({ onCreatePost, onJoinChallenge }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-therapeutic">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-therapeutic-primary rounded-lg flex items-center justify-center breathing-pulse">
            <Icon name="Users" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community Garden</h1>
            <p className="text-muted-foreground">A safe space for connection, support, and shared growth</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onJoinChallenge}
            iconName="Trophy"
            iconPosition="left"
            iconSize={16}
          >
            Join Challenge
          </Button>
          <Button
            variant="default"
            onClick={onCreatePost}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Share Your Story
          </Button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-surface rounded-lg border-l-4 border-therapeutic-primary">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-therapeutic-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Community Guidelines</h3>
            <p className="text-sm text-muted-foreground">
              Be kind, respectful, and supportive. Share experiences, not advice. Use trigger warnings when needed. 
              If you're in crisis, please reach out to our crisis support immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;