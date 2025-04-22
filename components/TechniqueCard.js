import Image from "next/image"

export default function TechniqueCard({ title, description, image, tips = [] }) {
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
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {tips.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium mb-2">Pro Tips:</h5>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
          Watch Tutorial
        </button>
      </div>
    </div>
  )
}
