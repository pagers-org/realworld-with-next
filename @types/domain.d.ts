declare module 'types-domain' {
  type User = {
    email: string;
    token: string;
    username: string;
    bio: string | null;
    image: string;
  };

  type Profile = {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };

  type Article = {
    tagList: string[];
    createdAt: number;
    author: User;
    description: string;
    title: string;
    body: string;
    slug: string;
    updatedAt: number;
    favoritesCount: number;
    favorited: boolean;
  };

  type Articles = {
    articles: Article[];
    articlesCount: number;
  };

  type Comment = {
    createdAt: number;
    id: string;
    body: string;
    slug: string;
    author: User;
    updatedAt: number;
  };
}
