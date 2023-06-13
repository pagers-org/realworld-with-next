import { create } from 'zustand';
import type { Article } from 'types-domain';

interface ArticleState {
  article: Article;
  setArticle: (selectedArticle: Article) => void;
}

export const useArticleStore = create<ArticleState>()((set) => ({
  article: {
    tagList: [],
    createdAt: -1,
    author: {
      email: '',
      token: '',
      username: '',
      bio: '',
      image: '',
    },
    description: '',
    title: '',
    body: '',
    slug: '',
    updatedAt: -1,
    favoritesCount: 0,
    favorited: false,
  },
  setArticle: (selectedArticle) => set((state) => ({ ...state, article: selectedArticle })),
}));
