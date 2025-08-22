import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Home', 
      path: '/homepage', 
      icon: 'Home',
      description: 'Your wellness journey starts here'
    },
    { 
      name: 'Wellness Dashboard', 
      path: '/wellness-dashboard', 
      icon: 'BarChart3',
      description: 'Track your progress and insights'
    },
    { 
      name: 'Chat Interface', 
      path: '/chat-interface', 
      icon: 'MessageCircle',
      description: 'Connect with your AI companion'
    },
    { 
      name: 'Resource Library', 
      path: '/resource-library', 
      icon: 'BookOpen',
      description: 'Explore wellness resources'
    },
    { 
      name: 'Community Garden', 
      path: '/community-garden', 
      icon: 'Users',
      description: 'Connect with others on similar journeys'
    }
  ];

  const secondaryItems = [
    { 
      name: 'Professional Connect', 
      path: '/professional-connect', 
      icon: 'UserCheck',
      description: 'Connect with licensed professionals'
    }
  ];

  const quickActions = [
    { name: 'Quick Check-in', icon: 'Heart', action: 'mood-check' },
    { name: 'Breathing Exercise', icon: 'Wind', action: 'breathing' },
    { name: 'Crisis Support', icon: 'Phone', action: 'crisis', urgent: true }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'mood-check': console.log('Opening mood check-in');
        break;
      case 'breathing': console.log('Starting breathing exercise');
        break;
      case 'crisis': console.log('Activating crisis support');
        break;
      default:
        break;
    }
  };

  if (!isMounted) return null;

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border shadow-therapeutic transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-therapeutic-primary rounded-lg flex items-center justify-center breathing-pulse">
                <Icon name="Compass" size={16} color="white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
                <p className="text-xs text-muted-foreground">Your wellness journey</p>
              </div>
            </div>
          )}
          
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-border">
          {!isCollapsed && (
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
          )}
          <div className="space-y-2">
            {quickActions?.map((action) => (
              <Button
                key={action?.action}
                variant={action?.urgent ? "outline" : "ghost"}
                size="sm"
                onClick={() => handleQuickAction(action?.action)}
                className={`w-full justify-start ${
                  action?.urgent 
                    ? 'border-accent text-accent hover:bg-accent hover:text-white' :'hover:bg-surface'
                } ${isCollapsed ? 'px-2' : 'px-3'}`}
                iconName={action?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {!isCollapsed && action?.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          {!isCollapsed && (
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Main Navigation
            </h3>
          )}
          <nav className="space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`group w-full flex items-center rounded-lg transition-all duration-200 hover-lift ${
                  isActivePath(item?.path)
                    ? 'bg-therapeutic-primary text-white shadow-gentle'
                    : 'text-foreground hover:bg-surface hover:text-therapeutic-primary'
                } ${isCollapsed ? 'p-3 justify-center' : 'p-3'}`}
                title={isCollapsed ? item?.name : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`${isCollapsed ? '' : 'mr-3'} flex-shrink-0`}
                />
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{item?.name}</div>
                    <div className={`text-xs mt-0.5 ${
                      isActivePath(item?.path) 
                        ? 'text-white/80' :'text-muted-foreground group-hover:text-therapeutic-primary/80'
                    }`}>
                      {item?.description}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Secondary Navigation */}
          <div className="mt-6">
            {!isCollapsed && (
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Professional Care
              </h3>
            )}
            <nav className="space-y-2">
              {secondaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`group w-full flex items-center rounded-lg transition-all duration-200 hover-lift ${
                    isActivePath(item?.path)
                      ? 'bg-trust-builder text-white shadow-gentle'
                      : 'text-foreground hover:bg-surface hover:text-trust-builder'
                  } ${isCollapsed ? 'p-3 justify-center' : 'p-3'}`}
                  title={isCollapsed ? item?.name : ''}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`${isCollapsed ? '' : 'mr-3'} flex-shrink-0`}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item?.name}</div>
                      <div className={`text-xs mt-0.5 ${
                        isActivePath(item?.path) 
                          ? 'text-white/80' :'text-muted-foreground group-hover:text-trust-builder/80'
                      }`}>
                        {item?.description}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start hover:bg-surface ${isCollapsed ? 'px-2' : 'px-3'}`}
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
            >
              {!isCollapsed && 'Settings'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start hover:bg-surface ${isCollapsed ? 'px-2' : 'px-3'}`}
              iconName="HelpCircle"
              iconPosition="left"
              iconSize={16}
            >
              {!isCollapsed && 'Help & Support'}
            </Button>
          </div>
          
          {!isCollapsed && (
            <div className="mt-4 p-3 bg-surface rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-foreground">System Status</span>
              </div>
              <p className="text-xs text-muted-foreground">
                All systems operational. Your data is secure and private.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;