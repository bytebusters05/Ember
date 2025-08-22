import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SchedulingInterface = ({ therapist, onSchedule, onBack, className = '' }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('video');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: ''
  });
  const [preferences, setPreferences] = useState({
    firstTime: false,
    specificConcerns: '',
    insuranceInfo: '',
    accommodations: ''
  });

  // Mock available dates and times
  const availableDates = [
    { date: '2025-01-15', day: 'Wed', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
    { date: '2025-01-16', day: 'Thu', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
    { date: '2025-01-17', day: 'Fri', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '5:00 PM'] },
    { date: '2025-01-20', day: 'Mon', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
    { date: '2025-01-21', day: 'Tue', slots: ['11:00 AM', '1:00 PM', '4:00 PM'] }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSchedule = () => {
    const appointmentData = {
      therapist,
      date: selectedDate,
      time: selectedTime,
      sessionType,
      contactInfo,
      preferences
    };
    onSchedule(appointmentData);
  };

  const isFormValid = () => {
    return selectedDate && selectedTime && contactInfo?.name && contactInfo?.email;
  };

  return (
    <div className={`bg-card rounded-lg shadow-gentle ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Image
              src={therapist?.photo}
              alt={`Dr. ${therapist?.name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Schedule with Dr. {therapist?.name}</h2>
              <p className="text-sm text-muted-foreground">{therapist?.credentials} • {therapist?.specialties?.[0]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Session Type Selection */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Choose session type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {therapist?.sessionTypes?.map((type) => {
              const typeInfo = {
                video: { icon: 'Video', label: 'Video Call', description: 'Secure video session from anywhere' },
                phone: { icon: 'Phone', label: 'Phone Call', description: 'Audio-only session' },
                'in-person': { icon: 'MapPin', label: 'In-Person', description: 'Meet at the office' }
              };
              
              return (
                <button
                  key={type}
                  onClick={() => setSessionType(type)}
                  className={`p-4 border rounded-lg text-left transition-all hover:shadow-gentle ${
                    sessionType === type 
                      ? 'border-therapeutic-primary bg-therapeutic-primary/5' :'border-border hover:border-therapeutic-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon 
                      name={typeInfo?.[type]?.icon} 
                      size={20} 
                      className={sessionType === type ? 'text-therapeutic-primary' : 'text-muted-foreground'} 
                    />
                    <span className="font-medium text-foreground">{typeInfo?.[type]?.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{typeInfo?.[type]?.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Select date and time</h3>
          
          {/* Date Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Available dates</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {availableDates?.map((dateOption) => (
                <button
                  key={dateOption?.date}
                  onClick={() => {
                    setSelectedDate(dateOption?.date);
                    setSelectedTime(''); // Reset time when date changes
                  }}
                  className={`p-3 border rounded-lg text-center transition-all hover:shadow-gentle ${
                    selectedDate === dateOption?.date 
                      ? 'border-therapeutic-primary bg-therapeutic-primary/5' :'border-border hover:border-therapeutic-primary/50'
                  }`}
                >
                  <div className="text-sm font-medium text-foreground">{dateOption?.day}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(dateOption.date)?.getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {dateOption?.slots?.length} slots
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Available times for {formatDate(selectedDate)}
              </h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {availableDates?.find(d => d?.date === selectedDate)
                  ?.slots?.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 border rounded-lg text-center transition-all hover:shadow-gentle ${
                        selectedTime === time 
                          ? 'border-therapeutic-primary bg-therapeutic-primary text-white' :'border-border hover:border-therapeutic-primary/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{time}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full name"
              type="text"
              required
              value={contactInfo?.name}
              onChange={(e) => setContactInfo(prev => ({ ...prev, name: e?.target?.value }))}
              placeholder="Enter your full name"
            />
            
            <Input
              label="Email address"
              type="email"
              required
              value={contactInfo?.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e?.target?.value }))}
              placeholder="your.email@example.com"
            />
            
            <Input
              label="Phone number"
              type="tel"
              value={contactInfo?.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e?.target?.value }))}
              placeholder="(555) 123-4567"
              description="For appointment reminders and updates"
            />
            
            <Input
              label="Emergency contact"
              type="text"
              value={contactInfo?.emergencyContact}
              onChange={(e) => setContactInfo(prev => ({ ...prev, emergencyContact: e?.target?.value }))}
              placeholder="Name and phone number"
              description="Optional but recommended"
            />
          </div>
        </div>

        {/* Session Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Session preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="firstTime"
                checked={preferences?.firstTime}
                onChange={(e) => setPreferences(prev => ({ ...prev, firstTime: e?.target?.checked }))}
                className="w-4 h-4 text-therapeutic-primary rounded"
              />
              <label htmlFor="firstTime" className="text-sm text-foreground">
                This is my first time in therapy
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Specific concerns or goals for this session
              </label>
              <textarea
                value={preferences?.specificConcerns}
                onChange={(e) => setPreferences(prev => ({ ...prev, specificConcerns: e?.target?.value }))}
                placeholder="What would you like to focus on in your first session?"
                className="w-full h-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-therapeutic-primary focus:border-transparent resize-none"
              />
            </div>
            
            <Input
              label="Insurance information"
              type="text"
              value={preferences?.insuranceInfo}
              onChange={(e) => setPreferences(prev => ({ ...prev, insuranceInfo: e?.target?.value }))}
              placeholder="Insurance provider and member ID"
              description="We'll verify coverage before your appointment"
            />
            
            <Input
              label="Accessibility accommodations"
              type="text"
              value={preferences?.accommodations}
              onChange={(e) => setPreferences(prev => ({ ...prev, accommodations: e?.target?.value }))}
              placeholder="Any accommodations you need"
              description="We want to ensure you're comfortable"
            />
          </div>
        </div>

        {/* Appointment Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-surface rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Appointment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Therapist:</span>
                <span className="text-foreground">Dr. {therapist?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="text-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Type:</span>
                <span className="text-foreground capitalize">{sessionType?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate:</span>
                <span className="text-foreground">${therapist?.rate}/session</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Therapist
          </Button>
          
          <Button
            variant="default"
            onClick={handleSchedule}
            disabled={!isFormValid()}
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
          >
            Confirm Appointment
          </Button>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Before your appointment</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive a confirmation email with session details</li>
                <li>• Complete intake forms will be sent 24 hours before</li>
                <li>• Technical setup instructions for video sessions included</li>
                <li>• Cancellation policy: 24-hour notice required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingInterface;