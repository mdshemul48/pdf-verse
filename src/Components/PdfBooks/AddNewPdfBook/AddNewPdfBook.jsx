import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

import { Breadcrumb, Button, Input, Label, Textarea } from "keep-react";
import { db, storage } from "../../../firebase/firebaseConfig";
import { ImageUpload } from "./ImageUpload";
import { PdfUpload } from "./PdfUpload";
import pdfPagesCount from "../../../utils/pdfPagesCount";

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>PDF Verse</Breadcrumb.Item>
      <Breadcrumb.Item activeType="base">Add New PDF</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export const AddNewPdfBook = () => {
  const [pdfName, setPdfName] = useState("");
  const [pdfDescription, setPdfDescription] = useState("");
  const [pdfWriterName, setPdfWriterName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  const uploadFile = async (file) => {
    const filename = `${uuid()}.${file.type.split("/")[1]}`;
    const dop = ref(storage, filename);
    const data = await uploadBytes(dop, file);
    const fileUrl = await getDownloadURL(data.ref);
    return { filename, fileUrl };
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!pictureFile && !pdfFile) return;
    const pdfPages = await pdfPagesCount(pdfFile);

    await addDoc(collection(db, "books"), {
      name: pdfName,
      writer: pdfWriterName,
      imageDetail: await uploadFile(pictureFile),
      pdfDetail: await uploadFile(pdfFile),
      description: pdfDescription,
      currentPage: 1,
      totalPage: pdfPages,
    });
  };
  return (
    <form onSubmit={onSubmitHandler} className="w-[75%] mx-auto">
      <BreadcrumbComponent />

      <div className="w-[75%] mt-5">
        <fieldset className="space-y-1.5 p-2">
          <Label htmlFor="name">Name*</Label>
          <Input
            id="name"
            placeholder="Enter Book Name"
            type="text"
            onChange={(event) => setPdfName(event.target.value)}
          />
        </fieldset>
        <fieldset className="space-y-1.5 p-2">
          <Label htmlFor="w-name">Writer Name*</Label>
          <Input
            id="w-name"
            placeholder="Enter Writer Name"
            type="text"
            onChange={(event) => setPdfWriterName(event.target.value)}
          />
        </fieldset>

        <fieldset className="space-y-1.5 p-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            placeholder="Write Book Description"
            onChange={(event) => setPdfDescription(event.target.value)}
          />
          <p className="text-body-4 font-normal text-metal-300">
            Description must be a at least 100 words.
          </p>
        </fieldset>
        <Label>Upload PDF & Cover Picture*</Label>
        <div className="flex justify-evenly mt-5 ">
          <PdfUpload setFile={setPdfFile} file={pdfFile} />
          <ImageUpload setFile={setPictureFile} file={pictureFile} />
        </div>

        <Button size="sm" color="success" className="mt-5">
          Submit
        </Button>
      </div>
    </form>
  );
};
