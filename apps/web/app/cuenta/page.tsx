'use client';

/**
 * Dashboard de usuario
 * URL: /cuenta
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, User, MapPin, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth';
import { api } from '@/lib/api/client';
import { formatPrice } from '@/lib/utils';
import { orderStatusLabels, orderStatusColors } from '@/lib/utils';
import type { Order } from '@/types';

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/cuenta/login');
      return;
    }

    const fetchOrders = async () => {
      const res = await api.get<{ orders: Order[] }>('/orders');
      if (res.success && res.data) setOrders(res.data.orders);
      setLoading(false);
    };

    void fetchOrders();
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-coffee-500 text-sm font-sans uppercase tracking-wider mb-1">
              Mi cuenta
            </p>
            <h1 className="font-serif text-4xl font-bold text-charcoal-900">
              Hola, {user.name.split(' ')[0]}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-coffee-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>

        {/* Nav tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border border-coffee-100 w-fit">
          {[
            { label: 'Órdenes', icon: Package },
            { label: 'Perfil', icon: User },
            { label: 'Direcciones', icon: MapPin },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-coffee-700 hover:bg-coffee-50 transition-colors"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Órdenes */}
        <div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal-900 mb-5">
            Mis órdenes
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-4 bg-coffee-100 rounded w-1/4 mb-4" />
                  <div className="h-4 bg-coffee-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 card">
              <Package size={48} className="text-coffee-200 mx-auto mb-4" />
              <p className="font-serif text-xl text-coffee-500 mb-2">No tienes órdenes aún</p>
              <p className="text-sm text-coffee-400 mb-6">
                Cuando hagas tu primer pedido aparecerá aquí
              </p>
              <Link href="/productos" className="btn-primary">
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-sans font-semibold text-charcoal-900">
                        {order.orderNumber}
                      </p>
                      <p className="text-sm text-coffee-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${orderStatusColors[order.status]}`}
                      >
                        {orderStatusLabels[order.status]}
                      </span>
                      <span className="font-bold text-charcoal-900">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {order.items.map((item) => (
                      <span
                        key={item.id}
                        className="text-xs bg-coffee-50 text-coffee-700 px-3 py-1 rounded-full border border-coffee-200"
                      >
                        {item.product.name} × {item.quantity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-coffee-50">
                    <p className="text-xs text-coffee-500">
                      Enviado a: {order.shippingStreet}, {order.shippingCity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
