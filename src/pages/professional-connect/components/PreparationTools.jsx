import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreparationTools = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('reflection');
  const [responses, setResponses] = useState({
    goals: '',
    concerns: '',
    expectations: '',
    background: '',
    currentState: '',
    support: ''
  });

  const sections = [
    {
      id: 'reflection',
      title: 'Self-Reflection',
      icon: 'Heart',
      description: 'Explore your thoughts and feelings before your session'
    },
    {
      id: 'goals',
      title: 'Goal Setting',
      icon: 'Target',
      description: 'Define what you want to achieve through therapy'
    },
    {
      id: 'conversation',
      title: 'Conversation Starters',
      icon: 'MessageCircle',
      description: 'Questions and topics to discuss with your therapist'
    },
    {
      id: 'progress',
      title: 'Progress Summary',
      icon: 'TrendingUp',
      description: 'Your MindfulBot journey insights to share'
    }
  ];

  const reflectionQuestions = [
    {
      id: 'currentState',
      question: 'How are you feeling right now, both emotionally and physically?',
      placeholder: 'Describe your current emotional and physical state...',
      key: 'currentState'
    },
    {
      id: 'concerns',
      question: 'What specific concerns or challenges brought you to seek therapy?',
      placeholder: 'Share what\'s been on your mind lately...',
      key: 'concerns'
    },
    {
      id: 'background',
      question: 'Is there important background information your therapist should know?',
      placeholder: 'Family history, past experiences, current life situation...',
      key: 'background'
    },
    {
      id: 'support',
      question: 'What does support look like to you? What do you need most right now?',
      placeholder: 'Describe what kind of support would be most helpful...',
      key: 'support'
    }
  ];

  const goalQuestions = [
    {
      id: 'goals',
      question: 'What do you hope to achieve through therapy?',
      placeholder: 'Short-term and long-term goals...',
      key: 'goals'
    },
    {
      id: 'expectations',
      question: 'What are your expectations for the therapeutic process?',
      placeholder: 'What do you expect from therapy and your therapist...',
      key: 'expectations'
    }
  ];

  const conversationStarters = [
    {
      category: 'Opening the Session',
      items: [
        "I'm feeling nervous about starting therapy, but I'm here because...",
        "The main thing I want you to know about me is...",
        "I've been struggling with... and it's affecting my daily life by...",
        "My biggest concern right now is..."
      ]
    },
    {
      category: 'Discussing Symptoms',
      items: [
        "I\'ve noticed that I feel... when...",
        "The patterns I\'ve observed in my mood/behavior are...",
        "Things that seem to trigger my anxiety/depression include...",
        "I cope with stress by... but it\'s not working because..."
      ]
    },
    {
      category: 'Exploring Goals',
      items: [
        "I want to feel more... in my daily life",
        "Success in therapy would look like...",
        "I hope to learn skills to help me...",
        "By the end of our work together, I'd like to be able to..."
      ]
    },
    {
      category: 'Building Rapport',
      items: [
        "I work best with therapists who...",
        "In past relationships/therapy, I've found it helpful when...",
        "I\'m worried that you might think... about me",
        "I want to be honest about..."
      ]
    }
  ];

  const progressInsights = {
    moodPatterns: [
      { pattern: 'Morning anxiety peaks', frequency: '5 days/week', trend: 'Improving' },
      { pattern: 'Work stress triggers', frequency: '3 days/week', trend: 'Stable' },
      { pattern: 'Evening reflection helps', frequency: '6 days/week', trend: 'Consistent' }
    ],
    copingStrategies: [
      { strategy: 'Deep breathing exercises', effectiveness: 'High', usage: '85%' },
      { strategy: 'Journaling', effectiveness: 'Medium', usage: '60%' },
      { strategy: 'Mindfulness meditation', effectiveness: 'High', usage: '70%' }
    ],
    achievements: [
      'Completed 14-day mood tracking streak',
      'Practiced grounding techniques during panic episode',
      'Reached out for support when feeling overwhelmed',
      'Identified personal anxiety triggers'
    ]
  };

  const handleResponseChange = (key, value) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const exportPreparation = () => {
    const preparationData = {
      responses,
      progressInsights,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(preparationData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'therapy-preparation.json';
    link.click();
  };

  const renderReflectionSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Self-Reflection Questions</h3>
        <p className="text-muted-foreground">
          Take time to reflect on these questions. Your responses can help guide your therapy session.
        </p>
      </div>

      {reflectionQuestions.map((item) => (
        <div key={item.id} className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            {item.question}
          </label>
          <textarea
            value={responses[item.key] || ''}
            onChange={(e) => handleResponseChange(item.key, e.target.value)}
            placeholder={item.placeholder}
            className="w-full h-24 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-therapeutic-primary focus:border-transparent resize-none"
          />
        </div>
      ))}
    </div>
  );

  const renderGoalsSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Goal Setting</h3>
        <p className="text-muted-foreground">
          Clarify your intentions and expectations for therapy.
        </p>
      </div>

      {goalQuestions.map((item) => (
        <div key={item.id} className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            {item.question}
          </label>
          <textarea
            value={responses[item.key] || ''}
            onChange={(e) => handleResponseChange(item.key, e.target.value)}
            placeholder={item.placeholder}
            className="w-full h-24 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-therapeutic-primary focus:border-transparent resize-none"
          />
        </div>
      ))}

      <div className="bg-surface rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">SMART Goals Framework</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="font-medium text-therapeutic-primary">Specific</span>
            <p className="text-muted-foreground">Clear and well-defined</p>
          </div>
          <div>
            <span className="font-medium text-therapeutic-primary">Measurable</span>
            <p className="text-muted-foreground">Track progress</p>
          </div>
          <div>
            <span className="font-medium text-therapeutic-primary">Achievable</span>
            <p className="text-muted-foreground">Realistic and attainable</p>
          </div>
          <div>
            <span className="font-medium text-therapeutic-primary">Relevant</span>
            <p className="text-muted-foreground">Meaningful to you</p>
          </div>
          <div>
            <span className="font-medium text-therapeutic-primary">Time-bound</span>
            <p className="text-muted-foreground">Has a deadline</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConversationSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Conversation Starters</h3>
        <p className="text-muted-foreground">
          Use these prompts to help you communicate effectively with your therapist.
        </p>
      </div>

      {conversationStarters.map((category) => (
        <div key={category.category} className="space-y-4">
          <h4 className="text-lg font-medium text-foreground">{category.category}</h4>
          <div className="grid grid-cols-1 gap-3">
            {category.items.map((item, index) => (
              <div key={index} className="bg-surface rounded-lg p-4 hover:bg-border transition-colors">
                <div className="flex items-start space-x-3">
                  <Icon name="MessageSquare" size={16} className="text-therapeutic-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Tips for Your First Session</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• It's okay to feel nervous - your therapist expects this</li>
              <li>• You don't have to share everything in the first session</li>
              <li>• Ask questions about the therapeutic process</li>
              <li>• Be honest about what you're comfortable discussing</li>
              <li>• Remember that building trust takes time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Your MindfulBot Journey</h3>
        <p className="text-muted-foreground">
          Share these insights with your therapist to provide context for your current state.
        </p>
      </div>

      {/* Mood Patterns */}
      <div>
        <h4 className="text-lg font-medium text-foreground mb-4">Mood Patterns Identified</h4>
        <div className="space-y-3">
          {progressInsights.moodPatterns.map((pattern, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div>
                <span className="font-medium text-foreground">{pattern.pattern}</span>
                <p className="text-sm text-muted-foreground">{pattern.frequency}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                pattern.trend === 'Improving' ? 'bg-success/10 text-success' :
                pattern.trend === 'Stable' ? 'bg-blue-100 text-blue-800' : 'bg-warning/10 text-warning'
              }`}>
                {pattern.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coping Strategies */}
      <div>
        <h4 className="text-lg font-medium text-foreground mb-4">Coping Strategies Tried</h4>
        <div className="space-y-3">
          {progressInsights.copingStrategies.map((strategy, index) => (
            <div key={index} className="p-3 bg-surface rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{strategy.strategy}</span>
                <span className="text-sm text-muted-foreground">{strategy.usage} usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Effectiveness:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  strategy.effectiveness === 'High' ? 'bg-success/10 text-success' :
                  strategy.effectiveness === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-red-100 text-red-800'
                }`}>
                  {strategy.effectiveness}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-lg font-medium text-foreground mb-4">Recent Achievements</h4>
        <div className="space-y-2">
          {progressInsights.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg">
              <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'reflection':
        return renderReflectionSection();
      case 'goals':
        return renderGoalsSection();
      case 'conversation':
        return renderConversationSection();
      case 'progress':
        return renderProgressSection();
      default:
        return renderReflectionSection();
    }
  };

  return (
    <div className={`bg-card rounded-lg shadow-gentle ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Session Preparation Tools</h2>
          <p className="text-muted-foreground">
            Prepare for your therapy session with guided reflection and goal-setting exercises.
          </p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-lg text-left transition-all hover:shadow-gentle ${
                activeSection === section.id 
                  ? 'bg-therapeutic-primary text-white' : 'bg-surface hover:bg-border'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={section.icon} 
                  size={18} 
                  className={activeSection === section.id ? 'text-white' : 'text-therapeutic-primary'} 
                />
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              <p className={`text-xs ${
                activeSection === section.id ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                {section.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderActiveSection()}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Your responses are saved locally and can be shared with your therapist.
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={exportPreparation}
              iconName="Download"
              iconPosition="left"
            >
              Export Preparation
            </Button>
            
            <Button
              variant="default"
              iconName="Send"
              iconPosition="left"
            >
              Share with Therapist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationTools;