export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#2d2d2d] font-sans px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        {children}
      </div>
    </div>
  );
}
