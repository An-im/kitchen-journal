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
    <div className="mt-4 p-4 bg-white border border-pink-200 rounded-xl shadow text-center max-w-md text-gray-600 italic text-lg">
      {quote}
    </div>
  );
}
