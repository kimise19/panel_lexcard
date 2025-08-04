export interface AppVersion {
  id?: number;
  platform: string;
  currentVersion: string;
  updateUrl: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | T[];
}

export const InitialAppVersionState: AppVersion = {
  id: 0,
  platform: "",
  currentVersion: "",
  updateUrl: "",
};
