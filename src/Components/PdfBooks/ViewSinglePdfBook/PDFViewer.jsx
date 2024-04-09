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
          "https://firebasestorage.googleapis.com/v0/b/pdf-verse-books.appspot.com/o/3a32cbfe-24e9-4b2b-bf6b-1910d50fbae2.pdf?alt=media&token=9b40a434-6ffd-46c5-a7e4-7e633fb78a7c"
        }
        plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
      />
    </div>
  );
};
