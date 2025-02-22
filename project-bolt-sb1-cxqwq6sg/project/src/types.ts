export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'beverages';
  description: string;
  image: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  tableNumber: number;
  timestamp: Date;
  status: 'pending' | 'completed';
}

export interface MenuItemFormData {
  name: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'beverages';
  description: string;
  image: string;
}