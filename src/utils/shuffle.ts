export function shuffleArray(array: FruitCard[]): FruitCard[] {
  return [...array]
    .sort(() => Math.random() - 0.5)
    .map((item, index) => ({ ...item, uniqueId: index }));
}
