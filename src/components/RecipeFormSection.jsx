import RecipeForm from "./RecipeForm";

export default function RecipeFormSection({ onSave, onUpdate, editRecipe, isEditing }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-brand mb-4">
        {isEditing ? "Edit Recipe" : "Add a New Recipe"}
      </h2>
      <RecipeForm
        onSave={onSave}
        onUpdate={onUpdate}
        editRecipe={editRecipe}
        isEditing={isEditing}
      />
    </section>
  );
}
