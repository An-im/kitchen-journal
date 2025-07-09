import { useState, useEffect } from "react";
import MoodSelector from "./components/MoodSelector";
import JournalEntry from "./components/JournalEntry";
import QuoteOfTheDay from "./components/QuoteOfTheDay";
import Timeline from "./components/Timeline";
import Layout from "./components/Layout";
import Divider from "./components/Divider"; // ✅

function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    if (selectedMood) {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(`mood-${today}`, selectedMood.emoji);
    }
  }, [selectedMood]);

  return (
    <Layout>
      <h1 className="text-4xl font-handwritten text-center text-[#a17c6b] mb-6">
        Mood Journal
      </h1>

      <Divider icon="🌸" />
      <QuoteOfTheDay />

      <Divider icon="🌿" />
      <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />

      <Divider icon="🖊️" />
      <JournalEntry selectedMood={selectedMood} />

      <Divider icon="📖" />
      <Timeline />
    </Layout>
  );
}

export default App;
