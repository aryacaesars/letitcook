import Image from "next/image"

export default function GuideCard({ title, description, image }) {
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
        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
          Read Guide
        </button>
      </div>
    </div>
  )
}
