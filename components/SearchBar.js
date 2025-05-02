import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import commonIngredientsData from "@/lib/commonIngredients.json"; // Impor file JSON

export default function SearchBar({
  enteredIngredients,
  setEnteredIngredients,
  handleSearch,
  loading,
  clearAllIngredients,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Gunakan data dari JSON
  const commonIngredients = commonIngredientsData.ingredients;

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = commonIngredients.filter(({ en, id }) =>
        en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecommendations(filtered.slice(0, 5));
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  }, [searchQuery]);

  const handleRecommendationClick = (ingredient) => {
    if (!enteredIngredients.includes(ingredient.en)) {
      setEnteredIngredients([...enteredIngredients, ingredient.en]);
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
        }
        break;
    }
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