import RecipeList from "./RecipeList";

export default function RecipeListSection({ recipes, onDelete, onEdit, selectedMenu, setSelectedMenu }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-brand mb-4">Saved Recipes</h2>
      <RecipeList
        recipes={recipes}
        onDelete={onDelete}
        onEdit={onEdit}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    </section>
  );
}
