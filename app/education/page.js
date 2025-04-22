import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TechniqueCard from "@/components/TechniqueCard"
import GuideCard from "@/components/GuideCard"

export default function Education() {
  // Cooking techniques data
  const techniques = [
    {
      title: "Sautéing",
      description: "A method of cooking food quickly in a small amount of fat over high heat.",
      image: "/placeholder.svg?height=200&width=400",
      tips: ["Use a wide, shallow pan for even cooking", "Heat the pan before adding oil", "Don't overcrowd the pan"],
    },
    {
      title: "Braising",
      description: "A combination cooking method that uses both wet and dry heat.",
      image: "/placeholder.svg?height=200&width=400",
      tips: [
        "Sear meat before braising for better flavor",
        "Keep the lid on the process - low and slow is key",
        "Use a heavy pot with a tight-fitting lid",
      ],
    },
    {
      title: "Roasting",
      description: "Cooking in an uncovered pan in the oven with dry heat.",
      image: "/placeholder.svg?height=200&width=400",
      tips: [
        "Preheat your oven completely",
        "Use a roasting rack to allow air circulation",
        "Let meat rest after roasting",
      ],
    },
  ]

  // Ingredient guides data
  const guides = [
    {
      title: "Herbs & Spices",
      description: "Learn how to use herbs and spices to enhance your cooking.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Vegetables",
      description: "A guide to selecting, storing, and preparing vegetables.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Proteins",
      description: "Everything you need to know about cooking with different proteins.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Cooking Education</h1>
          <p className="text-gray-600 mb-8">Learn cooking techniques and ingredient knowledge to improve your skills</p>

          <h2 className="text-2xl font-bold mb-6">Cooking Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {techniques.map((technique, index) => (
              <TechniqueCard
                key={index}
                title={technique.title}
                description={technique.description}
                image={technique.image}
                tips={technique.tips}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">Ingredient Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {guides.map((guide, index) => (
              <GuideCard key={index} title={guide.title} description={guide.description} image={guide.image} />
            ))}
          </div>

          {/* Duplicated guides to match the design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {guides.map((guide, index) => (
              <GuideCard
                key={`second-${index}`}
                title={guide.title}
                description={guide.description}
                image={guide.image}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <GuideCard
                key={`third-${index}`}
                title={guide.title}
                description={guide.description}
                image={guide.image}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
