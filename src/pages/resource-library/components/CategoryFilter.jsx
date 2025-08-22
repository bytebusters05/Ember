import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, resourceCounts }) => {

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All': return 'Grid3X3';
      case 'Anxiety Management': return 'Shield';
      case 'Depression Support': return 'Heart';
      case 'Stress Relief': return 'Zap';
      case 'Relationship Skills': return 'Users';
      case 'Workplace Wellness': return 'Briefcase';
      case 'Sleep & Rest': return 'Moon';
      case 'Mindfulness': return 'Flower2';
      case 'Crisis Support': return 'Phone';
      case 'Self-Care': return 'Feather';
      case 'Grief & Loss': return 'Sad';
      case 'Confidence Building': return 'Rocket';
      default: return 'Book';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Anxiety Management': return 'text-therapeutic-primary bg-therapeutic-primary/10';
      case 'Depression Support': return 'text-trust-builder bg-trust-builder/10';
      case 'Stress Relief': return 'text-conversion-accent bg-conversion-accent/10';
      case 'Relationship Skills': return 'text-therapeutic-secondary bg-therapeutic-secondary/10';
      case 'Workplace Wellness': return 'text-warning bg-warning/10';
      case 'Sleep & Rest': return 'text-primary bg-primary/10';
      case 'Mindfulness': return 'text-success bg-success/10';
      case 'Crisis Support': return 'text-accent bg-accent/10';
      case 'Self-Care': return 'text-indigo-500 bg-indigo-500/10';
      case 'Grief & Loss': return 'text-gray-500 bg-gray-500/10';
      case 'Confidence Building': return 'text-orange-500 bg-orange-500/10';
      default: return 'text-muted-foreground bg-surface';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-soft transition-all duration-300">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Filter" size={20} className="text-therapeutic-primary" />
        <h3 className="font-semibold text-lg text-foreground">Categories</h3>
      </div>
      <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category;
          const count = resourceCounts?.[category] || 0;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${isSelected 
                  ? 'bg-therapeutic-primary text-white shadow-md' 
                  : 'hover:bg-surface-hover hover:scale-[1.01] text-foreground'
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300
                  ${isSelected ? 'bg-white/20' : getCategoryColor(category)}`}>
                  <Icon 
                    name={getCategoryIcon(category)} 
                    size={16} 
                    className={isSelected ? 'text-white' : 'text-current'}
                  />
                </div>
                <span className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-foreground'}`}>
                  {category}
                </span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-all duration-300
                ${isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-muted-background text-muted-foreground'
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;