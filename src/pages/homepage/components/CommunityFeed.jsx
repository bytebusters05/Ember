import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityFeed = ({ onViewCommunity }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mockFeedData = [
    {
      id: 1,
      type: 'post',
      content: "Just completed my first week of daily check-ins. Small steps, but I'm already noticing patterns in my mood. Grateful for this supportive community! 🌱",
      author: "Anonymous User",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      category: "Progress Update",
      reactions: 12,
      replies: 3,
      mood: "hopeful"
    },
    {
      id: 2,
      type: 'milestone',
      content: "30 days of consistent mindfulness practice! The breathing exercises have become second nature. Thank you to everyone who shared their techniques.",
      author: "Community Member",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      category: "Milestone",
      reactions: 24,
      replies: 8,
      mood: "accomplished"
    },
    {
      id: 3,
      type: 'support',
      content: "Having a tough day with anxiety. The grounding technique someone shared here last week is helping me stay present. This community is a lifeline.",
      author: "Anonymous User",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      category: "Support Request",
      reactions: 18,
      replies: 15,
      mood: "struggling"
    },
    {
      id: 4,
      type: 'tip',
      content: "Pro tip: I set my phone to remind me to do a mood check-in right after lunch. It's become the perfect midday reset. What time works best for you?",
      author: "Community Helper",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      category: "Tips & Tricks",
      reactions: 31,
      replies: 12,
      mood: "helpful"
    },
    {
      id: 5,
      type: 'gratitude',
      content: "Grateful for the professional therapist I connected with through this platform. The AI matching was spot-on, and the preparation tools made our first session so much easier.",
      author: "Anonymous User",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      category: "Gratitude",
      reactions: 27,
      replies: 6,
      mood: "grateful"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedItems(mockFeedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    return hours > 0 ? `${hours}h ago` : `${minutes}m ago`;
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      hopeful: 'Sprout',
      accomplished: 'Trophy',
      struggling: 'Heart',
      helpful: 'Lightbulb',
      grateful: 'Smile'
    };
    return moodIcons[mood] || 'MessageCircle';
  };

  const getMoodColor = (mood) => {
    const emberColor = '#f29819';
    const moodColors = {
      hopeful: 'text-green-500',
      accomplished: 'text-yellow-500',
      struggling: `text-[${emberColor}]`,
      helpful: 'text-blue-500',
      grateful: 'text-purple-500'
    };
    return moodColors[mood] || 'text-muted-foreground';
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#f29819] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading community activity...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Live Community Activity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of individuals sharing their wellness journeys, 
            supporting each other, and celebrating progress together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            {feedItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl shadow-gentle hover:shadow-lg transition-all duration-300 hover-lift p-6 border border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full bg-surface flex items-center justify-center flex-shrink-0 ${getMoodColor(item.mood)}`}>
                    <Icon name={getMoodIcon(item.mood)} size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-foreground">{item.author}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{formatTimeAgo(item.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#f29819', color: 'white' }}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-foreground leading-relaxed mb-4">
                      {item.content}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2 hover:text-[#f29819] cursor-pointer transition-colors">
                        <Icon name="Heart" size={16} />
                        <span>{item.reactions}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-[#f29819] cursor-pointer transition-colors">
                        <Icon name="MessageCircle" size={16} />
                        <span>{item.replies}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-[#f29819] cursor-pointer transition-colors">
                        <Icon name="Share2" size={16} />
                        <span>Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface rounded-xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#f29819' }}>2,847</div>
                <div className="text-sm text-muted-foreground">Active Members Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#f29819' }}>156</div>
                <div className="text-sm text-muted-foreground">New Posts This Hour</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#f29819' }}>1,234</div>
                <div className="text-sm text-muted-foreground">Support Messages Sent</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-card rounded-xl p-8 shadow-gentle">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Join Our Supportive Community
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Connect with others on similar journeys, share your experiences, 
                and find the support you need in a safe, anonymous environment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={onViewCommunity}
                  className="bg-[#f29819] hover:bg-[#e68c12] text-white"
                  iconName="Users"
                  iconPosition="left"
                  iconSize={20}
                >
                  Explore Community
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#f29819] text-[#f29819] hover:bg-[#f29819] hover:text-white"
                  iconName="Edit3"
                  iconPosition="left"
                  iconSize={20}
                >
                  Share Your Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityFeed;
