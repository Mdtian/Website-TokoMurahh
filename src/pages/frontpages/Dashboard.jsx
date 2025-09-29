import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";
import { useOutletContext } from "react-router-dom";
import Carousel from "../../components/Carousel";

export default function Dashboard() {
  const { searchTerm, selectedCategory } = useOutletContext();

  // Filter produk berdasarkan pencarian dan kategori
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || 
      product.category_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Carousel Section */}
      <section>
        <Carousel />
      </section>

      {/* Products Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Featured Products</h1>
          
          {/* Products Count */}
          <div className="text-gray-600 mt-2 md:mt-0">
            {filteredProducts.length} products found
          </div>
        </div>
        
        {/* Search Info */}
        {(searchTerm || selectedCategory) && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              <span className="font-semibold">Filter applied:</span>
              {searchTerm && ` Search: "${searchTerm}"`}
              {selectedCategory && ` Category: "${selectedCategory}"`}
            </p>
          </div>
        )}
        
        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} p={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">No products found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search terms or browse different categories
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}