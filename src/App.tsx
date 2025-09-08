import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamProvider } from "./context/ExamContext";
import Home from "./pages/Home";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
 
export default function App() {
  return (
    <ExamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </ExamProvider>
  );
}
