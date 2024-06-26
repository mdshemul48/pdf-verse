import { Viewer } from "@react-pdf-viewer/core";

export const PDFViewer = ({
  CurrentPageLabel,
  onPageChangeHandler,
  onZoomChangeHandler,
  setNumberOfPages,
  defaultLayoutPluginInstance,
  pageNavigationPluginInstance,
  pdfInfo,
}) => {
  return (
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
        plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
        onZoom={onZoomChangeHandler}
      />
    </div>
  );
};
