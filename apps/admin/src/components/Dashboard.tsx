/**
 * Dashboard del panel admin
 * Métricas: ventas del día, órdenes pendientes, stock bajo
 */

import { useEffect, useState } from 'react';

interface DashboardStats {
  todaySales: number;
  pendingOrders: number;
  lowStockCount: number;
  totalProducts: number;
}

const API_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3001';

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    todaySales: 0,
    pendingOrders: 0,
    lowStockCount: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('accessToken') ?? '';
        const [ordersRes, productsRes] = await Promise.all([
          fetch(`${API_URL}/orders?limit=100`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/products?limit=100`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const ordersData = (await ordersRes.json()) as {
          data: { orders: Array<{ status: string; total: number; createdAt: string }> };
        };
        const productsData = (await productsRes.json()) as {
          data: { products: Array<{ stock: number }> ; pagination: { total: number } };
        };

        const today = new Date().toDateString();
        const todayOrders = ordersData.data?.orders?.filter(
          (o) => new Date(o.createdAt).toDateString() === today && o.status === 'CONFIRMED',
        ) ?? [];

        setStats({
          todaySales: todayOrders.reduce((sum, o) => sum + Number(o.total), 0),
          pendingOrders: ordersData.data?.orders?.filter((o) => o.status === 'PENDING').length ?? 0,
          lowStockCount: productsData.data?.products?.filter((p) => p.stock < 10).length ?? 0,
          totalProducts: productsData.data?.pagination?.total ?? 0,
        });
      } catch {
        // Silencioso en caso de error
      } finally {
        setLoading(false);
      }
    };

    void fetchStats();
  }, []);

  const cards = [
    { label: 'Ventas del día', value: formatCOP(stats.todaySales), color: '#22c55e', icon: '💰' },
    { label: 'Órdenes pendientes', value: String(stats.pendingOrders), color: '#eab308', icon: '📦' },
    { label: 'Productos con poco stock', value: String(stats.lowStockCount), color: '#ef4444', icon: '⚠️' },
    { label: 'Total productos', value: String(stats.totalProducts), color: '#b06325', icon: '☕' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 32, marginBottom: 8, color: '#1c1a17' }}>
        LA SOÑADA COFFIE
      </h1>
      <p style={{ color: '#9a7d5a', marginBottom: 32, fontSize: 14 }}>Panel de administración</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: 'white',
              borderRadius: 16,
              padding: '24px',
              borderLeft: `4px solid ${card.color}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {loading ? (
              <div style={{ height: 40, background: '#f5ede3', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
            ) : (
              <>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: card.color }}>{card.value}</div>
                <div style={{ fontSize: 13, color: '#9a7d5a', marginTop: 4 }}>{card.label}</div>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, marginBottom: 12, color: '#1c1a17' }}>
          Accesos rápidos
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: '+ Nuevo producto', href: '#/products/create', color: '#b06325' },
            { label: 'Ver órdenes pendientes', href: '#/orders?filter={"status":"PENDING"}', color: '#3b82f6' },
            { label: 'Stock bajo', href: '#/products', color: '#ef4444' },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              style={{
                padding: '10px 20px',
                background: btn.color,
                color: 'white',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
