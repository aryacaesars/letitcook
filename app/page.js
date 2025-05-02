"use client";

import { useState, useEffect } from "react";
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Footer from "@/components/Footer"
import RecipeCard from "@/components/RecipeCard"
import Header from "@/components/Header"
import { searchRecipesByIngredients, getRecipeInformation } from "@/lib/spoonacular";
import HowItWorks from "@/components/HowItWorks"

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

  // Common ingredients for recommendations
  const commonIngredients = [
    "chicken", "beef", "pork", "fish", "rice", "pasta", "potato", "tomato",
    "onion", "garlic", "carrot", "bell pepper", "broccoli", "spinach", "egg",
    "milk", "cheese", "butter", "flour", "sugar", "salt", "pepper", "olive oil"
  ];

  // Reset selected index when recommendations change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [recommendations]);

  // Filter recommendations based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = commonIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecommendations(filtered.slice(0, 5));
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  }, [searchQuery]);

  const handleRecommendationClick = (ingredient) => {
    if (!enteredIngredients.includes(ingredient)) {
      setEnteredIngredients([...enteredIngredients, ingredient]);
    }
    setSearchQuery("");
    setShowRecommendations(false);
  };

  const handleKeyDown = (e) => {
    if (!showRecommendations || recommendations.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < recommendations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : 0
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < recommendations.length) {
          handleRecommendationClick(recommendations[selectedIndex]);
        } else {
          handleEnterKey(e);
        }
        break;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If the last character is a comma, add the ingredient
    if (value.endsWith(',')) {
      const newIngredient = value.slice(0, -1).trim();
      if (newIngredient && !enteredIngredients.includes(newIngredient)) {
        setEnteredIngredients([...enteredIngredients, newIngredient]);
        setSearchQuery('');
      }
    }
  };

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
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowRecommendations(true)}
              onBlur={() => setTimeout(() => setShowRecommendations(false), 200)}
              placeholder="Enter ingredients you have (e.g. chicken, rice, onion)"
              className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 relative z-10 bg-white/80 backdrop-blur-sm"
              disabled={loading}
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1 z-10">
              {enteredIngredients.length > 0 && (
                <button 
                  onClick={clearAllIngredients}
                  disabled={loading}
                  className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 disabled:bg-gray-100"
                  title="Clear all ingredients"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                </button>
              )}
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 disabled:bg-orange-300"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Recommendations Dropdown */}
            {showRecommendations && recommendations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                {recommendations.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecommendationClick(ingredient)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                      index === selectedIndex ? 'bg-orange-50' : ''
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            )}
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
        <HowItWorks />
      </main>

      <Footer />
    </div>
  )
}
