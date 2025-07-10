const veggiesByMonth = {
  july: ["Kale", "Peas", "Carrots", "Lettuce", "Radish"],
  august: ["Beets", "Zucchini", "Tomatoes", "Corn", "Green beans"],
  september: ["Pumpkin", "Leek", "Cabbage", "Sweet potato"],
  // ...podés seguir agregando
};

export default function SeasonalVeggies() {
  const month = new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();
  const veggies = veggiesByMonth[month] || [];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-handwritten text-[#a17c6b] mb-2">In Season this Month 🌿</h2>
      <ul className="flex flex-wrap gap-3 text-sm text-gray-700">
        {veggies.map((veg) => (
          <li
            key={veg}
            className="px-3 py-1 bg-[#d2e8d4] rounded-full font-medium shadow-sm"
          >
            {veg}
          </li>
        ))}
      </ul>
    </div>
  );
}
