import { create } from 'zustand';

interface OnboardingData {
  // Screen 1-2: Phone & OTP
  phoneNumber: string;
  countryCode: string;

  // Screen 3-4: Personal info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;

  // Screen 5-6: Address
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;

  // Screen 7-8: Identity verification
  documentType: 'passport' | 'drivers_license' | 'national_id' | '';
  documentFrontUri: string;
  documentBackUri: string;

  // Screen 9: Selfie
  selfieUri: string;

  // Screen 10-11: Tax & employment
  taxCountry: string;
  taxId: string;
  employmentStatus: string;
  sourceOfFunds: string;

  // Screen 12-13: Account preferences
  baseCurrency: string;
  accountPlan: 'standard' | 'plus' | 'premium' | 'metal';

  // Screen 14-15: Security
  passcode: string;
  biometricsEnabled: boolean;

  // Screen 16: Notifications
  notificationsEnabled: boolean;

  // Screen 17-18: Terms & welcome
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingOptIn: boolean;

  // Preferences
  preferences: string[];

  // Tracking
  adTrackingAllowed: boolean;

  // Completion
  completed: boolean;
}

interface OnboardingState extends OnboardingData {
  currentStep: number;
  totalSteps: number;
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  setFields: (fields: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  completeOnboarding: () => void;
}

const initialData: OnboardingData = {
  phoneNumber: '',
  countryCode: '+44',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  country: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postalCode: '',
  documentType: '',
  documentFrontUri: '',
  documentBackUri: '',
  selfieUri: '',
  taxCountry: '',
  taxId: '',
  employmentStatus: '',
  sourceOfFunds: '',
  baseCurrency: 'GBP',
  accountPlan: 'standard',
  passcode: '',
  biometricsEnabled: false,
  notificationsEnabled: false,
  termsAccepted: false,
  privacyAccepted: false,
  marketingOptIn: false,
  preferences: [],
  adTrackingAllowed: false,
  completed: false,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialData,
  currentStep: 1,
  totalSteps: 18,

  setField: (key, value) => set({ [key]: value }),

  setFields: (fields) => set(fields),

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps) })),

  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  goToStep: (step) => set({ currentStep: step }),

  reset: () => set({ ...initialData, currentStep: 1, completed: false }),

  completeOnboarding: () => set({ completed: true }),
}));
