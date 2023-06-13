import { memo } from 'react';
import { useGetCommentsFromArticle } from '@/api/comment';
import { ErrorMessage, LoadingSpinner } from '@/components';
import { useUser } from '@/stores';
import Comment from './Comment';
import CommentInput from './CommentInput';

type CommentListProps = {
  slug: string;
};

const CommentList = ({ slug }: CommentListProps) => {
  const { token } = useUser();
  const { data, error } = useGetCommentsFromArticle(slug, token);

  if (!data) return <LoadingSpinner />;

  if (error) return <ErrorMessage message="Cannot load comments related to this article..." />;

  const { comments } = data;

  return (
    <div>
      <CommentInput />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default memo(CommentList);
