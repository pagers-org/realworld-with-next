import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useGetTags } from '@/api/tag';
import { ErrorMessage, LoadingSpinner } from '@/components';

const Tags = () => {
  const router = useRouter();
  const { data, error } = useGetTags();

  const handleRouteTag = useCallback((tag: string) => () => router.push(`/?tag=${tag}`), []);

  if (error) return <ErrorMessage message="Cannot load popular tags..." />;
  if (!data) return <LoadingSpinner />;

  const { tags } = data;
  return (
    <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <div
          key={tag}
          onClick={handleRouteTag(tag)}
          className="tag-default tag-pill cursor-pointer"
        >
          <span>{tag}</span>
        </div>
      ))}
    </div>
  );
};

export default Tags;
