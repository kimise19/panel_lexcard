export interface User {
  displayName: string;
  email: string;
  token: string;
}

export interface Profile {
  id: number;
  displayName: string;
  email: string;
  roles: string[];
  verified: boolean;
}
export interface RegisterData {
  displayName: string;
  email: string;
  password: string;
}