import { RegisterData } from "../models/Register";
import { Profile } from "../models/User";
import { 
  loginGraphQL, 
  registerGraphQL, 
  getProfileGraphQL, 
  logoutGraphQL, 
  resetPasswordGraphQL, 
  changePasswordGraphQL, 
  changePasswordWithTokenGraphQL,
  verifyEmailGraphQL 
} from "./GraphQLService";
import { setStorageItem, removeStorageItem } from "../utils/StorageUtils";

export const login = async (email: string, password: string): Promise<void> => {
  const authPayload = await loginGraphQL(email, password);
  // Store the token in localStorage/sessionStorage based on remember me preference
  setStorageItem("authToken", authPayload.access_token);
};

export const getProfile = async (): Promise<Profile> => {
  try {
    return await getProfileGraphQL();
  } catch (error) {
    // If token is invalid, clear storage and rethrow
    removeStorageItem("authToken");
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await logoutGraphQL();
  } catch (error) {
    // Even if logout fails on server, clear local token
    console.warn("Logout failed on server, but clearing local storage:", error);
  } finally {
    removeStorageItem("authToken");
  }
};

export const register = async (user: RegisterData): Promise<void> => {
  await registerGraphQL(user);
  // Registration successful - token is typically not stored immediately
  // User usually needs to verify email first
};

export const changePassword = async (newPassword: string): Promise<void> => {
  await changePasswordGraphQL(newPassword);
};

export const resetPassword = async (email: string): Promise<void> => {
  await resetPasswordGraphQL(email);
};

export const changePasswordWithToken = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  await changePasswordWithTokenGraphQL(token, newPassword);
};

export const verifyEmail = async (token: string): Promise<void> => {
  await verifyEmailGraphQL(token);
};

// Note: verifySession is typically handled by GraphQL automatically through authentication headers
// If you need session verification, you can call getProfile() which will fail if the session is invalid
export const verifySession = async (): Promise<void> => {
  try {
    await getProfileGraphQL();
  } catch (error) {
    removeStorageItem("authToken");
    throw error;
  }
};
