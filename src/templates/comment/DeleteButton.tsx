import { memo } from 'react';
import { useDeleteComment } from '@/api/comment';
import useAppRouter from '@/hooks/useAppRouter';
import { useUser } from '@/stores';

const DeleteButton = ({ commentId }: { commentId: string }) => {
  const router = useAppRouter();
  const { token } = useUser();
  const { mutate: deleteComment } = useDeleteComment();
  const slug = String(router.query.pid);

  const handleDelete = (commentId: string) => deleteComment({ slug, commentId, token });

  return (
    <span className="mod-options">
      <i className="ion-trash-a" onClick={() => handleDelete(commentId)} />
    </span>
  );
};

export default memo(DeleteButton);
