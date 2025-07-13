export default function Menus({ recipes, selectedMenu, setSelectedMenu, goToRecipes }) {
  const currentMenu = selectedMenu
    .map((index) => recipes[index])
    .filter(Boolean);

  const grouped = {
    starter: [],
    main: [],
    dessert: [],
  };

  for (const index of selectedMenu) {
    const recipe = recipes[index];
    if (!recipe) continue;
    const category = recipe.category?.toLowerCase();
    if (grouped[category]) {
      grouped[category].push({ ...recipe, index });
    }
  }

  const removeFromMenu = (index) => {
    const confirmed = window.confirm("Do you want to remove this recipe from the current menu?");
    if (!confirmed) return;
    setSelectedMenu(selectedMenu.filter((i) => i !== index));
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-brand mb-6 text-center">Current Menu</h2>

      {Object.entries(grouped).map(([category, recipes]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 capitalize border-b pb-1">
            {category}
          </h3>
          {recipes.length > 0 ? (
            <ul className="space-y-2">
              {recipes.map((recipe) => (
                <li key={recipe.index} className="flex items-center justify-between">
                  <button
                    onClick={goToRecipes}
                    className="text-brand hover:underline text-left"
                  >
                    {recipe.name}
                  </button>
                  <button
                    onClick={() => removeFromMenu(recipe.index)}
                    className="text-red-500 text-sm hover:underline ml-4"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No recipes added.</p>
          )}
        </div>
      ))}
    </div>
  );
}
