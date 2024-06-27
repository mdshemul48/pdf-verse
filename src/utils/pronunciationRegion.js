const getPronunciationRegion = (url) => {
  if (url.includes("-us.")) {
    return "US";
  } else if (url.includes("-uk.")) {
    return "UK";
  } else if (url.includes("-au.")) {
    return "AU";
  } else {
    return "Unknown";
  }
};

export default getPronunciationRegion;
