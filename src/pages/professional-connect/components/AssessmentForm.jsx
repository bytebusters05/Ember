import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AssessmentForm = ({ onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    concerns: [],
    therapyPreferences: [],
    sessionType: '',
    insurance: '',
    budget: '',
    availability: [],
    previousTherapy: '',
    urgency: '',
    goals: ''
  });

  const totalSteps = 5;

  const concernOptions = [
    { id: 'anxiety', label: 'Anxiety & Panic', description: 'Worry, panic attacks, social anxiety' },
    { id: 'depression', label: 'Depression & Mood', description: 'Sadness, low energy, hopelessness' },
    { id: 'trauma', label: 'Trauma & PTSD', description: 'Past traumatic experiences, flashbacks' },
    { id: 'relationships', label: 'Relationships', description: 'Dating, marriage, family conflicts' },
    { id: 'work', label: 'Work & Career', description: 'Burnout, workplace stress, career changes' },
    { id: 'grief', label: 'Grief & Loss', description: 'Death of loved one, major life changes' },
    { id: 'addiction', label: 'Addiction & Substance Use', description: 'Alcohol, drugs, behavioral addictions' },
    { id: 'eating', label: 'Eating & Body Image', description: 'Eating disorders, body dysmorphia' }
  ];

  const therapyApproaches = [
    { id: 'cbt', label: 'Cognitive Behavioral Therapy (CBT)', description: 'Focus on changing thought patterns' },
    { id: 'dbt', label: 'Dialectical Behavior Therapy (DBT)', description: 'Skills for emotional regulation' },
    { id: 'psychodynamic', label: 'Psychodynamic Therapy', description: 'Explore unconscious patterns' },
    { id: 'humanistic', label: 'Humanistic/Person-Centered', description: 'Client-led, empathetic approach' },
    { id: 'emdr', label: 'EMDR', description: 'Trauma processing through eye movements' },
    { id: 'family', label: 'Family/Couples Therapy', description: 'Relationship and family dynamics' }
  ];

  const availabilityOptions = [
    { id: 'morning', label: 'Morning (8AM - 12PM)' },
    { id: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
    { id: 'evening', label: 'Evening (5PM - 8PM)' },
    { id: 'weekend', label: 'Weekends' }
  ];

  const handleConcernChange = (concernId, checked) => {
    setFormData(prev => ({
      ...prev,
      concerns: checked 
        ? [...prev?.concerns, concernId]
        : prev?.concerns?.filter(id => id !== concernId)
    }));
  };

  const handleTherapyPreferenceChange = (preferenceId, checked) => {
    setFormData(prev => ({
      ...prev,
      therapyPreferences: checked 
        ? [...prev?.therapyPreferences, preferenceId]
        : prev?.therapyPreferences?.filter(id => id !== preferenceId)
    }));
  };

  const handleAvailabilityChange = (timeId, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: checked 
        ? [...prev?.availability, timeId]
        : prev?.availability?.filter(id => id !== timeId)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">What brings you here today?</h3>
              <p className="text-muted-foreground">Select all areas you'd like support with. This helps us match you with the right therapist.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concernOptions?.map((concern) => (
                <div key={concern?.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors">
                  <Checkbox
                    label={concern?.label}
                    description={concern?.description}
                    checked={formData?.concerns?.includes(concern?.id)}
                    onChange={(e) => handleConcernChange(concern?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Therapy approach preferences</h3>
              <p className="text-muted-foreground">Which therapeutic approaches interest you? Don't worry if you're unsure - your therapist will guide you.</p>
            </div>
            <div className="space-y-4">
              {therapyApproaches?.map((approach) => (
                <div key={approach?.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors">
                  <Checkbox
                    label={approach?.label}
                    description={approach?.description}
                    checked={formData?.therapyPreferences?.includes(approach?.id)}
                    onChange={(e) => handleTherapyPreferenceChange(approach?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
            <div className="bg-surface rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <Icon name="Info" size={16} className="inline mr-2" />
                Not sure which approach is right for you? That's completely normal! Your matched therapist will discuss options during your first session.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Session preferences & logistics</h3>
              <p className="text-muted-foreground">Help us understand your practical needs and preferences.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Preferred session type</label>
                <div className="space-y-3">
                  {[
                    { value: 'video', label: 'Video sessions', icon: 'Video' },
                    { value: 'phone', label: 'Phone sessions', icon: 'Phone' },
                    { value: 'in-person', label: 'In-person sessions', icon: 'MapPin' },
                    { value: 'flexible', label: 'Flexible (any format)', icon: 'Shuffle' }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sessionType"
                        value={option?.value}
                        checked={formData?.sessionType === option?.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, sessionType: e?.target?.value }))}
                        className="w-4 h-4 text-therapeutic-primary"
                      />
                      <Icon name={option?.icon} size={18} className="text-muted-foreground" />
                      <span className="text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">When are you typically available?</label>
                <div className="grid grid-cols-2 gap-3">
                  {availabilityOptions?.map((time) => (
                    <div key={time?.id} className="border border-border rounded-lg p-3">
                      <Checkbox
                        label={time?.label}
                        checked={formData?.availability?.includes(time?.id)}
                        onChange={(e) => handleAvailabilityChange(time?.id, e?.target?.checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Insurance & budget</h3>
              <p className="text-muted-foreground">We'll help you find affordable options that work with your situation.</p>
            </div>
            <div className="space-y-6">
              <Input
                label="Insurance provider (if applicable)"
                type="text"
                placeholder="e.g., Blue Cross Blue Shield, Aetna, or 'None'"
                value={formData?.insurance}
                onChange={(e) => setFormData(prev => ({ ...prev, insurance: e?.target?.value }))}
                description="We'll verify coverage and find in-network providers"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Budget range per session</label>
                <div className="space-y-3">
                  {[
                    { value: 'insurance', label: 'Insurance copay only ($10-50)' },
                    { value: 'sliding', label: 'Sliding scale ($30-80)' },
                    { value: 'standard', label: 'Standard rate ($100-150)' },
                    { value: 'premium', label: 'Premium rate ($150+)' },
                    { value: 'flexible', label: 'Flexible - show me all options' }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={option?.value}
                        checked={formData?.budget === option?.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: e?.target?.value }))}
                        className="w-4 h-4 text-therapeutic-primary"
                      />
                      <span className="text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={20} className="text-trust-builder mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Financial assistance available</h4>
                    <p className="text-sm text-muted-foreground">
                      Many therapists offer sliding scale fees, and we partner with organizations providing therapy grants for those in need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Final details</h3>
              <p className="text-muted-foreground">Just a few more questions to ensure the best possible match.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Have you been in therapy before?</label>
                <div className="space-y-3">
                  {[
                    { value: 'never', label: 'This is my first time' },
                    { value: 'past', label: 'Yes, in the past' },
                    { value: 'recent', label: 'Yes, recently (within last year)' },
                    { value: 'currently', label: 'I\'m currently seeing someone' }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="previousTherapy"
                        value={option?.value}
                        checked={formData?.previousTherapy === option?.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, previousTherapy: e?.target?.value }))}
                        className="w-4 h-4 text-therapeutic-primary"
                      />
                      <span className="text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">How soon would you like to start?</label>
                <div className="space-y-3">
                  {[
                    { value: 'asap', label: 'As soon as possible' },
                    { value: 'week', label: 'Within a week' },
                    { value: 'month', label: 'Within a month' },
                    { value: 'exploring', label: 'Just exploring options' }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={option?.value}
                        checked={formData?.urgency === option?.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, urgency: e?.target?.value }))}
                        className="w-4 h-4 text-therapeutic-primary"
                      />
                      <span className="text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What would you like to achieve through therapy?
                </label>
                <textarea
                  value={formData?.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e?.target?.value }))}
                  placeholder="Share your hopes and goals for therapy. This helps us match you with a therapist who specializes in your areas of focus."
                  className="w-full h-24 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-therapeutic-primary focus:border-transparent resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">Optional, but helpful for matching</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-card rounded-lg shadow-gentle ${className}`}>
      {/* Progress Bar */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Therapist Matching Assessment</h2>
          <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        </div>
        
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className="bg-therapeutic-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i + 1 <= currentStep ? 'bg-therapeutic-primary' : 'bg-surface'
              }`}
            />
          ))}
        </div>

        <Button
          variant="default"
          onClick={handleNext}
          iconName={currentStep === totalSteps ? "Check" : "ChevronRight"}
          iconPosition="right"
        >
          {currentStep === totalSteps ? 'Complete Assessment' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;