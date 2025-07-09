import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import JournalEntry from "./components/JournalEntry";
import QuoteOfTheDay from "./components/QuoteOfTheDay";
import { useEffect } from "react";
import Timeline from "./components/Timeline";

function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    if (selectedMood) {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(`mood-${today}`, selectedMood.emoji);
    }
  }, [selectedMood]);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">Mood Journal</h1>
      <QuoteOfTheDay />
      <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
      <JournalEntry selectedMood={selectedMood} />
      <Timeline />

    </div>
  );
}

export default App;
