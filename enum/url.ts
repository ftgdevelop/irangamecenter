

export const Headers = {
  "Content-Type": "application/json",
  "Accept-Language": "en-US",
  "Apikey":"e8fad1497a1244f29f15cde4a242baf0"
};

export const ServerAddress = {
  Type: process.env.PROJECT_SERVER_TYPE,
  Identity: process.env.PROJECT_SERVER_IDENTITY,
};

export const Identity = {
  SendOTP: "/api/services/app/OTP/SendOTP",
  RegisterOrLogin: "/api/services/app/OTP/RegisterOrLogin",

  GetCurrentUserProfileForEdit: "/api/services/app/Profile/GetCurrentUserProfileForEdit",
  UpdateCurrentUserProfile: "/api/services/app/Profile/UpdateCurrentUserProfile",
  UpdateNewsletterUserProfile: "/api/services/app/Profile/UpdateNewsletterUserProfile",
  UpdateProfileEmail: "/api/services/app/Profile/UpdateProfileEmail",
  UpdateProfilePhoneNumber: "/api/services/app/Profile/UpdateProfilePhoneNumber",
  SendVerificationSms: "/api/services/app/Profile/SendVerificationSms",
  VerifySmsCode: "/api/services/app/Profile/VerifySmsCode",
  LoginWithPassword: "/api/TokenAuth/Login",
  ForgotPasswordByPhoneNumber: "/api/services/app/Account/ForgotPasswordByPhoneNumber",
  ForgotPasswordVerification: "/api/services/app/Account/ForgotPasswordVerification",
  ResetPassword: "/api/services/app/Account/ResetPassword",
  ForgotPasswordByEmail: "/api/services/app/Account/ForgotPassword",
  Register: "/api/services/app/Account/Register",
  ChangePassword: "/api/services/app/Account/ChangePassword",
  SendEmailActivation: "/api/services/app/Account/SendEmailActivation",
  ActivateEmail: "/api/services/app/Account/ActivateEmail",
  GetSiteAllSettings: "/api/services/app/TenantSettings/GetAllSettings"
};

export const ServerStatus = {
  Success: 1,
  Error: 2,
  SummaryError: 3,
};