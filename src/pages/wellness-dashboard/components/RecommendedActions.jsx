import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedActions = ({ currentMood, completedActions, onActionComplete }) => {
  const [completingAction, setCompletingAction] = useState(null);

  const baseRecommendations = [
    { id: 'breathing', title: '5-min breathing', description: 'Calm your nervous system', icon: 'Wind', duration: '5 min', category: 'mindfulness', color: 'bg-blue-100 text-blue-700' },
    { id: 'gratitude', title: 'Gratitude journaling', description: 'Write 3 things you are grateful for', icon: 'Heart', duration: '3 min', category: 'reflection', color: 'bg-pink-100 text-pink-700' },
    { id: 'movement', title: 'Take a 10-min walk', description: 'Boost mood and energy', icon: 'Footprints', duration: '10 min', category: 'physical', color: 'bg-green-100 text-green-700' }
  ];

  const moodSpecific = {
    anxious: [{ id: 'grounding', title: '5-4-3-2-1 Grounding', description: 'Use senses to ground yourself', icon: 'Anchor', duration: '5 min', category: 'coping', color: 'bg-purple-100 text-purple-700' }],
    sad: [{ id: 'connection', title: 'Call a friend', description: 'Social connection lifts spirits', icon: 'Phone', duration: '15 min', category: 'social', color: 'bg-orange-100 text-orange-700' }],
    frustrated: [{ id: 'release', title: 'Muscle relaxation', description: 'Release tension', icon: 'Zap', duration: '8 min', category: 'relaxation', color: 'bg-red-100 text-red-700' }]
  };

  const getRecommendations = () => {
    let recs = [...baseRecommendations];
    if (currentMood && moodSpecific[currentMood]) recs = [...moodSpecific[currentMood], ...recs];
    return recs.filter(r => !completedActions?.includes(r.id)).slice(0, 3);
  };

  const handleComplete = async (id) => {
    setCompletingAction(id);
    await new Promise(r => setTimeout(r, 1000));
    onActionComplete(id);
    setCompletingAction(null);
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-conversion-accent rounded-xl flex items-center justify-center">
          <Icon name="Lightbulb" size={24} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recommended Actions</h2>
          <p className="text-sm text-muted-foreground">Personalized suggestions for today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.length > 0 ? recommendations.map((action) => (
          <div key={action.id} className="flex flex-col h-full p-4 border border-border rounded-xl hover:shadow-lg transition-all">
            <div className="flex flex-1 justify-between items-start">
              <div className="flex space-x-3 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                  <Icon name={action.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                  <div className="flex space-x-3 text-xs text-muted-foreground mt-2">
                    <span>{action.duration}</span>
                    <span className="capitalize">{action.category}</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleComplete(action.id)}
                loading={completingAction === action.id}
                iconName="Check"
              >
                Complete
              </Button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground">You've completed today's recommended actions. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedActions;
