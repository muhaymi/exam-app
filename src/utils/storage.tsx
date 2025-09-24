export interface HistoryItem {
  date: string;
  score: number;
  total: number;
  kategori: string;
}

export const saveHistory = (item: HistoryItem) => {
  const data = localStorage.getItem("examHistory");
  const history: HistoryItem[] = data ? JSON.parse(data) : [];
  history.push(item);
  localStorage.setItem("examHistory", JSON.stringify(history));
};

export const getHistory = (): HistoryItem[] => {
  const data = localStorage.getItem("examHistory");
  return data ? JSON.parse(data) : [];
};
