import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamProvider } from "./context/ExamContext";
import Homes from "./pages/Homes";
// import Home from "./pages/Home";
// import Sidebar from "./components/Sidebar";
import History from "./pages/History";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import GenerateExam from "./pages/GenerateExam";
import GameWrapper from "./components/GameWrapper";
 
export default function App() {
  return (
    <ExamProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Homes />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/generate" element={<GenerateExam />} />
          <Route path="/game" element={<GameWrapper />} />
        </Routes>
      </BrowserRouter>
    </ExamProvider>
  );
}
