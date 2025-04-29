import { NextResponse } from 'next/server'

const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'main course'
    const number = searchParams.get('number') || '9'
    const offset = searchParams.get('offset') || '0'

    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&type=${type}&number=${number}&offset=${offset}&addRecipeInformation=true`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 })
  }
} 