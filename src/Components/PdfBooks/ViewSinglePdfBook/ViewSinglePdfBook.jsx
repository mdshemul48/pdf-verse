import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

// Call the async function

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import { Breadcrumb, Divider } from "keep-react";
import { BookDetail } from "./BookDetail";
import { useEffect, useState } from "react";
import { PDFViewer } from "./PDFViewer";
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
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPage, setNumberOfPages] = useState(0);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({});
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageLabel, jumpToPage } = pageNavigationPluginInstance;

  useEffect(() => {
    if (
      currentPage != 0 &&
      numberOfPage != 0 &&
      !pageLoaded &&
      localStorage.getItem("bookPage")
    ) {
      jumpToPage(parseInt(localStorage.getItem("bookPage")) - 1);
      setPageLoaded(true);
    }
  }, [currentPage, jumpToPage, numberOfPage, pageLoaded]);

  useEffect(() => {
    if (currentPage != 0) {
      localStorage.setItem("bookPage", currentPage);
    }
  }, [currentPage]);

  return (
    <div>
      <div className="lg:w-[75%] mx-auto">
        <BreadcrumbComponent />
        <BookDetail currentPage={currentPage} numberOfPage={numberOfPage} />
      </div>
      <Divider className="my-2" />
      <PDFViewer
        CurrentPageLabel={CurrentPageLabel}
        setCurrentPage={setCurrentPage}
        setNumberOfPages={setNumberOfPages}
        defaultLayoutPluginInstance={defaultLayoutPluginInstance}
        pageNavigationPluginInstance={pageNavigationPluginInstance}
      />
    </div>
  );
};

export default ViewSinglePdfBook;
