export type BlogAuthor = {
  id: string;
  name: string;
  url: string;
  image?: string;
  role?: string;
};

export const blogAuthors = {
  kyle: {
    id: "kyle",
    name: "Kyle Kelley",
    url: "https://github.com/rgbkrk",
    image: "https://github.com/rgbkrk.png",
    role: "Project Jupyter and nteract contributor",
  },
} as const satisfies Record<string, BlogAuthor>;

export type BlogAuthorId = keyof typeof blogAuthors;

export function resolveBlogAuthors(
  authorIds: string[],
  sourceLabel: string,
): BlogAuthor[] {
  return authorIds.map((id) => {
    const author = (blogAuthors as Record<string, BlogAuthor | undefined>)[id];

    if (!author) {
      throw new Error(`Unknown blog author "${id}" in ${sourceLabel}`);
    }

    return author;
  });
}

function formatNameList(names: string[]) {
  if (names.length === 0) {
    return "";
  }

  if (names.length === 1) {
    return names[0];
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export function formatAuthorNames(authors: BlogAuthor[]) {
  return formatNameList(authors.map((author) => author.name));
}
