import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onMoodFilter, selectedMoodFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoodFilters, setShowMoodFilters] = useState(false);

  const moodFilters = [
    { id: 'all', label: 'All Resources', icon: 'Grid3X3' },
    { id: 'overwhelmed', label: 'Feeling Overwhelmed', icon: 'CloudRain' },
    { id: 'anxious', label: 'Feeling Anxious', icon: 'Zap' },
    { id: 'sad', label: 'Feeling Sad', icon: 'CloudDrizzle' },
    { id: 'stressed', label: 'Feeling Stressed', icon: 'AlertTriangle' },
    { id: 'angry', label: 'Feeling Angry', icon: 'Flame' },
    { id: 'lonely', label: 'Feeling Lonely', icon: 'User' },
    { id: 'tired', label: 'Feeling Tired', icon: 'Moon' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleMoodFilterSelect = (moodId) => {
    onMoodFilter(moodId);
    setShowMoodFilters(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const selectedMood = moodFilters?.find(mood => mood?.id === selectedMoodFilter);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-gentle">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search resources, exercises, or topics..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={18} />
            </button>
          )}
        </div>

        {/* Mood-based Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowMoodFilters(!showMoodFilters)}
            className="w-full justify-between"
            iconName={selectedMood?.icon || 'Smile'}
            iconPosition="left"
          >
            <span>{selectedMood?.label || 'Filter by how you\'re feeling'}</span>
            <Icon name={showMoodFilters ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>

          {showMoodFilters && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-therapeutic z-10">
              <div className="p-2 max-h-64 overflow-y-auto">
                {moodFilters?.map((mood) => (
                  <button
                    key={mood?.id}
                    onClick={() => handleMoodFilterSelect(mood?.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-surface transition-colors ${
                      selectedMoodFilter === mood?.id ? 'bg-therapeutic-primary/10 text-therapeutic-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon name={mood?.icon} size={18} />
                    <span>{mood?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Quick searches:</span>
          {['breathing exercises', 'sleep anxiety', 'work stress', 'relationship conflict']?.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                onSearch(suggestion);
              }}
              className="px-3 py-1 bg-surface hover:bg-therapeutic-primary/10 hover:text-therapeutic-primary rounded-full text-sm text-muted-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;