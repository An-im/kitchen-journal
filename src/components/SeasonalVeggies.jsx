const veggiesByMonth = {
  january: ["Leek", "Kale", "Brussels sprouts", "Cabbage", "Parsnips"],
  february: ["Leek", "Cabbage", "Parsnips", "Swede", "Jerusalem artichoke"],
  march: ["Spring greens", "Purple sprouting broccoli", "Leek", "Spinach"],
  april: ["Asparagus", "Radish", "Spring onion", "Spinach", "Lettuce"],
  may: ["Asparagus", "New potatoes", "Radish", "Peas", "Lettuce"],
  june: ["Peas", "Broad beans", "Carrots", "Beetroot", "Courgettes"],
  july: ["Kale", "Peas", "Carrots", "Lettuce", "Radish"],
  august: ["Beetroot", "Zucchini", "Tomatoes", "Corn", "Green beans"],
  september: ["Pumpkin", "Leek", "Cabbage", "Sweet potato", "Tomatoes"],
  october: ["Squash", "Pumpkin", "Leek", "Cabbage", "Parsnips"],
  november: ["Brussels sprouts", "Swede", "Parsnips", "Kale", "Celeriac"],
  december: ["Brussels sprouts", "Cabbage", "Leek", "Parsnips", "Kale"],
};

export default function SeasonalVeggies() {
  const month = new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();
  const veggies = veggiesByMonth[month] || [];

  return (
    <div className="mt-10 px-6 py-8 bg-[#fefcf7] border border-[#e6dfd7] rounded-2xl shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#a17c6b] mb-6 text-center border-b border-[#e6dfd7] pb-2">
        In Season – {month.charAt(0).toUpperCase() + month.slice(1)}
      </h2  >
    
      {veggies.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-3 text-sm text-[#374151] font-medium">
          {veggies.map((veg) => (
            <li
              key={veg}
              className="px-4 py-1.5 bg-[#e3f2e7] rounded-full border border-[#c8e2d3] hover:bg-[#d3ebdd] transition shadow-sm"
            >
              {veg}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic mt-2">
          No data available for this month.
        </p>
      )}
    </div>

  );
}
