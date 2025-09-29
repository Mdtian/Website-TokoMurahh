import { useCart } from "../../utils/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "transfer"
  });

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil! Terima kasih telah berbelanja.");
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">Keranjang Anda kosong.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Data Pelanggan */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Data Pelanggan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Alamat Pengiriman</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                rows="3"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Metode Pembayaran</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="transfer">Transfer Bank</option>
                <option value="cod">COD (Bayar di Tempat)</option>
                <option value="credit">Kartu Kredit</option>
              </select>
            </div>
          </form>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">x{item.qty}</span>
                </div>
                <span>Rp {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}