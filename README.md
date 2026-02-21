# LA SOÑADA COFFIE — E-Commerce de Café Premium

Monorepo completo con Next.js, Fastify, PostgreSQL/Prisma, Stripe, Sanity y React Admin.

## Estructura del proyecto

```
/apps
  /web        → Next.js 14 (App Router) — Puerto 3000
  /admin      → React Admin (Vite)      — Puerto 3002
/packages
  /api        → Fastify REST API        — Puerto 3001
  /database   → Prisma schema + seed
  /cms        → Sanity Studio           — Puerto 3333
```

## Requisitos previos

- Node.js >= 18
- npm >= 9
- PostgreSQL (local o en Railway)
- Cuenta de Stripe (modo test)
- Cuenta de Cloudinary
- Proyecto en Sanity.io

## Configuración inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores reales. Las variables críticas:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de PostgreSQL |
| `JWT_SECRET` | Secreto para tokens JWT (min. 32 chars) |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe (sk_test_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe (pk_test_...) |
| `CLOUDINARY_CLOUD_NAME` | Cloud name de Cloudinary |
| `SANITY_PROJECT_ID` | ID del proyecto en Sanity |

### 3. Base de datos

```bash
# Generar el cliente Prisma
npm run db:generate

# Crear las tablas (primera vez)
cd packages/database
npx prisma migrate dev --name init

# Poblar con datos de prueba
npm run db:seed
```

### 4. Arrancar en desarrollo

```bash
# Todos los servicios en paralelo
npm run dev

# O individualmente:
# API:   cd packages/api && npm run dev
# Web:   cd apps/web && npm run dev
# Admin: cd apps/admin && npm run dev
# CMS:   cd packages/cms && npm run dev
```

## URLs en desarrollo

| Servicio | URL |
|---|---|
| Frontend (tienda) | http://localhost:3000 |
| API REST | http://localhost:3001 |
| API Docs (Swagger) | http://localhost:3001/docs |
| Panel Admin | http://localhost:3002 |
| Sanity Studio | http://localhost:3333 |

## Credenciales de prueba (seed)

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@lasonada.co | Admin123! |
| Cliente | cliente@ejemplo.co | Cliente123! |

## Stripe (modo test)

Usa estas tarjetas de prueba en el checkout:
- **Pago exitoso:** `4242 4242 4242 4242`
- **Requiere autenticación:** `4000 0025 0000 3155`
- **Tarjeta declinada:** `4000 0000 0000 9995`

Para recibir webhooks en local:
```bash
stripe listen --forward-to localhost:3001/payments/webhook
```

## Comandos útiles

```bash
npm run build          # Construir todos los paquetes
npm run lint           # ESLint en todo el monorepo
npm run type-check     # TypeScript en todo el monorepo
npm run format         # Prettier en todos los archivos
npm run db:generate    # Regenerar cliente Prisma
npm run db:migrate     # Ejecutar migraciones pendientes
npm run db:seed        # Poblar la BD con datos de prueba
npm run clean          # Limpiar todos los build artifacts
```

## Deploy

### Frontend (Vercel)
1. Conecta el repo a Vercel
2. Configura `Root Directory: apps/web`
3. Agrega todas las variables `NEXT_PUBLIC_*` en Vercel

### Backend + BD (Railway)
1. Crea un servicio PostgreSQL en Railway
2. Crea un servicio Node.js apuntando a `packages/api`
3. Agrega las variables de entorno del backend
4. Ejecuta `prisma migrate deploy` en el deploy hook

## Arquitectura

```
Cliente (Next.js)
    │
    ├── Zustand (cart + auth state, localStorage)
    ├── Stripe Elements (checkout)
    │
    ▼
Fastify API
    │
    ├── JWT Auth (access 15m + refresh 7d)
    ├── Zod validation
    ├── Rate limiting (100 req/min)
    │
    ▼
PostgreSQL (Prisma ORM)
    │
    └── Modelos: User, Product, Category,
               Order, OrderItem, BlogPost,
               Address, RefreshToken

Sanity CMS ──► Next.js (blog posts, content)
Cloudinary  ──► Imágenes de productos
Stripe      ──► Pagos y webhooks
```
