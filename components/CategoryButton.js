export default function CategoryButton({ category, active = false }) {
  return (
    <button
      className={`px-4 py-2 rounded-full transition-colors ${
        active
          ? "bg-orange-500 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:border-orange-500 hover:text-orange-500"
      }`}
    >
      {category}
    </button>
  )
}
