"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRecipeInformation } from "@/lib/spoonacular"; 
import { Loader2 } from "lucide-react";

export default function RecipeDetail() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!params.id) {
          throw new Error("Recipe ID is missing");
        }

        // Validate recipe ID format
        const recipeId = String(params.id).trim();
        if (!/^\d+$/.test(recipeId)) {
          throw new Error("Invalid recipe ID format");
        }

        console.log("Fetching recipe with ID:", recipeId);
        const data = await getRecipeInformation(recipeId);
        
        if (!data || !data.id) {
          throw new Error("No valid recipe data received");
        }

        console.log("Received recipe data:", data);
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError(err.message || "Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-500" />
          <p className="mt-4 text-gray-600">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-gray-50 text-gray-600 p-4 rounded-lg max-w-md mx-auto">
            Recipe not found
          </div>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="mb-6 text-orange-500 hover:text-orange-600 flex items-center"
          >
            ← Back to recipes
          </button>

          <h1 className="text-4xl font-bold mb-6">{recipe.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Recipe Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Ready in:</span> {recipe.readyInMinutes} minutes</p>
                  <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
                  {recipe.vegetarian && <p className="text-green-600">Vegetarian</p>}
                  {recipe.vegan && <p className="text-green-600">Vegan</p>}
                  {recipe.glutenFree && <p className="text-green-600">Gluten Free</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.extendedIngredients?.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <div className="prose max-w-none">
              {recipe.instructions ? (
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
              ) : (
                <p className="text-gray-600">No instructions available.</p>
              )}
            </div>
          </div>

          {recipe.sourceUrl && (
            <div className="mt-8">
              <a 
                href={recipe.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600"
              >
                View original recipe
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 