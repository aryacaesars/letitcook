"use client";

import { useState } from "react";
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Footer from "@/components/Footer"
import RecipeCard from "@/components/RecipeCard"
import Header from "@/components/Header"
import { searchRecipesByIngredients, getRecipeInformation } from "@/lib/spoonacular";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter some ingredients");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearchAttempted(true);
    
    try {
      const ingredients = searchQuery.split(",").map(ing => ing.trim()).join(",");
      console.log('Searching for recipes with ingredients:', ingredients);
      
      const results = await searchRecipesByIngredients(ingredients);
      
      if (!results || results.length === 0) {
        setError("No recipes found with these ingredients. Try different ingredients.");
        setRecipes([]);
        return;
      }
      
      console.log('Found recipes:', results);
      
      // Fetch detailed information for each recipe
      const detailedRecipes = await Promise.all(
        results.map(async (recipe) => {
          try {
            const recipeId = recipe.id;
            console.log('Fetching details for recipe ID:', recipeId);
            
            const details = await getRecipeInformation(recipeId);
            console.log('Received details for recipe ID:', recipeId, details);
            
            return {
              id: recipeId,
              title: details.title || recipe.title,
              image: details.image || recipe.image,
              readyInMinutes: details.readyInMinutes,
              servings: details.servings,
              sourceUrl: details.sourceUrl,
              summary: details.summary,
              usedIngredients: recipe.usedIngredients,
              missedIngredients: recipe.missedIngredients
            };
          } catch (err) {
            console.error('Error fetching details for recipe:', recipe.id, err);
            return null;
          }
        })
      );
      
      // Filter out any failed recipe fetches
      const validRecipes = detailedRecipes.filter(recipe => recipe !== null);
      
      if (validRecipes.length === 0) {
        setError("Failed to load recipe details. Please try again.");
        setRecipes([]);
        return;
      }
      
      setRecipes(validRecipes);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || "Failed to search for recipes");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter ingredients you have (e.g. chicken, rice, onion)"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 relative z-10 bg-white/80 backdrop-blur-sm"
              disabled={loading}
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 disabled:bg-orange-300 z-10"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Separate ingredients with commas for better results</p>

          {/* Food Images */}
          <div className="relative max-w-4xl mx-auto -mt-16 md:-mt-24">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 0.8 }}
              transition={{ 
                type: "tween",
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ opacity: 1 }}
              className="absolute left-0 top-0 w-1/3 md:w-1/4 blur-[1px] hover:blur-none transition-all duration-300"
            >
              <Image
                src="/burger.png"
                alt="Burger"
                width={250}
                height={250}
                className="w-full h-auto"
                priority
              />
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 0.8 }}
              transition={{ 
                type: "tween",
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ opacity: 1 }}
              className="absolute right-0 top-0 w-1/3 md:w-1/4 blur-[1px] hover:blur-none transition-all duration-300"
            >
              <Image
                src="/salad.png"
                alt="Bowl"
                width={250}
                height={250}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching for recipes...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <div className="bg-red-50 text-red-500 p-4 rounded-lg max-w-md mx-auto">
                {error}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {!loading && searchAttempted && recipes.length === 0 && !error && (
            <div className="text-center py-8">
              <div className="bg-gray-50 text-gray-600 p-4 rounded-lg max-w-md mx-auto">
                No recipes found. Try different ingredients.
              </div>
            </div>
          )}

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
        </section>

        {/* Featured Recipes */}
        {recipes.length > 0 && (
          <section className="container mx-auto px-4 py-16 mt-24">
            <h3 className="text-2xl font-bold mb-8">Found Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => {
                console.log('Rendering RecipeCard with ID:', recipe.id);
                return (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    description={recipe.summary}
                    time={`${recipe.readyInMinutes} mins`}
                    difficulty={`${recipe.servings} servings`}
                    image={recipe.image}
                    featured={true}
                    usedIngredients={recipe.usedIngredients}
                    missedIngredients={recipe.missedIngredients}
                  />
                );
              })}
            </div>
          </section>
        )}

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
