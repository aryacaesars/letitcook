import Image from "next/image";

export default function TechniqueCard({ title, description, image, tips = [], link }) {
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
        <h4 className="mb-1 text-lg font-bold">{title}</h4>
        <p className="mb-3 text-sm text-gray-600">{description}</p>

        {tips.length > 0 && (
          <div className="mb-4">
            <h5 className="mb-2 font-medium text-orange-500">Pro Tips:</h5>
            <ul className="pl-5 space-y-1 text-sm text-gray-600 list-disc">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 text-center text-white transition-colors bg-orange-500 rounded hover:bg-orange-600"
          >
            Watch Tutorial
          </a>
        )}
      </div>
    </div>
  );
}