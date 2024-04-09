import { Breadcrumb } from "keep-react";
import { PdfBook } from "./PdfBook";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>PDF Verse</Breadcrumb.Item>
      <Breadcrumb.Item activeType="base">PDF Books</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export const ViewAllPdfBook = () => {
  const [pdfBooks, setPdfBooks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "books"));

    const unSub = onSnapshot(q, (querySnapshot) => {
      let pdfFetchedData = [];
      querySnapshot.forEach((doc) => {
        pdfFetchedData.push({ ...doc.data(), id: doc.id });
      });
      setPdfBooks(pdfFetchedData);
    });
    return () => unSub();
  }, []);
  // console.log(pdfBooks);
  return (
    <div className="w-[75%] mx-auto">
      <BreadcrumbComponent />
      <div className="flex flex-wrap ">
        {pdfBooks.map((pdfBook) => (
          <PdfBook key={pdfBook.id} pdfInfo={pdfBook} />
        ))}

        {/* <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook />
        <PdfBook /> */}
      </div>
    </div>
  );
};
