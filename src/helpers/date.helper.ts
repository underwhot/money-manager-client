export const formatDate = (date: string) => {
  const data = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return data.toLocaleDateString("us-US", options as any);
};
