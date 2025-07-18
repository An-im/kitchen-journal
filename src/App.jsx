import { useEffect, useState } from "react";
import Ingredients from "./components/Ingredients";
import SeasonalIngredients from "./components/SeasonalVeggies";
import Menus from "./components/Menus";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import RecipeFormSection from "./components/RecipeFormSection";
import RecipeListSection from "./components/RecipeListSection";
import { SECTIONS } from "../constants";
import { nanoid } from "nanoid"; // ✅ para crear IDs únicos

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

  const [editId, setEditId] = useState(null);
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
      id: nanoid(), // ✅ ID único
      createdAt: new Date().toISOString(),
    };
    setRecipes([newRecipe, ...recipes]); // agrega al inicio
  };

  const updateRecipe = (updatedRecipe) => {
    const updated = recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    setRecipes(updated);
    setEditId(null);
    setSection(SECTIONS.LIST);
  };

  const deleteRecipe = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setSelectedMenu((prev) => prev.filter((i) => i !== id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setSection(SECTIONS.ADD);
  };

  const currentRecipe = editId !== null ? recipes.find((r) => r.id === editId) : null;

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center text-brand mb-8 mt-6">
        Kitchen Journal
      </h1>

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
          isEditing={currentRecipe !== null}
        />
      )}

      {section === SECTIONS.INGREDIENTS && (
        <>
          <Ingredients
            recipes={recipes.filter((r) => selectedMenu.includes(r.id))}
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
