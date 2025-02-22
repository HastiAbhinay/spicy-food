import React, { useState } from 'react';
import { MenuCard } from './components/MenuCard';
import { OrderSummary } from './components/OrderSummary';
import { AdminPanel } from './components/AdminPanel';
import { menuItems as initialMenuItems } from './data/menuItems';
import { OrderItem, MenuItem } from './types';
import { UtensilsCrossed, Settings } from 'lucide-react';

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableNumber] = useState(1);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAddToOrder = (menuItem: MenuItem) => {
    setOrderItems((current) => {
      const existingItem = current.find(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItem) {
        return current.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { menuItem, quantity: 1 }];
    });
  };

  const handleRemoveFromOrder = (menuItem: MenuItem) => {
    setOrderItems((current) => {
      const existingItem = current.find(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItem && existingItem.quantity > 1) {
        return current.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return current.filter((item) => item.menuItem.id !== menuItem.id);
    });
  };

  const handleGenerateBill = () => {
    const total = orderItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
    
    alert(`Bill for Table ${tableNumber}\nTotal: $${total.toFixed(2)}\n\nThank you for dining with us!`);
    setOrderItems([]); // Clear the order
  };

  const handleUpdateMenu = (newMenuItems: MenuItem[]) => {
    setMenuItems(newMenuItems);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="text-green-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Restaurant Menu</h1>
            </div>
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
            >
              <Settings size={20} />
              {isAdminMode ? 'Exit Admin Mode' : 'Admin Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isAdminMode ? (
          <AdminPanel
            menuItems={menuItems}
            onUpdateMenu={handleUpdateMenu}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    orderItem={orderItems.find((orderItem) => orderItem.menuItem.id === item.id)}
                    onAddToOrder={handleAddToOrder}
                    onRemoveFromOrder={handleRemoveFromOrder}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <OrderSummary
                  orderItems={orderItems}
                  tableNumber={tableNumber}
                  onGenerateBill={handleGenerateBill}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;