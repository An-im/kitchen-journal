export default function Navbar({ section, setSection }) {
  const tabs = [
    { name: "Recipes", icon: "📖" },
    { name: "Menus", icon: "🗓️" },
    { name: "Ingredients", icon: "🧺" },
  ];

  return (
    <nav className="flex gap-4 justify-center mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setSection(tab.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition 
            ${section === tab.name 
              ? "bg-brand text-white shadow" 
              : "bg-brand-light text-brand hover:bg-brand"}`}
        >
          <span>{tab.icon}</span>
          <span>{tab.name}</span>
        </button>
      ))}
    </nav>
  );
}
