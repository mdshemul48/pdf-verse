import { CircleProgress, Typography } from "keep-react";

export const BookDetail = ({ currentPage, numberOfPage }) => {
  return (
    <div className="mt-5 ms-5 lg:flex justify-between">
      <div>
        <Typography
          variant="heading-3"
          className="font-Libre font-semibold text-slate-900"
        >
          The Alchemist
        </Typography>
        <Typography variant="body-1" className="text-slate-600 w-[75%] my-2">
          Combining magic, mysticism, wisdom, and wonder into an inspiring tale
          of self-discovery, The Alchemist has become a modern classic, selling
          millions of copies around the world and transforming the lives of
          countless readers across generations.
        </Typography>
        <Typography variant="body-3" className="text-slate-600 mt-2">
          By <span className="text-blue-600">Paulo Coelho</span>
        </Typography>
      </div>
      <div>
        <img
          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg"
          alt="image"
          className="lg:mt-0 mt-5 rounded-lg lg:w-[500px] w-full"
        />
      </div>
      <div className="flex justify-center items-center lg:mt-0 mt-6 lg:ms-10 border-2 border-slate-400 rounded-md p-5">
        <CircleProgress progress={55} size="2xl">
          <CircleProgress.Text>
            {currentPage}/{numberOfPage} (
            {((currentPage / numberOfPage) * 100).toFixed(1)}%)
          </CircleProgress.Text>
        </CircleProgress>
      </div>
    </div>
  );
};