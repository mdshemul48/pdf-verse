import { Viewer } from "@react-pdf-viewer/core";
import { highlightPlugin } from "@react-pdf-viewer/highlight";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import ExplainToolTip from "./PdfViewerTools/ExplainToolTip";
import { useState } from "react";
import ExplainWordDictionaryModal from "./PdfViewerTools/ExplainWordDictionaryModal";

export const PDFViewer = ({
  CurrentPageLabel,
  onPageChangeHandler,
  onZoomChangeHandler,
  setNumberOfPages,
  defaultLayoutPluginInstance,
  pageNavigationPluginInstance,
  pdfInfo,
}) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const explainWordDictionary = (props) => {
    const { selectedText } = props;

    setSelectedWord(selectedText);
    setIsOpen(true);
    props.cancel();
  };

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget: ExplainToolTip,
    renderHighlightContent: explainWordDictionary,
  });

  const closeModal = () => {
    setSelectedWord("");
    setIsOpen(false);
  };

  return (
    <>
      <ExplainWordDictionaryModal
        selectedWord={selectedWord}
        isOpen={isOpen}
        closeModal={closeModal}
      />{" "}
      <div style={{ height: "100vh" }} className="h-[100vh]">
        <CurrentPageLabel>
          {(props) => {
            onPageChangeHandler(props.currentPage + 1);
            setNumberOfPages(props.numberOfPages);
            return null;
          }}
        </CurrentPageLabel>
        <Viewer
          theme={"dark"}
          defaultScale={pdfInfo.zoomLevel || 1.5}
          fileUrl={pdfInfo.pdfDetail.fileUrl}
          plugins={[
            defaultLayoutPluginInstance,
            pageNavigationPluginInstance,
            highlightPluginInstance,
          ]}
          onZoom={onZoomChangeHandler}
        />
      </div>
    </>
  );
};
