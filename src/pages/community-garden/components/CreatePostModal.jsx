import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    forum: '',
    mood: '',
    hasTriggerWarning: false,
    triggerWarningText: '',
    isAnonymous: true
  });

  const forumOptions = [
    { value: 'anxiety', label: 'Anxiety Support Circle' },
    { value: 'depression', label: 'Depression Recovery' },
    { value: 'student', label: 'Student Life Challenges' },
    { value: 'workplace', label: 'Workplace Stress' },
    { value: 'parent', label: 'New Parent Wellness' }
  ];

  const moodOptions = [
    { value: 'anxious', label: 'Anxious' },
    { value: 'sad', label: 'Sad' },
    { value: 'hopeful', label: 'Hopeful' },
    { value: 'stressed', label: 'Stressed' },
    { value: 'grateful', label: 'Grateful' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      content: '',
      forum: '',
      mood: '',
      hasTriggerWarning: false,
      triggerWarningText: '',
      isAnonymous: true
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-therapeutic">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Edit" size={20} className="text-therapeutic-primary" />
            <span>Share Your Story</span>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Choose Forum"
              options={forumOptions}
              value={formData?.forum}
              onChange={(value) => handleInputChange('forum', value)}
              required
            />
            
            <Select
              label="Current Mood"
              options={moodOptions}
              value={formData?.mood}
              onChange={(value) => handleInputChange('mood', value)}
              required
            />
          </div>

          <Input
            label="Post Title"
            type="text"
            placeholder="Share what's on your mind..."
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Story
            </label>
            <textarea
              className="w-full min-h-[120px] p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Share your experience, feelings, or ask for support. Remember, this is a safe space for authentic sharing."
              value={formData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Be authentic and respectful. Your story matters and can help others.
            </p>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="This post contains sensitive content (trigger warning)"
              checked={formData?.hasTriggerWarning}
              onChange={(e) => handleInputChange('hasTriggerWarning', e?.target?.checked)}
            />

            {formData?.hasTriggerWarning && (
              <Input
                label="Trigger Warning Description"
                type="text"
                placeholder="Brief description of sensitive content (e.g., mentions of self-harm, eating disorders)"
                value={formData?.triggerWarningText}
                onChange={(e) => handleInputChange('triggerWarningText', e?.target?.value)}
              />
            )}

            <Checkbox
              label="Post anonymously (recommended for privacy)"
              checked={formData?.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e?.target?.checked)}
            />
          </div>

          <div className="bg-surface p-4 rounded-lg border-l-4 border-therapeutic-primary">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-therapeutic-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Community Guidelines Reminder</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Share experiences, not medical advice</li>
                  <li>• Be kind and supportive to all members</li>
                  <li>• Use trigger warnings for sensitive content</li>
                  <li>• If you're in crisis, please contact crisis support immediately</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              iconName="Send"
              iconPosition="right"
              iconSize={16}
            >
              Share Story
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;