export default function Menus({ recipes, selectedMenu, setSelectedMenu, goToRecipes }) {
  // 🔄 Filtrar recetas que están en el menú, usando id
  const currentMenu = recipes.filter((r) => selectedMenu.includes(r.id));

  const grouped = {
    starter: [],
    main: [],
    dessert: [],
  };

  for (const recipe of currentMenu) {
    const category = recipe.category?.toLowerCase();
    if (grouped[category]) {
      grouped[category].push(recipe);
    }
  }

  // ❌ Función para remover del menú (por ID)
  const removeFromMenu = (id) => {
    const confirmed = window.confirm("Do you want to remove this recipe from the current menu?");
    if (!confirmed) return;
    setSelectedMenu(selectedMenu.filter((i) => i !== id));
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-brand mb-6 text-center">
        Current Menu
      </h2>

      {Object.entries(grouped).map(([category, categoryRecipes]) =>
        categoryRecipes.length === 0 ? null : (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 capitalize border-b pb-1">
              {category}
            </h3>
            <ul className="space-y-2">
              {categoryRecipes.map((recipe) => (
                <li key={recipe.id} className="flex items-center justify-between">
                  <button
                    onClick={goToRecipes}
                    className="text-brand hover:underline text-left"
                  >
                    {recipe.name}
                  </button>
                  <button
                    onClick={() => removeFromMenu(recipe.id)}
                    className="text-red-500 text-sm hover:underline ml-4"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
