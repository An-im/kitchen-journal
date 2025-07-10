import { useState } from "react";

export default function RecipeForm() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    steps: "",
  });

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("g");
  const [ingredientsList, setIngredientsList] = useState([]);

  const addIngredient = () => {
    if (ingredientName && ingredientQty && ingredientUnit) {
      setIngredientsList([
        ...ingredientsList,
        { name: ingredientName, qty: ingredientQty, unit: ingredientUnit },
      ]);
      setIngredientName("");
      setIngredientQty("");
      setIngredientUnit("g");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      ...form,
      ingredients: ingredientsList,
    };
    const updated = [...recipes, recipe];
    setRecipes(updated);
    localStorage.setItem("recipes", JSON.stringify(updated));
    setForm({ name: "", steps: "" });
    setIngredientsList([]);
  };
  const removeIngredient = (indexToRemove) => {
  setIngredientsList((prev) =>
    prev.filter((_, i) => i !== indexToRemove)
  );
};


  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-brand mb-4">Add a Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre de la receta */}
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
          className="w-full p-3 border border-gray-300 rounded-xl"
          required
        />


        {/* Ingredientes */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="number"
            min="0"
            step="any"
            value={ingredientQty}
            onChange={(e) => setIngredientQty(e.target.value)}
            placeholder="Qty"
            className="w-1/4 p-2 border border-gray-300 rounded-xl"
          />


          <select
            value={ingredientUnit}
            onChange={(e) => setIngredientUnit(e.target.value)}
            className="w-[80px] p-2 border border-gray-300 rounded-xl bg-white"
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="unid">unid</option>
          </select>

          <input
            value={ingredientName}
            onChange={(e) =>
              setIngredientName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            placeholder="Ingredient"
            className="flex-1 p-2 border border-gray-300 rounded-xl"
          />


          <button
            type="button"
            onClick={addIngredient}
            className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center text-lg"
          >
            +
          </button>
        </div>

        {/* Lista de ingredientes agregados */}
        <ul className="text-sm text-gray-700 space-y-1">
          {ingredientsList.map((item, i) => (
            <li key={i} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg">
              <span>
                {item.qty} {item.unit} {item.name}
              </span>
              <button
                type="button"
                onClick={() => removeIngredient(i)}
                className="text-red-500 hover:text-red-700 text-sm ml-3"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>


        {/* Pasos de preparación */}
        <textarea
          name="steps"
          value={form.steps}
          onChange={(e) => {
            const lines = e.target.value.split("\n");
            const capitalized = lines.map((line) => {
              const trimmed = line.trimStart();
              return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
            });
            setForm({ ...form, steps: capitalized.join("\n") });
          }}
          placeholder="Steps (one per line)"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-xl"
          required
        />
        <button
          type="submit"
          className="bg-brand text-white px-5 py-2 rounded-xl shadow hover:bg-brand-light transition"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}
