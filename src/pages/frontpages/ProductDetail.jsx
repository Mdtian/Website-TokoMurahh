import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const p = location.state;
  const { addToCart } = useCart();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    
    const newReview = {
      id: Date.now(),
      rating,
      review,
    };
    
    setReviews([...reviews, newReview]);
    setRating(0);
    setReview("");
  };

  return (
    <div className="p-6 space-y-6 flex flex-col md:flex-row gap-6">
      <section className="flex-1 space-y-6">
        <div className="border rounded-lg p-6 shadow">
          <img 
            src={p.img} 
            alt={p.name} 
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h1 className="text-2xl font-bold">{p.name}</h1>
          <p className="text-xl font-semibold text-blue-600 mt-2">
            Rp {p.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mt-2">Stok: {p.stock}</p>
          <p className="text-gray-600">Kategori: {p.category_name}</p>
          <p className="text-gray-600">Rating: {p.rating}/5</p>
          
          <button
            onClick={() => addToCart(p)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Tambah ke Keranjang
          </button>
        </div>

        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-3">User Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">Belum ada review.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                    {[...Array(5 - r.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border rounded-lg p-6 shadow md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Tambah Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Rating:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Review:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Tulis pengalaman Anda..."
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
}