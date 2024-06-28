export function Meaning(props) {
  return (
    <div className="bg-slate-300 p-2 my-2 rounded-md">
      <h1 className="text-body-1">{props.meaning.partOfSpeech}</h1>

      <h3>synonyms: {props.meaning.synonyms.join(", ")}</h3>
      <h3>antonyms: {props.meaning.antonyms.join(", ")}</h3>
      <hr />
      <h2 className="text-body-2">Definitions</h2>
      {props.meaning.definitions.map((definition, index) => {
        return (
          <div key={index} className="bg-slate-200 rounded-md my-1 p-1">
            <p>{definition.definition}</p>
            <p className="ms-5"> Ex: {definition?.example}</p>
          </div>
        );
      })}
    </div>
  );
}
