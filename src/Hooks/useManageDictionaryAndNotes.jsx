import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Position,
  PrimaryButton,
  Tooltip,
} from "@react-pdf-viewer/core";
import { highlightPlugin, MessageIcon } from "@react-pdf-viewer/highlight";
import { FaWpexplorer } from "react-icons/fa6";
import { Badge } from "keep-react";
import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const useManageDictionaryAndNotes = (bookId) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getNotesByBookId = async () => {
      // Create a reference to the "notes" collection
      const notesRef = collection(db, "notes");
      const q = query(notesRef, where("bookId", "==", bookId));
      const querySnapshot = await getDocs(q);

      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(
        notes.sort(
          (a, b) =>
            a.highlightAreas[0].pageIndex - b.highlightAreas[0].pageIndex
        )
      );
    };
    getNotesByBookId();
  }, [bookId]);

  const openWordDictionary = ({ selectedText }) => {
    setSelectedWord(selectedText);
    setIsOpen(true);
  };

  const tooltipPanel = (props) => {
    return (
      <div
        style={{
          background: "#eee",
          display: "flex",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          transform: "translate(0, 8px)",
          zIndex: 1,
        }}
      >
        <Tooltip
          position={Position.TopCenter}
          target={
            <Button onClick={() => openWordDictionary(props)}>
              <FaWpexplorer />
            </Button>
          }
          content={() => (
            <div style={{ width: "150px" }}>Explain this word</div>
          )}
          offset={{ left: 0, top: -8 }}
        />
        <div className="ms-1" />
        <Tooltip
          position={Position.TopCenter}
          target={
            <Button onClick={props.toggle}>
              <MessageIcon />
            </Button>
          }
          content={() => (
            <div style={{ width: "100px" }} className="ms-2">
              Add a note
            </div>
          )}
          offset={{ left: 0, top: -8 }}
        />
      </div>
    );
  };

  const renderHighlights = (props) => (
    <div>
      {notes.map((note) => (
        <Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: "yellow",
                    opacity: 0.4,
                  },
                  props.getCssProperties(area, props.rotation)
                )}
              />
            ))}
        </Fragment>
      ))}
    </div>
  );
  const showAddNotePanel = (props) => {
    const addNote = async () => {
      const note = {
        content: message,
        highlightAreas: props.highlightAreas,
        quote: props.selectedText,
        bookId,
      };

      await addDoc(collection(db, "notes"), note);
      setNotes(notes.concat([note]));
      setMessage("");
      props.cancel();
    };
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "2px",
          padding: "8px",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 1,
        }}
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Add</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  };

  const onNoteDeleteHandler = async (noteId) => {
    if (!confirm("Are you sure you want to delete this Note? ")) {
      return;
    }
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };
  const sidebarNotes = (
    <>
      <div
        style={{
          borderRight: "1px solid rgba(0, 0, 0, 0.3)",
          width: "100%",
          overflow: "auto",
        }}
      >
        {notes.length === 0 && (
          <div style={{ textAlign: "center" }}>There is no note</div>
        )}

        {notes.map((note) => {
          return (
            <div
              key={note.id}
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, .3)",
                cursor: "pointer",
                padding: "8px",
              }}
              onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
            >
              <blockquote
                style={{
                  borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
                  fontSize: ".75rem",
                  lineHeight: 1.5,
                  margin: "0 0 8px 0",
                  paddingLeft: "8px",
                  textAlign: "justify",
                }}
              >
                {note.quote} - {note.highlightAreas[0].pageIndex + 1}
              </blockquote>
              {note.content}{" "}
              <Badge
                className="mt-2"
                color="error"
                onClick={() => onNoteDeleteHandler(note.id)}
              >
                Delete
              </Badge>
            </div>
          );
        })}
      </div>
    </>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget: tooltipPanel,
    renderHighlightContent: showAddNotePanel,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  const closeModal = () => {
    setSelectedWord("");
    setIsOpen(false);
  };

  return {
    closeModal,
    sidebarNotes,
    selectedWord,
    isOpen,
    highlightPluginInstance,
  };
};

export default useManageDictionaryAndNotes;
