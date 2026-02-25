import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

const footerLinks = {
  Tienda: [
    { label: 'Café de Origen', href: '/productos?category=cafe-de-origen' },
    { label: 'Blends Especiales', href: '/productos?category=blends-especiales' },
    { label: 'Kits y Regalos', href: '/productos?category=kits-y-regalos' },
  ],
  Nosotros: [
    { label: 'Nuestro proceso', href: '/proceso' },
    { label: 'Blog', href: '/blog' },
    { label: 'Historia de la marca', href: '/proceso#historia' },
  ],
  Ayuda: [
    { label: 'Preguntas frecuentes', href: '/faq' },
    { label: 'Política de envíos', href: '/envios' },
    { label: 'Devoluciones', href: '/devoluciones' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal-950 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4">
              <p className="font-serif text-2xl font-bold text-cream-100">LA SOÑADA</p>
              <p className="font-sans text-xs tracking-[0.4em] text-coffee-400 uppercase">COFFIE</p>
            </div>
            <p className="text-sm text-coffee-400 leading-relaxed max-w-xs">
              Café de especialidad seleccionado con amor. Desde el origen hasta tu taza.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-coffee-400 hover:text-coffee-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-coffee-400 hover:text-coffee-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:hola@lasonada.co" className="text-coffee-400 hover:text-coffee-300 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-sans font-semibold text-cream-100 mb-4 text-sm uppercase tracking-wider">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-coffee-400 hover:text-coffee-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-coffee-900 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-coffee-600">
            &copy; {new Date().getFullYear()} LA SOÑADA COFFIE. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="text-xs text-coffee-600 hover:text-coffee-400 transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-coffee-600 hover:text-coffee-400 transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
