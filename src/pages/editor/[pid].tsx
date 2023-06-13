import { type MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';
import { usePreFetchGetArticle, useUpdateArticle } from '@/api/article';
import { ErrorList } from '@/components';
import { withAuth } from '@/hoc';
import useEditor from '@/hooks/useEditor';
import { useUser } from '@/stores';
import { TagInput } from '@/templates/editor';
import { RWClientError } from 'types-client';

type UpdateArticleEditorProps = {
  slug: string;
};

const UpdateArticleEditor = ({ slug }: UpdateArticleEditorProps) => {
  const { token } = useUser();
  const { mutate: updateArticle } = useUpdateArticle();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RWClientError['errors']['body']>([]);

  const { editorState, handleTitle, handleDescription, handleBody, addTag, removeTag } =
    useEditor();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!token) return;

    try {
      setLoading(true);

      await updateArticle({
        article: {
          title: editorState.title,
          description: editorState.description,
          body: editorState.body,
          slug,
        },
        token,
      });

      await router.push('/', undefined, { shallow: true });
    } catch (error) {
      const $error = error as RWClientError;
      setErrors($error.errors.body);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorList errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={editorState.title}
                    onChange={handleTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={editorState.description}
                    onChange={handleDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={editorState.body}
                    onChange={handleBody}
                  />
                </fieldset>

                <TagInput tagList={editorState.tagList} addTag={addTag} removeTag={removeTag} />

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  Update Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticleEditor;

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
