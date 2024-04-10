import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { Button, Card } from "keep-react";
import { LineProgress } from "keep-react";
import { Trash, Swap } from "phosphor-react";
import { Link } from "react-router-dom";
import { db, storage } from "../../../firebase/firebaseConfig";

const ProgressBar = ({ pdfInfo }) => {
  return (
    <LineProgress
      progress={((pdfInfo.currentPage / pdfInfo.totalPage) * 100).toFixed(1)}
      lineBg="bg-error-50"
      className="bg-error-500"
    >
      <LineProgress.Text className="text-error-400 font-semibold">
        {pdfInfo.currentPage}/{pdfInfo.totalPage}
      </LineProgress.Text>
      <LineProgress.Text className="text-error-400 font-semibold">
        {((pdfInfo.currentPage / pdfInfo.totalPage) * 100).toFixed(1)}%
      </LineProgress.Text>
    </LineProgress>
  );
};

export const PdfBook = ({ pdfInfo }) => {
  const onDeleteHandler = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const pdfObj = doc(db, "books", pdfInfo.id);
      const pdfData = (await getDoc(pdfObj)).data();

      await deleteObject(ref(storage, pdfData.imageDetail.filename));
      await deleteObject(ref(storage, pdfData.pdfDetail.filename));
      await deleteDoc(pdfObj);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Card className="m-2">
      <Card.Header>
        <div className="relative overflow-hidden bg-gray-200 rounded-lg">
          <img
            src={pdfInfo.imageDetail.fileUrl}
            alt="image"
            className="object-cover h-[500px]"
          />
        </div>
      </Card.Header>
      <Card.Content>
        <Card.Title className="font-Libre font-bold">{pdfInfo.name}</Card.Title>
        <Card.Title className="text-lg text-gray-500 font-semibold ">
          {pdfInfo.writer}
        </Card.Title>

        <Card.Description>
          <p className="text-gray-600 font-sans">
            {pdfInfo.description.slice(0, 300)}...
          </p>
          <ProgressBar pdfInfo={pdfInfo} />
        </Card.Description>
        <div className="flex">
          <Link to={`/read/${pdfInfo.id}`}>
            <Button size="sm" color="success" className="mt-2 flex-auto">
              Start Reading
            </Button>
          </Link>
          <Button
            size="sm"
            color="warning"
            variant="outline"
            className="mt-2 ms-1 p-2"
            title="Update"
          >
            <Swap size={24} />{" "}
          </Button>
          <Button
            size="sm"
            color="error"
            variant="outline"
            className="mt-2 ms-1 p-2"
            title="delete"
            onClick={onDeleteHandler}
          >
            <Trash size={24} />{" "}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
