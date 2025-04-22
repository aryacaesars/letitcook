import Header from "@/components/Header"
import Footer from "@/components/Footer"
import RecipeCard from "@/components/RecipeCard"
import CategoryButton from "@/components/CategoryButton"

export default function Collection() {
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
    {
      title: "Chocolate Chip Cookies",
      description: "Delicious homemade chocolate chip cookies that are soft and chewy.",
      time: "25 mins",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Banana Bread",
      description: "Moist and delicious banana bread with a hint of cinnamon.",
      time: "60 mins",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      title: "Chocolate Lava Cake",
      description: "Decadent chocolate cake with a molten center.",
      time: "20 mins",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
  ]

  // Categories
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Meal", "Diet", "Vegan"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <CategoryButton key={index} category={category} active={category === "All"} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
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
      </main>

      <Footer />
    </div>
  )
}
