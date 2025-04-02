'use client';

interface PostContentProps {
  contentHtml: string;
}

export default function PostContent({ contentHtml }: PostContentProps) {
  return (
    <div className="prose lg:prose-xl prose-glamour dark:prose-invert max-w-none">
      <style jsx global>{`
        .prose-glamour h2 {
          color: rgb(192, 38, 211);
          font-family: var(--font-playfair);
        }
        .prose-glamour h3 {
          color: rgb(14, 165, 233);
          font-family: var(--font-playfair);
        }
        .prose-glamour a {
          color: rgb(255, 0, 127);
          text-decoration: none;
          font-weight: 500;
        }
        .prose-glamour a:hover {
          text-decoration: underline;
        }
        .prose-glamour code {
          background-color: rgba(255, 0, 127, 0.1);
          color: rgb(255, 0, 127);
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-weight: 500;
        }
        .prose-glamour blockquote {
          border-left-color: rgb(181, 126, 220);
          background-color: rgba(181, 126, 220, 0.1);
          padding: 1em;
          border-radius: 0.5em;
          font-style: italic;
        }
        .dark .prose-glamour h2 {
          color: rgb(216, 180, 254);
        }
        .dark .prose-glamour h3 {
          color: rgb(56, 189, 248);
        }
        .dark .prose-glamour a {
          color: rgb(240, 171, 252);
        }
        .dark .prose-glamour code {
          background-color: rgba(240, 171, 252, 0.1);
          color: rgb(240, 171, 252);
        }
        .dark .prose-glamour blockquote {
          border-left-color: rgb(192, 38, 211);
          background-color: rgba(192, 38, 211, 0.1);
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}