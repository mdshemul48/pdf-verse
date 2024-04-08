import { Breadcrumb } from "keep-react";
import { PdfBook } from "./PdfBook";

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Pdf Verse</Breadcrumb.Item>
      <Breadcrumb.Item activeType="base">Pdf Books</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export const ViewAllPdfBook = () => {
  return (
    <div className="w-100">
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
