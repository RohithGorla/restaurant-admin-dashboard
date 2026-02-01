import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🍽️ Restaurant Admin Dashboard
        </h1>
        <p className="text-gray-500">
          Manage menu items and track orders
        </p>
      </header>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MenuPage />
        <OrdersPage />
      </div>
    </div>
  );
}
