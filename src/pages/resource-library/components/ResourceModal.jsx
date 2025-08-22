import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceModal = ({ resource, isOpen, onClose, onComplete, onBookmark, isBookmarked }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !resource) return null;

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(resource?.id, userRating, feedback);
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const renderContent = () => {
    switch (resource?.type) {
      case 'exercise':
        return (
          <div className="space-y-6">
            <div className="bg-therapeutic-primary/5 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Exercise Instructions</h4>
              <div className="space-y-4">
                {resource?.steps?.map((step, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    currentStep === index ? 'border-therapeutic-primary bg-therapeutic-primary/5' : 'border-border bg-card'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === index ? 'bg-therapeutic-primary text-white' : 'bg-surface text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-foreground">{step}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    if (currentStep < resource?.steps?.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleComplete();
                    }
                  }}
                  className="bg-therapeutic-primary hover:bg-therapeutic-primary/90"
                  iconName={currentStep === resource?.steps?.length - 1 ? "Check" : "ChevronRight"}
                  iconPosition="right"
                >
                  {currentStep === resource?.steps?.length - 1 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'article':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <div className="text-foreground leading-relaxed space-y-4">
                {resource?.content?.split('\n\n')?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                variant="default"
                onClick={handleComplete}
                className="bg-therapeutic-primary hover:bg-therapeutic-primary/90"
                iconName="Check"
                iconPosition="left"
              >
                Mark as Read
              </Button>
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-therapeutic-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-therapeutic-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Audio Guidance</h4>
              <p className="text-muted-foreground mb-6">
                Find a comfortable, quiet space and put on your headphones for the best experience.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  iconName="Play"
                  iconPosition="left"
                >
                  Play Audio
                </Button>
                <Button
                  variant="default"
                  onClick={handleComplete}
                  className="bg-therapeutic-primary hover:bg-therapeutic-primary/90"
                  iconName="Check"
                  iconPosition="left"
                >
                  Complete
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Content will be displayed here</p>
          </div>
        );
    }
  };

  const renderCompletionFeedback = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h4 className="font-semibold text-foreground mb-2">Great Job!</h4>
        <p className="text-muted-foreground">
          You've completed "{resource?.title}". How was your experience?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Rate this resource
          </label>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`p-1 ${
                  star <= userRating ? 'text-warning' : 'text-muted-foreground'
                } hover:text-warning transition-colors`}
              >
                <Icon name="Star" size={24} fill={star <= userRating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Share your thoughts (optional)
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e?.target?.value)}
            placeholder="How did this resource help you? Any suggestions for improvement?"
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-3">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Skip Feedback
        </Button>
        <Button
          variant="default"
          onClick={() => {
            handleComplete();
            onClose();
          }}
          className="bg-therapeutic-primary hover:bg-therapeutic-primary/90"
          iconName="Send"
          iconPosition="left"
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-therapeutic max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-therapeutic-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={resource?.type === 'exercise' ? 'Activity' : 'BookOpen'} size={20} className="text-therapeutic-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{resource?.title}</h3>
              <p className="text-sm text-muted-foreground">{resource?.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(resource?.id)}
              className={isBookmarked ? 'text-therapeutic-primary' : 'text-muted-foreground'}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isCompleted ? renderCompletionFeedback() : renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;