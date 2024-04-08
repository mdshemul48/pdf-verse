import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SideBar } from "./Components/Shared/SideBar/SideBar.jsx";
import { ViewAllPdfBook } from "./Components/PdfBooks/ViewAllPdfBook/ViewAllPdfBook.jsx";

function App() {
  return (
    <>
      <main className="flex">
        <SideBar />
        <div className="ms-2 mt-2">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ViewAllPdfBook />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </>
  );
}

export default App;
