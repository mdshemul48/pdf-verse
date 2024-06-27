import { Button, Modal } from "keep-react";
import { useEffect, useState } from "react";

import { Skeleton } from "keep-react";
import getPronunciationRegion from "../../../../utils/pronunciationRegion";
import toast, { Toaster } from "react-hot-toast";

export const SkeletonComponent = () => {
  return (
    <Skeleton className="max-w-xl space-y-2.5">
      <Skeleton.Line className="h-4 w-full" />
      <Skeleton.Line className="h-4 w-full" />
      <Skeleton.Line className="h-4 w-3/5" />
      <Skeleton.Line className="h-4 w-4/5" />
      <Skeleton.Line className="h-10 w-2/5" />
    </Skeleton>
  );
};

const ExplainWordDictionaryModal = ({ isOpen, closeModal, selectedWord }) => {
  const [wordInformation, setWordInformation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedWord != "") {
        setLoading(true);
        const fetchedData = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
        );
        if (fetchedData.status !== 404) {
          const data = await fetchedData.json();
          setWordInformation(data);
          setLoading(false);
        } else {
          closeModal();
          toast.error("We can't found this word.");
        }
      }
    };
    fetchData();
  }, [closeModal, selectedWord]);

  return (
    <>
      <Toaster />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Body className="space-y-3  sm:w-[60%] w-full">
          <Modal.Content>
            {loading || wordInformation == null ? (
              <SkeletonComponent />
            ) : (
              <div className="!mb-6">
                <h1 className="mb-1 text-body-1 font-semibold text-metal-900">
                  Define {"=>"} {`"`}
                  {selectedWord}
                  {`"`}
                </h1>
                <hr />
                <div className="overflow-y-auto scrollbar sm:w-full max-h-[32rem]">
                  <div className="my-2">
                    {wordInformation[0].phonetics.map((phonetic, index) => (
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
                        {phonetic.text} (
                        {getPronunciationRegion(phonetic?.audio)})
                      </button>
                    ))}
                  </div>
                  {wordInformation[0].meanings.map((meaning) => {
                    return (
                      <div
                        key={meaning.partOfSpeech}
                        className="bg-slate-300 p-2 my-2 rounded-md"
                      >
                        <h1 className="text-body-1">{meaning.partOfSpeech}</h1>

                        <h3>synonyms: {meaning.synonyms.join(", ")}</h3>
                        <h3>antonyms: {meaning.antonyms.join(", ")}</h3>
                        <hr />
                        <h2 className="text-body-2">Definitions</h2>
                        {meaning.definitions.map((definition, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-slate-200 rounded-md my-1 p-1"
                            >
                              <p>{definition.definition}</p>
                              <p className="ms-5"> Ex: {definition?.example}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}{" "}
          </Modal.Content>
          <Modal.Footer>
            <Button
              onClick={closeModal}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExplainWordDictionaryModal;
