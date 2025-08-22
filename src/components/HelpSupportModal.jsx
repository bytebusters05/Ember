import React from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';

const HelpSupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-therapeutic">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="HelpCircle" size={20} className="text-therapeutic-primary" />
            <span>Help & Support</span>
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-muted-foreground">
            Welcome to the Ember help center. Below are some quick links to help you on your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BookOpenText" size={20} className="text-trust-builder" />
                <h4 className="font-medium text-foreground">FAQ & Knowledge Base</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Find answers to common questions about the app, our features, and mental wellness.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-therapeutic-primary hover:underline">
                Go to Knowledge Base <Icon name="ArrowRight" size={14} className="ml-1" />
              </a>
            </div>

            <div className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="MessageSquare" size={20} className="text-conversion-accent" />
                <h4 className="font-medium text-foreground">Contact Support</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Can't find what you're looking for? Send us a message and we'll get back to you.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-therapeutic-primary hover:underline">
                Send a Message <Icon name="ArrowRight" size={14} className="ml-1" />
              </a>
            </div>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">In Crisis?</h4>
                <p className="text-sm text-muted-foreground">
                  If you are in immediate danger, please reach out to our emergency crisis support.
                </p>
                <a href="#" className="inline-flex items-center mt-2 text-sm font-medium text-accent hover:underline">
                  Go to Crisis Support <Icon name="ArrowRight" size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportModal;