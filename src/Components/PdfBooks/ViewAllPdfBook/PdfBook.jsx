import { Button, Card } from "keep-react";
import { LineProgress } from "keep-react";
import { Trash, Swap } from "phosphor-react";
import { Link } from "react-router-dom";

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
  return (
    <Card className="m-2">
      <Card.Header>
        <img
          src={pdfInfo.imageDetail.fileUrl}
          alt="image"
          width={600}
          height={400}
        />
      </Card.Header>
      <Card.Content>
        <Card.Title className="font-Libre font-bold">{pdfInfo.name}</Card.Title>
        <Card.Title className="text-lg text-gray-500 font-semibold ">
          {pdfInfo.writer}
        </Card.Title>

        <Card.Description>
          <p className="text-gray-600 font-sans">{pdfInfo.description}</p>
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
          >
            <Trash size={24} />{" "}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
