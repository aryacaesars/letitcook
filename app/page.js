import Image from "next/image"
import { Search } from "lucide-react"
import Footer from "@/components/Footer"
import RecipeCard from "@/components/RecipeCard"
import Header from "@/components/Header"

export default function Home() {
  // Recipe data
  const recipes = [
    {
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
      time: "25 mins",
      difficulty: "Medium",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Chicken Stir Fry",
      description: "A quick and healthy stir fry with chicken and colorful vegetables.",
      time: "20 mins",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Vegetable Curry",
      description: "A flavorful and aromatic vegetable curry that's perfect for a weeknight dinner.",
      time: "35 mins",
      difficulty: "Medium",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Classic Beef Burger",
      description: "Juicy homemade beef burgers with all the fixings.",
      time: "30 mins",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Mushroom Risotto",
      description: "Creamy Italian rice dish with mushrooms and parmesan.",
      time: "40 mins",
      difficulty: "Medium",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Greek Salad",
      description: "Fresh and healthy Greek salad with feta cheese and olives.",
      time: "15 mins",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
    <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-5xl font-bold mb-4">
            Let <span className="text-orange-500">IT</span> Cook
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find delicious recipes with ingredients you already have in your kitchen
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-2">
            <input
              type="text"
              placeholder="Enter ingredients you have (e.g. chicken, rice, onion)"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Separate ingredients with commas for better results</p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-50">
              <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
              Popular Ingredients
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50">
              <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
              Seasonal Recipes
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-50">
              <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
              Quick Meals
            </button>
          </div>

          {/* Food Images */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -left-4 -top-4 md:left-0 md:-top-16 w-1/3 md:w-2/5">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Burger"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -right-4 -top-4 md:right-0 md:-top-16 w-1/3 md:w-2/5">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Bowl"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="container mx-auto px-4 py-16 mt-24">
          <h3 className="text-2xl font-bold mb-8">Featured Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                description={recipe.description}
                time={recipe.time}
                difficulty={recipe.difficulty}
                image={recipe.image}
                featured={recipe.featured}
              />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-16 bg-white rounded-lg">
          <h3 className="text-2xl font-bold mb-12 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-orange-500">1</span>
              </div>
              <h4 className="text-lg font-bold mb-2">Enter Your Ingredients</h4>
              <p className="text-gray-600">Type in the ingredients you have available in your kitchen</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-orange-500">2</span>
              </div>
              <h4 className="text-lg font-bold mb-2">Discover Recipes</h4>
              <p className="text-gray-600">We'll show you recipes you can make with what you have</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-orange-500">3</span>
              </div>
              <h4 className="text-lg font-bold mb-2">Start Cooking</h4>
              <p className="text-gray-600">Follow the recipe and enjoy your homemade meal</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
