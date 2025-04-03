'use client';

interface PostContentProps {
  contentHtml: string;
}

export default function PostContent({ contentHtml }: PostContentProps) {
  return (
    <div className="post-content">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}