import Image from "next/image";

export default function GuideCard({ title, description, image, link }) {
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg?height=200&width=400"}
          alt={title}
          width={400}
          height={200}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-4">
        <h4 className="mb-2 text-xl font-bold text-gray-800">{title}</h4>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 text-sm font-semibold text-center text-white transition-colors bg-orange-500 rounded hover:bg-orange-600"
          >
            Watch Tutorial
          </a>
        )}
      </div>
    </div>
  );
}