import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 게시물, 게시물_리스트, 페이지_컨텐츠_개수 } from '@/constants';
import ArticleAPI from './core/article';
import type { AddArticle, UpdateArticle } from 'types-api/article';

type UsePartialArticlesParams = {
  page: number;
  favorite: string;
  follow: string;
  tag: string;
  pid: string;
  isProfilePage?: boolean;
  token?: string;
};

export const usePartialArticles = ({
  favorite,
  follow,
  tag,
  pid,
  isProfilePage = false,
  token,
  ...param
}: UsePartialArticlesParams) => {
  const page = param.page * 페이지_컨텐츠_개수;

  let fetchURL = `?offset=${page}`;
  if (tag) fetchURL = `?tag=${tag}&offset=${page}`;
  if (isProfilePage && !!favorite) fetchURL = `?favorited=${favorite}&offset=${page}`;
  if (isProfilePage && !favorite) fetchURL = `?author=${pid}&offset=${page}`;
  if (!isProfilePage && !!follow) fetchURL = `/feed?offset=${page}`;

  return useQuery({
    queryKey: [게시물_리스트, page, fetchURL, pid, token],
    queryFn: () => ArticleAPI.getPartial({ url: fetchURL }, token),
    cacheTime: Infinity,
  });
};

export const useGetArticle = (slug: string) => {
  return useQuery({
    queryKey: [게시물, slug],
    queryFn: () => ArticleAPI.get({ slug }),
    cacheTime: Infinity,
  });
};

export const usePreFetchGetArticle = async (slug: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [게시물, slug],
    queryFn: () => ArticleAPI.get({ slug }),
  });

  return queryClient;
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ article, token }: { article: AddArticle; token?: string }) =>
      ArticleAPI.add({ article }, token),
    onSuccess: async () => {
      await queryClient.refetchQueries([게시물_리스트]);
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ article, token }: { article: UpdateArticle; token?: string }) =>
      ArticleAPI.update({ article }, token),
    onSuccess: async (_, { article }) => {
      await queryClient.refetchQueries([게시물, article.slug]);
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, token }: { slug: string; token: string }) =>
      ArticleAPI.delete({ slug }, token),
    onSuccess: async (_, { slug }) => {
      await queryClient.refetchQueries([게시물, slug]);
    },
  });
};

export const useFavoriteArticle = (token?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => ArticleAPI.favorite({ slug }, token),
    onSuccess: async (_, { slug }) => {
      await queryClient.refetchQueries([게시물, slug]);
    },
  });
};

export const useUnFavoriteArticle = (token?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => ArticleAPI.unFavorite({ slug }, token),
    onSuccess: async (_, { slug }) => {
      await queryClient.refetchQueries([게시물, slug]);
    },
  });
};
