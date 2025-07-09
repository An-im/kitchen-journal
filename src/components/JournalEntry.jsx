import { useState, useEffect } from "react";

export default function JournalEntry({ selectedMood }) {
  const today = new Date().toISOString().split("T")[0];
  const [entry, setEntry] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`journal-${today}`);
    if (saved) setEntry(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(`journal-${today}`, entry);
  }, [entry]);

  return (
    <div className="w-full mt-10">
      <label className="block mb-2 text-xl font-handwritten text-[#a17c6b]">
        Write from your heart:
      </label>
      <textarea
        rows="8"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Today I feel..."
        className="w-full p-5 rounded-xl border border-[#d2e8d4] bg-white font-handwritten text-lg text-[#7d7d7d] focus:outline-none focus:ring-2 focus:ring-[#d2e8d4] shadow-inner"
      ></textarea>
      {selectedMood && (
        <p className="mt-2 text-sm text-gray-500 italic">
          Entry saved with mood: <strong>{selectedMood.label}</strong>
        </p>
      )}
    </div>
  );
}
