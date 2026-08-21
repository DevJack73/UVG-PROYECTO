import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Lock, Mail, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    department: 'Facultad de Ingeniería'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
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
            <Sparkles className="w-7 h-7 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold font-display text-stone-900">
            Registro Comunitario UVG
          </h1>
          <p className="text-xs text-stone-500">
            Únete a la plataforma de donaciones y voluntariado
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
            <label className="block font-semibold text-stone-700 mb-1">Nombre Completo:</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
              placeholder="Ej: Sofía Mendoza"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Correo Institucional o Personal:</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
              placeholder="usuario@uvg.edu.gt"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Contraseña:</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Rol Inicial:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white"
            >
              <option value="donor">Donante / Miembro de la Comunidad</option>
              <option value="volunteer">Voluntario Universitario</option>
              <option value="campaign_manager">Gestor de Campaña (Facultad)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creando cuenta...' : 'Completar Registro'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-bold text-emerald-800 hover:underline">
            Inicia sesión
          </Link>
        </div>

      </div>
    </div>
  );
}
