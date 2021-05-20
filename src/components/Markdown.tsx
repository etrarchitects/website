import { useState } from "react";
import remark from "remark";
import html from "remark-html";

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function Markdown(props: {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [content, setContent] = useState<string | undefined>(undefined);
  if (content === undefined || content !== props.content)
    markdownToHtml(props.content).then(setContent);

  return (
    <div
      className={`markdown ${props.className}`}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: content ?? "" }}
    />
  );
}
