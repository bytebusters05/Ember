import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTiles = ({ onCrisisSupport }) => {
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      id: 'crisis',
      title: 'Crisis Support',
      description: 'Immediate help when you need it most',
      icon: 'Phone',
      color: 'bg-accent text-white',
      hoverColor: 'hover:bg-accent/90',
      urgent: true,
      action: () => onCrisisSupport()
    },
    {
      id: 'chat',
      title: 'Chat with MindfulBot',
      description: 'Your AI companion is here to listen',
      icon: 'MessageCircle',
      color: 'bg-therapeutic-primary text-white',
      hoverColor: 'hover:bg-therapeutic-primary/90',
      action: () => navigate('/chat-interface')
    },
    {
      id: 'community',
      title: 'Community Garden',
      description: 'Connect with others on similar journeys',
      icon: 'Users',
      color: 'bg-trust-builder text-white',
      hoverColor: 'hover:bg-trust-builder/90',
      action: () => navigate('/community-garden')
    },
    {
      id: 'resources',
      title: 'Resource Library',
      description: 'Explore wellness tools and exercises',
      icon: 'BookOpen',
      color: 'bg-therapeutic-secondary text-white',
      hoverColor: 'hover:bg-therapeutic-secondary/90',
      action: () => navigate('/resource-library')
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-conversion-accent rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={24} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
          <p className="text-sm text-muted-foreground">One-click access to your wellness tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {quickAccessItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`${item.color} ${item.hoverColor} flex flex-col h-full justify-between p-4 rounded-xl text-left transition-all duration-200 ${item.urgent ? 'ring-2 ring-accent/20 animate-pulse' : ''}`}
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={item.icon} size={20} />
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm opacity-90">{item.description}</p>
            </div>
            {item.urgent && <div className="self-end mt-2 w-2 h-2 bg-white rounded-full animate-ping"></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessTiles;
