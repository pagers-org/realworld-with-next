import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 유저 } from '@/constants';
import UserAPI from './core/user';

export const useGetProfile = (username: string) => {
  return useQuery({
    queryKey: [유저, username],
    queryFn: () => UserAPI.get({ username }),
  });
};

export const usePreFetchGetProfile = async (username: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [유저, username],
    queryFn: () => UserAPI.get({ username }),
  });

  return queryClient;
};

export const useFollowUser = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UserAPI.follow({ username }),
    onSuccess: async () => {
      await queryClient.refetchQueries([유저, username]);
    },
  });
};

export const useUnFollowUser = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UserAPI.unfollow({ username }),
    onSuccess: async () => {
      await queryClient.refetchQueries([유저, username]);
    },
  });
};
