import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function MainLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <Navbar />
      
      {/* Search & Filter dengan Tagline */}
      <header className="bg-gray-50 p-4 border-b">
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome to TokoMurah
            </h2>
            <p className="text-lg text-gray-600 italic">
              "Belanja cepat, mudah, dan pastinya barang ori no kawe kawe"
            </p>
          </div>
          
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <select 
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Semua Kategori</option>
              <option value="Electronics">Elektronik</option>
              <option value="Fashion">Fashion</option>
              <option value="Kecantikan">Kecantikan</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-6">
        <Outlet context={{ searchTerm, selectedCategory }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 TokoMurah</p>
      </footer>
    </div>
  );
}