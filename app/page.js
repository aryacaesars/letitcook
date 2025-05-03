"use client";

import { useState, useEffect } from "react";
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import RecipeCard from "@/components/RecipeCard"
import { searchRecipesByIngredients, getRecipeInformation } from "@/lib/spoonacular";
import HowItWorks from "@/components/HowItWorks"
import SearchBar from "@/components/SearchBar";
import commonIngredientsData from "@/lib/commonIngredients.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [enteredIngredients, setEnteredIngredients] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Gunakan data dari JSON
  const commonIngredients = commonIngredientsData.ingredients;

  // Reset selected index when recommendations change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [recommendations]);

  // Filter recommendations based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = commonIngredients
        .filter(ingredient => typeof ingredient === "string" && ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
      setRecommendations(filtered.slice(0, 5));
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  }, [searchQuery]);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        const newIngredient = searchQuery.trim();
        if (!enteredIngredients.includes(newIngredient)) {
          setEnteredIngredients([...enteredIngredients, newIngredient]);
        }
        setSearchQuery("");
        setShowRecommendations(false);
      }
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setEnteredIngredients(enteredIngredients.filter(ing => ing !== ingredientToRemove));
  };

  const clearAllIngredients = () => {
    setEnteredIngredients([]);
    setSearchQuery("");
    setError(null);
    setRecipes([]);
    setSearchAttempted(false);
  };

  const handleSearch = async () => {
    if (enteredIngredients.length === 0) {
      setError("Please enter some ingredients");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearchAttempted(true);
    
    try {
      const ingredients = enteredIngredients.join(",");
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

  // Tambahkan useEffect untuk navigasi
  useEffect(() => {
    if (!loading && recipes.length > 0) {
      const searchResultsSection = document.getElementById("search-results");
      if (searchResultsSection) {
        searchResultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loading, recipes]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-5xl font-bold mb-4">
            Let <span className="text-orange-500">IT</span> Cook
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find delicious recipes with ingredients you already have in your kitchen
          </p>

          {/* Search Bar and Images */}
          <div className="relative max-w-7xl mx-auto mb-2 flex items-center gap-4">
            {/* Food Images */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 0.8 }}
              transition={{ 
                type: "tween",
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ opacity: 1 }}
              className="w-1/4 blur-[1px] hover:blur-none transition-all duration-300"
            >
              <Image
                src="/burger.png"
                alt="Burger"
                width={600} // Updated width
                height={600} // Updated height
                className="w-full h-auto"
                priority
              />
            </motion.div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              enteredIngredients={enteredIngredients}
              setEnteredIngredients={setEnteredIngredients}
              setShowRecommendations={setShowRecommendations}
              setError={setError}
              setRecipes={setRecipes}
              setSearchAttempted={setSearchAttempted}
              handleSearch={handleSearch}
            />

            {/* Second Image */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 0.8 }}
              transition={{ 
                type: "tween",
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ opacity: 1 }}
              className="w-1/4 blur-[1px] hover:blur-none transition-all duration-300"
            >
              <Image
                src="/salad.png"
                alt="Bowl"
                width={600} // Updated width
                height={600} // Updated height
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>

          {/* Entered Ingredients Tags */}
          {enteredIngredients.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {enteredIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full"
                >
                  <span>{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500 mb-6">Press Enter to add ingredients, then click search</p>

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

        </section>

        {/* Featured Recipes */}
        {recipes.length > 0 && (
          <section id="search-results" className="container mx-auto px-4 py-16 mt-24">
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
        <HowItWorks />
      </main>

    </div>
  )
}
