declare module 'types-api/comment' {
  import type { RWClientParamCall } from 'types-client';
  import type { Comment } from 'types-domain';

  type CommentAPITypes = {
    add: RWClientParamCall<{ slug: string; body: string }, { comment: Comment }>;

    get: RWClientParamCall<{ slug: string }, { comments: Comment[] }>;

    delete: RWClientParamCall<{ slug: string; commentId: string }>;
  };
}
