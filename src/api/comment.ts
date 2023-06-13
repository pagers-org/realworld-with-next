import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 답글_리스트 } from '@/constants';
import CommentAPI from './core/comment';

export const useAddCommentsToArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body, token }: { slug: string; body: string; token?: string }) =>
      CommentAPI.add({ slug, body }, token),
    onSuccess: async (_, { slug }) => {
      await queryClient.refetchQueries([답글_리스트, slug]);
    },
  });
};

export const useGetCommentsFromArticle = (slug: string, token?: string) => {
  return useQuery({
    queryKey: [답글_리스트, slug, token],
    queryFn: () => CommentAPI.get({ slug }, token),
    cacheTime: Infinity,
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, commentId, token }: { slug: string; commentId: string; token?: string }) =>
      CommentAPI.delete({ slug, commentId }, token),
    onSuccess: async (_, { slug }) => {
      await queryClient.refetchQueries([답글_리스트, slug]);
    },
  });
};
