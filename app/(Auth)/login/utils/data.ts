export const loginFormData = {
  title: "Welcome Back",
  subtitle: "Sign in to your ScholarPASS account",
  
  formFields: {
    email: {
      label: 'Email (User ID)',
      placeholder: 'Enter your email address',
      required: true
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
      minLength: 6
    }
  },

  buttons: {
    login: 'Login',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account? Register"
  },

  links: {
    register: '/(Auth)/register',
    forgotPassword: '/(Auth)/forget'
  }
};
