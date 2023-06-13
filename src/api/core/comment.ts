import { authCall, rwClient } from './config';
import type { CommentAPITypes } from 'types-api/comment';

const CommentAPI: CommentAPITypes = {
  add: ({ slug, body }, token) =>
    rwClient.post(`/articles/${slug}/comments`, { comment: { body } }, authCall(token)),

  get: ({ slug }, token) => rwClient.get(`/articles/${slug}/comments`, authCall(token)),

  delete: ({ slug, commentId }, token) =>
    rwClient.delete(`/articles/${slug}/comments/${commentId}`, authCall(token)),
};

export default CommentAPI;
