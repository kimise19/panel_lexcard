// Authentication Types based on GraphQL schema

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  displayName: string;
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  email: string;
}

export interface AuthPayload {
  access_token: string;
  user: {
    id: number;
    displayName: string;
    email: string;
    roles: string[];
    verified: boolean;
  };
}

export interface Profile {
  id: number;
  displayName: string;
  email: string;
  roles: string[];
  verified: boolean;
}
