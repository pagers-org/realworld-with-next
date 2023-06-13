import rehypeRaw from 'rehype-raw';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownProps = {
  content: string;
};

const Markdown = ({ content }: MarkdownProps) => (
  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
);

export default memo(Markdown);
