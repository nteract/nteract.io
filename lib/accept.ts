type AcceptEntry = {
  type: string;
  q: number;
};

function parseAcceptHeader(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const [typePart, ...params] = raw.split(";").map((part) => part.trim());
      let q = 1;
      for (const param of params) {
        const [key, value] = param.split("=").map((part) => part.trim());
        if (key === "q") {
          const parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) {
            q = parsed;
          }
        }
      }
      return { type: typePart.toLowerCase(), q };
    });
}

export function prefersMarkdown(
  header: string | null | undefined,
): boolean {
  if (!header) return false;

  const entries = parseAcceptHeader(header);
  if (entries.length === 0) return false;

  const markdown = entries.find((entry) => entry.type === "text/markdown");
  if (!markdown) return false;

  const html = entries.find((entry) => entry.type === "text/html");
  if (!html) return true;

  return markdown.q >= html.q;
}
