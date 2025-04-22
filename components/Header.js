import Link from "next/link"

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Let <span className="text-orange-500">IT</span> Cook
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
          Home
        </Link>
        <Link href="/collection" className="text-gray-600 hover:text-orange-500 transition-colors">
          Collection
        </Link>
        <Link href="/education" className="text-gray-600 hover:text-orange-500 transition-colors">
          Education
        </Link>
      </nav>
      <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors">
        Login
      </button>
    </header>
  )
}
