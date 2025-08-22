import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InsuranceVerification = ({ onVerificationComplete, className = '' }) => {
  const [step, setStep] = useState(1);
  const [insuranceData, setInsuranceData] = useState({
    provider: '',
    memberId: '',
    groupNumber: '',
    policyHolder: '',
    relationship: 'self',
    dateOfBirth: '',
    phone: '',
    email: ''
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const insuranceProviders = [
    { name: 'Aetna', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop', coverage: 'Excellent' },
    { name: 'Blue Cross Blue Shield', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop', coverage: 'Excellent' },
    { name: 'Cigna', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop', coverage: 'Good' },
    { name: 'UnitedHealthcare', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop', coverage: 'Excellent' },
    { name: 'Kaiser Permanente', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop', coverage: 'Good' },
    { name: 'Humana', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop', coverage: 'Good' }
  ];

  const mockVerificationResult = {
    status: 'verified',
    coverage: {
      mentalHealth: true,
      copay: '$25',
      deductible: '$500',
      deductibleMet: '$150',
      outOfPocketMax: '$3000',
      outOfPocketMet: '$275'
    },
    inNetworkTherapists: 47,
    benefits: [
      'Individual therapy sessions covered',
      'Group therapy sessions covered',
      'Crisis intervention covered',
      'Telehealth sessions covered'
    ],
    limitations: [
      'Requires referral for specialized treatment',
      'Limited to 12 sessions per year without pre-authorization'
    ]
  };

  const handleInputChange = (field, value) => {
    setInsuranceData(prev => ({ ...prev, [field]: value }));
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setVerificationResult(mockVerificationResult);
      setIsVerifying(false);
      setStep(3);
    }, 2000);
  };

  const renderProviderSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Select Your Insurance Provider</h3>
        <p className="text-muted-foreground">
          Choose your insurance provider to check coverage and find in-network therapists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insuranceProviders?.map((provider) => (
          <button
            key={provider?.name}
            onClick={() => {
              handleInputChange('provider', provider?.name);
              setStep(2);
            }}
            className="p-4 border border-border rounded-lg hover:border-therapeutic-primary hover:shadow-gentle transition-all text-left"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-8 bg-surface rounded flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-therapeutic-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{provider?.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  provider?.coverage === 'Excellent' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {provider?.coverage} Coverage
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            handleInputChange('provider', 'Other');
            setStep(2);
          }}
          className="text-therapeutic-primary hover:underline"
        >
          Don't see your provider? Click here
        </button>
      </div>

      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-foreground mb-2">No Insurance?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Don't worry! We offer several affordable options including sliding scale fees and payment plans.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onVerificationComplete({ hasInsurance: false })}
            >
              Explore Self-Pay Options
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsuranceDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Insurance Information</h3>
        <p className="text-muted-foreground">
          Please provide your insurance details for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Insurance Provider"
            type="text"
            value={insuranceData?.provider}
            onChange={(e) => handleInputChange('provider', e?.target?.value)}
            placeholder="Enter your insurance provider"
            required
          />
        </div>

        <Input
          label="Member ID"
          type="text"
          value={insuranceData?.memberId}
          onChange={(e) => handleInputChange('memberId', e?.target?.value)}
          placeholder="Your member ID number"
          required
        />

        <Input
          label="Group Number"
          type="text"
          value={insuranceData?.groupNumber}
          onChange={(e) => handleInputChange('groupNumber', e?.target?.value)}
          placeholder="Group number (if applicable)"
        />

        <Input
          label="Policy Holder Name"
          type="text"
          value={insuranceData?.policyHolder}
          onChange={(e) => handleInputChange('policyHolder', e?.target?.value)}
          placeholder="Name on the insurance policy"
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Relationship to Policy Holder
          </label>
          <select
            value={insuranceData?.relationship}
            onChange={(e) => handleInputChange('relationship', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-therapeutic-primary focus:border-transparent"
          >
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="dependent">Dependent</option>
          </select>
        </div>

        <Input
          label="Date of Birth"
          type="date"
          value={insuranceData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={insuranceData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          placeholder="(555) 123-4567"
          description="For verification purposes"
        />

        <Input
          label="Email Address"
          type="email"
          value={insuranceData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          placeholder="your.email@example.com"
          description="For verification results"
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-2">Privacy Notice</h4>
            <p className="text-sm text-yellow-800">
              Your insurance information is encrypted and only used for verification purposes. 
              We comply with HIPAA regulations and never share your data with unauthorized parties.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          className="flex-1"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>

        <Button
          variant="default"
          onClick={handleVerification}
          disabled={!insuranceData?.provider || !insuranceData?.memberId || !insuranceData?.policyHolder}
          loading={isVerifying}
          className="flex-1"
          iconName="Shield"
          iconPosition="left"
        >
          {isVerifying ? 'Verifying...' : 'Verify Coverage'}
        </Button>
      </div>
    </div>
  );

  const renderVerificationResults = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Coverage Verified!</h3>
        <p className="text-muted-foreground">
          Great news! Your insurance covers mental health services.
        </p>
      </div>

      {/* Coverage Summary */}
      <div className="bg-surface rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Your Coverage Summary</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-foreground mb-3">Cost Information</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Copay per session:</span>
                <span className="font-medium text-foreground">{verificationResult?.coverage?.copay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual deductible:</span>
                <span className="font-medium text-foreground">{verificationResult?.coverage?.deductible}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deductible met:</span>
                <span className="font-medium text-foreground">{verificationResult?.coverage?.deductibleMet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Out-of-pocket max:</span>
                <span className="font-medium text-foreground">{verificationResult?.coverage?.outOfPocketMax}</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-foreground mb-3">Network Information</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-therapeutic-primary" />
                <span className="text-sm text-foreground">
                  {verificationResult?.inNetworkTherapists} in-network therapists available
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-therapeutic-primary" />
                <span className="text-sm text-foreground">
                  Multiple locations and telehealth options
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Covered Benefits */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Covered Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {verificationResult?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations */}
      {verificationResult?.limitations?.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">Important Limitations</h4>
          <div className="space-y-2">
            {verificationResult?.limitations?.map((limitation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg">
                <Icon name="AlertCircle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{limitation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-therapeutic-primary/5 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Next Steps</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-therapeutic-primary text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
            <span className="text-sm text-foreground">Browse in-network therapists matched to your needs</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-therapeutic-primary text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
            <span className="text-sm text-foreground">Schedule a consultation with your preferred therapist</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-therapeutic-primary text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
            <span className="text-sm text-foreground">Attend your first session with verified coverage</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          className="flex-1"
          iconName="RotateCcw"
          iconPosition="left"
        >
          Verify Different Insurance
        </Button>

        <Button
          variant="default"
          onClick={() => onVerificationComplete({ 
            hasInsurance: true, 
            verificationResult,
            insuranceData 
          })}
          className="flex-1"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Find In-Network Therapists
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderProviderSelection();
      case 2:
        return renderInsuranceDetails();
      case 3:
        return renderVerificationResults();
      default:
        return renderProviderSelection();
    }
  };

  return (
    <div className={`bg-card rounded-lg shadow-gentle ${className}`}>
      {/* Progress Indicator */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Insurance Verification</h2>
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
        </div>
        
        <div className="flex space-x-2">
          {[1, 2, 3]?.map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex-1 h-2 rounded-full transition-colors ${
                stepNumber <= step ? 'bg-therapeutic-primary' : 'bg-surface'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default InsuranceVerification;