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
        fileUrl={
          "https://firebasestorage.googleapis.com/v0/b/pdf-verse-books.appspot.com/o/681728d3-489a-4634-baea-539365989661.pdf?alt=media&token=4c981463-67f4-4ee6-a0e7-446bafb69ebe"
        }
        plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
      />
    </div>
  );
};
