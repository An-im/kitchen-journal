import RecipeForm from "./RecipeForm";

export default function RecipeFormSection({ onSave, onUpdate, editRecipe, isEditing }) {
  return (
    <section className="mt-10">
      
      <RecipeForm
        onSave={onSave}
        onUpdate={onUpdate}
        editRecipe={editRecipe}
        isEditing={isEditing}
      />
    </section>
  );
}
