import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';
import { useAddCommentsToArticle } from '@/api/comment';
import { CustomImage, NavLink } from '@/components';
import useAppRouter from '@/hooks/useAppRouter';
import { useUser } from '@/stores';

const CommentInput = () => {
  const router = useAppRouter();
  const { token, image } = useUser();
  const { mutate: addComment } = useAddCommentsToArticle();
  const slug = String(router.query.pid);

  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    setLoading(true);
    addComment({ slug, body: content, token });
    setLoading(false);
    setContent('');
  };

  if (!token) {
    return (
      <p style={{ textAlign: 'center' }}>
        <NavLink href="/user/login">
          <strong style={{ color: '#797bff', cursor: 'pointer' }}>Sign in</strong>
        </NavLink>
        &nbsp;or&nbsp;
        <NavLink href="/user/register">
          <strong style={{ color: '#907777', cursor: 'pointer' }}>Sign up</strong>
        </NavLink>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          rows={3}
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="card-footer">
        <CustomImage
          className="comment-author-img"
          src={image}
          alt="Comment author's profile image"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
