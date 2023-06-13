import axios from 'axios';
import {
  리얼_월드_권한_필요_요청_키,
  리얼_월드_서버_도메인,
  타임아웃_제한_시간,
} from '@/constants';

export const authCall = (token?: string) => {
  return !token
    ? {}
    : { headers: { [리얼_월드_권한_필요_요청_키]: true, Authorization: `Token ${token}` } };
};

export const defaultConfig = {
  baseURL: 리얼_월드_서버_도메인,
  timeout: 타임아웃_제한_시간,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
};

export const rwClient = axios.create(defaultConfig);

rwClient.interceptors.response.use((response) => {
  const { data } = response.data;
  if (!data) return response.data;
  return data;
});
