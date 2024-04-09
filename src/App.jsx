import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ViewAllPdfBook } from "./Components/PdfBooks/ViewAllPdfBook/ViewAllPdfBook.jsx";
import ViewSinglePdfBook from "./Components/PdfBooks/ViewSinglePdfBook/ViewSinglePdfBook.jsx";
import { NavbarComponent } from "./Components/Shared/Navbar/NavBar.jsx";
import { AddNewPdfBook } from "./Components/PdfBooks/AddNewPdfBook/AddNewPdfBook.jsx";

function App() {
  return (
    <>
      <NavbarComponent />
      <main>
        <div className="mt-2">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ViewAllPdfBook />} />
              <Route path="/read/:pdfId" element={<ViewSinglePdfBook />} />
              <Route path="/add-new-pdf" element={<AddNewPdfBook />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </>
  );
}

export default App;
