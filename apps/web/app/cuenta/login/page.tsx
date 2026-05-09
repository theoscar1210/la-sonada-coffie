'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/lib/store/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

type LoginData = z.infer<typeof loginSchema>;

const SteamLine = ({ delay, height }: { delay: string; height: string }) => (
  <span
    className="bg-coffee-600 animate-steam block w-px rounded-full opacity-60"
    style={{ height, animationDelay: delay }}
  />
);

const CoffeeCup = () => (
  <svg
    viewBox="0 0 110 100"
    width={110}
    height={100}
    fill="none"
    stroke="white"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={0.22}
  >
    <ellipse cx={50} cy={25} rx={35} ry={7} />
    <line x1={15} y1={25} x2={24} y2={78} />
    <line x1={85} y1={25} x2={76} y2={78} />
    <path d="M24,78 Q50,86 76,78" />
    <path d="M76,38 C104,38 104,64 76,64" />
    <ellipse cx={50} cy={84} rx={44} ry={7} />
    <path d="M8,90 Q50,98 92,90" />
  </svg>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/cuenta';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('¡Bienvenido de vuelta!');
      router.push(redirect);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-coffee-950 flex min-h-screen">
      {/* ── Panel izquierdo: editorial tipográfico ── */}
      <div className="border-coffee-900/60 relative hidden flex-col justify-between overflow-hidden border-r p-12 lg:flex lg:w-[42%] xl:p-16">
        {/* Grain overlay */}
        <div className="bg-coffee-grain pointer-events-none absolute inset-0 opacity-[0.06]" />

        {/* Centro: vapor + headline editorial */}
        <div>
          <div className="mb-2 flex items-end gap-2">
            <SteamLine delay="0s" height="80px" />
            <SteamLine delay="0.5s" height="56px" />
            <SteamLine delay="1s" height="96px" />
            <SteamLine delay="0.3s" height="48px" />
          </div>
          <CoffeeCup />

          <h1 className="text-coffee-50 font-serif font-bold leading-[0.92]">
            <span className="block text-[80px] xl:text-[96px]">Bien</span>
            <span className="text-coffee-400 block text-[80px] xl:text-[96px]">venido</span>
            <span className="block text-[80px] xl:text-[96px]">de vuelta</span>
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <span className="bg-coffee-700 block h-px w-8" />
            <p className="text-coffee-600 font-sans text-[11px] uppercase tracking-[0.28em]">
              Café de especialidad
            </p>
          </div>
        </div>

        {/* Bottom: año */}
        <span className="text-coffee-900 font-mono text-[10px]">
          © {new Date().getFullYear()} La Soñada
        </span>
      </div>

      {/* ── Panel derecho: formulario ── */}
      <div className="flex flex-1 flex-col justify-start px-8 pb-12 pt-28 sm:px-14 lg:justify-center lg:px-16 lg:pb-0 lg:pt-0 xl:px-24">
        {/* Header móvil */}
        <div className="mb-12 lg:hidden">
          <span className="text-coffee-600 font-sans text-[10px] uppercase tracking-[0.35em]">
            La Soñada Coffie
          </span>
        </div>

        <div className="mx-auto w-full max-w-[360px]">
          {/* Encabezado del form */}
          <div className="mb-10">
            <h2 className="text-coffee-50 mb-1.5 font-serif text-3xl font-bold">Iniciar sesión</h2>
            <p className="text-coffee-700 font-sans text-sm">Tu ritual de café te espera</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Email */}
            <div>
              <label className="text-coffee-600 mb-2.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em]">
                Correo electrónico
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className="border-coffee-800 text-coffee-100 placeholder:text-coffee-900 focus:border-coffee-400 w-full border-b bg-transparent py-2.5 font-sans text-sm transition-colors duration-300 focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1.5 font-sans text-xs text-red-400/80">{errors.email.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="text-coffee-600 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em]">
                  Contraseña
                </label>
                <Link
                  href="/cuenta/recuperar"
                  className="text-coffee-800 hover:text-coffee-500 font-sans text-[10px] tracking-wide transition-colors"
                >
                  ¿La olvidaste?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="border-coffee-800 text-coffee-100 placeholder:text-coffee-900 focus:border-coffee-400 w-full border-b bg-transparent py-2.5 pr-8 font-sans text-sm transition-colors duration-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-coffee-800 hover:text-coffee-500 absolute bottom-2.5 right-0 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 font-sans text-xs text-red-400/80">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-coffee-700 hover:bg-coffee-600 active:bg-coffee-800 text-coffee-50 flex w-full items-center justify-center gap-2 py-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300 disabled:opacity-40"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Entrando…
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>

          {/* Registro */}
          <div className="border-coffee-900/80 mt-8 border-t pt-7">
            <p className="text-coffee-800 text-center font-sans text-[11px]">
              ¿Primera vez aquí?{' '}
              <Link
                href={`/cuenta/registro?redirect=${redirect}`}
                className="text-coffee-500 hover:text-coffee-300 transition-colors"
              >
                Crear una cuenta
              </Link>
            </p>
          </div>

          {/* Credenciales de prueba */}
          <div className="mt-4 text-center">
            <p className="text-coffee-900 font-mono text-[10px]">
              prueba · cliente@ejemplo.co / Cliente123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
