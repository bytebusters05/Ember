import React from 'react';
import Icon from '../../../components/AppIcon';


const ConversationModeSelector = ({ selectedMode, onModeSelect, className = '' }) => {
  const conversationModes = [
    {
      id: 'daily-checkin',
      name: 'Daily Check-in',
      description: 'Structured emotional assessment and mood tracking',
      icon: 'Heart',
      color: 'bg-therapeutic-primary',
      textColor: 'text-therapeutic-primary'
    },
    {
      id: 'crisis-support',
      name: 'Crisis Support',
      description: 'Immediate intervention and emergency resources',
      icon: 'Phone',
      color: 'bg-accent',
      textColor: 'text-accent',
      urgent: true
    },
    {
      id: 'skill-building',
      name: 'Skill Building',
      description: 'Guided CBT exercises and coping strategies',
      icon: 'BookOpen',
      color: 'bg-therapeutic-secondary',
      textColor: 'text-therapeutic-secondary'
    },
    {
      id: 'open-reflection',
      name: 'Open Reflection',
      description: 'Free-form emotional processing and exploration',
      icon: 'MessageCircle',
      color: 'bg-trust-builder',
      textColor: 'text-trust-builder'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Choose your conversation mode
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {conversationModes?.map((mode) => (
          <button
            key={mode?.id}
            onClick={() => onModeSelect(mode?.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover-lift ${
              selectedMode === mode?.id
                ? `${mode?.color} text-white border-transparent shadow-therapeutic`
                : `bg-card border-border hover:border-${mode?.textColor?.split('-')?.[1]}-${mode?.textColor?.split('-')?.[2]} hover:${mode?.textColor}`
            } ${mode?.urgent ? 'ring-2 ring-accent/20' : ''}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedMode === mode?.id 
                  ? 'bg-white/20' 
                  : `${mode?.color}/10`
              }`}>
                <Icon 
                  name={mode?.icon} 
                  size={20} 
                  color={selectedMode === mode?.id ? 'white' : undefined}
                  className={selectedMode === mode?.id ? '' : mode?.textColor}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">{mode?.name}</h4>
                <p className={`text-xs ${
                  selectedMode === mode?.id 
                    ? 'text-white/80' :'text-muted-foreground'
                }`}>
                  {mode?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationModeSelector;