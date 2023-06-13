import { memo } from 'react';
import { CustomImage, NavLink } from '@/components';
import { useArticleStore } from '@/stores';
import ArticleActions from './ArticleActions';

type ArticleMetaProps = {
  slug: string;
};

const ArticleMeta = ({ slug }: ArticleMetaProps) => {
  const article = useArticleStore((state) => state.article);

  return (
    <div className="article-meta">
      <NavLink href={`/profile/${article.author.username}`}>
        <CustomImage src={article.author.image} alt="author-profile-image" />
      </NavLink>

      <div className="info">
        <NavLink href={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </NavLink>
        <span className="date">{new Date(article.createdAt).toDateString()}</span>
      </div>

      <ArticleActions slug={slug} />
    </div>
  );
};

export default memo(ArticleMeta);
