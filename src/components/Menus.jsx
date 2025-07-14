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
    <div className="mt-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-brand mb-8 text-center">
        Current Menu
      </h2>

      {Object.entries(grouped).map(([category, categoryRecipes]) =>
        categoryRecipes.length === 0 ? null : (
          <div key={category} className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 capitalize border-b border-gray-200 pb-2">
              {category}
            </h3>
        
            <ul className="space-y-3">
              {categoryRecipes.map((recipe) => (
                <li
                  key={recipe.index}
                  className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <button
                    onClick={goToRecipes}
                    className="text-lg font-semibold text-brand hover:underline text-left"
                  >
                    {recipe.name}
                  </button>

                  <button
                    onClick={() => removeFromMenu(recipe.index)}
                    className="text-red-500 text-sm hover:text-red-700 transition ml-4"
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
