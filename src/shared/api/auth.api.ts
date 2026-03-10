import {axiosInstance} from '@/lib/axiosInstance';

export type User = {
  id: number;
  username: string;
  email: string;
};

export const loginRequest = async (
  identifier: string,
  password: string
): Promise<{ jwt: string; user: User }> => {
  const {data} = await axiosInstance.post('/auth/local', {
    identifier,
    password,
  });

  return data;
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string
): Promise<{ jwt: string; user: User }> => {
  const {data} = await axiosInstance.post('/auth/local/register', {
    username,
    email,
    password,
  });

  return data;
};

export const getMeRequest = async (token?: string): Promise<User> => {
  const {data} = await axiosInstance.get('/users/me',
    {
      headers: token ? {Authorization: `Bearer ${token}`} : undefined,
    }
  );
  return data;
};