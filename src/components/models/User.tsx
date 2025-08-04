export interface User {
  displayName: string;
  email: string;
  token: string;
}

export interface Profile {
  displayName: string;
  email: string;
  roles: string[];
}
export interface RegisterData {
  displayName: string;
  email: string;
  password: string;
}