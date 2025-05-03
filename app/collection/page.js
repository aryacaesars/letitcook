'use client'

import RecipeCard from "@/components/RecipeCard"
import CategoryButton from "@/components/CategoryButton"
import { useState, useEffect } from "react"

export default function Collection() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Categories mapping to Spoonacular types
  const categories = [
    { name: "All", type: "main course" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
    { name: "Dessert", type: "dessert" }
  ]

  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/recipes?type=${selectedCategory.type}`)
        if (!response.ok) {
          throw new Error('Failed to fetch recipes')
        }
        const data = await response.json()
        setRecipes(data.results || [])
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching recipes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <CategoryButton 
                key={index} 
                category={category.name} 
                active={category.name === selectedCategory.name}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
          {loading ? (
            <div className="text-center py-8">Loading recipes...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.summary}
                  time={`${recipe.readyInMinutes} mins`}
                  difficulty={recipe.dishTypes?.[0] || "Medium"}
                  image={recipe.image}
                  featured={true}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
