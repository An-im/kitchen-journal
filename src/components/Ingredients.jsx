import { useEffect, useState } from "react";

export default function Ingredients({ recipes }) {
  const [view, setView] = useState("all");
  const [allIngredients, setAllIngredients] = useState([]);
  const [ingredientsByCategory, setIngredientsByCategory] = useState({
    starter: [],
    main: [],
    dessert: [],
  });

  useEffect(() => {
    const flatIngredients = recipes.flatMap((r) => ({
      ingredients: r.ingredients || [],
      category: r.category?.toLowerCase() || "",
    }));

    // Agrupar TODOS los ingredientes
    const groupedAll = {};
    for (const { ingredients } of flatIngredients) {
      for (const ing of ingredients) {
        const key = `${ing.name.toLowerCase()}|${ing.unit}`;
        if (groupedAll[key]) {
          const prev = parseFloat(groupedAll[key].qty);
          const curr = parseFloat(ing.qty);
          groupedAll[key].qty = (!isNaN(prev) && !isNaN(curr))
            ? (prev + curr).toString()
            : `${groupedAll[key].qty}, ${ing.qty}`;
        } else {
          groupedAll[key] = { ...ing };
        }
      }
    }

    setAllIngredients(
      Object.values(groupedAll).sort((a, b) => a.name.localeCompare(b.name))
    );

    // Agrupar POR CATEGORÍA
    const groupedByCat = { starter: {}, main: {}, dessert: {} };
    for (const { ingredients, category } of flatIngredients) {
      if (!groupedByCat[category]) continue;

      for (const ing of ingredients) {
        const key = `${ing.name.toLowerCase()}|${ing.unit}`;
        if (groupedByCat[category][key]) {
          const prev = parseFloat(groupedByCat[category][key].qty);
          const curr = parseFloat(ing.qty);
          groupedByCat[category][key].qty = (!isNaN(prev) && !isNaN(curr))
            ? (prev + curr).toString()
            : `${groupedByCat[category][key].qty}, ${ing.qty}`;
        } else {
          groupedByCat[category][key] = { ...ing };
        }
      }
    }

    const cleanedByCat = {};
    for (const cat in groupedByCat) {
      cleanedByCat[cat] = Object.values(groupedByCat[cat]).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setIngredientsByCategory(cleanedByCat);
  }, [recipes]);

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-brand mb-4 text-center">
        Ingredients
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("all")}
          className={`px-4 py-2 rounded-full text-sm ${
            view === "all"
              ? "bg-brand text-white"
              : "bg-gray-100 text-brand"
          }`}
        >
          All Ingredients
        </button>
        <button
          onClick={() => setView("byCategory")}
          className={`px-4 py-2 rounded-full text-sm ${
            view === "byCategory"
              ? "bg-brand text-white"
              : "bg-gray-100 text-brand"
          }`}
        >
          By Section
        </button>
      </div>

      {view === "all" ? (
        allIngredients.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No ingredients needed yet.
          </p>
        ) : (
          <ul className="text-gray-700 text-sm space-y-2">
            {allIngredients.map((ing, i) => (
              <li key={i}>
                {ing.qty} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
        )
      ) : (
        Object.entries(ingredientsByCategory).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold text-brand capitalize mb-2 border-b pb-1">
              {category}
            </h3>
            {items.length > 0 ? (
              <ul className="text-gray-700 text-sm space-y-1">
                {items.map((ing, i) => (
                  <li key={i}>
                    {ing.qty} {ing.unit} {ing.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-gray-400">No ingredients</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
