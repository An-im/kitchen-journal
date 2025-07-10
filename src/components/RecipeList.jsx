import { useEffect, useState } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  const handleDelete = (indexToRemove) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      const updated = recipes.filter((_, i) => i !== indexToRemove);
      setRecipes(updated);
      localStorage.setItem("recipes", JSON.stringify(updated));
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  }, []);

  if (recipes.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500 italic">
        No recipes saved yet.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-brand mb-4">Saved Recipes</h2>
      <ul className="grid md:grid-cols-2 gap-6">
        {recipes.map((recipe, index) => (
          <li
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-brand mb-2">
              {recipe.name}
            </h3>

            <div className="text-sm text-gray-600 mb-2">
              <strong>Ingredients:</strong>
              {Array.isArray(recipe.ingredients) ? (
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.qty} {ing.unit} {ing.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-gray-400">No ingredients listed</p>
              )}
            </div>


            <div className="text-sm text-gray-600 mb-2">
              <strong>Steps:</strong>
              <ol className="list-decimal ml-5 mt-1 space-y-1">
                {recipe.steps
                  .split("\n")
                  .filter((step) => step.trim() !== "")
                  .map((step, i) => (
                    <li key={i}>
                      {step.trim().charAt(0).toUpperCase() + step.trim().slice(1)}
                    </li>
                  ))}
              </ol>
            </div>


            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
