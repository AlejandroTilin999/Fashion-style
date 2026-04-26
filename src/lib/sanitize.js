import DOMPurify from "dompurify";

export function sanitizeText(input) {
  return DOMPurify.sanitize(String(input ?? ""), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

