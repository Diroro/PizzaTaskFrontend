import {User} from '../domain/user.domain';
import {apiClient} from './api';

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export const LOGIN_URLS = {
  login: '/auth/sign-in',
  me: '/auth/me',
};

const signIn = (email: string, password: string): Promise<LoginResponse> => {
  const body = {email, password};
  return apiClient.post<LoginResponse>({url: LOGIN_URLS.login, body});
};

const getMyUser = (): Promise<User | undefined> => {
  return apiClient.get<User | undefined>({url: LOGIN_URLS.me});
};

export const loginApi = {
  signIn,
  getMyUser,
};
