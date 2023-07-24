import { memo } from 'react';
import { useDeleteArticle } from '@/api/article';
import { NavLink } from '@/components';
import useAppRouter from '@/hooks/useAppRouter';
import { useArticleStore, useUser } from '@/stores';

type ArticleActionsProps = {
  slug: string;
};

const ArticleActions = ({ slug }: ArticleActionsProps) => {
  const router = useAppRouter();
  const article = useArticleStore((state) => state.article);
  const { token, username } = useUser();
  const { mutate: deleteArticle } = useDeleteArticle();

  const handleDelete = () => {
    if (!token) return;

    const result = window.confirm('Do you really want to delete it?');
    if (!result) return;

    deleteArticle({ slug, token });
    void router.push('/', undefined, { shallow: true });
  };

  const canModify = !!token && username === article?.author?.username;
  if (!canModify) return null;

  return (
    <span>
      <NavLink href={`/editor/${article.slug}`} className="btn btn-outline-secondary btn-sm">
        <i className="ion-edit" /> Edit Article
      </NavLink>

      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        <i className="ion-trash-a" /> Delete Article
      </button>
    </span>
  );
};

export default memo(ArticleActions);
