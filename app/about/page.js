"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const teamMembers = [
    { name: "Dhiya Ulhaq Prima Yuga", role: "237006066", image: "/dhiya.jpg" },
    { name: "Rafli Putra Nur Syabani", role: "237006083", image: "rafly.jpg" },
    { name: "Muhamad Rizki", role: "237006085", image: "/rizki.jpg" },
    { name: "Yusa Putra Rosdiana", role: "237006091", image: "yusa.jpg" },
    { name: "Arya Achmad Caesar", role: "237006093", image: "arya.jpg" },

  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="container flex-grow p-6 mx-auto">
        <h1 className="mb-6 text-5xl font-extrabold text-center text-gray-800">
          About Us
        </h1>
        <p className="mb-12 text-lg text-center text-gray-600">
          We are a team of 5 members dedicated to
          create the best applications with passion and creativity.
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="w-40 h-40 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full border-4 border-orange-500 rounded-full shadow-lg object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}