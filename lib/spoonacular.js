const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

if (!SPOONACULAR_API_KEY) {
  console.error('Spoonacular API key is not set. Please add NEXT_PUBLIC_SPOONACULAR_API_KEY to your .env.local file');
  console.error('Current environment:', process.env.NODE_ENV);
  console.error('Available environment variables:', Object.keys(process.env));
}

export async function searchRecipesByIngredients(ingredients) {
  try {
    if (!SPOONACULAR_API_KEY) {
      throw new Error('API key is not configured');
    }

    // Encode ingredients to handle special characters
    const encodedIngredients = encodeURIComponent(ingredients);
    const url = `${SPOONACULAR_BASE_URL}/recipes/findByIngredients?ingredients=${encodedIngredients}&number=10&apiKey=${SPOONACULAR_API_KEY}`;
    
    console.log('Making API request to:', url);
    
    const response = await fetch(url);
    
    console.log('API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}\n${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data);
    
    // Sort recipes by relevance (most used ingredients first, then least missed ingredients)
    const sortedRecipes = data.sort((a, b) => {
      if (b.usedIngredientCount !== a.usedIngredientCount) {
        return b.usedIngredientCount - a.usedIngredientCount;
      }
      return a.missedIngredientCount - b.missedIngredientCount;
    });
    
    // Validate and log each recipe ID
    const validRecipes = sortedRecipes.map(recipe => {
      console.log('Recipe ID:', recipe.id, 'Title:', recipe.title);
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount,
        usedIngredients: recipe.usedIngredients,
        missedIngredients: recipe.missedIngredients
      };
    });
    
    return validRecipes;
  } catch (error) {
    console.error('Error in searchRecipesByIngredients:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}

export async function getRecipeInformation(recipeId) {
  try {
    if (!SPOONACULAR_API_KEY) {
      throw new Error('API key is not configured');
    }

    if (!recipeId) {
      throw new Error('Recipe ID is required');
    }

    // Ensure the ID is a string and properly encoded
    const encodedRecipeId = encodeURIComponent(String(recipeId).trim());
    
    // Using the correct endpoint format with additional parameters
    const url = `${SPOONACULAR_BASE_URL}/recipes/${encodedRecipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`;
    
    console.log('Making API request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Prevent caching issues
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Spoonacular API key.');
      } else if (response.status === 402) {
        throw new Error('API quota exceeded. Please check your Spoonacular account limits.');
      } else if (response.status === 404) {
        throw new Error('Recipe not found. Please check the recipe ID.');
      } else {
        throw new Error(`Failed to fetch recipe information: ${response.status} ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getRecipeInformation:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}

export async function getIngredientAlternatives(ingredient) {
  try {
    if (!SPOONACULAR_API_KEY) {
      throw new Error('API key is not configured');
    }

    const encodedIngredient = encodeURIComponent(ingredient);
    const url = `${SPOONACULAR_BASE_URL}/food/ingredients/substitutes?ingredientName=${encodedIngredient}&apiKey=${SPOONACULAR_API_KEY}`;
    
    console.log('Making API request to:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch ingredient alternatives: ${response.status} ${response.statusText}\n${errorText}`);
    }
    
    const data = await response.json();
    console.log('Ingredient alternatives response:', data);
    
    // Handle case where no substitutes are found
    if (!data.substitutes || data.substitutes.length === 0) {
      return {
        substitutes: [`No direct substitutes found for ${ingredient}. Try using a similar ingredient or omitting it.`]
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error in getIngredientAlternatives:', error);
    return {
      substitutes: [`Error finding substitutes for ${ingredient}. Please try again.`]
    };
  }
}

export async function getRecipeInstructions(recipeId) {
  try {
    if (!SPOONACULAR_API_KEY) {
      throw new Error('API key is not configured');
    }

    if (!recipeId) {
      throw new Error('Recipe ID is required');
    }

    const encodedRecipeId = encodeURIComponent(String(recipeId).trim());
    const url = `${SPOONACULAR_BASE_URL}/recipes/${encodedRecipeId}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY}`;
    
    console.log('Making API request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Spoonacular API key.');
      } else if (response.status === 402) {
        throw new Error('API quota exceeded. Please check your Spoonacular account limits.');
      } else if (response.status === 404) {
        throw new Error('Recipe not found. Please check the recipe ID.');
      } else {
        throw new Error(`Failed to fetch recipe instructions: ${response.status} ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getRecipeInstructions:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
} 