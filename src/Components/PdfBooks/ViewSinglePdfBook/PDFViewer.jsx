import { Viewer } from "@react-pdf-viewer/core";

export const PDFViewer = ({
  CurrentPageLabel,
  onPageChangeHandler,
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
        defaultScale={1.6}
        fileUrl={pdfInfo.pdfDetail.fileUrl}
        plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
      />
    </div>
  );
};
