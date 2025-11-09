const removeTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const getReadingTime = (content: string): number => {
  const cleanContent = removeTags(content);
  return Math.ceil(cleanContent.split(" ").length / 200);
};

export const createHandle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
