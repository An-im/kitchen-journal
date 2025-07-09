import { useState, useEffect } from "react";

export default function JournalEntry({ selectedMood }) {
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const [entry, setEntry] = useState("");

  // Cargar entrada guardada si existe
  useEffect(() => {
    const saved = localStorage.getItem(`journal-${today}`);
    if (saved) {
      setEntry(saved);
    }
  }, []);

  // Guardar en localStorage cada vez que se modifica
  useEffect(() => {
    localStorage.setItem(`journal-${today}`, entry);
  }, [entry]);

  return (
    <div className="w-full max-w-xl mt-8">
      <label htmlFor="entry" className="block mb-2 text-lg font-serif text-gray-700">
        Journal Entry
      </label>
      <textarea
        id="entry"
        rows="8"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write about your day..."
        className="w-full p-4 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 font-serif bg-white text-gray-800"
      ></textarea>
      {selectedMood && (
        <p className="mt-2 text-sm text-gray-500">
          Entry saved with mood: <strong>{selectedMood.label}</strong>
        </p>
      )}
    </div>
  );
}
