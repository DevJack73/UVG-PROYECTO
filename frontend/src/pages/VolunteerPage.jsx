import React, { useState } from 'react';
import { 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Building2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export default function VolunteerPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    carnet: user?.universityId || '',
    career: user?.department || 'Ingeniería en Informática',
    preferredArea: 'clasificacion',
    availability: 'miercoles_viernes'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Proyección Social Universitaria
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display mt-2">
          Programa de Voluntariado Solidario UVG
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Pon tu talento y energía al servicio de la comunidad. Acredita horas de voluntariado y sé parte del equipo que organiza, verifica y entrega la ayuda en el altiplano.
        </p>
      </div>

      {/* Volunteer Brigades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-display">
            1. Recepción y Acopio en Campus
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Atención en los puestos de entrega del Lobby Central y Biblioteca, escaneo de vouchers digitales y bienvenida a los donantes.
          </p>
          <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Turnos de 2 a 4 horas semanales</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-display">
            2. Clasificación en Bodega C-102
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Revisión de fechas de vencimiento de víveres, clasificación por tallas de ropa de abrigo, armado de paquetes y sellado de cajas.
          </p>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Jornadas de viernes y sábados</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-display">
            3. Brigada de Entrega en Comunidad
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Acompañamiento en el camión de la universidad a las comunidades, apoyo en talleres formativos y entrega directa a las familias.
          </p>
          <div className="text-xs font-semibold text-blue-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Viajes programados mensuales</span>
          </div>
        </div>

      </div>

      {/* Registration Form & Volunteer Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left: Registration Card */}
        <div className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-lg space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Formulario de Inscripción
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900 font-display mt-2">
              Únete a la Red de Voluntarios UVG
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Completa tus datos para asignarte a una brigada activa según tus horarios disponibles.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950 font-display">
                ¡Inscripción Recibida con Éxito!
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                El equipo de Proyección Universitaria del Campus Altiplano se pondrá en contacto a tu correo institucional con la convocatoria a la próxima jornada de inducción.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Carnet UVG:</label>
                  <input
                    type="text"
                    required
                    value={formData.carnet}
                    onChange={(e) => setFormData({ ...formData, carnet: e.target.value })}
                    placeholder="Ej: 240189"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Correo Institucional:</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Carrera / Facultad:</label>
                  <input
                    type="text"
                    required
                    value={formData.career}
                    onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Área de Interés Preferida:</label>
                <select
                  value={formData.preferredArea}
                  onChange={(e) => setFormData({ ...formData, preferredArea: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white"
                >
                  <option value="acopio">Recepción y Acopio en Campus</option>
                  <option value="clasificacion">Clasificación e Inventario en Bodega</option>
                  <option value="entrega">Viajes de Entrega y Talleres en Comunidad</option>
                  <option value="comunicacion">Documentación y Medios</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Confirmar Inscripción como Voluntario
              </button>
            </form>
          )}
        </div>

        {/* Right: Volunteer Benefits & Verification */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900 text-white space-y-4">
            <h3 className="text-xl font-bold font-display text-white">
              Beneficios y Certificación
            </h3>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Constancia Oficial:</strong> Horas acreditables para los programas de proyección social y graduación de UVG.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Desarrollo de Liderazgo:</strong> Trabajo multidisciplinario con estudiantes de diversas carreras e ingenierías.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Impacto Social Directo:</strong> Conoce de primera mano la realidad comunitaria de las tierras altas de Sololá.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
