import { Typography, Upload } from "keep-react";
import { Info } from "phosphor-react";
import { useCallback } from "react";
import folderIcon from "../../../assets/icons/folder.svg";

export const PdfUpload = ({ file, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );
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
      <Upload.Footer isFileExists={file != null}>
        <Typography
          variant="p"
          className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600"
        >
          <Info size={16} />
          Uploaded Files
        </Typography>
        <Typography variant="ul" className="space-y-1">
          <Upload.File onClick={() => setFile(null)} key={file?.name}>
            {file?.name}
          </Upload.File>
        </Typography>
      </Upload.Footer>
    </Upload>
  );
};
