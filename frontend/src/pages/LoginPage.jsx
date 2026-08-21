import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('donor@uvg.edu.gt');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <div className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-white flex items-center justify-center mx-auto shadow-md">
            <HeartHandshake className="w-7 h-7 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold font-display text-stone-900">
            Acceso a UVG Solidaria
          </h1>
          <p className="text-xs text-stone-500">
            Ingresa con tu correo institucional @uvg.edu.gt
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Correo UVG:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Contraseña:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Iniciando sesión...' : 'Ingresar al Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-500">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-bold text-emerald-800 hover:underline">
            Regístrate aquí
          </Link>
        </div>

      </div>
    </div>
  );
}
