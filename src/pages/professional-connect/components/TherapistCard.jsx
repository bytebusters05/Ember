import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TherapistCard = ({ therapist, onSchedule, onViewProfile, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Anxiety': 'bg-blue-100 text-blue-800',
      'Depression': 'bg-purple-100 text-purple-800',
      'Trauma': 'bg-red-100 text-red-800',
      'Relationships': 'bg-pink-100 text-pink-800',
      'Work Stress': 'bg-orange-100 text-orange-800',
      'Grief': 'bg-gray-100 text-gray-800',
      'Addiction': 'bg-green-100 text-green-800',
      'Eating Disorders': 'bg-yellow-100 text-yellow-800'
    };
    return colors?.[specialty] || 'bg-gray-100 text-gray-800';
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)]?.map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={14}
            className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-gentle hover:shadow-therapeutic transition-all duration-300 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Image
              src={therapist?.photo}
              alt={`Dr. ${therapist?.name}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-foreground">Dr. {therapist?.name}</h3>
              <div className="flex items-center space-x-2">
                {therapist?.acceptingNew && (
                  <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                    Accepting New Clients
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{therapist?.credentials} • {therapist?.experience} years experience</p>
            {renderRating(therapist?.rating)}
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Specializes in:</h4>
          <div className="flex flex-wrap gap-2">
            {therapist?.specialties?.slice(0, isExpanded ? therapist?.specialties?.length : 3)?.map((specialty, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${getSpecialtyColor(specialty)}`}
              >
                {specialty}
              </span>
            ))}
            {therapist?.specialties?.length > 3 && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-surface text-muted-foreground hover:bg-border transition-colors"
              >
                +{therapist?.specialties?.length - 3} more
              </button>
            )}
          </div>
        </div>

        {/* Approach */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Therapeutic Approach:</h4>
          <p className="text-sm text-muted-foreground">{therapist?.approach}</p>
        </div>

        {/* Session Options */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Available Sessions:</h4>
          <div className="flex items-center space-x-4">
            {therapist?.sessionTypes?.includes('video') && (
              <div className="flex items-center space-x-1">
                <Icon name="Video" size={14} className="text-therapeutic-primary" />
                <span className="text-xs text-muted-foreground">Video</span>
              </div>
            )}
            {therapist?.sessionTypes?.includes('phone') && (
              <div className="flex items-center space-x-1">
                <Icon name="Phone" size={14} className="text-therapeutic-primary" />
                <span className="text-xs text-muted-foreground">Phone</span>
              </div>
            )}
            {therapist?.sessionTypes?.includes('in-person') && (
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-therapeutic-primary" />
                <span className="text-xs text-muted-foreground">In-person</span>
              </div>
            )}
          </div>
        </div>

        {/* Insurance & Pricing */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Insurance & Pricing:</h4>
              <div className="flex items-center space-x-2">
                {therapist?.acceptsInsurance && (
                  <span className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} className="text-trust-builder" />
                    <span className="text-xs text-muted-foreground">Insurance accepted</span>
                  </span>
                )}
                <span className="text-sm font-medium text-foreground">${therapist?.rate}/session</span>
              </div>
            </div>
            
            {therapist?.nextAvailable && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Next available:</p>
                <p className="text-sm font-medium text-foreground">{therapist?.nextAvailable}</p>
              </div>
            )}
          </div>
        </div>

        {/* Testimonial Preview */}
        {therapist?.testimonial && (
          <div className="mb-4 p-3 bg-surface rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Quote" size={14} className="text-muted-foreground mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground italic">
                "{therapist?.testimonial?.text}"
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-right">
              - Anonymous client, {therapist?.testimonial?.duration}
            </p>
          </div>
        )}

        {/* Match Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Match Score</span>
            <span className="text-sm font-semibold text-therapeutic-primary">{therapist?.matchScore}% match</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-therapeutic-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${therapist?.matchScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on your assessment responses and preferences
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={() => onSchedule(therapist)}
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Consultation
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onViewProfile(therapist)}
            iconName="User"
            iconPosition="left"
          >
            View Full Profile
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Licensed in {therapist?.licensedStates?.join(', ')}</span>
            <span>Response time: {therapist?.responseTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;