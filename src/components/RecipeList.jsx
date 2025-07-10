export default function RecipeList({ recipes, onDelete, onEdit }) {
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
              {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
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

            <div className="text-sm text-gray-600 whitespace-pre-line mb-3">
              <strong>Steps:</strong> {recipe.steps}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
