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
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-brand text-center mb-8">
        Ingredients Needed
      </h2>

      {/* Botones de vista */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("all")}
          className={`px-5 py-2 rounded-full text-sm font-medium shadow transition ${
            view === "all"
              ? "bg-brand text-white"
              : "bg-gray-100 text-brand hover:bg-gray-200"
          }`}
        >
          All Ingredients
        </button>
        <button
          onClick={() => setView("byCategory")}
          className={`px-5 py-2 rounded-full text-sm font-medium shadow transition ${
            view === "byCategory"
              ? "bg-brand text-white"
              : "bg-gray-100 text-brand hover:bg-gray-200"
          }`}
        >
          By Section
        </button>
      </div>
        
      {/* Vista: Todos los ingredientes */}
      {view === "all" ? (
        allIngredients.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No ingredients needed yet.
          </p>
        ) : (
          <ul className="text-gray-800 text-sm space-y-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            {allIngredients.map((ing, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1"
              >
                <span className="capitalize">{ing.name}</span>
                <span className="ml-4 whitespace-nowrap font-medium">
                  {ing.qty} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        )
      ) : (
        // Vista por categoría
        Object.entries(ingredientsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-brand capitalize mb-3 border-b border-gray-200 pb-2">
              {category}
            </h3>
        
            {items.length > 0 ? (
              <ul className="text-gray-800 text-sm space-y-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                {items.map((ing, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1"
                  >
                    <span className="capitalize">{ing.name}</span>
                    <span className="ml-4 whitespace-nowrap font-medium">
                      {ing.qty} {ing.unit}
                    </span>
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
