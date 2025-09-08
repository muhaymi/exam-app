import { createContext, useState, type ReactNode } from "react";
import { type Question } from "../services/gemini";

interface ExamContextType {
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  answers: Record<number, string>;
  setAnswers: (a: Record<number, string>) => void;
  result: { score: number; total: number } | null;
  setResult: (r: { score: number; total: number } | null) => void;
}

export const ExamContext = createContext<ExamContextType>({} as ExamContextType);

export const ExamProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(
    null
  );

  return (
    <ExamContext.Provider
      value={{ questions, setQuestions, answers, setAnswers, result, setResult }}
    >
      {children}
    </ExamContext.Provider>
  );
};
