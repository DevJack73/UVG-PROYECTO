import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  CreditCard, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Users, 
  HeartHandshake,
  Calendar,
  Building2
} from 'lucide-react';
import ScrollyHero from '../components/scrollytelling/ScrollyHero';
import CampaignCard from '../components/campaigns/CampaignCard';
import { useCampaigns } from '../context/CampaignContext';

export default function HomePage() {
  const { campaigns, categories, collectionPoints, openDonationModal, impactStats } = useCampaigns();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCampaigns = selectedCategory === 'all'
    ? campaigns
    : campaigns.filter(c => c.categorySlug === selectedCategory || c.categoryId === Number(selectedCategory));

  return (
    <div className="min-h-screen">
      
      {/* 1. CINEMATIC SCROLLYTELLING HERO (Student + Packages + Moving Delivery Truck) */}
      <ScrollyHero />

      {/* 2. FEATURED CAMPAIGNS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Iniciativas Universitarias Activas
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Elige una causa y súmate a la ruta
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Cada campaña cuenta con metas físicas y monetarias específicas, necesidades prioritarias y seguimiento transparente.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Todas ({campaigns.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 text-stone-500 text-sm">
            No se encontraron campañas en esta categoría en este momento.
          </div>
        )}
      </section>

      {/* 3. HOW THE SOLIDARITY PIPELINE WORKS */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
              Trazabilidad y Logística
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-3 text-white">
              ¿Cómo viaja tu ayuda desde el Campus hasta la comunidad?
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2">
              Un proceso de 5 etapas coordinado por la comunidad académica para garantizar cero intermediarios y entrega con dignidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-extrabold font-mono text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base">Registra tu Aporte</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Selecciona la campaña y genera tu voucher digital con código de trazabilidad único.
              </p>
            </div>

            <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-extrabold font-mono text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base">Entrega en Campus</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Lleva los víveres al Lobby Central, Biblioteca o Bodega C-102 en el Campus Altiplano.
              </p>
            </div>

            <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-extrabold font-mono text-sm">
                03
              </div>
              <h3 className="font-bold text-white text-base">Control y Empaque</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Estudiantes voluntarios verifican el buen estado, clasifican y sellan los paquetes.
              </p>
            </div>

            <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-extrabold font-mono text-sm">
                04
              </div>
              <h3 className="font-bold text-white text-base">Camión UVG en Ruta</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                El transporte institucional traslada las donaciones directamente a los centros comunitarios.
              </p>
            </div>

            <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-extrabold font-mono text-sm">
                05
              </div>
              <h3 className="font-bold text-white text-base">Entrega con Dignidad</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Recepción firmada con líderes locales y actas de entrega publicadas en el portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAMPUS COLLECTION POINTS DIRECTORY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Puntos de Acopio Físicos
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 font-display mt-2">
            Entrega tus donaciones en Campus Altiplano
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Espacios oficiales habilitados dentro de la universidad para recibir víveres, libros y ropa de abrigo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collectionPoints.map((point) => (
            <div
              key={point.id}
              className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-base font-display">
                  {point.name}
                </h3>
                <div className="text-xs font-semibold text-emerald-800 mt-1">
                  {point.building}
                </div>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  <strong>Horario:</strong> {point.schedule}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
                <div className="font-semibold text-stone-700">Responsable:</div>
                <div>{point.responsibleContact}</div>
                <div className="text-[11px] font-mono text-stone-400 mt-0.5">{point.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION: VOLUNTEER & COMMUNITY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Voluntariado Universitario UVG
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display mt-3 text-white leading-tight">
              ¿Eres estudiante o colaborador UVG? Únete al equipo logístico.
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-3 leading-relaxed">
              Participa en las jornadas de clasificación, pesaje, inventario en bodega y viajes de entrega directa a las comunidades. Acredita horas de proyección social y servicio comunitario.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/volunteer"
              className="py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl text-xs sm:text-sm font-extrabold text-center shadow-lg transition-all"
            >
              Inscribirme como Voluntario
            </Link>
            <Link
              to="/impact"
              className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl text-xs sm:text-sm font-bold text-center transition-colors"
            >
              Ver Informe de Impacto
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
