import getPronunciationRegion from "../../../../utils/pronunciationRegion";

export function WordPhonetics(props) {
  return (
    <div className="my-2">
      {props.phonetics.map((phonetic, index) => (
        <button
          className={`${
            phonetic?.audio ? "bg-cyan-200" : "bg-slate-300"
          } py-1 px-2 mx-1 text-slate-700 font-semibold rounded-md`}
          key={index}
          onClick={() => {
            const audio = new Audio(phonetic.audio);
            audio.play();
          }}
          title={phonetic?.audio ? "Click to play audio" : null}
        >
          {phonetic.text} ({getPronunciationRegion(phonetic?.audio)})
        </button>
      ))}
    </div>
  );
}
