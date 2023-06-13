import { useQuery } from '@tanstack/react-query';
import { 태그_리스트 } from '@/constants';
import TagAPI from './core/tag';

export const useGetTags = () => {
  return useQuery({
    queryKey: [태그_리스트],
    queryFn: () => TagAPI.getAll(),
    cacheTime: Infinity,
  });
};
