import TechniqueCard from "@/components/TechniqueCard";
import GuideCard from "@/components/GuideCard";

export default function Education() {
  // Cooking techniques data
  const techniques = [
    {
      title: "Sautéing",
      description: "A quick and healthy way to cook vegetables and proteins using minimal oil.",
      image: "/sauteing.jpg",
      tips: [
        "Use olive oil or avocado oil for a healthier option.",
        "Keep the heat high for quick cooking.",
        "Stir frequently to prevent burning.",
      ],
      link: "https://youtu.be/CTyV3JExDT8?si=6DDFprV4KSxZ40cj",
    },
    {
      title: "Braising",
      description: "A slow cooking method that retains nutrients and enhances flavor.",
      image: "braising.jpg",
      tips: [
        "Use lean cuts of meat for a healthier dish.",
        "Add plenty of vegetables to the braising liquid.",
        "Cook on low heat to preserve nutrients.",
      ],
      link: "https://youtu.be/rocRSfC-FVo?si=8HoEIIgVbQFdadr-",
    },
    {
      title: "Roasting",
      description: "A dry heat method perfect for bringing out the natural sweetness of vegetables.",
      image: "roasting.jpg",
      tips: [
        "Use a variety of colorful vegetables for a nutrient-rich dish.",
        "Toss vegetables with a small amount of olive oil.",
        "Roast at 400°F for even caramelization.",
      ],
      link: "https://youtu.be/C2SnnnGyXQg?si=dFbGy3CBNgGwf90V",
    },
  ];

  // Ingredient guides data
  const guides = [
    {
      title: "Herbs & Spices",
      description: "Discover the health benefits of herbs and spices in your cooking.",
      image: "hc.jpg",
      link: "https://youtu.be/XRBoZKi_DN0?si=UBPgM-i3Nk4rvsQZ",
    },
    {
      title: "Vegetables",
      description: "Learn how to select, store, and prepare nutrient-rich vegetables.",
      image: "vegetables.jpg",
      link: "https://youtu.be/zjJBh4a5BeQ?si=KqGXtny9Y5pzlThq",
    },
    {
      title: "Proteins",
      description: "Explore healthy protein options like lean meats, tofu, and legumes.",
      image: "proteins.jpg",
      link: "https://youtu.be/U-_uuU1i7oE?si=gRuTDfsdax8ehUtx",
    },
    {
      title: "Whole Grains",
      description: "Incorporate whole grains like quinoa, brown rice, and oats into your meals.",
      image: "wg.jpg",
      link: "https://youtu.be/OEk5LzAOuoA?si=xBrMHCtZ_FNNx3t3",
    },
    {
      title: "Healthy Fats",
      description: "Understand the benefits of healthy fats like avocado, nuts, and seeds.",
      image: "ht.jpg",
      link: "https://www.youtube.com/watch?v=x2HWU-GqsiE",
    },
    {
      title: "Fermented Foods",
      description: "Boost your gut health with fermented foods like yogurt, kimchi, and sauerkraut.",
      image: "fermented-foods.jpg",
      link: "https://www.youtube.com/watch?v=wMqBkz2z7wY",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container px-4 py-8 mx-auto">
        <section className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">Cooking Education</h1>
          <p className="mb-8 text-center text-gray-600">
            Learn healthy cooking techniques and ingredient knowledge to improve your well-being.
          </p>

          <h2 className="mb-6 text-2xl font-bold text-gray-800">Cooking Techniques</h2>
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {techniques.map((technique, index) => (
              <TechniqueCard
                key={index}
                title={technique.title}
                description={technique.description}
                image={technique.image}
                tips={technique.tips}
                link={technique.link} // Pass the link to TechniqueCard
              />
            ))}
          </div>

          <h2 className="mb-6 text-2xl font-bold text-gray-800">Ingredient Guides</h2>
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <GuideCard
                key={index}
                title={guide.title}
                description={guide.description}
                image={guide.image}
                link={guide.link} // Pass the link to GuideCard
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}