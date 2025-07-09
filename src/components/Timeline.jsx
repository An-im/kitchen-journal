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

        // Buscar si hay un mood guardado
        const mood = localStorage.getItem(`mood-${date}`);
        storedEntries.push({ date, text, mood });
      }
    }

    const sorted = storedEntries.sort((a, b) => (a.date > b.date ? -1 : 1));
    setEntries(sorted);
  }, []);

  if (entries.length === 0) {
    return <p className="mt-10 text-gray-400 italic">No entries yet...</p>;
  }

  return (
    <div className="mt-12 w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-pink-600">Past Entries</h2>
      <ul className="space-y-4">
        {entries.map(({ date, text, mood }) => (
          <li key={date} className="bg-white p-4 rounded-xl border border-pink-200 shadow">
            <p className="text-sm text-gray-500 mb-1">{new Date(date).toDateString()}</p>
            {mood && <span className="text-xl">{mood}</span>}
            <p className="text-gray-700 mt-2 line-clamp-2">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
