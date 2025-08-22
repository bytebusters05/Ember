import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrisisAlert = ({ isVisible, onDismiss, onEscalate, className = '' }) => {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support and suicide prevention',
      icon: 'Phone'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text',
      icon: 'MessageSquare'
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate medical emergencies',
      icon: 'AlertTriangle'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-card border-2 border-accent rounded-lg shadow-therapeutic max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-accent text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Crisis Support Available</h2>
                <p className="text-white/90 text-sm">You're not alone in this moment</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 breathing-pulse">
              <Icon name="Shield" size={32} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Immediate Support is Here
            </h3>
            <p className="text-muted-foreground">
              I've detected that you might be in crisis. Please know that help is available right now, and you don't have to face this alone.
            </p>
          </div>

          {/* Crisis Resources */}
          <div className="space-y-3 mb-6">
            <h4 className="font-medium text-foreground mb-3">Emergency Resources</h4>
            {crisisResources?.map((resource, index) => (
              <div key={index} className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={resource?.icon} size={20} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground text-sm">{resource?.name}</h5>
                    <p className="text-accent font-semibold text-lg">{resource?.number}</p>
                    <p className="text-muted-foreground text-xs mt-1">{resource?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Immediate Actions */}
          <div className="space-y-3 mb-6">
            <h4 className="font-medium text-foreground">Immediate Coping Strategies</h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="justify-start h-auto p-3"
                iconName="Wind"
                iconPosition="left"
                iconSize={16}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">Breathing Exercise</div>
                  <div className="text-xs text-muted-foreground">4-7-8 breathing technique</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-3"
                iconName="Anchor"
                iconPosition="left"
                iconSize={16}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">Grounding Technique</div>
                  <div className="text-xs text-muted-foreground">5-4-3-2-1 sensory grounding</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onEscalate}
              className="w-full bg-accent hover:bg-accent/90 text-white"
              iconName="UserCheck"
              iconPosition="left"
              iconSize={16}
            >
              Connect with Human Counselor Now
            </Button>
            <Button
              variant="outline"
              onClick={onDismiss}
              className="w-full"
            >
              Continue with MindfulBot Support
            </Button>
          </div>

          {/* Safety Message */}
          <div className="mt-6 p-4 bg-therapeutic-primary/10 rounded-lg border border-therapeutic-primary/20">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-therapeutic-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Your Safety Matters</p>
                <p className="text-muted-foreground text-xs">
                  If you're having thoughts of self-harm or suicide, please reach out to emergency services or a crisis hotline immediately. You deserve support and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;