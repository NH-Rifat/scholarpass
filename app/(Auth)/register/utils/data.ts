export const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+1', country: 'CA', flag: '🇨🇦' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
];

export const registerFormData = {
  title: "Join ScholarPASS",
  subtitle: "Connect, Learn, and Grow Together",
  
  roles: [
    {
      id: 'tutor',
      name: 'Tutor',
      icon: '📚',
      description: 'Share your knowledge and help students learn'
    },
    {
      id: 'student',
      name: 'Student',
      icon: '🎓',
      description: 'Learn and grow with expert guidance'
    },
    {
      id: 'guardian',
      name: 'Guardian',
      icon: '👨‍👩‍👧‍👦',
      description: 'Support your child\'s educational journey'
    }
  ],

  formFields: {
    firstName: {
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true
    },
    email: {
      label: 'Email (User ID)',
      placeholder: 'Enter your email address',
      required: true
    },
    mobileNumber: {
      label: 'Mobile Number',
      placeholder: 'Enter your mobile number',
      required: true
    },
    password: {
      label: 'Password',
      placeholder: 'At least 6 characters',
      required: true,
      minLength: 6
    }
  },

  buttons: {
    createAccount: 'Create Account',
    alreadyRegistered: 'Already registered? Login'
  },

  legal: {
    termsText: 'I agree to the ScholarPASS Terms of Service & Privacy Policy',
    termsLink: '/terms',
    privacyLink: '/privacy'
  }
};
