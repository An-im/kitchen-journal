import { useEffect, useState } from "react";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) {
      const recipes = JSON.parse(saved);

      // Extraer todos los ingredientes (evita errores)
      const allIngredients = recipes.flatMap((recipe) =>
        Array.isArray(recipe.ingredients) ? recipe.ingredients : []
      );

      // Agrupar por nombre + unidad
      const grouped = {};
      for (const ing of allIngredients) {
        const key = `${ing.name.toLowerCase()}|${ing.unit}`;
        if (grouped[key]) {
          // Intentamos sumar cantidades si son números
          const prevQty = parseFloat(grouped[key].qty);
          const newQty = parseFloat(ing.qty);
          if (!isNaN(prevQty) && !isNaN(newQty)) {
            grouped[key].qty = (prevQty + newQty).toString();
          } else {
            // Si no se puede sumar, lo dejamos como texto sin sumar
            grouped[key].qty = `${grouped[key].qty}, ${ing.qty}`;
          }
        } else {
          grouped[key] = { ...ing };
        }
      }
      const list = Object.values(grouped).sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setIngredients(list);
    }
  }, []);

  if (ingredients.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500 italic">
        No ingredients found.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-brand mb-4">Ingredients List</h2>
      <ul className="space-y-2">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm"
          >
            {ing.qty} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
