export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#fef6e4] text-[#7d7d7d] font-sans px-4 py-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6">
        {children}
      </div>
    </div>
  );
}
