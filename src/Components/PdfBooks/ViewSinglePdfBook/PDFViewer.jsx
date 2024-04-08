import { Viewer } from "@react-pdf-viewer/core";

export const PDFViewer = ({
  CurrentPageLabel,
  setCurrentPage,
  setNumberOfPages,
  defaultLayoutPluginInstance,
  pageNavigationPluginInstance,
}) => {
  return (
    <div style={{ height: "100vh" }} className="h-[100vh]">
      <CurrentPageLabel>
        {(props) => {
          setCurrentPage(props.currentPage + 1);
          setNumberOfPages(props.numberOfPages);
          return null;
        }}
      </CurrentPageLabel>
      <Viewer
        theme={"dark"}
        defaultScale={1.7}
        fileUrl={"/src/assets/test2.pdf"}
        plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
      />
    </div>
  );
};
