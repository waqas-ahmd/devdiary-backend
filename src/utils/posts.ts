const removeTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const getReadingTime = (content: string): number => {
  const cleanContent = removeTags(content);
  return Math.ceil(cleanContent.split(" ").length / 200);
};
