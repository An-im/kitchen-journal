import { SECTIONS } from "../../constants";

export default function Navbar({ section, setSection }) {
  const tabs = [
    { name: SECTIONS.ADD, label: "Add Recipe" },
    { name: SECTIONS.LIST, label: "Recipes" },
    { name: SECTIONS.MENU, label: "Menu" },
    { name: SECTIONS.INGREDIENTS, label: "Ingredients" },
  ];

  return (
    <nav className="flex gap-3 justify-center mb-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setSection(tab.name)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 
            ${section === tab.name
              ? "bg-brand text-white shadow-md"
              : "bg-white text-brand border border-brand hover:bg-brand-light"}`}
        >
          {tab.label}
        </button>
      ))}
    </nav>

  );
}
