import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ResourceCard from './components/ResourceCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import FeaturedCollections from './components/FeaturedCollections';
import ResourceModal from './components/ResourceModal';
import WellnessChatbot from '../../components/WellnessChatbot';

const ResourceLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "Progressive Muscle Relaxation",
      category: "Stress Relief",
      type: "exercise",
      description: "A systematic technique for achieving deep relaxation by tensing and releasing different muscle groups. This evidence-based practice helps reduce physical tension and mental stress while promoting overall well-being.",
      duration: 15,
      difficulty: "Beginner",
      rating: 4.8,
      reviews: 1247,
      approach: "Progressive Muscle Relaxation (PMR) - developed by Edmund Jacobson, this technique helps identify and release physical tension patterns.",
      tags: ["relaxation", "stress", "body awareness", "sleep"],
      isNew: false,
      steps: [
        "Find a comfortable position in a quiet space",
        "Start with your toes - tense for 5 seconds, then release",
        "Move up to your calves, thighs, and continue systematically",
        "Notice the contrast between tension and relaxation",
        "End with deep breathing and full body awareness"
      ]
    },
    {
      id: 2,
      title: "Cognitive Restructuring for Anxiety",
      category: "Anxiety Management",
      type: "worksheet",
      description: "Learn to identify and challenge anxious thoughts using proven CBT techniques. This interactive worksheet guides you through the process of examining evidence and developing balanced perspectives.",
      duration: 25,
      difficulty: "Intermediate",
      rating: 4.9,
      reviews: 892,
      approach: "Cognitive Behavioral Therapy (CBT) - focuses on identifying and modifying negative thought patterns that contribute to anxiety.",
      tags: ["anxiety", "CBT", "thought patterns", "coping skills"],
      isNew: true,
      content: `Understanding Cognitive Restructuring\n\nCognitive restructuring is a core technique in CBT that helps you identify and challenge unhelpful thought patterns. When we're anxious, our thoughts often become distorted and unrealistic.\n\nCommon Thought Distortions:\n- Catastrophizing: Imagining the worst possible outcome\n- All-or-nothing thinking: Seeing things in black and white\n- Mind reading: Assuming you know what others are thinking\n- Fortune telling: Predicting negative outcomes without evidence\n\nThe ABCDE Method:\nA - Adversity (the triggering event)\nB - Beliefs (your thoughts about the event)\nC - Consequences (your emotional and behavioral responses)\nD - Disputation (challenging the unhelpful beliefs)\nE - Energization (the new, more balanced perspective)`
    },
    {
      id: 3,
      title: "Mindful Breathing for Sleep",
      category: "Sleep & Rest",
      type: "audio",
      description: "A gentle guided meditation designed to calm your mind and prepare your body for restful sleep. Uses breathing techniques and body awareness to promote natural sleep onset.",
      duration: 20,
      difficulty: "Beginner",
      rating: 4.7,
      reviews: 2156,
      approach: "Mindfulness-Based Stress Reduction (MBSR) - combines meditation and body awareness to promote relaxation and sleep quality.",
      tags: ["sleep", "meditation", "breathing", "relaxation"],
      isNew: false
    },
    {
      id: 4,
      title: "Building Emotional Intelligence",
      category: "Relationship Skills",
      type: "article",
      description: "Comprehensive guide to understanding and developing emotional intelligence. Learn to recognize emotions, manage reactions, and improve interpersonal relationships through practical strategies.",
      duration: 35,
      difficulty: "Intermediate",
      rating: 4.6,
      reviews: 743,
      approach: "Emotional Intelligence Theory - based on Daniel Goleman\'s framework for understanding and developing emotional competencies.",
      tags: ["emotions", "relationships", "communication", "self-awareness"],
      isNew: false,
      content: `Understanding Emotional Intelligence\n\nEmotional intelligence (EI) is the ability to recognize, understand, and manage our own emotions while effectively recognizing and responding to others' emotions.\n\nThe Four Domains of EI:\n\n1. Self-Awareness\n- Recognizing your emotions as they occur\n- Understanding your emotional triggers\n- Knowing your strengths and limitations\n\n2. Self-Management\n- Controlling impulsive feelings and behaviors\n- Managing emotions in healthy ways\n- Taking initiative and following through on commitments\n\n3. Social Awareness\n- Understanding others' emotions and perspectives\n- Reading social cues accurately\n- Showing empathy and compassion\n\n4. Relationship Management\n- Communicating clearly and effectively\n- Managing conflict constructively\n- Building and maintaining healthy relationships\n\nDeveloping Your EI:\n- Practice mindful awareness of your emotional states\n- Keep an emotion journal to identify patterns\n- Ask for feedback from trusted friends or colleagues\n- Practice active listening in conversations\n- Learn to pause before reacting in emotional situations`
    },
    {
      id: 5,
      title: "Workplace Stress Management",
      category: "Workplace Wellness",
      type: "exercise",
      description: "Practical strategies for managing stress in professional environments. Includes techniques for setting boundaries, managing workload, and maintaining work-life balance.",
      duration: 30,
      difficulty: "Intermediate",
      rating: 4.5,
      reviews: 1089,
      approach: "Stress Inoculation Training - helps build resilience and coping skills for high-pressure work environments.",
      tags: ["work stress", "boundaries", "productivity", "burnout prevention"],
      isNew: true,
      steps: [
        "Identify your primary work stressors and triggers",
        "Practice the 'Stop, Breathe, Think' technique during stressful moments",
        "Set clear boundaries between work and personal time",
        "Use time-blocking to manage overwhelming workloads",
        "Develop a daily stress-relief routine for the workplace"
      ]
    },
    {
      id: 6,
      title: "Understanding Depression: A Guide",
      category: "Depression Support",
      type: "article",
      description: "Educational resource explaining depression symptoms, causes, and treatment options. Provides hope and practical information for those experiencing depression or supporting someone who is.",
      duration: 40,
      difficulty: "Beginner",
      rating: 4.8,
      reviews: 1567,
      approach: "Psychoeducation - providing accurate information about mental health conditions to reduce stigma and promote understanding.",
      tags: ["depression", "mental health", "education", "support"],
      isNew: false,
      content: `Understanding Depression\n\nDepression is more than just feeling sad or going through a rough patch. It's a serious mental health condition that affects how you feel, think, and handle daily activities.\n\nCommon Symptoms:\n- Persistent sad, anxious, or empty mood\n- Loss of interest in activities once enjoyed\n- Significant weight loss or gain\n- Sleep disturbances\n- Fatigue or loss of energy\n- Feelings of worthlessness or guilt\n- Difficulty concentrating\n- Thoughts of death or suicide\n\nTypes of Depression:\n- Major Depressive Disorder\n- Persistent Depressive Disorder\n- Seasonal Affective Disorder\n- Postpartum Depression\n- Bipolar Disorder\n\nTreatment Options:\n- Psychotherapy (talk therapy)\n- Medication\n- Lifestyle changes\n- Support groups\n- Alternative treatments\n\nRemember: Depression is treatable, and seeking help is a sign of strength, not weakness.`
    }
  ];

  // Mock data for featured collections
  const featuredCollections = [
    {
      id: 1,
      title: "Finals Week Survival Kit",
      description: "Essential resources for managing academic stress, improving focus, and maintaining mental health during exam periods.",
      type: "seasonal",
      resourceCount: 12,
      totalDuration: "3h 45m",
      completions: "2.1k",
      rating: 4.7,
      tags: ["academic stress", "focus", "time management", "anxiety"]
    },
    {
      id: 2,
      title: "Holiday Stress Management",
      description: "Navigate family gatherings, financial pressures, and seasonal depression with evidence-based coping strategies.",
      type: "seasonal",
      resourceCount: 8,
      totalDuration: "2h 20m",
      completions: "1.8k",
      rating: 4.6,
      tags: ["family stress", "seasonal depression", "boundaries", "self-care"]
    },
    {
      id: 3,
      title: "Crisis Support Toolkit",
      description: "Immediate resources for mental health crises, including grounding techniques and emergency contacts.",
      type: "crisis",
      resourceCount: 6,
      totalDuration: "45m",
      completions: "956",
      rating: 4.9,
      tags: ["crisis", "emergency", "grounding", "safety"]
    },
    {
      id: 4,
      title: "Beginner\'s Guide to Mental Wellness",
      description: "Start your mental health journey with foundational concepts and gentle introduction to therapeutic techniques.",
      type: "beginner",
      resourceCount: 15,
      totalDuration: "4h 30m",
      completions: "3.2k",
      rating: 4.8,
      tags: ["basics", "introduction", "self-care", "wellness"]
    }
  ];

  const categories = [
    'All',
    'Anxiety Management',
    'Depression Support', 
    'Stress Relief',
    'Relationship Skills',
    'Workplace Wellness',
    'Sleep & Rest',
    'Mindfulness',
    'Crisis Support'
  ];

  // Calculate resource counts per category
  const resourceCounts = categories?.reduce((counts, category) => {
    if (category === 'All') {
      counts[category] = resources?.length;
    } else {
      counts[category] = resources?.filter(resource => resource?.category === category)?.length;
    }
    return counts;
  }, {});

  // Filter resources based on selected criteria
  const filteredResources = resources?.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource?.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    
    const matchesMood = selectedMoodFilter === 'all' || 
      (selectedMoodFilter === 'overwhelmed' && resource?.tags?.includes('stress')) ||
      (selectedMoodFilter === 'anxious' && resource?.tags?.includes('anxiety')) ||
      (selectedMoodFilter === 'sad' && resource?.category === 'Depression Support') ||
      (selectedMoodFilter === 'stressed' && resource?.tags?.includes('stress')) ||
      (selectedMoodFilter === 'tired' && resource?.tags?.includes('sleep'));

    return matchesCategory && matchesSearch && matchesMood;
  });

  // Sort resources
  const sortedResources = [...filteredResources]?.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b?.rating - a?.rating;
      case 'duration':
        return a?.duration - b?.duration;
      case 'newest':
        return b?.isNew - a?.isNew;
      case 'popular':
        return b?.reviews - a?.reviews;
      default:
        return 0;
    }
  });

  const handleBookmark = (resourceId) => {
    const newBookmarks = new Set(bookmarkedResources);
    if (newBookmarks?.has(resourceId)) {
      newBookmarks?.delete(resourceId);
    } else {
      newBookmarks?.add(resourceId);
    }
    setBookmarkedResources(newBookmarks);
  };

  const handleResourceStart = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleResourceComplete = (resourceId, rating, feedback) => {
    console.log('Resource completed:', { resourceId, rating, feedback });
    // Here you would typically send this data to your backend
  };

  const handleCollectionSelect = (collection) => {
    console.log('Collection selected:', collection);
    // Here you would navigate to the collection view or filter resources
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-therapeutic-primary/5 via-therapeutic-secondary/5 to-conversion-accent/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-therapeutic-primary rounded-lg flex items-center justify-center breathing-pulse">
                  <Icon name="BookOpen" size={24} color="white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Resource Library
                </h1>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Discover evidence-based tools, exercises, and educational content to support your mental wellness journey. 
                From CBT techniques to mindfulness practices, find resources tailored to your needs.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-therapeutic-primary">{resources?.length}</div>
                  <div className="text-sm text-muted-foreground">Resources</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">8</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-conversion-accent">4.7</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-therapeutic-secondary">12k+</div>
                  <div className="text-sm text-muted-foreground">Completions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <SearchBar
                onSearch={setSearchQuery}
                onMoodFilter={setSelectedMoodFilter}
                selectedMoodFilter={selectedMoodFilter}
              />

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                resourceCounts={resourceCounts}
              />

              {/* Featured Collections */}
              <FeaturedCollections
                collections={featuredCollections}
                onCollectionSelect={handleCollectionSelect}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedCategory === 'All' ? 'All Resources' : selectedCategory}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    ({sortedResources?.length} {sortedResources?.length === 1 ? 'resource' : 'resources'})
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-therapeutic-primary"
                  >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Shortest Duration</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Grid3X3" size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="List" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Resources Grid/List */}
              {sortedResources?.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {sortedResources?.map((resource) => (
                    <ResourceCard
                      key={resource?.id}
                      resource={resource}
                      onBookmark={handleBookmark}
                      onStart={handleResourceStart}
                      isBookmarked={bookmarkedResources?.has(resource?.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or browse different categories.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedMoodFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Load More Button */}
              {sortedResources?.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    className="px-8"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Load More Resources
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resource Modal */}
        <ResourceModal
          resource={selectedResource}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedResource(null);
          }}
          onComplete={handleResourceComplete}
          onBookmark={handleBookmark}
          isBookmarked={selectedResource ? bookmarkedResources?.has(selectedResource?.id) : false}
        />
      </div>
    </div>

  );
};

export default ResourceLibrary;