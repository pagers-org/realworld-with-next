import { getCookie } from 'cookies-next';
import { 리얼_월드_도메인, 리얼_월드_키 } from '@/constants';
import { authCall, rwClient } from './config';
import type { UserAPITypes } from 'types-api/user';

const UserAPI: UserAPITypes = {
  login: ({ email, password }) =>
    rwClient.post(`/users/login`, JSON.stringify({ user: { email, password } })),

  setToken: ({ user }) =>
    rwClient.post(`${리얼_월드_도메인}/api/set-token`, JSON.stringify({ user })),

  removeToken: () => rwClient.post(`${리얼_월드_도메인}/api/remove-token`),

  register: ({ username, email, password }) =>
    rwClient.post(`/users`, JSON.stringify({ user: { username, email, password } })),

  save: ({ user }, token) => rwClient.put(`/user`, JSON.stringify({ user }), authCall(token)),

  follow: ({ username }) => {
    const user = JSON.parse((getCookie(리얼_월드_키) as string) || '{}');
    const token = user?.token;
    return rwClient.post(`/profiles/${username}/follow`, undefined, authCall(token));
  },

  unfollow: ({ username }) => {
    const user = JSON.parse((getCookie(리얼_월드_키) as string) || '{}');
    const token = user?.token;
    return rwClient.delete(`/profiles/${username}/follow`, authCall(token));
  },

  get: ({ username }) => rwClient.get(`/profiles/${username}`),

  getArticles: ({ username, offset }) => rwClient.get(`/profiles/${username}?offset=${offset}`),
};

export default UserAPI;
