import { type ChangeEvent, type KeyboardEvent, useCallback, useState } from 'react';

type TagInputProps = {
  tagList: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
};

const TagInput = ({ tagList, addTag, removeTag }: TagInputProps) => {
  const [tag, setTag] = useState('');

  const changeTagInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTag(event.target.value),
    [],
  );

  const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // Comma
        if (event.keyCode !== 9) event.preventDefault();
        handleAddTag();
        break;
      default:
        break;
    }
  };

  const handleAddTag = () => {
    if (!tag) return;

    addTag(tag);
    setTag('');
  };

  const handleRemoveTag = (tag: string) => {
    removeTag(tag);
  };

  return (
    <>
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter tags"
          value={tag}
          onChange={changeTagInput}
          onBlur={handleAddTag}
          onKeyDown={handleTagInputKeyDown}
        />

        <div className="tag-list">
          {tagList.map((tag, index) => (
            <span className="tag-default tag-pill" key={index}>
              <i className="ion-close-round" onClick={() => handleRemoveTag(tag)} />
              {tag}
            </span>
          ))}
        </div>
      </fieldset>
    </>
  );
};

export default TagInput;
