import type { UserResponse } from "@/types/api";

/** App user shape stored in zustand */
export type User = {
  id: string;
  name: string;
  email: string;
  firmId?: string;
  role?: "super_admin" | "admin" | "user";
};

export function mapUserResponse(u: UserResponse): User {
  return {
    id: u.id,
    name: `${u.first_name} ${u.last_name}`.trim(),
    email: u.email,
    firmId: u.firm_id,
    role: u.role,
  };
}

export type SignInPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

/** Form-only fields; map to FirmRegistration before API call */
export type SignUpFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  firm_name: string;
  address_line_one: string;
  address_line_two?: string;
  city: string;
  state: string;
  country: string;
  phone_number?: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type MessageResponse = {
  message: string;
};