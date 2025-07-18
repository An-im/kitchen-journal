import html2pdf from "html2pdf.js";

export default function RecipeList({ recipes, onDelete, onEdit, selectedMenu, setSelectedMenu }) {
  // Alternar recetas en el menú
  const toggleMenu = (id) => {
    const isInMenu = selectedMenu.includes(id);

    const confirmed = window.confirm(
      isInMenu
        ? "Do you want to remove this recipe from the current menu?"
        : "Do you want to add this recipe to the current menu?"
    );

    if (!confirmed) return;

    if (isInMenu) {
      setSelectedMenu(selectedMenu.filter((i) => i !== id));
    } else {
      setSelectedMenu([...selectedMenu, id]);
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
  const sortedRecipes = [...recipes].sort((a, b) => {
    const aInMenu = selectedMenu.includes(a.id);
    const bInMenu = selectedMenu.includes(b.id);

    if (aInMenu && !bInMenu) return -1;
    if (!aInMenu && bInMenu) return 1;

    const aDate = new Date(a.createdAt || 0);
    const bDate = new Date(b.createdAt || 0);
    return bDate - aDate;
  });

  // Descargar receta como PDF
  function downloadRecipeAsPDF(recipe) {
    const element = document.createElement("div");

    element.innerHTML = `
      <div style="
        font-family: 'Segoe UI', Tahoma, sans-serif;
        max-width: 700px;
        margin: 0 auto;
        padding: 24px;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
      ">
        <header style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #5b21b6; font-size: 32px; margin: 0;">
            ${recipe.name}
          </h1>
          <p style="color: #666; font-size: 16px; margin-top: 4px;">
            Category: <strong>${recipe.category}</strong>
          </p>
        </header>

        <section style="margin-bottom: 24px;">
          <h2 style="color: #333; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 6px;">
            Ingredients
          </h2>
          <ul style="margin-top: 12px; font-size: 14px; color: #444; line-height: 1.6;">
            ${recipe.ingredients
              .map((ing) => `<li>${ing.qty} ${ing.unit} ${ing.name}</li>`)
              .join("")}
          </ul>
        </section>

        <section>
          <h2 style="color: #333; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 6px;">
            Method
          </h2>
          <ol style="margin-top: 12px; font-size: 14px; color: #444; line-height: 1.8;">
            ${recipe.steps
              .split("\n")
              .map((step) => `<li>${step}</li>`)
              .join("")}
          </ol>
        </section>
      </div>
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
        {sortedRecipes.map((recipe) => {
          const realIndex = recipes.findIndex((r) => r.id === recipe.id);
          return (
            <li
              key={recipe.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-bold text-brand mb-1">{recipe.name}</h3>

              {recipe.createdAt && (
                <p className="text-xs text-gray-400 mb-2">
                  Created on: {new Date(recipe.createdAt).toLocaleString()}
                </p>
              )}

              <div className="text-sm text-gray-700 mb-4">
                <p className="font-medium text-gray-800 mb-1">Ingredients:</p>
                <ul className="list-disc ml-5 space-y-1">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.qty} {ing.unit} {ing.name}
                    </li>
                  ))}
                </ul>
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
                  onClick={() => onEdit(realIndex)}
                  className="text-blue-600 text-sm hover:text-blue-800 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(realIndex)}
                  className="text-red-500 text-sm hover:text-red-700 transition"
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => toggleMenu(recipe.id)}
                  className={`text-sm transition ${
                    selectedMenu.includes(recipe.id)
                      ? "text-green-600 hover:text-green-800"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {selectedMenu.includes(recipe.id)
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
          );
        })}
      </ul>
    </div>
  );
}
