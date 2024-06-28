import { openFullScreen } from "../../../utils/screenManage";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { updateDoc, getDoc, doc } from "firebase/firestore";

import { Breadcrumb, Divider } from "keep-react";
import { BookDetail } from "./BookDetail";
import { useCallback, useEffect, useState } from "react";
import { PDFViewer } from "./PDFViewer";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>PDF Verse</Breadcrumb.Item>
      <Breadcrumb.Item>PDF Books</Breadcrumb.Item>
      <Breadcrumb.Item activeType="base">The Alchemist</Breadcrumb.Item>
    </Breadcrumb>
  );
};

const ViewSinglePdfBook = () => {
  const { pdfId } = useParams();
  const [pdfInfo, setPdfInfo] = useState(null);

  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPage, setNumberOfPages] = useState(0);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({});
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageLabel, jumpToPage } = pageNavigationPluginInstance;

  useEffect(() => {
    const fetch = async () => {
      const data = await getDoc(doc(db, "books", pdfId));
      setPdfInfo({ ...data.data(), id: doc.id });
    };
    fetch();
  }, [pdfId]);

  useEffect(() => {
    if (numberOfPage !== 0 && !pageLoaded && pdfInfo) {
      jumpToPage(pdfInfo.currentPage - 1);
      setPageLoaded(true);
    }
  }, [jumpToPage, numberOfPage, pageLoaded, pdfInfo]);

  const onPageChangeHandler = useCallback(
    async (updatedPageNumber) => {
      setCurrentPage(updatedPageNumber);
      if (pageLoaded) {
        await updateDoc(doc(db, "books", pdfId), {
          currentPage: updatedPageNumber,
        });
      }
    },
    [pageLoaded, pdfId]
  );

  const onZoomChangeHandler = async (event) => {
    await updateDoc(doc(db, "books", pdfId), {
      zoomLevel: event.scale,
    });
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key === "F" || event.key === "f") && event.shiftKey) {
        openFullScreen();
        window.scrollTo(0, document.body.scrollHeight);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    pdfInfo && (
      <div>
        <div className="lg:w-[75%] mx-auto">
          <BreadcrumbComponent />
          <BookDetail
            currentPage={currentPage}
            numberOfPage={numberOfPage}
            pdfInfo={pdfInfo}
          />
        </div>
        <Divider className="my-2" />
        <PDFViewer
          pdfInfo={pdfInfo}
          CurrentPageLabel={CurrentPageLabel}
          setCurrentPage={setCurrentPage}
          setNumberOfPages={setNumberOfPages}
          defaultLayoutPluginInstance={defaultLayoutPluginInstance}
          pageNavigationPluginInstance={pageNavigationPluginInstance}
          onPageChangeHandler={onPageChangeHandler}
          onZoomChangeHandler={onZoomChangeHandler}
        />
      </div>
    )
  );
};

export default ViewSinglePdfBook;
