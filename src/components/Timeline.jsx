import { useEffect, useState } from "react";

export default function Timeline() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith("journal-")) {
        const date = key.replace("journal-", "");
        const text = localStorage.getItem(key);
        const mood = localStorage.getItem(`mood-${date}`);
        storedEntries.push({ date, text, mood });
      }
    }

    const sorted = storedEntries.sort((a, b) => (a.date > b.date ? -1 : 1));
    setEntries(sorted);
  }, []);

  if (entries.length === 0) {
    return <p className="mt-10 text-gray-400 italic font-handwritten">No entries yet…</p>;
  }

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-handwritten text-[#a17c6b] mb-4">Past Entries</h2>
      <ul className="space-y-4">
        {entries.map(({ date, text, mood }) => (
          <li key={date} className="bg-white border border-[#f4e7d4] rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500 font-serif">
                {new Date(date).toDateString()}
              </p>
              {mood && <span className="text-2xl">{mood}</span>}
            </div>
            <p className="text-gray-700 text-sm font-serif whitespace-pre-line line-clamp-3">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
