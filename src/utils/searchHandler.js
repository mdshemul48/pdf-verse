export const searchIt = (searchTerm) => {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`;
  window.open(searchUrl, "_blank");
};
