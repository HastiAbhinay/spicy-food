import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  orderItem?: OrderItem;
  onAddToOrder: (item: MenuItem) => void;
  onRemoveFromOrder: (item: MenuItem) => void;
}

export function MenuCard({ item, orderItem, onAddToOrder, onRemoveFromOrder }: MenuCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            {orderItem && orderItem.quantity > 0 && (
              <>
                <button
                  onClick={() => onRemoveFromOrder(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MinusCircle size={24} />
                </button>
                <span className="font-semibold">{orderItem.quantity}</span>
              </>
            )}
            <button
              onClick={() => onAddToOrder(item)}
              className="text-green-500 hover:text-green-700"
            >
              <PlusCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}