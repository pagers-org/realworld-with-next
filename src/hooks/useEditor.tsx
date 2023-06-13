import { type ChangeEvent, type Reducer, type ReducerState, useCallback, useReducer } from 'react';

export type EditorState = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

type EditorAction =
  | { type: 'SET_TITLE'; text: string }
  | { type: 'SET_DESCRIPTION'; text: string }
  | { type: 'SET_BODY'; text: string }
  | { type: 'ADD_TAG'; tag: string }
  | { type: 'REMOVE_TAG'; tag: string };

type EditorReducerType = Reducer<EditorState, EditorAction>;

export const editorReducer: EditorReducerType = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.text };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.text };
    case 'SET_BODY':
      return { ...state, body: action.text };
    case 'ADD_TAG':
      return { ...state, tagList: state.tagList.concat(action.tag) };
    case 'REMOVE_TAG':
      return { ...state, tagList: state.tagList.filter((tag) => tag !== action.tag) };
    default: {
      throw new Error('Unhandled action!');
    }
  }
};

const useEditor = (
  initialState: EditorState = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
) => {
  const [editorState, dispatch] = useReducer(
    editorReducer,
    // @ts-ignore
    initialState as ReducerState<EditorState>,
  );

  const handleTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SET_TITLE', text: event.target.value }),
    [],
  );

  const handleDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SET_DESCRIPTION', text: event.target.value }),
    [],
  );

  const handleBody = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      dispatch({ type: 'SET_BODY', text: event.target.value }),
    [],
  );

  const addTag = useCallback((tag: string) => dispatch({ type: 'ADD_TAG', tag }), []);

  const removeTag = useCallback((tag: string) => dispatch({ type: 'REMOVE_TAG', tag }), []);

  return { editorState, handleTitle, handleDescription, handleBody, addTag, removeTag };
};

export default useEditor;
