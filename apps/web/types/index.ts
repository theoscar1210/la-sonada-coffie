/**
 * Tipos compartidos del frontend
 */

export type RoastLevel = 'LIGHT' | 'MEDIUM_LIGHT' | 'MEDIUM' | 'MEDIUM_DARK' | 'DARK';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  price: number;
  comparePrice?: number;
  stock: number;
  images: string[];
  category: Category;
  categoryId: string;
  origin: string;
  region?: string;
  altitude?: string;
  roastLevel: RoastLevel;
  process?: string;
  flavorNotes: string[];
  grindOptions: string[];
  weight: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grind?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Address {
  id: string;
  userId: string;
  alias: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Pick<Product, 'id' | 'name' | 'images' | 'slug'>;
  quantity: number;
  unitPrice: number;
  grind?: string;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  notes?: string;
  shippingName: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  shippingZip: string;
  paidAt?: string;
  createdAt: string;
  items: OrderItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  author: string;
  publishedAt?: string;
  // El contenido completo viene de Sanity directamente
  body?: unknown;
}
