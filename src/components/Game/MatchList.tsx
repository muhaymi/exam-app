interface MatchListProps {
  items: MatchItem[];
}

export default function MatchList({ items }: MatchListProps) {
  if (items.length === 0) {
    return <p>Belum ada pasangan yang ditemukan.</p>;
  }

  return (
    <div
      className="max-h-40 overflow-y-auto pr-2"
      style={{ scrollbarWidth: "thin" }}
    >
      {items.map((item, idx) => (
        <details key={idx} className="mb-2 border rounded p-2">
          <summary className="cursor-pointer">
            {item.emoji} {item.name}
          </summary>
          <p className="text-sm text-gray-700 mt-1">{item.info}</p>
        </details>
      ))}
    </div>
  );
}
