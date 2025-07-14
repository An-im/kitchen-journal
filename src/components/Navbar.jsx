import { SECTIONS } from "../../constants";

export default function Navbar({ section, setSection }) {
  const tabs = [
    { name: SECTIONS.ADD, label: "Add Recipe" },
    { name: SECTIONS.LIST, label: "Recipes" },
    { name: SECTIONS.MENU, label: "Menu" },
    { name: SECTIONS.INGREDIENTS, label: "Ingredients" },
  ];

  return (
    <nav className="flex gap-4 justify-center mb-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setSection(tab.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition 
            ${section === tab.name
              ? "bg-brand text-white shadow"
              : "bg-brand-light text-brand hover:bg-brand"}`}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
