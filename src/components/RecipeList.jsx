import html2pdf from "html2pdf.js";

export default function RecipeList({ recipes, onDelete, onEdit, selectedMenu, setSelectedMenu }) {
  // Función para alternar recetas en el menú
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

  // Mostrar mensaje si no hay recetas
  if (recipes.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500 italic">
        No recipes saved yet.
      </p>
    );
  }

  // Ordenar recetas: primero las del menú, luego por fecha
  const sortedRecipes = [...recipes]
    .map((r, i) => ({ ...r, index: i }))
    .sort((a, b) => {
      const aInMenu = selectedMenu.includes(a.index);
      const bInMenu = selectedMenu.includes(b.index);

      if (aInMenu && !bInMenu) return -1;
      if (!aInMenu && bInMenu) return 1;

      const aDate = new Date(a.createdAt || 0);
      const bDate = new Date(b.createdAt || 0);
      return bDate - aDate;
    });

  // Descargar como PDF
  function downloadRecipeAsPDF(recipe) {
    const element = document.createElement("div");
    element.innerHTML = `
      <h1>${recipe.name}</h1>
      <h3>Category: ${recipe.category}</h3>
      <h4>Ingredients:</h4>
      <ul>
        ${recipe.ingredients.map(
          (ing) => `<li>${ing.qty} ${ing.unit} ${ing.name}</li>`
        ).join("")}
      </ul>
      <h4>Steps:</h4>
      <ol>
        ${recipe.steps.split("\n").map((step) => `<li>${step}</li>`).join("")}
      </ol>
    `;

    html2pdf()
      .set({
        margin: 10,
        filename: `${recipe.name}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  }

  return (
    <div className="mt-10">
      <ul className="grid md:grid-cols-2 gap-6">
        {sortedRecipes.map((recipe) => (
          <li
            key={recipe.index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-bold text-brand mb-1">{recipe.name}</h3>

            {recipe.createdAt && (
              <p className="text-xs text-gray-400 mb-2">
                Created on: {new Date(recipe.createdAt).toLocaleDateString()}
              </p>
            )}

            <div className="text-sm text-gray-700 mb-4">
              <p className="font-medium text-gray-800 mb-1">Ingredients:</p>
              {Array.isArray(recipe.ingredients) ? (
                <ul className="list-disc ml-5 space-y-1">
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

            <div className="text-sm text-gray-700 mb-4">
              <p className="font-medium text-gray-800 mb-1">Steps:</p>
              <ol className="list-decimal ml-6 space-y-1">
                {recipe.steps.split("\n").map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => onEdit(recipe.index)}
                className="text-blue-600 text-sm hover:text-blue-800 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(recipe.index)}
                className="text-red-500 text-sm hover:text-red-700 transition"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => toggleMenu(recipe.index)}
                className={`text-sm transition ${
                  selectedMenu.includes(recipe.index)
                    ? "text-green-600 hover:text-green-800"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {selectedMenu.includes(recipe.index)
                  ? "✅ In the menu"
                  : "➕ Add to menu"}
              </button>
              <button
                onClick={() => downloadRecipeAsPDF(recipe)}
                className="text-purple-600 hover:underline text-sm"
              >
                📄 Download PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
