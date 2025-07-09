import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😍", label: "In Love" },
];

export default function MoodSelector({ selectedMood, setSelectedMood }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold text-gray-700">How are you feeling today?</h2>
      <div className="flex gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedMood(mood)}
            className={`text-3xl p-2 rounded-full transition-all ${
              selectedMood?.label === mood.label
                ? "bg-pink-300 shadow-md"
                : "hover:bg-pink-100"
            }`}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
