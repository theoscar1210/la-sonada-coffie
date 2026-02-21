/**
 * LA SOÑADA COFFIE — Seed de datos
 * Ejecutar: npm run db:seed (desde packages/database)
 */

import { PrismaClient, RoastLevel, Role } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return hashSync(password, 12);
}

async function main() {
  console.info('🌱 Iniciando seed de datos...');

  // ── Limpiar tablas ───────────────────────────────────────────
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  // ── Categorías ───────────────────────────────────────────────
  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'Café de Origen',
        slug: 'cafe-de-origen',
        description: 'Granos seleccionados de una sola finca o región',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/cafe-origen.jpg',
      },
      {
        name: 'Blends Especiales',
        slug: 'blends-especiales',
        description: 'Mezclas cuidadosamente diseñadas por nuestros maestros tostadores',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/blends.jpg',
      },
      {
        name: 'Kits y Regalos',
        slug: 'kits-y-regalos',
        description: 'Experiencias de café para regalar',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/kits.jpg',
      },
    ],
  });

  console.info(`✅ ${categories.count} categorías creadas`);

  const catOrigen = await prisma.category.findUnique({ where: { slug: 'cafe-de-origen' } });
  const catBlends = await prisma.category.findUnique({ where: { slug: 'blends-especiales' } });

  if (!catOrigen || !catBlends) throw new Error('Categorías no encontradas');

  // ── Productos ────────────────────────────────────────────────
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Huila Natural Anaeróbico',
        slug: 'huila-natural-anaerobico',
        description:
          'Este café de la región de Huila, Colombia, fue procesado mediante fermentación anaeróbica por 72 horas en tanques sellados antes del secado al sol. El resultado es un perfil de sabor extraordinariamente complejo con notas de frutas tropicales, vino y chocolate oscuro. Cultivado a más de 2.000 metros sobre el nivel del mar por la familia Muñoz, quienes llevan tres generaciones perfeccionando el arte del café.',
        shortDesc: 'Fermentación anaeróbica 72h — Complejo, frutal y memorable',
        price: 38000,
        comparePrice: 45000,
        stock: 48,
        images: [
          'https://res.cloudinary.com/demo/image/upload/huila-1.jpg',
          'https://res.cloudinary.com/demo/image/upload/huila-2.jpg',
        ],
        categoryId: catOrigen.id,
        origin: 'Colombia',
        region: 'Huila',
        altitude: '1.900 - 2.100 msnm',
        roastLevel: RoastLevel.LIGHT,
        process: 'Natural Anaeróbico',
        flavorNotes: ['maracuyá', 'vino tinto', 'chocolate oscuro', 'jazmín'],
        grindOptions: ['entero', 'espresso', 'filtrado', 'french press'],
        weight: 250,
        featured: true,
      },
      {
        name: 'Nariño Honey Process',
        slug: 'narino-honey-process',
        description:
          'De las faldas del volcán Galeras en Nariño, este café honey process conserva parte del mucílago durante el secado, creando un dulzor natural excepcional. Las noches frías de la zona de Buesaco contribuyen a un desarrollo lento del grano que se traduce en una acidez brillante y cuerpo cremoso. Cada lote es pequeño (máximo 50kg) y traceable hasta el lote específico de la finca Las Palmas.',
        shortDesc: 'Honey Process — Dulce, cremoso y brillante',
        price: 42000,
        stock: 30,
        images: [
          'https://res.cloudinary.com/demo/image/upload/narino-1.jpg',
          'https://res.cloudinary.com/demo/image/upload/narino-2.jpg',
        ],
        categoryId: catOrigen.id,
        origin: 'Colombia',
        region: 'Nariño',
        altitude: '2.000 - 2.300 msnm',
        roastLevel: RoastLevel.MEDIUM_LIGHT,
        process: 'Honey',
        flavorNotes: ['panela', 'melocotón', 'almendra', 'caramelo'],
        grindOptions: ['entero', 'espresso', 'filtrado', 'moka'],
        weight: 250,
        featured: true,
      },
      {
        name: 'Etiopía Yirgacheffe Washed',
        slug: 'etiopia-yirgacheffe-washed',
        description:
          'Proveniente de la cuna del café, la región de Yirgacheffe en Etiopía produce algunos de los cafés más florales y delicados del mundo. Este lote, procesado con el método lavado tradicional, presenta una claridad de sabor impresionante con notas cítricas y florales que te transportan a un jardín en flor. Los caficultores locales reciben precio premium certificado por comercio justo.',
        shortDesc: 'Washed — Floral, cítrico y de origen histórico',
        price: 45000,
        stock: 25,
        images: [
          'https://res.cloudinary.com/demo/image/upload/etiopia-1.jpg',
          'https://res.cloudinary.com/demo/image/upload/etiopia-2.jpg',
        ],
        categoryId: catOrigen.id,
        origin: 'Etiopía',
        region: 'Yirgacheffe',
        altitude: '1.700 - 2.200 msnm',
        roastLevel: RoastLevel.LIGHT,
        process: 'Lavado',
        flavorNotes: ['limón', 'bergamota', 'jazmín', 'durazno'],
        grindOptions: ['entero', 'filtrado', 'aeropress', 'chemex'],
        weight: 200,
        featured: true,
      },
      {
        name: 'La Soñada Blend Signature',
        slug: 'la-sonada-blend-signature',
        description:
          'Nuestra mezcla insignia, creada para ser perfecta en espresso y como base de bebidas con leche. La combinación de Colombia Huila (70%) y Brasil Mogiana (30%) crea un equilibrio perfecto entre acidez, dulzor y cuerpo. Desarrollamos este blend durante dos años de catas y ajustes hasta lograr una consistencia excepcional. Es el café con el que iniciamos el día en nuestro tostador.',
        shortDesc: 'Nuestro blend insignia — Perfecto para espresso y leche',
        price: 32000,
        comparePrice: 38000,
        stock: 80,
        images: [
          'https://res.cloudinary.com/demo/image/upload/signature-1.jpg',
          'https://res.cloudinary.com/demo/image/upload/signature-2.jpg',
        ],
        categoryId: catBlends.id,
        origin: 'Colombia / Brasil',
        region: 'Huila - Mogiana',
        roastLevel: RoastLevel.MEDIUM,
        process: 'Mezcla: Lavado + Natural',
        flavorNotes: ['chocolate con leche', 'avellana', 'caramelo', 'naranja sutil'],
        grindOptions: ['entero', 'espresso', 'moka', 'filtrado'],
        weight: 500,
        featured: true,
      },
      {
        name: 'Dark Roast Intenso',
        slug: 'dark-roast-intenso',
        description:
          'Para los amantes del café potente y robusto, nuestro tostado oscuro desarrolla sabores intensos de chocolate negro, tabaco dulce y especias. Usamos granos Robusta de Vietnam mezclados con Arábica brasileño para lograr un cuerpo lleno y un crema espeso en espresso. Ideal para preparaciones con leche donde el café necesita protagonismo.',
        shortDesc: 'Tostión oscura — Robusto, intenso y de cuerpo lleno',
        price: 28000,
        stock: 60,
        images: [
          'https://res.cloudinary.com/demo/image/upload/dark-1.jpg',
          'https://res.cloudinary.com/demo/image/upload/dark-2.jpg',
        ],
        categoryId: catBlends.id,
        origin: 'Vietnam / Brasil',
        roastLevel: RoastLevel.DARK,
        process: 'Natural',
        flavorNotes: ['chocolate negro', 'tabaco dulce', 'especias', 'melaza'],
        grindOptions: ['entero', 'espresso', 'moka'],
        weight: 500,
        featured: false,
      },
    ],
  });

  console.info(`✅ ${products.count} productos creados`);

  // ── Usuarios ─────────────────────────────────────────────────
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@lasonada.co',
      name: 'Admin La Soñada',
      passwordHash: hashPassword('Admin123!'),
      role: Role.ADMIN,
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: 'cliente@ejemplo.co',
      name: 'Juan Cafetalero',
      passwordHash: hashPassword('Cliente123!'),
      role: Role.CUSTOMER,
      addresses: {
        create: {
          alias: 'Casa',
          street: 'Calle 93 # 11-27, Apto 301',
          city: 'Bogotá',
          state: 'Cundinamarca',
          country: 'Colombia',
          zip: '110221',
          isDefault: true,
        },
      },
    },
    include: { addresses: true },
  });

  console.info(`✅ Usuarios creados: ${adminUser.email}, ${customerUser.email}`);

  // ── Orden de ejemplo ─────────────────────────────────────────
  const prod1 = await prisma.product.findUnique({ where: { slug: 'huila-natural-anaerobico' } });
  const prod2 = await prisma.product.findUnique({ where: { slug: 'la-sonada-blend-signature' } });
  const address = customerUser.addresses[0];

  if (prod1 && prod2 && address) {
    await prisma.order.create({
      data: {
        orderNumber: 'LSC-0001',
        userId: customerUser.id,
        addressId: address.id,
        status: 'DELIVERED',
        subtotal: 70000,
        shippingCost: 8000,
        discount: 0,
        total: 78000,
        shippingName: customerUser.name,
        shippingStreet: address.street,
        shippingCity: address.city,
        shippingState: address.state,
        shippingCountry: address.country,
        shippingZip: address.zip,
        paidAt: new Date('2024-01-15'),
        items: {
          create: [
            {
              productId: prod1.id,
              quantity: 1,
              unitPrice: 38000,
              grind: 'filtrado',
              subtotal: 38000,
            },
            {
              productId: prod2.id,
              quantity: 1,
              unitPrice: 32000,
              grind: 'espresso',
              subtotal: 32000,
            },
          ],
        },
      },
    });

    console.info('✅ Orden de ejemplo creada: LSC-0001');
  }

  console.info('🎉 Seed completado exitosamente!');
  console.info('');
  console.info('Credenciales de prueba:');
  console.info('  Admin:   admin@lasonada.co / Admin123!');
  console.info('  Cliente: cliente@ejemplo.co / Cliente123!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
