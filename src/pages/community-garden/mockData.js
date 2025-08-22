// Mock data for forums
export const forums = [
  {
    id: 'anxiety',
    name: 'Anxiety Support Circle',
    description: 'A safe space to share experiences and coping strategies for anxiety',
    type: 'anxiety',
    memberCount: 1247,
    activeThreads: 23,
    postsToday: 15,
    lastActivity: '2 min ago',
    moderators: [
      { name: 'Dr. Sarah Chen', type: 'professional' },
      { name: 'Community Volunteer', type: 'peer' }
    ]
  },
  {
    id: 'depression',
    name: 'Depression Recovery',
    description: 'Supporting each other through the journey of depression recovery',
    type: 'depression',
    memberCount: 892,
    activeThreads: 18,
    postsToday: 12,
    lastActivity: '5 min ago',
    moderators: [
      { name: 'Dr. Michael Torres', type: 'professional' },
      { name: 'Peer Support Lead', type: 'peer' }
    ]
  },
  {
    id: 'student',
    name: 'Student Life Challenges',
    description: 'Academic stress, social pressures, and campus life support',
    type: 'student',
    memberCount: 634,
    activeThreads: 31,
    postsToday: 22,
    lastActivity: '1 min ago',
    moderators: [
      { name: 'Campus Counselor', type: 'professional' }
    ]
  },
  {
    id: 'workplace',
    name: 'Workplace Stress',
    description: 'Managing work-life balance, burnout, and professional challenges',
    type: 'workplace',
    memberCount: 756,
    activeThreads: 16,
    postsToday: 9,
    lastActivity: '8 min ago',
    moderators: [
      { name: 'Workplace Wellness Expert', type: 'professional' },
      { name: 'HR Professional', type: 'peer' }
    ]
  },
  {
    id: 'parent',
    name: 'New Parent Wellness',
    description: 'Support for new parents navigating mental health challenges',
    type: 'parent',
    memberCount: 423,
    activeThreads: 12,
    postsToday: 7,
    lastActivity: '15 min ago',
    moderators: [
      { name: 'Maternal Mental Health Specialist', type: 'professional' }
    ]
  }
];

// Mock data for discussion threads
export const discussionThreads = [
  {
    id: 1,
    forumId: 'workplace',
    title: "First panic attack at work - how do I cope?",
    author: "Anonymous Butterfly",
    mood: "anxious",
    preview: "I had my first panic attack during a team meeting yesterday. My heart was racing, I couldn't breathe properly, and I felt like everyone was staring at me. I managed to excuse myself but I'm terrified it will happen again...",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    replyCount: 12,
    supportCount: 28,
    viewCount: 156,
    hasTriggerWarning: false,
    replies: [
      {
        id: 101,
        author: "Calm Warrior",
        content: "I'm so sorry you went through that. It's a terrifying experience. A technique that helps me is the 5-4-3-2-1 grounding method. Can I share it with you?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 102,
        author: "Supportive Friend",
        content: "You're not alone. It takes courage to share something like this. Talking about it is a huge first step.",
        timestamp: new Date(Date.now() - 25 * 60 * 1000)
      }
    ]
  },
  {
    id: 2,
    forumId: 'depression',
    title: "Three months clean from self-harm - small victories matter",
    author: "Rising Phoenix",
    mood: "hopeful",
    preview: "I wanted to share this milestone with you all. Three months ago, I was in the darkest place I've ever been. With therapy, medication, and the support from this community, I've been clean from self-harm for 90 days...",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    replyCount: 45,
    supportCount: 127,
    viewCount: 892,
    hasTriggerWarning: true,
    replies: [
      {
        id: 201,
        author: "Gentle Soul",
        content: "This is so inspiring. Thank you for sharing your strength with us.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      }
    ]
  },
  {
    id: 3,
    forumId: 'student',
    title: "Finals week anxiety - breathing techniques that actually work",
    author: "Study Buddy",
    mood: "stressed",
    preview: "With finals approaching, my anxiety is through the roof. I've been practicing the 4-7-8 breathing technique someone shared here last month, and it's been a game-changer. Here's what I've learned...",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    replyCount: 23,
    supportCount: 67,
    viewCount: 234,
    hasTriggerWarning: false,
    replies: []
  },
  {
    id: 4,
    forumId: 'parent',
    title: "Postpartum depression - when will I feel like myself again?",
    author: "New Mom Journey",
    mood: "sad",
    preview: "My baby is 4 months old and I still don't feel connected to her or myself. Everyone says it gets better, but when? I love her, but I feel like I'm failing as a mother. The guilt is overwhelming...",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    replyCount: 31,
    supportCount: 89,
    viewCount: 445,
    hasTriggerWarning: true,
    replies: []
  },
  {
    id: 5,
    forumId: 'anxiety',
    title: "Gratitude practice changed my perspective on bad days",
    author: "Grateful Heart",
    mood: "grateful",
    preview: "I used to think gratitude practice was just toxic positivity, but after 30 days of writing down three things I'm grateful for each day, I've noticed a real shift in how I handle difficult moments...",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    replyCount: 18,
    supportCount: 52,
    viewCount: 178,
    hasTriggerWarning: false,
    replies: []
  }
];

// Mock data for community stats
export const communityStats = {
  activeMembers: "2.1K",
  weeklyPosts: "156",
  supportGiven: "1.8K",
  successStories: "47"
};

// Mock data for group challenges
export const groupChallenges = [
  {
    id: 1,
    title: "30 Days of Gratitude Practice",
    description: "Write down three things you're grateful for each day",
    type: "gratitude",
    duration: "30 days",
    participants: 234,
    currentDay: 12,
    totalDays: 30,
    startDate: "Dec 1",
    isJoined: true,
    recentActivity: "Sarah shared: 'Grateful for morning coffee and supportive friends'"
  },
  {
    id: 2,
    title: "Mindful Moments Challenge",
    description: "Practice 5 minutes of mindfulness daily",
    type: "mindfulness",
    duration: "21 days",
    participants: 189,
    currentDay: 8,
    totalDays: 21,
    startDate: "Dec 10",
    isJoined: false,
    recentActivity: "Alex completed day 8: 'Meditation in the park was peaceful'"
  },
  {
    id: 3,
    title: "Movement for Mental Health",
    description: "Any form of physical activity for 15 minutes daily",
    type: "exercise",
    duration: "14 days",
    participants: 156,
    currentDay: 5,
    totalDays: 14,
    startDate: "Dec 15",
    isJoined: true,
    recentActivity: "Jamie walked 2 miles: 'Fresh air helped clear my mind'"
  }
];

// Mock data for success stories
export const successStories = [
    {
      id: 1,
      title: "From Panic Attacks to Public Speaking",
      preview: "Six months ago, I couldn't leave my house without having a panic attack. Today, I gave a presentation to 50 people at work. Here's how I got here...",
      category: "anxiety",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      hearts: 89,
      comments: 23,
      shares: 12,
      readTime: 4,
      milestone: "6 months panic-free"
    },
    {
      id: 2,
      title: "Finding Joy Again After Depression",
      preview: "Depression took away my ability to feel joy for almost two years. Through therapy, medication, and this amazing community, I'm rediscovering what happiness feels like...",
      category: "depression",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      hearts: 156,
      comments: 34,
      shares: 28,
      readTime: 6,
      milestone: "1 year in recovery"
    },
    {
      id: 3,
      title: "Balancing Parenthood and Mental Health",
      preview: "Becoming a parent while managing anxiety felt impossible. Here's how I learned to take care of myself while caring for my baby...",
      category: "relationships",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      hearts: 67,
      comments: 18,
      shares: 15,
      readTime: 5,
      milestone: "Healthy boundaries established"
    }
  ];