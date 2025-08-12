export const verifyEmailData = {
  title: "Verify Your Email",
  subtitle: "We've sent a verification code to your email",

  messages: {
    codeSent: "Please enter the 6-digit code sent to",
    didntReceive: "Didn't receive the code?",
    resendCode: "Resend Code",
    verifying: "Verifying...",
    verify: "Verify Email",
    success: "Email verified successfully!",
    invalidCode: "Invalid verification code. Please try again.",
    codeExpired: "Verification code has expired. Please request a new one.",
    resendSuccess: "Verification code has been resent to your email.",
    resendError: "Failed to resend code. Please try again.",
  },

  placeholders: {
    codeInput: "Enter code",
  },

  timing: {
    resendDelay: 60, // seconds
    codeLength: 6,
  },
};
