import { Button, Card } from "keep-react";
import { LineProgress } from "keep-react";
import { Trash, Swap } from "phosphor-react";
const ProgressBar = () => {
  return (
    <LineProgress progress={55} lineBg="bg-error-50" className="bg-error-500">
      <LineProgress.Text className="text-error-400 font-semibold">
        55/100
      </LineProgress.Text>
      <LineProgress.Text className="text-error-400 font-semibold">
        55%
      </LineProgress.Text>
    </LineProgress>
  );
};

export const PdfBook = () => {
  return (
    <Card className="m-2">
      <Card.Header>
        <img
          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg"
          alt="image"
          width={600}
          height={400}
        />
      </Card.Header>
      <Card.Content>
        <Card.Title className="font-Libre font-bold">The Alchemist</Card.Title>
        <Card.Title className="text-lg text-gray-500 font-semibold ">
          Paulo Coelho
        </Card.Title>

        <Card.Description>
          <p className="text-gray-600 font-sans">
            Combining magic, mysticism, wisdom, and wonder into an inspiring
            tale of self-discovery, The Alchemist has become a modern classic,
            selling millions of copies around the world and transforming the
            lives of countless readers across generations.
          </p>
          <ProgressBar />
        </Card.Description>
        <div className="flex 	">
          <Button size="sm" color="success" className="mt-2 flex-auto">
            Start Reading
          </Button>
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
