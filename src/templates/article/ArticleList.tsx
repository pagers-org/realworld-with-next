import { usePartialArticles } from '@/api/article';
import { ErrorMessage, LoadingSpinner, Pagination } from '@/components';
import useAppRouter from '@/hooks/useAppRouter';
import useViewport from '@/hooks/useViewport';
import { useUser } from '@/stores';
import ArticlePreview from './ArticlePreview';

type ArticleListProps = {
  favorite: string;
  follow: string;
  tag: string;
  pid: string;
  isProfilePage?: boolean;
};

const ArticleList = (props: ArticleListProps) => {
  const { push, query } = useAppRouter();
  const page = Number(query.page ?? 1);
  const { token } = useUser();
  const { data, error } = usePartialArticles({ page, token, ...props });
  const { vw } = useViewport();

  const onChangePage = (targetPage: number) =>
    push(`/?page=${targetPage}`, undefined, { shallow: true });

  if (error) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <ErrorMessage message="Cannot load recent articles..." />
      </div>
    );
  }

  if (!data) return <LoadingSpinner />;

  const { articles, articlesCount } = data;

  const lastIndex =
    articlesCount > 480 ? Math.ceil(articlesCount / 20) : Math.ceil(articlesCount / 20) - 1;

  if (articles && articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      {!!(articlesCount && articlesCount > 20) && (
        <Pagination
          page={page}
          onChangePage={onChangePage}
          total={articlesCount}
          limit={20}
          pageCount={vw >= 768 ? 10 : 5}
          currentPage={page}
          lastIndex={lastIndex}
        />
      )}
    </>
  );
};

export default ArticleList;
