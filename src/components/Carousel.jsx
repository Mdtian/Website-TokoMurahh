import { useState, useEffect } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Data banner/slides dengan gambar yang sama style-nya seperti products
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&w=1200&h=400&fit=crop",
      fallback: "https://placehold.co/1200x400/3B82F6/FFFFFF?text=Premium+Headphones&font=roboto",
      title: "Premium Headphones",
      description: "Dengarkan musik dengan kualitas terbaik",
      buttonText: "Belanja Sekarang",
      category: "Electronics"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&w=1200&h=400&fit=crop",
      fallback: "https://placehold.co/1200x400/10B981/FFFFFF?text=Smart+Watch+Collection&font=roboto",
      title: "Smart Watch Collection", 
      description: "Teknologi terbaru untuk gaya hidup modern",
      buttonText: "Lihat Koleksi",
      category: "Electronics"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&w=1200&h=400&fit=crop",
      fallback: "https://placehold.co/1200x400/EF4444/FFFFFF?text=Gaming+Laptops&font=roboto",
      title: "Gaming Laptops",
      description: "Performansi maksimal untuk gaming experience",
      buttonText: "Explore Now",
      category: "Electronics"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&w=1200&h=400&fit=crop",
      fallback: "https://placehold.co/1200x400/8B5CF6/FFFFFF?text=Sport+Shoes&font=roboto",
      title: "Sport Shoes Collection",
      description: "Nyaman untuk aktivitas sehari-hari",
      buttonText: "Lihat Produk",
      category: "Fashion"
    }
  ];

  // Handle image errors
  const handleImageError = (slideId) => {
    setImageErrors(prev => ({ ...prev, [slideId]: true }));
  };

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg mb-8">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={imageErrors[slide.id] ? slide.fallback : slide.image}
              alt={slide.title}
              onError={() => handleImageError(slide.id)}
              className="w-full h-full object-cover"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <div className="text-white p-8 max-w-2xl">
                <span className="inline-block bg-blue-600 text-xs md:text-sm px-3 py-1 rounded-full mb-4">
                  {slide.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-4 md:mb-6 opacity-90">
                  {slide.description}
                </p>
                <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition duration-300 text-sm md:text-base shadow-lg">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}