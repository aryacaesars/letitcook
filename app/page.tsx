import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            Let <span className="text-orange-500">IT</span> Cook
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-orange-500 font-medium">
            Home
          </Link>
          <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
            Collection
          </Link>
          <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
            Education
          </Link>
        </nav>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors">
          Login
        </button>
      </header>

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
              placeholder="Enter ingredients you have (e.g. chicken, rice, onion)"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Separate ingredients with commas for better results</p>

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

          {/* Food Images */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -left-4 -top-4 md:left-0 md:-top-16 w-1/3 md:w-2/5">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Burger"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -right-4 -top-4 md:right-0 md:-top-16 w-1/3 md:w-2/5">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Bowl"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="container mx-auto px-4 py-16 mt-24">
          <h3 className="text-2xl font-bold mb-8">Featured Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recipe Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Spaghetti Carbonara"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">Spaghetti Carbonara</h4>
                <p className="text-gray-600 text-sm mb-3">
                  A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    25 mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Medium
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Chicken Stir Fry"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">Chicken Stir Fry</h4>
                <p className="text-gray-600 text-sm mb-3">
                  A quick and healthy stir fry with chicken and colorful vegetables.
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    20 mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Easy
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Vegetable Curry"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">Vegetable Curry</h4>
                <p className="text-gray-600 text-sm mb-3">
                  A flavorful and aromatic vegetable curry that's perfect for a weeknight dinner.
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    35 mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Medium
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Classic Beef Burger"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">Classic Beef Burger</h4>
                <p className="text-gray-600 text-sm mb-3">Juicy homemade beef burgers with all the fixings.</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    30 mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Easy
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 5 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Mushroom Risotto"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">Mushroom Risotto</h4>
                <p className="text-gray-600 text-sm mb-3">Creamy Italian rice dish with mushrooms and parmesan.</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    40 mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Medium
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>

            {/* Recipe Card 6 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Greek Salad"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">Greek Salad</h4>
                <p className="text-gray-600 text-sm mb-3">Fresh and healthy Greek salad with feta cheese and olives.</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    15 mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Easy
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        </section>

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Let <span className="text-orange-500">IT</span> Cook
              </h3>
              <p className="text-gray-400 mb-4">
                Find delicious recipes with ingredients you already have in your kitchen.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Recipe Collection
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cooking Education
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <span>•</span> Email: contact@letitcook.com
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span>•</span> Phone: 0812345
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span>•</span> Address: Jl. Inaja dulu
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Let IT Cook. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
