import Image from "next/image"

export default function RecipeCard({ title, description, time, difficulty, image, featured = false }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg?height=200&width=400"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">Featured</span>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {time}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {difficulty}
          </div>
        </div>
        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  )
}
