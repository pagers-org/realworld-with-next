import dynamic from 'next/dynamic';
import { dehydrate } from '@tanstack/react-query';
import { useGetArticle, usePreFetchGetArticle } from '@/api/article';
import { LoadingSpinner } from '@/components';
import { withAuth } from '@/hoc';
import { useArticleStore } from '@/stores';
import { ArticleMeta } from '@/templates/article';
import { CommentList } from '@/templates/comment';

const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });

type ArticlePageProps = {
  slug: string;
};

const ArticlePage = ({ slug }: ArticlePageProps) => {
  const { data } = useGetArticle(slug);
  const setArticle = useArticleStore((state) => state.setArticle);

  if (!data) return <LoadingSpinner />;
  const { article } = data;
  setArticle(article);

  const cleanText = (data?.article || { body: '' }).body.replace(/\\n/gi, '<br/>');

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta slug={slug} />
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <Markdown content={cleanText} />
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        <div className="article-actions" />
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentList slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

export const getServerSideProps = withAuth(async ({ query, initialZustandState }) => {
  const slug = query.pid as string;
  const queryClient = await usePreFetchGetArticle(slug);

  return {
    props: {
      slug,
      initialZustandState,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
