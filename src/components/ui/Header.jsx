import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import HelpSupportModal from '../HelpSupportModal'; // Import the new modal

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // New state for the modal
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Dashboard', path: '/wellness-dashboard', icon: 'BarChart3' },
    { name: 'Chat', path: '/chat-interface', icon: 'MessageCircle' },
    { name: 'Resources', path: '/resource-library', icon: 'BookOpen' },
    { name: 'Community', path: '/community-garden', icon: 'Users' }
  ];

  const secondaryItems = [
    { name: 'Professional Connect', path: '/professional-connect', icon: 'UserCheck' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const handleCrisisSupport = () => {
    console.log('Crisis support activated');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-gentle shadow-gentle border-b border-border' 
            : 'bg-background/80 backdrop-blur-sm'
        } ${className}`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-14 h-14  rounded-lg breathing-pulse">
                <img src="public/assets/images/logo_ember.png" alt="" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-foreground">Ember</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Your Thoughtful Companion</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                    isActivePath(item?.path)
                      ? 'bg-therapeutic-primary text-white shadow-therapeutic'
                      : 'text-foreground hover:bg-surface hover:text-therapeutic-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </button>
              ))}
              
              {/* More Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface hover:text-therapeutic-primary transition-all duration-200 hover-lift">
                  <Icon name="MoreHorizontal" size={18} />
                  <span>More</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-therapeutic opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {secondaryItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`flex items-center space-x-3 w-full px-4 py-2 text-sm text-left hover:bg-surface transition-colors ${
                          isActivePath(item?.path) ? 'text-therapeutic-primary bg-surface' : 'text-foreground'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.name}</span>
                      </button>
                    ))}
                    <hr className="my-2 border-border" />
                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-left hover:bg-surface transition-colors text-foreground">
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    {/* Added onClick handler to open the modal */}
                    <button 
                      onClick={() => setIsHelpModalOpen(true)} 
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-left hover:bg-surface transition-colors text-foreground"
                    >
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Crisis Support & Mobile Menu */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisSupport}
                className="hidden sm:flex border-accent text-accent hover:bg-accent hover:text-white"
                iconName="Phone"
                iconPosition="left"
                iconSize={16}
              >
                Crisis Support
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCrisisSupport}
                className="sm:hidden border-accent text-accent hover:bg-accent hover:text-white"
              >
                <Icon name="Phone" size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="lg:hidden"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-card border-t border-border shadow-therapeutic">
              <div className="px-4 py-4 space-y-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-therapeutic-primary text-white shadow-gentle'
                        : 'text-foreground hover:bg-surface hover:text-therapeutic-primary'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.name}</span>
                  </button>
                ))}
                
                <hr className="my-3 border-border" />
                
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-therapeutic-primary text-white shadow-gentle'
                        : 'text-foreground hover:bg-surface hover:text-therapeutic-primary'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.name}</span>
                  </button>
                ))}
                
                <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 text-foreground hover:bg-surface hover:text-therapeutic-primary">
                  <Icon name="Settings" size={20} />
                  <span className="font-medium">Settings</span>
                </button>
                
                {/* Added onClick handler to open the modal */}
                <button 
                  onClick={() => {
                    setIsHelpModalOpen(true);
                    setIsMobileMenuOpen(false); // Close mobile menu when opening modal
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 text-foreground hover:bg-surface hover:text-therapeutic-primary"
                >
                  <Icon name="HelpCircle" size={20} />
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Conditionally render the new modal */}
      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};

export default Header;