import { memo } from 'react';
import { useRouter } from 'next/router';
import { useDeleteComment } from '@/api/comment';
import { useUser } from '@/stores';

const DeleteButton = ({ commentId }: { commentId: string }) => {
  const { token } = useUser();
  const { mutate: deleteComment } = useDeleteComment();
  const router = useRouter();
  const slug = String(router.query.pid);

  const handleDelete = (commentId: string) => deleteComment({ slug, commentId, token });

  return (
    <span className="mod-options">
      <i className="ion-trash-a" onClick={() => handleDelete(commentId)} />
    </span>
  );
};

export default memo(DeleteButton);
