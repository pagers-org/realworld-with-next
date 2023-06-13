import { authCall, rwClient } from './config';
import type { ArticleAPITypes } from 'types-api/article';

export const getQueryString = (limit: number, page: number) =>
  `limit=${limit}&offset=${page * limit}`;

const ArticleAPI: ArticleAPITypes = {
  getAll: ({ page, limit = 10 }) => rwClient.get(`/articles?${getQueryString(limit, page)}`),

  getPartial: ({ url }, token) => rwClient.get(`/articles${url}`, authCall(token)),

  getFeed: ({ page, limit = 10 }, token) =>
    rwClient.get(`/articles/feed?${getQueryString(limit, page)}`, authCall(token)),

  get: ({ slug }) => rwClient.get(`/articles/${slug}`),

  add: ({ article }, token) => rwClient.post(`/articles`, { article }, authCall(token)),

  update: ({ article }, token) =>
    rwClient.put(`/articles/${article.slug}`, { article }, authCall(token)),

  delete: ({ slug }, token) => rwClient.delete(`/articles/${slug}`, authCall(token)),

  favorite: ({ slug }, token) => {
    return rwClient.post(
      `/articles/${encodeURIComponent(slug)}/favorite`,
      undefined,
      authCall(token),
    );
  },

  unFavorite: ({ slug }, token) =>
    rwClient.delete(`/articles/${encodeURIComponent(slug)}/favorite`, authCall(token)),
};

export default ArticleAPI;
