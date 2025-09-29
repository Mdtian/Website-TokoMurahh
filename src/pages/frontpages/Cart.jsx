import { useCart } from "../../utils/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
        <p className="text-gray-600 mb-4">Keranjang Anda kosong.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Kembali berbelanja
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.qty}
                min="1"
                className="w-16 border rounded text-center"
                onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold">Rp {totalPrice.toLocaleString()}</span>
        </div>
        <Link
          to="/checkout"
          className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Lanjut ke Checkout
        </Link>
      </div>
    </div>
  );
}