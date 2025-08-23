import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import ConversationModeSelector from './components/ConversationModeSelector';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ConversationHistory from './components/ConversationHistory';
import CrisisAlert from './components/CrisisAlert';
import WelcomeGreeting from './components/WelcomeGreeting';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import axios from 'axios';

const ChatInterface = () => {
  const [currentMode, setCurrentMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock user profile data
  const userProfile = {
    firstName: "Alex",
    lastName: "Johnson",
    joinDate: "2024-01-15",
    totalSessions: 23,
    currentStreak: 5
  };

  // Mock recent mood data
  const recentMoodData = [
    { date: "2025-08-20", score: 6, mood: "neutral", notes: "Feeling okay, work stress manageable" },
    { date: "2025-08-21", score: 4, mood: "anxious", notes: "Big presentation tomorrow, feeling nervous" },
    { date: "2025-08-22", score: 7, mood: "calm", notes: "Presentation went well, feeling relieved" }
  ];

  // Mock conversation history
  const conversationHistory = [
    {
      id: 1,
      date: "2025-08-22",
      mode: "daily-checkin",
      mood: "calm",
      moodScore: 7,
      messageCount: 12,
      summary: "Discussed presentation anxiety and practiced breathing techniques. Felt much better after the session.",
      hasBreakthrough: true,
      skillsPracticed: ["Deep Breathing", "Positive Self-Talk", "Grounding"]
    },
    {
      id: 2,
      date: "2025-08-21",
      mode: "skill-building",
      mood: "anxious",
      moodScore: 4,
      messageCount: 18,
      summary: "Worked on managing presentation anxiety using CBT techniques and visualization exercises.",
      hasBreakthrough: false,
      skillsPracticed: ["CBT Techniques", "Visualization", "Progressive Relaxation"]
    },
    {
      id: 3,
      date: "2025-08-20",
      mode: "open-reflection",
      mood: "neutral",
      moodScore: 6,
      messageCount: 8,
      summary: "General check-in about work-life balance and upcoming challenges.",
      hasBreakthrough: false,
      skillsPracticed: ["Mindfulness", "Goal Setting"]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // NOTE: The mock `generateBotResponse` and `detectCrisisKeywords` functions
  // have been removed. The backend handles this logic now.

  const handleSendMessage = async (messageContent) => {
    if (!messageContent?.trim()) return;

    // 1. Add the user's message to the chat window immediately
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageContent,
      timestamp: new Date(),
      mood: getCurrentMoodScore()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // 2. Prepare the conversation history for the API
      // Only include user and bot messages for context
      const apiHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
        .map(msg => ({
          sender: msg.sender,
          content: msg.content
        }));

      // 3. Make the API call to your Flask backend
      const response = await axios.post('http://127.0.0.1:5000/api/gemini-chat', {
        message: messageContent,
        history: apiHistory
      });

      const botResponseData = response.data;
      
      // 4. Handle a potential crisis response from the backend
      if (botResponseData.emotion === 'crisis') {
        setShowCrisisAlert(true);
      }

      // 5. Add the bot's live response to the chat window
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        content: botResponseData.content,
        emotion: botResponseData.emotion || 'supportive',
        timestamp: new Date(),
        quickActions: botResponseData.quickActions || []
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message to Gemini API:", error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'system',
        content: 'I\'m sorry, I was unable to connect with my AI brain. Please check the backend server.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
    
    // Add system message about mode change
    const systemMessage = {
      id: Date.now(),
      sender: 'system',
      content: `Switched to ${mode?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())} mode`,
      timestamp: new Date()
    };

    // Add welcome message for the selected mode
    const welcomeMessages = {
      'daily-checkin': `Hi there! I'm ready to check in with you today. How are you feeling right now, and what's been on your mind since we last talked?`,
      'crisis-support': `I'm here to support you through this difficult moment. You've taken a brave step by reaching out. Can you tell me what's happening right now?`,'skill-building': `Great choice! Learning and practicing coping skills is one of the best investments you can make in your mental health. What area would you like to work on today?`,'open-reflection': `I'm here to listen and explore whatever is on your mind. There's no agenda - just a safe space for you to process your thoughts and feelings. What would you like to talk about?`
    };

    const welcomeMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      content: welcomeMessages?.[mode],
      emotion: mode === 'crisis-support' ? 'crisis' : 'supportive',
      timestamp: new Date()
    };

    setMessages([systemMessage, welcomeMessage]);
  };

  const handleStartConversation = (mode) => {
    handleModeSelect(mode);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      'breathing': 'Let\'s do a breathing exercise together. I\'ll guide you through a 4-7-8 breathing technique.',
      'grounding': 'Let\'s try the 5-4-3-2-1 grounding technique. Name 5 things you can see around you.',
      'mindfulness': 'Let\'s take a moment for mindfulness. Focus on your breath and the present moment.',
      'mood-rating': 'On a scale of 1-10, how would you rate your mood right now?',
      'safe-confirmation': 'I\'m glad to hear you\'re physically safe. Let\'s work together to help you feel emotionally safer too.',
      'feelings': 'Tell me more about what you\'re feeling. Remember, all emotions are valid.',
      'problem-solving': 'Let\'s break down what you\'re facing into smaller, manageable pieces.',
      'listening': 'I\'m here to listen. Take your time and share whatever feels important.',
      'coping': 'What coping strategies have you tried before? Let\'s explore what might work for you now.'
    };

    handleSendMessage(actionMessages?.[action] || 'I need some support right now.');
  };

  const getCurrentMoodScore = () => {
    return recentMoodData?.[recentMoodData?.length - 1]?.score || 5;
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
    // In a real app, this would load the conversation messages
    console.log('Loading conversation:', conversationId);
  };

  const handleEscalateToHuman = () => {
    setShowCrisisAlert(false);
    const escalationMessage = {
      id: Date.now(),
      sender: 'system',
      content: 'Connecting you with a human counselor...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, escalationMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 flex h-screen">
        {/* Sidebar - Conversation History */}
        <div className={`${showHistory ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-border`}>
          <div className="h-full p-4">
            <ConversationHistory
              conversations={conversationHistory}
              onSelectConversation={handleSelectConversation}
              currentConversationId={currentConversationId}
            />
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <Icon name="History" size={20} />
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16  rounded-full flex items-center justify-center breathing-pulse">
                    <img src="public/assets/images/logo_Ember.png" alt="logo" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-foreground">EmberBot</h1>
                    <p className="text-sm text-muted-foreground">
                      {currentMode ? `${currentMode?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())} Mode` : 'Your Thoughtful Companion'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setMessages([]);
                    setCurrentMode(null);
                  }}
                >
                  <Icon name="RotateCcw" size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.length === 0 ? (
              <div className="max-w-2xl mx-auto">
                <WelcomeGreeting
                  userProfile={userProfile}
                  recentMoodData={recentMoodData}
                  onStartConversation={handleStartConversation}
                />
                
                {!currentMode && (
                  <div className="mt-6">
                    <ConversationModeSelector
                      selectedMode={currentMode}
                      onModeSelect={handleModeSelect}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-4">
                {messages?.map((message) => (
                  <ChatMessage key={message?.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            disabled={isTyping}
          />
        </div>
      </div>
      {/* Crisis Alert Modal */}
      <CrisisAlert
        isVisible={showCrisisAlert}
        onDismiss={() => setShowCrisisAlert(false)}
        onEscalate={handleEscalateToHuman}
      />
    </div>
  );
};

export default ChatInterface;