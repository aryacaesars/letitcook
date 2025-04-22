import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Let IT Cook - Find Recipes With Ingredients You Already Have",
  description: "Discover delicious recipes using ingredients already in your kitchen",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
