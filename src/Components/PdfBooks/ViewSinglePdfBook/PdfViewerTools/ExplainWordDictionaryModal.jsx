import { Button, Modal } from "keep-react";
import { useEffect, useState } from "react";

import { Skeleton } from "keep-react";
import toast, { Toaster } from "react-hot-toast";
import { Meaning } from "./Meaning";
import { WordPhonetics } from "./WordPhonetics";

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
                  <WordPhonetics phonetics={wordInformation[0].phonetics} />
                  {wordInformation[0].meanings.map((meaning) => (
                    <Meaning key={meaning.partOfSpeech} meaning={meaning} />
                  ))}
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
