import Link from "next/link"

export default function Header() {
  return (
    <header className="container flex items-center justify-between px-4 py-4 mx-auto">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Let <span className="text-orange-500">IT</span> Cook
        </Link>
      </div>
      <nav className="items-center hidden space-x-8 md:flex">
        <Link href="/" className="text-gray-600 transition-colors hover:text-orange-500">
          Home
        </Link>
        <Link href="/collection" className="text-gray-600 transition-colors hover:text-orange-500">
          Collection
        </Link>
        <Link href="/education" className="text-gray-600 transition-colors hover:text-orange-500">
          Education
        </Link>
        <Link href="/about" className="text-gray-600 transition-colors hover:text-orange-500">
          About Us
        </Link>
      </nav>
      <button className="px-6 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600">
        Login
      </button>
    </header>
  )
}
