import { RegisterData } from "../models/Register";
import { getErrorMessage } from "./ErrorUtils";
import { Profile } from "../models/User";


export const login = async (email: string, password: string): Promise<void> => {
  const response = await fetch("/api/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};
export const getProfile = async (): Promise<Profile> => {
  const response = await fetch("/api/user/get-profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Error al obtener el perfil");
  }

  return await response.json();
};
export const logout = async (): Promise<void> => {
  const response = await fetch("/api/account/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};

export const register = async (user: RegisterData): Promise<void> => {
  const response = await fetch("/api/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};

export const changePassword = async (newPassword: string): Promise<void> => {
  const response = await fetch("/api/account/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ newPassword }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const response = await fetch(`/api/account/reset-password?email=${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};

export const changePasswordWithToken = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const response = await fetch(`/api/account/change-password?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};

export const verifyEmail = async (token: string): Promise<void> => {
  const response = await fetch(`/api/account/verify-email?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};

export const verifySession = async (): Promise<void> => {
  const response = await fetch("/api/account/verify-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(getErrorMessage(errorResponse));
  }
};
