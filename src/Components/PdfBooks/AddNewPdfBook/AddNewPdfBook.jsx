import {
  Breadcrumb,
  Button,
  Input,
  Label,
  Textarea,
  Typography,
  Upload,
} from "keep-react";
import { Info } from "phosphor-react";
import { useCallback, useState } from "react";
import folderIcon from "../../../assets/icons/folder.svg";

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>PDF Verse</Breadcrumb.Item>
      <Breadcrumb.Item activeType="base">Add New PDF</Breadcrumb.Item>
    </Breadcrumb>
  );
};

const PdfUpload = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  return (
    <Upload horizontal={true} options={{ onDrop }}>
      <Upload.Body>
        <Upload.Icon>
          <img src={folderIcon} alt="folder" height={28} width={28} />
        </Upload.Icon>
        <Upload.Text>
          <Typography
            variant="p"
            className="text-body-3 font-medium text-metal-600"
          >
            Choose File to Upload PDF
          </Typography>
          <Typography
            variant="p"
            className="text-body-4 font-normal text-metal-400"
          >
            PDF Only
          </Typography>
        </Upload.Text>
      </Upload.Body>
      <Upload.Footer isFileExists={files.length > 0}>
        <Typography
          variant="p"
          className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600"
        >
          <Info size={16} />
          Uploaded Files
        </Typography>
        <Typography variant="ul" className="space-y-1">
          {files?.map((file) => (
            <Upload.File onClick={() => setFiles([])} key={file?.name}>
              {file?.name}
            </Upload.File>
          ))}
        </Typography>
      </Upload.Footer>
    </Upload>
  );
};
const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  return (
    <Upload horizontal={true} options={{ onDrop }}>
      <Upload.Body>
        <Upload.Icon>
          <img src={folderIcon} alt="folder" height={28} width={28} />
        </Upload.Icon>
        <Upload.Text>
          <Typography
            variant="p"
            className="text-body-3 font-medium text-metal-600"
          >
            Choose File to Upload Picture
          </Typography>
          <Typography
            variant="p"
            className="text-body-4 font-normal text-metal-400"
          >
            Picture Only
          </Typography>
        </Upload.Text>
      </Upload.Body>
      <Upload.Footer isFileExists={files.length > 0}>
        <Typography
          variant="p"
          className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600"
        >
          <Info size={16} />
          Uploaded Files
        </Typography>
        <Typography variant="ul" className="space-y-1">
          {files?.map((file) => (
            <Upload.File onClick={() => setFiles([])} key={file?.name}>
              {file?.name}
            </Upload.File>
          ))}
        </Typography>
      </Upload.Footer>
    </Upload>
  );
};

export const AddNewPdfBook = () => {
  return (
    <form className="w-[75%] mx-auto">
      <BreadcrumbComponent />

      <div className="w-[75%] mt-5">
        <fieldset className="space-y-1.5 p-2">
          <Label htmlFor="name">Name*</Label>
          <Input id="name" placeholder="Enter Book Name" type="text" />
        </fieldset>

        <fieldset className="space-y-1.5 p-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea id="description" placeholder="Write Book Description" />
          <p className="text-body-4 font-normal text-metal-300">
            Description must be a at least 100 words.
          </p>
        </fieldset>
        <Label>Upload PDF & Cover Picture*</Label>
        <div className="flex justify-evenly mt-5 ">
          <PdfUpload />
          <ImageUpload />
        </div>

        <Button size="sm" color="success" className="mt-5">
          Submit
        </Button>
      </div>
    </form>
  );
};
