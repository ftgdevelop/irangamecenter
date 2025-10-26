

export const Headers = {
  "Content-Type": "application/json",
  "Accept-Language": "en-US",
  "Apikey":"e8fad1497a1244f29f15cde4a242baf0",
  "tenantid":1040
};

export const ServerAddress = {
  Type: process.env.PROJECT_SERVER_TYPE,
  Identity: process.env.PROJECT_SERVER_IDENTITY,
  Payment: process.env.PROJECT_SERVER_PAYMENT,
  Strapi: process.env.PROJECT_SERVER_STRAPI,
  Blog: process.env.PROJECT_SERVER_BLOG,
  Commerce:process.env.PROJECT_SERVER_ECOMMERCE
};

export const Strapi = {
  Pages:"/api/pages",
  Highlights:"/api/highlights",
  Contact: "/api/contacts"
}

export const Identity = {
  SendOTP: "/api/services/app/OTP/SendOTP",
  LoginOTP:"/api/services/app/OTP/Login",
  RegisterOTP:"/api/services/app/OTP/Register",
  ChangePasswordByAuthorizedUser:"/api/services/app/Account/ChangePasswordByAuthorizedUser",
  GetCurrentUserProfileForEdit: "/api/services/app/Profile/GetCurrentUserProfileForEdit",
  UpdateCurrentUserProfile: "/api/services/app/Profile/UpdateCurrentUserProfile",
  UpdateProfileEmail: "/api/services/app/Profile/UpdateProfileEmail",
  UpdateProfilePhoneNumber: "/api/services/app/Profile/UpdateProfilePhoneNumber",
  SendEmailActivation: "/api/services/app/Account/SendEmailActivation",
  LoginWithPassword: "/api/TokenAuth/Login",
  ChangePassword: "/api/services/app/Account/ChangePassword",
  ForgotPasswordByPhoneNumber: "/api/services/app/Account/ForgotPasswordByPhoneNumber",
  ForgotPasswordVerification: "/api/services/app/Account/ForgotPasswordVerification",
  ResetPassword: "/api/services/app/Account/ResetPassword",
  
  
  
  // UpdateNewsletterUserProfile: "/api/services/app/Profile/UpdateNewsletterUserProfile",
  // SendVerificationSms: "/api/services/app/Profile/SendVerificationSms",
  // VerifySmsCode: "/api/services/app/Profile/VerifySmsCode",
  // ForgotPasswordByEmail: "/api/services/app/Account/ForgotPassword",
  // Register: "/api/services/app/Account/Register",
  // ActivateEmail: "/api/services/app/Account/ActivateEmail",
};


export const Payment = {
  GetBalance:"/api/services/app/Deposit/GetBalance",
  GetDepositBankGateway:"/api/services/app/UserDepositBankGateway/GetAll",
  MakeDepositToken:"/api/services/app/UserDepositBankGateway/MakeToken",
  GetTransactionDeposit:"/api/services/app/TransactionDeposit/GetAll",

  // ValidateDiscountCode:"/api/services/app/Discount/Validate",
  // RegisterDiscountCode: "/api/services/app/Discount/Register",
  // GetBankGateway:"/api/services/app/ReserveBankGateway/GetAll",
  // MakeToken:"/api/services/app/ReserveBankGateway/MakeToken",
  // ConfirmByDeposit:"/api/services/app/DepositReserve/ConfirmByDeposit"
};

  export const Blog = {
    getPosts: "//wp-json/wp/v2/posts",
    getBestCategories: '/wp-json/wp/v2/best_category',
    getCategoeyName: '/wp-json/wp/v2/categories',
    getUsers: "/wp-json/wp/v2/users",
    getTagName: '/wp-json/wp/v2/tags'
  }

  export const Commerce = {
    GetAllProducts:"/api/services/app/Product/SearchWithFacets",
    GetBySlug:"/api/services/app/Product/GetBySlug",
    GetBrandBySlug:"/api/services/app/Brand/GetBySlug",
    GetAllForSiteMap:"/api/services/app/Product/GetAllForSiteMap",
  }
  

export const ServerStatus = {
  Success: 1,
  Error: 2,
  SummaryError: 3,
};

  export const Cart = {
    GetCurrentCart:"/api/services/app/Cart/GetCurrentCart",
    AddItem:"/api/services/app/Cart/AddItem",
    RemoveItem:"/api/services/app/Cart/RemoveItem",
    ClearCart:"/api/services/app/Cart/Clear",
  }
  