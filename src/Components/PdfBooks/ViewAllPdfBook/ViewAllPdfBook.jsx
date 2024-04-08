import { Breadcrumb } from "keep-react";
import { PdfBook } from "./PdfBook";

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>PDF Verse</Breadcrumb.Item>
      <Breadcrumb.Item activeType="base">PDF Books</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export const ViewAllPdfBook = () => {
  return (
    <div className="w-[75%] mx-auto">
      <BreadcrumbComponent />
      <div className="flex flex-wrap ">
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
      </div>
    </div>
  );
};
