import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

import "./index.scss";

const remarkable = new Remarkable("full", {
  html: true,
  breaks: true,
  typographer: true,
}).use(linkify);

export default function MarkdownElement(props: { text: string }) {
  const { text = "" } = props;
  const html = remarkable.render(text);

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
