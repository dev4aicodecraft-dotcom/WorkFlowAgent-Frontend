export type User = {
    id: string;
    name: string;
    email: string;
  };
  
  export type AuthTokens = {
    accessToken: string;
    refreshToken?: string;
  };
  
  export type SignInPayload = {
    email: string;
    password: string;
    rememberMe?: boolean;
  };
  
  export type SignUpPayload = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  
  export type ForgotPasswordPayload = {
    email: string;
  };
  
  export type AuthResponse = {
    user: User;
    tokens: AuthTokens;
  };
  
  export type MessageResponse = {
    message: string;
  };