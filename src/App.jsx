import { useState } from "react";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import SeasonalVeggies from "./components/SeasonalVeggies";
import Menus from "./components/Menus";
import Ingredients from "./components/Ingredients";

function App() {
  const [section, setSection] = useState("Recipes");

  return (
    <Layout>
      <h1 className="text-4xl font-handwritten text-center text-[#a17c6b] mb-4">
        Kitchen Journal
      </h1>

      <Navbar section={section} setSection={setSection} />

      {section === "Recipes" && (
        <>
          <SeasonalVeggies />
          <RecipeForm />
          <RecipeList />
        </>
      )}

      {section === "Menus" && <Menus />}
      {section === "Ingredients" && <Ingredients />}
    </Layout>
  );
}

export default App;
