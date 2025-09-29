import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img 
        src={p.img} 
        alt={p.name} 
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="font-semibold text-lg">{p.name}</h2>
      <p className="text-gray-600">Rp {p.price.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{p.category_name}</p>
      
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/product/${p.slug}`}
          state={p}
          className="text-blue-600 hover:underline"
        >
          Lihat Detail
        </Link>
        
        <button
          onClick={() => addToCart(p)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}