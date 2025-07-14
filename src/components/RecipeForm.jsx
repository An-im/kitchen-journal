import { useState, useEffect } from "react";

export default function RecipeForm({ onSave, onUpdate, editRecipe, isEditing }) {
  const [form, setForm] = useState({ name: "", steps: "",category: "" });
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("g");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [stepsList, setStepsList] = useState([""]);

  useEffect(() => {
    if (editRecipe) {
      setForm({ 
        name: editRecipe.name, 
        steps: editRecipe.steps,
        category: editRecipe.category || ""  
      });
      setIngredientsList(editRecipe.ingredients || []);
      setStepsList(editRecipe.steps ? editRecipe.steps.split("\n") : [""]);
    }
  }, [editRecipe]);


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

  const removeIngredient = (indexToRemove) => {
    setIngredientsList((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Capitalizamos cada paso
  const formattedSteps = stepsList.map((step) => {
    const trimmed = step.trimStart();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  });

  const recipe = {
      ...form,
      ingredients: ingredientsList,
      steps: formattedSteps.join("\n"),
    };

    if (isEditing) {
      onUpdate(recipe);
    } else {
      onSave(recipe);
    }

    // Limpiar todos los campos
    setForm({ name: "", steps: "", category: "" });
    setIngredientsList([]);
    setIngredientName("");
    setIngredientQty("");
    setIngredientUnit("g");
    setStepsList([""]);
  };


  return (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold text-brand mb-4">
      {isEditing ? "Edit Recipe" : "Add a Recipe"}
    </h2>
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
        {/* Nombre del ingrediente (ahora primero) */}
        <input
          value={ingredientName}
          onChange={(e) =>
            setIngredientName(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addIngredient();
            }
          }}
          placeholder="Ingredient"
          className="flex-1 p-2 border border-gray-300 rounded-xl"
        />

        {/* Cantidad */}
        <input
          type="number"
          min="0"
          step="any"
          value={ingredientQty}
          onChange={(e) => setIngredientQty(e.target.value)}
          placeholder="Qty"
          className="w-1/4 p-2 border border-gray-300 rounded-xl"
        />

        {/* Unidad */}
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

        {/* Botón + */}
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
          <li
            key={i}
            className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
          >
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

      {/* Categoría */}
      <select
        value={form.category || ""}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value.toLowerCase(),
          })
        }
        required
        className="w-full p-3 border border-gray-300 rounded-xl"
      >
        <option value="">Select category</option>
        <option value="starter">Starter</option>
        <option value="main">Main</option>
        <option value="dessert">Dessert</option>
      </select>

      {/* Pasos */}
      <h3 className="text-lg font-semibold text-brand">Steps</h3>
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
            className="flex-1 p-2 border border-gray-300 rounded-xl"
            required
          />
          {stepsList.length > 1 && (
            <button
              type="button"
              onClick={() => {
                const updated = stepsList.filter((_, i) => i !== index);
                setStepsList(updated);
              }}
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


      {/* Botón de guardar o actualizar */}
      <button
        type="submit"
        className="bg-brand text-white px-5 py-2 rounded-xl shadow hover:bg-brand-light transition"
      >
        {isEditing ? "Update Recipe" : "Save Recipe"}
      </button>
    </form>
  </div>
);
}