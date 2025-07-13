import { useEffect, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import Ingredients from "./components/Ingredients";
import SeasonalIngredients from "./components/SeasonalVeggies";
import Menus from "./components/Menus";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import RecipeFormSection from "./components/RecipeFormSection";
import RecipeListSection from "./components/RecipeListSection";

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });
  const goToRecipes = () => {
  setSection("Recipes");
  };

  const [editIndex, setEditIndex] = useState(null);
  const [section, setSection] = useState("Recipes"); 
  const [selectedMenu, setSelectedMenu] = useState([]);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

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
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center text-brand mb-8 mt-6">Kitchen Journal</h1>

      <Navbar section={section} setSection={setSection} /> {/* 👈 PASAR props */}

      {section === "Recipes" && (
        <RecipeListSection
          recipes={recipes}
          onDelete={deleteRecipe}
          onEdit={handleEdit}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      )}

      {section === "Add Recipe" && (
        <RecipeFormSection
          onSave={addRecipe}
          onUpdate={updateRecipe}
          editRecipe={editIndex !== null ? recipes[editIndex] : null}
          isEditing={editIndex !== null}
        />
      )}

      {section === "Ingredients" && (
        <>
          <Ingredients
            recipes={selectedMenu.map((index) => recipes[index]).filter(Boolean)}
          />
          <SeasonalIngredients />
        </>
      )}



      {section === "Menus" && (
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
