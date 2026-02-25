/**
 * LA SOÑADA COFFIE — Seed de datos
 * Café especial del Líbano, Tolima, Colombia
 * Ejecutar: npm run db:seed (desde packages/database)
 */

import { PrismaClient, RoastLevel, Role } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return hashSync(password, 12);
}

// ── URLs de imágenes reales en Cloudinary ────────────────────
const IMG = {
  a: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031888/SaveClip.App_529477147_17941794516044463_6672011794010563298_n_hthrjs.jpg',
  b: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031886/SaveClip.App_529131866_17958666815969366_870099234742798010_n_qjkkek.webp',
  c: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031883/SaveClip.App_528667901_17941794480044463_7749262412641503883_n_uwpplo.jpg',
  d: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031847/SaveClip.App_621986866_18066107045241922_897931816791468786_n_d2uwp7.jpg',
  e: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031844/SaveClip.App_572812163_17967627392969366_7030966973544852109_n_nnk6wa.jpg',
  f: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031841/SaveClip.App_630569795_17978709332969366_32657942601693164_n_lzes4x.jpg',
  g: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031840/SaveClip.App_625959868_18082962610967652_75738537982155299_n_f3fmus.jpg',
  h: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_624247203_18096365096489402_2997006078983668707_n_jlx4xy.webp',
  i: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_623951363_18011151110666596_752443976468967087_n_jikvhr.jpg',
  j: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031822/SaveClip.App_528545761_17958666824969366_6813040915049069589_n_w6wwvf.webp',
  k: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
  l: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031895/SaveClip.App_561491638_17965500092969366_1633930827551455444_n_qixfkq.jpg',
  m: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031894/SaveClip.App_554771746_17947154346044463_6345059852936679585_n_bw9mvu.jpg',
};

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
        description: 'Granos seleccionados de fincas del Líbano, Tolima',
        imageUrl: IMG.k,
      },
      {
        name: 'Blends Especiales',
        slug: 'blends-especiales',
        description: 'Mezclas cuidadosamente diseñadas por nuestros maestros tostadores',
        imageUrl: IMG.d,
      },
      {
        name: 'Kits y Regalos',
        slug: 'kits-y-regalos',
        description: 'Experiencias de café La Soñada para regalar',
        imageUrl: IMG.h,
      },
    ],
  });

  console.info(`✅ ${categories.count} categorías creadas`);

  const catOrigen = await prisma.category.findUnique({ where: { slug: 'cafe-de-origen' } });
  const catBlends = await prisma.category.findUnique({ where: { slug: 'blends-especiales' } });
  const catKits = await prisma.category.findUnique({ where: { slug: 'kits-y-regalos' } });

  if (!catOrigen || !catBlends || !catKits) throw new Error('Categorías no encontradas');

  // ── Productos ────────────────────────────────────────────────
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Líbano Natural Anaeróbico',
        slug: 'libano-natural-anaerobico',
        description:
          'De las montañas del Líbano, Tolima, este café fue procesado mediante fermentación anaeróbica por 72 horas en tanques sellados antes del secado al sol. El resultado es un perfil de sabor extraordinariamente complejo con notas de frutas tropicales, vino y chocolate oscuro. Cultivado a más de 1.900 metros sobre el nivel del mar en las faldas de la cordillera Central, donde el clima fresco y las aguas cristalinas del río Recio crean condiciones únicas para un café de excepción.',
        shortDesc: 'Fermentación anaeróbica 72h — Complejo, frutal y memorable',
        price: 38000,
        comparePrice: 45000,
        stock: 48,
        images: [IMG.a, IMG.c],
        categoryId: catOrigen.id,
        origin: 'Colombia',
        region: 'Líbano, Tolima',
        altitude: '1.900 - 2.100 msnm',
        roastLevel: RoastLevel.LIGHT,
        process: 'Natural Anaeróbico',
        flavorNotes: ['maracuyá', 'vino tinto', 'chocolate oscuro', 'jazmín'],
        grindOptions: ['entero', 'espresso', 'filtrado', 'french press'],
        weight: 250,
        featured: true,
      },
      {
        name: 'Líbano Honey Process',
        slug: 'libano-honey-process',
        description:
          'Este honey process del Líbano, Tolima conserva parte del mucílago durante el secado natural, creando un dulzor excepcional que es marca de la región. Las noches frescas de la cordillera Central y la altitud constante de más de 2.000 msnm contribuyen a un desarrollo lento del grano que se traduce en una acidez brillante y cuerpo cremoso. Cada lote es pequeño y completamente trazable hasta la finca de origen.',
        shortDesc: 'Honey Process — Dulce, cremoso y de montaña tolimense',
        price: 42000,
        stock: 30,
        images: [IMG.l, IMG.g],
        categoryId: catOrigen.id,
        origin: 'Colombia',
        region: 'Líbano, Tolima',
        altitude: '2.000 - 2.300 msnm',
        roastLevel: RoastLevel.MEDIUM_LIGHT,
        process: 'Honey',
        flavorNotes: ['panela', 'melocotón', 'almendra', 'caramelo'],
        grindOptions: ['entero', 'espresso', 'filtrado', 'moka'],
        weight: 250,
        featured: true,
      },
      {
        name: 'Líbano Washed Especial',
        slug: 'libano-washed-especial',
        description:
          'Procesado con el método lavado tradicional en las montañas del Líbano, Tolima, este café presenta una claridad de sabor impresionante que refleja el verdadero terroir de la región. El agua pura de los ríos de la cordillera Central y el cuidadoso proceso de fermentación controlada dan como resultado un café limpio, brillante y de acidez elegante. Ideal para métodos de filtrado donde cada nota se expresa con precisión.',
        shortDesc: 'Washed — Limpio, brillante y puro Tolima',
        price: 40000,
        stock: 35,
        images: [IMG.m, IMG.b],
        categoryId: catOrigen.id,
        origin: 'Colombia',
        region: 'Líbano, Tolima',
        altitude: '1.800 - 2.000 msnm',
        roastLevel: RoastLevel.LIGHT,
        process: 'Lavado',
        flavorNotes: ['limón amarillo', 'durazno', 'miel', 'té negro'],
        grindOptions: ['entero', 'filtrado', 'aeropress', 'chemex'],
        weight: 250,
        featured: true,
      },
      {
        name: 'La Soñada Blend Signature',
        slug: 'la-sonada-blend-signature',
        description:
          'Nuestra mezcla insignia, creada para ser perfecta en espresso y como base de bebidas con leche. 100% granos del Líbano, Tolima, combinando lotes de diferentes procesos y altitudes para lograr un equilibrio perfecto entre acidez, dulzor y cuerpo. Desarrollamos este blend durante dos años de catas y ajustes hasta lograr una consistencia excepcional. Es el café con el que iniciamos cada mañana en nuestro tostador.',
        shortDesc: 'Nuestro blend insignia — Perfecto para espresso y leche',
        price: 32000,
        comparePrice: 38000,
        stock: 80,
        images: [IMG.d, IMG.e],
        categoryId: catBlends.id,
        origin: 'Colombia',
        region: 'Líbano, Tolima',
        altitude: '1.700 - 2.100 msnm',
        roastLevel: RoastLevel.MEDIUM,
        process: 'Mezcla: Natural + Honey + Lavado',
        flavorNotes: ['chocolate con leche', 'avellana', 'caramelo', 'naranja sutil'],
        grindOptions: ['entero', 'espresso', 'moka', 'filtrado'],
        weight: 500,
        featured: true,
      },
      {
        name: 'La Soñada Tostión Oscura',
        slug: 'la-sonada-tostacion-oscura',
        description:
          'Para los amantes del café potente y de carácter, nuestra tostión oscura de granos del Líbano, Tolima desarrolla sabores intensos de chocolate negro, panela oscura y especias propias del Tolima Grande. La altitud y el suelo volcánico de la región aportan un cuerpo lleno y una crema espesa en espresso que no encontrarás en ningún otro lugar. Ideal para preparaciones con leche donde el café necesita protagonismo.',
        shortDesc: 'Tostión oscura — Robusto, intenso, 100% Tolima',
        price: 28000,
        stock: 60,
        images: [IMG.f, IMG.i],
        categoryId: catBlends.id,
        origin: 'Colombia',
        region: 'Líbano, Tolima',
        altitude: '1.700 - 1.900 msnm',
        roastLevel: RoastLevel.DARK,
        process: 'Natural',
        flavorNotes: ['chocolate negro', 'panela oscura', 'nuez', 'tabaco dulce'],
        grindOptions: ['entero', 'espresso', 'moka'],
        weight: 500,
        featured: false,
      },
      {
        name: 'Kit Experiencia La Soñada',
        slug: 'kit-experiencia-la-sonada',
        description:
          'El regalo perfecto para el amante del café especial. Este kit incluye una muestra de nuestros tres cafés de origen del Líbano, Tolima: Natural Anaeróbico, Honey Process y Washed. Cada uno en presentación de 100g, empacados en nuestra bolsa artesanal con válvula desgasificadora. Incluye tarjeta con las notas de cata y guía de preparación sugerida para cada café.',
        shortDesc: 'Tres orígenes Líbano, Tolima — El regalo ideal',
        price: 55000,
        comparePrice: 68000,
        stock: 20,
        images: [IMG.j, IMG.h],
        categoryId: catKits.id,
        origin: 'Colombia',
        region: 'Líbano, Tolima',
        altitude: '1.900 - 2.300 msnm',
        roastLevel: RoastLevel.LIGHT,
        process: 'Varios',
        flavorNotes: ['frutas tropicales', 'caramelo', 'flores', 'chocolate'],
        grindOptions: ['entero', 'filtrado'],
        weight: 300,
        featured: true,
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
  const prod1 = await prisma.product.findUnique({ where: { slug: 'libano-natural-anaerobico' } });
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
