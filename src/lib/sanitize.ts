import DOMPurify from "dompurify";

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") {
    // DOMPurify needs a DOM; on the server, skip sanitizing here and only
    // render this on the client, OR use isomorphic-dompurify instead — see note below
    return html;
  }
  return DOMPurify.sanitize(html);
}
