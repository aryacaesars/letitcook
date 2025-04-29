"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { getIngredientAlternatives } from "@/lib/spoonacular"

export default function RecipeCard({ 
  id, 
  title, 
  description, 
  time, 
  difficulty, 
  image, 
  featured = false,
  usedIngredients = [],
  missedIngredients = []
}) {
  const [alternatives, setAlternatives] = useState({})
  const [loadingStates, setLoadingStates] = useState({})
  const [errors, setErrors] = useState({})

  const handleShowAlternatives = async (ingredient) => {
    if (alternatives[ingredient] || loadingStates[ingredient]) return
    
    setLoadingStates(prev => ({ ...prev, [ingredient]: true }))
    setErrors(prev => ({ ...prev, [ingredient]: null }))
    
    try {
      const data = await getIngredientAlternatives(ingredient)
      setAlternatives(prev => ({
        ...prev,
        [ingredient]: data.substitutes || []
      }))
    } catch (error) {
      console.error('Error fetching alternatives:', error)
      setErrors(prev => ({
        ...prev,
        [ingredient]: 'Failed to load alternatives. Please try again.'
      }))
    } finally {
      setLoadingStates(prev => ({ ...prev, [ingredient]: false }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg?height=200&width=400"}
          alt={title}
          fill
          className="object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        {/* Used Ingredients */}
        {usedIngredients.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-green-600 mb-1">Ingredients You Have:</h4>
            <div className="flex flex-wrap gap-1">
              {usedIngredients.map((ing, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Missed Ingredients */}
        {missedIngredients.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-red-600 mb-1">Missing Ingredients:</h4>
            <div className="space-y-1">
              {missedIngredients.map((ing, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                    {ing.name}
                  </span>
                  <button
                    onClick={() => handleShowAlternatives(ing.name)}
                    className="text-xs text-blue-500 hover:text-blue-600 disabled:opacity-50"
                    disabled={loadingStates[ing.name]}
                  >
                    {loadingStates[ing.name] ? 'Loading...' : 'Show Alternatives'}
                  </button>
                </div>
              ))}
            </div>
            
            {/* Alternatives */}
            {Object.entries(alternatives).map(([ingredient, subs]) => (
              <div key={ingredient} className="mt-2">
                <h5 className="text-xs font-medium text-gray-600">Alternatives for {ingredient}:</h5>
                <div className="flex flex-wrap gap-1 mt-1">
                  {subs.map((sub, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Error Messages */}
            {Object.entries(errors).map(([ingredient, error]) => (
              error && (
                <div key={ingredient} className="mt-2 text-xs text-red-500">
                  {error}
                </div>
              )
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{time}</span>
          <span className="text-sm text-gray-500">{difficulty}</span>
        </div>
        <Link 
          href={`/recipe/${id}`}
          className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
        >
          View Recipe
        </Link>
      </div>
    </div>
  )
}
