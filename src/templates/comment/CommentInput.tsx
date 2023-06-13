import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useAddCommentsToArticle } from '@/api/comment';
import { CustomImage, NavLink } from '@/components';
import { useUser } from '@/stores';

const CommentInput = () => {
  const { token, image } = useUser();
  const { mutate: addComment } = useAddCommentsToArticle();
  const router = useRouter();
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
    await addComment({ slug, body: content, token });
    setLoading(false);
    setContent('');
  };

  if (!token) {
    return (
      <p style={{ textAlign: 'center' }}>
        <NavLink href="/user/login">Sign in</NavLink>
        &nbsp;or&nbsp;
        <NavLink href="/user/register">sign up</NavLink>
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
