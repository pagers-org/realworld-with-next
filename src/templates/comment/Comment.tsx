import { CustomImage, NavLink } from '@/components';
import { useUser } from '@/stores';
import DeleteButton from './DeleteButton';
import type { Comment as CommentType } from 'types-domain';

const Comment = ({ comment }: { comment: CommentType }) => {
  const { token, username } = useUser();
  const canModify = !!token && username === comment?.author?.username;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <NavLink href={`/profile/${comment.author.username}`} className="comment-author">
          <CustomImage
            src={comment.author.image}
            alt="Comment author's profile image"
            className="comment-author-img"
          />
        </NavLink>
        &nbsp;
        <NavLink href={`/profile/${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </NavLink>
        <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
        {canModify && <DeleteButton commentId={comment.id} />}
      </div>
    </div>
  );
};

export default Comment;
