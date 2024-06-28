import { Viewer } from "@react-pdf-viewer/core";
import { MessageIcon } from "@react-pdf-viewer/highlight";

import ExplainWordDictionaryModal from "./PdfViewerTools/ExplainWordDictionaryModal";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import useManageDictionaryAndNotes from "../../../Hooks/useManageDictionaryAndNotes";

export const PDFViewer = ({
  CurrentPageLabel,
  onPageChangeHandler,
  onZoomChangeHandler,
  setNumberOfPages,
  pageNavigationPluginInstance,
  pdfInfo,
}) => {
  const {
    closeModal,
    sidebarNotes,
    selectedWord,
    isOpen,
    highlightPluginInstance,
  } = useManageDictionaryAndNotes(pdfInfo.id);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      defaultTabs.concat({
        content: sidebarNotes,
        icon: <MessageIcon />,
        title: "Notes",
      }),
  });

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
