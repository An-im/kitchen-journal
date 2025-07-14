export default function RecipeList({ recipes, onDelete, onEdit, selectedMenu, setSelectedMenu }) {
  const toggleMenu = (index) => {
    const isInMenu = selectedMenu.includes(index);

    const confirmed = window.confirm(
    isInMenu
    ? "Do you want to remove this recipe from the current menu?"
    : "Do you want to add this recipe to the current menu?"
    );

    if (!confirmed) return;

    if (isInMenu) {
      setSelectedMenu(selectedMenu.filter((i) => i !== index));
    } else {
      setSelectedMenu([...selectedMenu, index]);
    }
  };

  if (recipes.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500 italic">
        No recipes saved yet.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <ul className="grid md:grid-cols-2 gap-6">
        {recipes.map((recipe, index) => (
          <li
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-brand mb-2">{recipe.name}</h3>

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
                <p className="italic text-gray-400">Invalid ingredient format</p>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-2">
              <strong>Steps:</strong>
              <ol className="list-decimal ml-6 mt-1 space-y-1">
                {recipe.steps.split("\n").map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>


            <div className="flex gap-3 mt-3">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-600 hover:underline text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:underline text-sm"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => toggleMenu(index)}
                className="text-green-600 hover:underline text-sm"
              >
                {selectedMenu.includes(index) ? "✅ In the menu" : "➕ Add to menu"}
              </button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
