import { useState } from "react";

export default function RecipeForm({
  onSave,
  onUpdate,
  editRecipe,
  isEditing,
}) {
  const [form, setForm] = useState({
    name: editRecipe?.name || "",
    category: editRecipe?.category || "",
  });

  const [stepsList, setStepsList] = useState(editRecipe?.steps?.split("\n") || [""]);
  const [ingredientsList, setIngredientsList] = useState(editRecipe?.ingredients || []);
  const [ingredientInput, setIngredientInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  const recipeData = {
    id: editRecipe?.id || undefined,
    createdAt: editRecipe?.createdAt || new Date().toISOString(),
    name: form.name.trim(),
    category: form.category,
    ingredients: ingredientsList,
    steps: stepsList.join("\n"),
  };


    isEditing ? onUpdate(recipeData) : onSave(recipeData);

    // Reset form if adding new recipe
    if (!isEditing) {
      setForm({ name: "", category: "" });
      setIngredientsList([]);
      setStepsList([""]);
    }
  };

  const addIngredientFromText = () => {
    const regex = /^(\d+(?:[.,]?\d+)?)\s*(\w+)?\s+(.*)$/i;
    const match = ingredientInput.trim().match(regex);

    if (!match) {
      alert("Please enter ingredient like: 200 g flour");
      return;
    }

    const [, qty, unit = "unit", name] = match;

    setIngredientsList([
      ...ingredientsList,
      {
        qty,
        unit,
        name: name.charAt(0).toUpperCase() + name.slice(1),
      },
    ]);

    setIngredientInput("");
  };

  const removeIngredient = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {form.name ? "Recipe: " + form.name : "Recipe Form"}
        </h2>

        {/* Recipe Name */}
        <input
          name="name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            })
          }
          placeholder="Recipe name"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:outline-none"
          required
        />

        {/* Ingredient input */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            💡 Tip: try to use the same unit for each ingredient to avoid duplicates. 
            <br />
          </p       >

          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addIngredientFromText();
                }
              }} 
              placeholder="e.g. 200 g flour"
              className="flex-1 p-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:outline-none"
            />
            <button
              type="button"
              onClick={addIngredientFromText}
              className="bg-brand text-white px-3 rounded-xl hover:bg-brand/90 transition"
            >
              +
            </button>
          </div>
        </div>


        {/* Ingredient list */}
        <ul className="space-y-1">
          {ingredientsList.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
            >
              <span className="text-sm text-gray-700">
                {item.qty} {item.unit} {item.name}
              </span>
              <button
                type="button"
                onClick={() => removeIngredient(i)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Category */}
        <select
          value={form.category || ""}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value.toLowerCase(),
            })
          }
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="starter">Starter</option>
          <option value="main">Main</option>
          <option value="dessert">Dessert</option>
        </select>

        {/* Steps */}
        <div>
          <h3 className="text-lg font-semibold text-brand mb-2">Steps</h3>
          {stepsList.map((step, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <span className="text-gray-600 font-medium">{index + 1}.</span>
              <input
                type="text"
                value={step}
                onChange={(e) => {
                  const newSteps = [...stepsList];
                  newSteps[index] = e.target.value;
                  setStepsList(newSteps);
                }}
                placeholder={`Step ${index + 1}`}
                className="flex-1 p-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:outline-none"
                required
              />
              {stepsList.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setStepsList(stepsList.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setStepsList([...stepsList, ""])}
            className="mt-2 text-sm text-green-600 hover:underline"
          >
            ➕ Add Step
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
        >
          {isEditing ? "Update Recipe" : "Save Recipe"}
        </button>
      </form>
    </div>
  );
}
