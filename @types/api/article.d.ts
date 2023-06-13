declare module 'types-api/article' {
  import type { RWClientParamCall } from 'types-client';
  import type { Article, Articles } from 'types-domain';

  type AddArticle = Pick<Article, 'title' | 'description' | 'body' | 'tagList'>;

  type UpdateArticle = Pick<Article, 'title' | 'description' | 'body' | 'slug'>;

  type ArticleAPITypes = {
    getAll: RWClientParamCall<
      { page: number; limit?: number; favorited?: string; author?: string },
      Articles
    >;

    getPartial: RWClientParamCall<{ url: string }, Articles>;

    getFeed: RWClientParamCall<{ page: number; limit?: number }, Articles>;

    get: RWClientParamCall<{ slug: string }, { article: Article }>;

    add: RWClientParamCall<{ article: AddArticle }, { article: Article }>;

    delete: RWClientParamCall<{ slug: string }>;

    favorite: RWClientParamCall<{ slug: string }, { article: Article }>;

    unFavorite: RWClientParamCall<{ slug: string }, { article: Article }>;

    update: RWClientParamCall<{ article: UpdateArticle }, { article: Article }>;
  };
}
