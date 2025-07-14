export default function Menus({ recipes, selectedMenu, setSelectedMenu, goToRecipes }) {
  const currentMenu = selectedMenu
    .map((index) => ({ ...recipes[index], index }))
    .filter((recipe) => recipe && recipe.category);
console.log("🔍 Recipes used in Menu:", currentMenu);

  const grouped = {
    starter: [],
    main: [],
    dessert: [],
  };

  for (const recipe of currentMenu) {
      console.log("🔁 Recipe:", recipe);
  console.log("📂 Category:", recipe.category);
    const category = recipe.category.toLowerCase();
    if (grouped[category]) {
      grouped[category].push(recipe);
    }
  }

  const removeFromMenu = (index) => {
    const confirmed = window.confirm("Do you want to remove this recipe from the current menu?");
    if (!confirmed) return;
    setSelectedMenu(selectedMenu.filter((i) => i !== index));
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
          </div>
        )
      )}
    </div>
  );
}
