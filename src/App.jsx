import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ViewAllPdfBook } from "./Components/PdfBooks/ViewAllPdfBook/ViewAllPdfBook.jsx";
import ViewSinglePdfBook from "./Components/PdfBooks/ViewSinglePdfBook/ViewSinglePdfBook.jsx";
import { NavbarComponent } from "./Components/Shared/Navbar/NavBar.jsx";
import { AddNewPdfBook } from "./Components/PdfBooks/AddNewPdfBook/AddNewPdfBook.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import useAuth from "./Hooks/useAuth.js";

function App() {
  const { user } = useAuth();
  return !user.email ? (
    <LoginPage />
  ) : (
    <BrowserRouter>
      <NavbarComponent />
      <main>
        <div className="mt-2">
          <Routes>
            <Route path="/" element={<ViewAllPdfBook />} />
            <Route path="/read/:pdfId" element={<ViewSinglePdfBook />} />
            <Route path="/add-new-pdf" element={<AddNewPdfBook />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
