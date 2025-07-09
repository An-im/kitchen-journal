import { motion } from "framer-motion";

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😍", label: "Loved" },
];

export default function MoodSelector({ selectedMood, setSelectedMood }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-handwritten text-[#a17c6b]">How do you feel today?</h2>
      <div className="flex gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            onClick={() => setSelectedMood(mood)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            className={`text-4xl p-3 rounded-full border transition-all shadow-sm ${
              selectedMood?.label === mood.label
                ? "bg-[#d2e8d4] border-[#a17c6b]"
                : "bg-white border-gray-200 hover:bg-[#fef6e4]"
            }`}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
