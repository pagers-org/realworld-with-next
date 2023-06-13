import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useFavoriteArticle, useUnFavoriteArticle } from '@/api/article';
import { CustomImage, NavLink } from '@/components';
import { useUser } from '@/stores';
import type { Article } from 'types-domain';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

type ArticlePreviewProps = {
  article: Article;
};

const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  const { token } = useUser();
  const { mutate: favoriteArticle } = useFavoriteArticle(token);
  const { mutate: unFavoriteArticle } = useUnFavoriteArticle(token);
  const router = useRouter();

  const [preview, setPreview] = useState(article);
  const [hover, setHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleClickFavorite = (slug: string) => async () => {
    if (!token) return router.push(`/user/login`, undefined, { shallow: true });

    setPreview((prev) => ({
      ...prev,
      favorited: !prev.favorited,
      favoritesCount: prev.favorited ? prev.favoritesCount - 1 : prev.favoritesCount + 1,
    }));

    try {
      const callAPI = preview.favorited ? unFavoriteArticle : favoriteArticle;

      await callAPI({ slug });
    } catch (error) {
      setPreview((prev) => ({
        ...prev,
        favorited: !prev.favorited,
        favoritesCount: prev.favorited ? prev.favoritesCount - 1 : prev.favoritesCount + 1,
      }));
    }
  };

  const handleClickArticle = useCallback(
    (slug: string) => () => router.push(`/article/${slug}`, undefined, { shallow: true }),
    [],
  );

  const handleClickTag = useCallback(
    (tag: string) => () => router.push(`/?tag=${tag}`, undefined, { shallow: true }),
    [],
  );

  const handleMouseOverAndLeave = useCallback(
    (isHover: boolean, index: number) => () => {
      setHover(isHover);
      setCurrentIndex(index);
    },
    [],
  );

  if (!article) return null;

  return (
    <div className="article-preview" style={{ padding: '1.5rem 0.5rem' }}>
      <div className="article-meta">
        <NavLink href={`/profile/${preview.author.username}`}>
          <CustomImage src={preview.author.image} alt="author's profile image" />
        </NavLink>

        <div className="info">
          <NavLink href={`/profile/${preview.author.username}`} className="author">
            <span>{preview.author.username}</span>
          </NavLink>
          <span className="date">{new Date(preview.createdAt).toDateString()}</span>
        </div>

        <div className="pull-xs-right">
          <button
            className={preview.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
            onClick={handleClickFavorite(preview.slug)}
          >
            <i className="ion-heart" /> {preview.favoritesCount}
          </button>
        </div>
      </div>

      <div
        onClick={handleClickArticle(preview.slug)}
        className="preview-link"
        style={{ cursor: 'pointer' }}
      >
        <h1>{preview.title}</h1>
        <p>{preview.description}</p>
        <span>Read more...</span>
        <ul className="tag-list" style={{ maxWidth: '100%', display: 'flex' }}>
          {preview.tagList.map((tag, index) => (
            <div onClick={handleClickTag(tag)} key={tag}>
              {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
              <li
                className="tag-default tag-pill tag-outline"
                onClick={(e) => e.stopPropagation()}
                onMouseOver={handleMouseOverAndLeave(true, index)}
                onMouseLeave={handleMouseOverAndLeave(false, -1)}
                style={{ borderColor: hover && currentIndex === index ? '#5cb85c' : 'initial' }}
              >
                <span style={{ color: hover && currentIndex === index ? '#5cb85c' : 'inherit' }}>
                  {tag}
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticlePreview;
