import { type FormEvent, useState } from 'react';
import { useCreateArticle } from '@/api/article';
import { ErrorList } from '@/components';
import { withAuth } from '@/hoc';
import useAppRouter from '@/hooks/useAppRouter';
import useEditor from '@/hooks/useEditor';
import { useUser } from '@/stores';
import { TagInput } from '@/templates/editor';
import type { RWClientError } from 'types-client';

const PublishArticleEditor = () => {
  const router = useAppRouter();
  const { token } = useUser();
  const { mutate: createArticle } = useCreateArticle();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RWClientError['errors']['body']>([]);
  const { editorState, handleTitle, handleDescription, handleBody, addTag, removeTag } =
    useEditor();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    try {
      setLoading(true);

      await createArticle({ article: editorState, token });

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
            <form onSubmit={handleSubmit}>
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
                  type="submit"
                  disabled={isLoading}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishArticleEditor;

export const getServerSideProps = withAuth(async ({ initialZustandState }) => ({
  props: { initialZustandState },
}));
