export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Total Produk</h3>
          <p className="text-2xl font-bold">50</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Total Pesanan</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Total Pengguna</h3>
          <p className="text-2xl font-bold">85</p>
        </div>
      </div>
    </div>
  );
}