export default function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-16 bg-white rounded-lg mt-16">
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
  );
} 