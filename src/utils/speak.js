export const sayIt = (sentence) => {
  const voices = window.speechSynthesis.getVoices();
  let desiredVoice = null;
  const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
  const isChrome = navigator.userAgent.indexOf("Chrome") !== -1 && !isEdge;

  if (isChrome) {
    desiredVoice =
      voices.find((voice) => voice.name === "Google UK English Female") ||
      voices.find((voice) => voice.name === "Google US English Female");
  } else if (isEdge) {
    desiredVoice =
      voices.find(
        (voice) =>
          voice.name ===
          "Microsoft Sonia Online (Natural) - English (United Kingdom)"
      ) ||
      voices.find(
        (voice) =>
          voice.name ===
          "Microsoft Libby Online (Natural) - English (United Kingdom)"
      );
  }

  const utterance = new SpeechSynthesisUtterance(sentence);

  if (desiredVoice) {
    utterance.voice = desiredVoice;
  }

  window.speechSynthesis.speak(utterance);
};
