import { useEffect, useState } from "react";
import Ingredients from "./components/Ingredients";
import SeasonalIngredients from "./components/SeasonalVeggies";
import Menus from "./components/Menus";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import RecipeFormSection from "./components/RecipeFormSection";
import RecipeListSection from "./components/RecipeListSection";
import { SECTIONS } from "../constants";

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem("recipes");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing recipes from localStorage:", error);
      return [];
    }
  });

  const [selectedMenu, setSelectedMenu] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedMenu");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing menu from localStorage:", error);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [section, setSection] = useState(SECTIONS.LIST);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("selectedMenu", JSON.stringify(selectedMenu));
  }, [selectedMenu]);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      createdAt: new Date().toISOString(),
    };
    setRecipes([newRecipe, ...recipes]); // 👈 lo agregamos al principio
  };


  const updateRecipe = (updatedRecipe) => {
    const updated = [...recipes];
    updated[editIndex] = updatedRecipe;
    setRecipes(updated);
    setEditIndex(null);
    setSection(SECTIONS.LIST); // 👈 Volver a la sección de recetas
  };

  const deleteRecipe = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    setRecipes((prev) => prev.filter((_, i) => i !== index));

    // Si se estaba editando esta receta, reseteamos
    if (editIndex === index) {
      setEditIndex(null);
    }

    // Limpiamos del menú cualquier índice inválido
    setSelectedMenu((prev) =>
      prev.filter((i) => i !== index && i < recipes.length)
    );
  };

  const handleEdit = (index) => {
    if (recipes[index]) {
      setEditIndex(index);
      setSection(SECTIONS.ADD);
    } else {
      console.warn("Invalid index for editing:", index);
    }
  };

  const currentRecipe = editIndex !== null && recipes[editIndex] ? recipes[editIndex] : null;

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center text-brand mb-8 mt-6">Kitchen Journal</h1>

      <Navbar section={section} setSection={setSection} />

      {section === SECTIONS.LIST && (
        <RecipeListSection
          recipes={recipes}
          onDelete={deleteRecipe}
          onEdit={handleEdit}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      )}

      {section === SECTIONS.ADD && (
        <RecipeFormSection
          onSave={addRecipe}
          onUpdate={updateRecipe}
          editRecipe={currentRecipe}
          isEditing={!!currentRecipe}
        />
      )}

      {section === SECTIONS.INGREDIENTS && (
        <>
          <Ingredients
            recipes={selectedMenu
              .map((index) => recipes[index])
              .filter(Boolean)}
          />
          <SeasonalIngredients />
        </>
      )}

      {section === SECTIONS.MENU && (
        <Menus
          recipes={recipes}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          goToRecipes={() => setSection(SECTIONS.LIST)}
        />
      )}
    </Layout>
  );
}
