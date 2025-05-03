import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import commonIngredientsData from "@/lib/commonIngredients.json"; // Impor file JSON

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  enteredIngredients,
  setEnteredIngredients,
  setShowRecommendations,
  setError,
  setRecipes,
  setSearchAttempted,
  handleSearch,
  loading,
}) {
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendationsState] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Gunakan data dari JSON
  const commonIngredients = commonIngredientsData.ingredients;

  // Fungsi Levenshtein Distance sederhana
  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] =
          a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1
              );
      }
    }
    return matrix[a.length][b.length];
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = commonIngredients.filter(({ en, id }) =>
        en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        id.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Jika hasil filter kosong, cari ingredient terdekat (koreksi typo)
      let typoSuggestions = [];
      if (filtered.length === 0) {
        typoSuggestions = commonIngredients
          .map((ingredient) => ({
            ...ingredient,
            distance: Math.min(
              levenshtein(ingredient.en.toLowerCase(), searchQuery.toLowerCase()),
              levenshtein(ingredient.id.toLowerCase(), searchQuery.toLowerCase())
            ),
          }))
          .filter((item) => item.distance <= 2) // Ambil yang mirip saja (threshold 2)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5);
      }

      setRecommendations(
        filtered.length > 0 ? filtered.slice(0, 5) : typoSuggestions
      );
      setShowRecommendationsState(true);
    } else {
      setRecommendations([]);
      setShowRecommendationsState(false);
    }
  }, [searchQuery]);

  const handleRecommendationClick = (ingredient) => {
    if (!enteredIngredients.includes(ingredient.en)) {
      setEnteredIngredients([...enteredIngredients, ingredient.en]);
    }
    setSearchQuery("");
    setShowRecommendationsState(false);
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
        }
        break;
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
    setError && setError(null);
    setRecipes && setRecipes([]);
    setSearchAttempted && setSearchAttempted(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowRecommendationsState(true)}
        onBlur={() => setTimeout(() => setShowRecommendationsState(false), 200)}
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
            Clear
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 disabled:bg-orange-300"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </button>
      </div>

      {showRecommendations && recommendations.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
          {/* Tampilkan pesan "Did you mean ..." jika hasil typoSuggestions */}
          {commonIngredients.filter(({ en, id }) =>
            en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            id.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && (
            <div className="px-4 py-2 text-gray-500 text-sm italic">
              Did you mean:
            </div>
          )}
          {recommendations.map((ingredient, index) => (
            <button
              key={index}
              onClick={() => handleRecommendationClick(ingredient)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                index === selectedIndex ? 'bg-orange-50' : ''
              }`}
            >
              {ingredient.en} ({ingredient.id})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}