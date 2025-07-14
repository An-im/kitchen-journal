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
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [section, setSection] = useState(SECTIONS.LIST);
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const saved = localStorage.getItem("selectedMenu");
    return saved ? JSON.parse(saved) : [];
  });

  const goToRecipes = () => {
    setSection(SECTIONS.LIST);
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("selectedMenu", JSON.stringify(selectedMenu));
  }, [selectedMenu]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    const updated = [...recipes];
    updated[editIndex] = updatedRecipe;
    setRecipes(updated);
    setEditIndex(null);
  };

  const deleteRecipe = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      const filtered = recipes.filter((_, i) => i !== index);
      setRecipes(filtered);
      // también lo removemos del menú si está ahí
      setSelectedMenu((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setSection(SECTIONS.ADD);
  };

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
          editRecipe={editIndex !== null ? recipes[editIndex] : null}
          isEditing={editIndex !== null}
        />
      )}

      {section === SECTIONS.INGREDIENTS && (
        <>
          <Ingredients
            recipes={selectedMenu.map((index) => recipes[index]).filter(Boolean)}
          />
          <SeasonalIngredients />
        </>
      )}

      {section === SECTIONS.MENU && (
        <Menus
          recipes={recipes}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          goToRecipes={goToRecipes}
        />
      )}
    </Layout>
  );
}
