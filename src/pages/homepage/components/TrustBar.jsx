import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBar = () => {
  const trustItems = [
  ];

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Trusted by Thousands, Backed by Science
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your mental wellness journey is supported by industry-leading security, 
            evidence-based practices, and professional expertise.
          </p>
        </div>

        {/* Main Trust Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-surface rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-[#f29819] rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Icon name={item.icon} size={28} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-[#f29819]" />
              <span className="text-sm font-medium text-foreground">APA Endorsed Methods</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-[#f29819]" />
              <span className="text-sm font-medium text-foreground">End-to-End Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-[#f29819]" />
              <span className="text-sm font-medium text-foreground">10,000+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-[#f29819]" />
              <span className="text-sm font-medium text-foreground">4.8/5 User Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
