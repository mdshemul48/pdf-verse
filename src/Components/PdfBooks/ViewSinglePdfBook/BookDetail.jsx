import { CircleProgress, Typography } from "keep-react";

export const BookDetail = ({ currentPage, numberOfPage, pdfInfo }) => {
  return (
    <div className="mt-5 ms-5 lg:flex justify-between">
      <div className="flex-auto">
        <Typography
          variant="heading-3"
          className="font-Libre font-semibold text-slate-900 max-w-[75%]"
        >
          {pdfInfo.name}
        </Typography>
        <Typography variant="body-1" className="text-slate-600 w-[75%] my-2">
          {pdfInfo.description}
        </Typography>
        <Typography variant="body-3" className="text-slate-600 mt-2">
          By <span className="text-blue-600">{pdfInfo.writer}</span>
        </Typography>
      </div>
      <div className=" bg-gray-200 rounded-lg min-w-[265px] h-full">
        <img
          src={pdfInfo.imageDetail.fileUrl}
          alt="image"
          className="object-cover rounded-lg w-full"
        />
      </div>
      <div className="flex justify-center items-center lg:mt-0 mt-6 lg:ms-10 border-2 border-slate-400 rounded-md py-5 px-8">
        <CircleProgress
          progress={((currentPage / numberOfPage) * 100).toFixed(1)}
          size="2xl"
        >
          <CircleProgress.Text>
            {currentPage}/{numberOfPage} (
            {((currentPage / numberOfPage) * 100).toFixed(1)}%)
          </CircleProgress.Text>
        </CircleProgress>
      </div>
    </div>
  );
};
