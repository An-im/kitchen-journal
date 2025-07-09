import { useEffect, useState } from "react";

const quotes = [
  "Be kind to yourself. 🌱",
  "Every day is a fresh start. ☀️",
  "Feelings are valid. 💛",
  "Take a deep breath. 🌬️",
  "You’re doing your best. 🌸",
  "Let the light in. 🕊️",
  "Progress, not perfection. 🍃",
  "You are enough. 🫶",
];

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="mb-6 text-center text-xl font-handwritten text-[#a17c6b] bg-[#fef6e4] p-4 rounded-xl shadow-sm border border-[#f4e7d4] italic">
      {quote}
    </div>
  );
}

