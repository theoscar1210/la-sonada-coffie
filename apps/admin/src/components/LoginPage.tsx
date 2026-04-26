import { useState, FormEvent } from 'react';
import { useLogin, useNotify } from 'react-admin';

const colors = {
  bg:        '#1a0a04',
  panel:     '#1a0a04',
  border:    '#3d1f11',
  inputLine: '#3d1f11',
  inputFocus:'#c97e2f',
  label:     '#b06325',
  text:      '#fdf8f3',
  textDim:   '#6b3820',
  textMuted: '#3d1f11',
  btn:       '#8f4c20',
  btnHover:  '#b06325',
  coffee400: '#db9c4f',
  coffee600: '#b06325',
  coffee700: '#8f4c20',
  coffee800: '#6b3820',
  coffee900: '#3d1f11',
  error:     '#f87171',
};

const keyframes = `
@keyframes steam {
  0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.6; }
  50%       { transform: translateY(-10px) scaleX(1.1); opacity: 0.25; }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

const steam = (delay: string, height: string): React.CSSProperties => ({
  display: 'inline-block',
  width: '1px',
  height,
  background: colors.coffee700,
  borderRadius: '9999px',
  animation: `steam 3s ease-in-out ${delay} infinite`,
});

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const login  = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username, password });
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Credenciales inválidas', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={{
        minHeight: '100vh',
        background: colors.bg,
        display: 'flex',
        fontFamily: '"Inter", system-ui, sans-serif',
      }}>

        {/* ── Panel izquierdo tipográfico ── */}
        <div style={{
          width: '42%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3rem',
          borderRight: `1px solid ${colors.border}`,
          overflow: 'hidden',
          position: 'relative',
        }}
          className="admin-left-panel"
        >
          {/* Marca */}
          <span style={{
            color: colors.coffee600,
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
          }}>
            La Soñada Coffie
          </span>

          {/* Headline + vapor */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '20px' }}>
              <span style={steam('0s',   '32px')} />
              <span style={steam('0.5s', '22px')} />
              <span style={steam('1s',   '40px')} />
              <span style={steam('0.3s', '18px')} />
            </div>
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              lineHeight: 0.92,
              color: colors.text,
              fontSize: 'clamp(56px, 5vw, 80px)',
              margin: 0,
            }}>
              Panel<br />
              <span style={{ color: colors.coffee400 }}>Admin</span>
            </h1>
            <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'block', height: '1px', width: '28px', background: colors.coffee800 }} />
              <p style={{
                color: colors.coffee600,
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                Acceso administrativo
              </p>
            </div>
          </div>

          <span style={{ color: colors.textMuted, fontSize: '10px', fontFamily: 'monospace' }}>
            © {new Date().getFullYear()} La Soñada
          </span>
        </div>

        {/* ── Panel derecho: formulario ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem 4rem',
          animation: 'fadeIn 0.5s ease forwards',
        }}>
          <div style={{ maxWidth: '340px', margin: '0 auto', width: '100%' }}>

            {/* Cabecera */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                color: colors.text,
                fontSize: '28px',
                margin: '0 0 6px',
              }}>
                Iniciar sesión
              </h2>
              <p style={{ color: colors.textDim, fontSize: '13px', margin: 0 }}>
                Solo acceso de administradores
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: colors.label,
                  marginBottom: '10px',
                }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin@lasonada.co"
                  autoComplete="email"
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1px solid ${focusedField === 'email' ? colors.inputFocus : colors.inputLine}`,
                    color: colors.text,
                    fontSize: '14px',
                    padding: '8px 0',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Contraseña */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: colors.label,
                  marginBottom: '10px',
                }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${focusedField === 'password' ? colors.inputFocus : colors.inputLine}`,
                      color: colors.text,
                      fontSize: '14px',
                      padding: '8px 28px 8px 0',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    tabIndex={-1}
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textDim,
                      padding: 0,
                      lineHeight: 1,
                      fontSize: '13px',
                    }}
                  >
                    {showPass ? '✕' : '◉'}
                  </button>
                </div>
              </div>

              {/* Botón */}
              <div style={{ paddingTop: '8px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.btnHover; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.btn; }}
                  style={{
                    width: '100%',
                    background: colors.btn,
                    border: 'none',
                    color: colors.text,
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.45 : 1,
                    transition: 'background 0.3s',
                    fontFamily: 'inherit',
                  }}
                >
                  {loading ? 'Entrando…' : 'Entrar'}
                </button>
              </div>

            </form>

            {/* Credenciales de prueba */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}>
              <p style={{
                color: colors.textMuted,
                fontSize: '10px',
                fontFamily: 'monospace',
                margin: 0,
              }}>
                prueba · admin@lasonada.co / Admin123!
              </p>
            </div>

          </div>
        </div>

        {/* Ocultar panel izquierdo en móvil */}
        <style>{`
          @media (max-width: 768px) {
            .admin-left-panel { display: none !important; }
          }
        `}</style>

      </div>
    </>
  );
}
