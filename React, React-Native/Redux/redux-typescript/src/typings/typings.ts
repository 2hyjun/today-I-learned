export type DefaultAPIMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface APIConfig {
  httpMethods?: string[];
  authenticated: boolean;
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

export interface User {
  username: string;
  password: string;
}

export interface LoginPageState {
  isAuthenticated: boolean;
  isFetching: boolean;
  username: string;
  level: number;
  availableRegion: string | null;
}
