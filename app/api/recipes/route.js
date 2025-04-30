import { NextResponse } from 'next/server'

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes'

// Initialize API keys array
const API_KEYS = [
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_1,
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_2,
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_3,
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_4,
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_5,
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_6,
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_7,
].filter(Boolean); // Remove any undefined or null values

// Track API key usage
const keyUsage = new Map();
let currentKeyIndex = 0;

function getNextApiKey() {
  if (API_KEYS.length === 0) {
    throw new Error('No valid API keys available');
  }
  
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  
  // Track usage
  const currentCount = keyUsage.get(key) || 0;
  keyUsage.set(key, currentCount + 1);
  
  return key;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'main course'
    const number = searchParams.get('number') || '9'
    const offset = searchParams.get('offset') || '0'

    const apiKey = getNextApiKey();
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${apiKey}&type=${type}&number=${number}&offset=${offset}&addRecipeInformation=true`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      if (response.status === 402) {
        // If quota exceeded, try with next API key
        return GET(request);
      }
      throw new Error('Failed to fetch recipes')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 })
  }
} 