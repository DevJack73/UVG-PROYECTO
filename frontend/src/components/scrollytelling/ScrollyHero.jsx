import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  HeartHandshake, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Package, 
  TrendingUp,
  Truck,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';
import StudentIllustration from './StudentIllustration';
import TruckIllustration from './TruckIllustration';
import { useCampaigns } from '../../context/CampaignContext';
import { Link } from 'react-router-dom';

export default function ScrollyHero() {
  const containerRef = useRef(null);
  const { campaigns, openDonationModal, impactStats } = useCampaigns();
  
  // Track scroll through the whole 400vh storytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // SCENE 1 ANIMATIONS (0.0 to 0.25)
  const studentX = useTransform(smoothProgress, [0.0, 0.12, 0.20], [-40, 110, 160]);
  const studentOpacity = useTransform(smoothProgress, [0.0, 0.18, 0.25], [1, 1, 0]);
  const isStudentCarrying = useTransform(smoothProgress, p => p < 0.16);
  const isCargoOpen = useTransform(smoothProgress, p => p >= 0.14 && p <= 0.22);
  const truckInitialX = useTransform(smoothProgress, [0.0, 0.20, 0.25], [180, 180, 240]);

  // CONTINUOUS TRUCK JOURNEY (0.22 to 1.0)
  const truckJourneyX = useTransform(smoothProgress, [0.22, 0.95], [-120, 850]);
  const isTruckDriving = useTransform(smoothProgress, p => p >= 0.22 && p <= 0.95);

  // SCENE OPACITIES
  const scene1Opacity = useTransform(smoothProgress, [0.0, 0.22, 0.28], [1, 1, 0]);
  const scene1Scale = useTransform(smoothProgress, [0.0, 0.25], [1, 0.95]);

  const scene2Opacity = useTransform(smoothProgress, [0.24, 0.32, 0.48, 0.54], [0, 1, 1, 0]);
  const scene2Y = useTransform(smoothProgress, [0.24, 0.34], [60, 0]);

  const scene3Opacity = useTransform(smoothProgress, [0.50, 0.58, 0.74, 0.80], [0, 1, 1, 0]);
  const scene3Y = useTransform(smoothProgress, [0.50, 0.60], [60, 0]);

  const scene4Opacity = useTransform(smoothProgress, [0.76, 0.84, 1.0], [0, 1, 1]);
  const scene4Y = useTransform(smoothProgress, [0.76, 0.86], [60, 0]);

  // Featured campaigns for Stop 2
  const topCampaigns = campaigns.slice(0, 3);

  return (
    <div ref={containerRef} className="relative h-[420vh] bg-gradient-to-b from-[#fbf9f4] via-[#f4f1ea] to-[#ede8dd]">
      {/* Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Scenic Mountain & Sky Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle Sololá Highlands Mountain Silhouettes */}
          <svg
            className="absolute bottom-16 sm:bottom-20 w-full h-72 text-emerald-950 opacity-[0.04]"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,213.3C672,203,768,117,864,106.7C960,96,1056,160,1152,181.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg
            className="absolute bottom-16 sm:bottom-20 w-full h-48 text-emerald-900 opacity-[0.06]"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              d="M0,96L60,128C120,160,240,224,360,213.3C480,203,600,117,720,122.7C840,128,960,224,1080,240C1200,256,1320,192,1380,160L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>

        {/* Top Progress & Scene Indicator Bar */}
        <div className="relative z-20 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between gap-4 py-2 border-b border-stone-300/60 text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-[10px]">
                UVG
              </span>
              <span className="hidden sm:inline font-semibold text-emerald-900">Campus Altiplano</span>
              <span className="text-stone-400">•</span>
              <span className="text-emerald-700 font-medium">Solidaridad y Ayuda Comunitaria</span>
            </div>
            
            {/* Interactive Scroll Timeline Indicator */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-stone-500 text-[11px]">
                <span>1. Acopio Campus</span>
                <span>→</span>
                <span>2. Propósito</span>
                <span>→</span>
                <span>3. Campañas</span>
                <span>→</span>
                <span>4. Entrega Digna</span>
              </div>
              <div className="w-24 sm:w-36 h-2 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-600 rounded-full"
                  style={{ width: useTransform(smoothProgress, p => `${Math.min(100, Math.max(0, p * 100))}%`) }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center Stage: Narrative Scenes Controlled by Scroll */}
        <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-center">
          
          {/* ================= SCENE 1: CAMPUS COLLECTION ================= */}
          <motion.div
            style={{ opacity: scene1Opacity, scale: scene1Scale }}
            className="absolute inset-0 flex flex-col justify-center max-w-4xl mx-auto text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold uppercase tracking-wider mx-auto mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Iniciativa Social Universitaria
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight font-display leading-[1.15]">
              Unidos, la comunidad universitaria{' '}
              <span className="gradient-text-uvg">mueve la ayuda</span> donde más se necesita.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Desde el <strong>Campus Altiplano en Sololá</strong>, organizamos y canalizamos donaciones físicas y recursos transparentes hacia comunidades y familias en situación de necesidad.
            </p>

            {/* Scroll Invitation Hint */}
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-stone-500 animate-bounce">
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
                Desliza hacia abajo para iniciar el viaje
              </span>
              <div className="w-5 h-8 rounded-full border-2 border-emerald-700/40 flex items-start justify-center p-1">
                <div className="w-1.5 h-2 bg-emerald-700 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* ================= SCENE 2: STOP 1 — OUR PURPOSE ================= */}
          <motion.div
            style={{ opacity: scene2Opacity, y: scene2Y }}
            className="absolute inset-0 flex flex-col justify-center max-w-6xl mx-auto px-4 pointer-events-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Parada 1 • Nuestro Propósito
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2 font-display">
                "Pequeños aportes recorren grandes distancias."
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Conectamos el compromiso de estudiantes, docentes y egresados de UVG con iniciativas verificadas y gestión logística transparente.
              </p>
            </div>

            {/* 4 Purpose Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1">¿Por qué existe?</h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Para brindar un puente directo, transparente y digno entre la universidad y las comunidades del altiplano sin intermediarios innecesarios.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1">¿Quién participa?</h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Estudiantes, docentes, personal administrativo, egresados y aliados que donan víveres, tiempo voluntario o aportes solidarios.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1">¿Qué recolectamos?</h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Alimentos no perecederos, útiles escolares, ropa térmica para el invierno, kits de higiene y filtros de agua familiares.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1">¿Cómo se entrega?</h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Inventariado, verificado por voluntarios y transportado directamente en el camión de la universidad a líderes locales y escuelas.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= SCENE 3: STOP 2 — ACTIVE CAMPAIGNS ================= */}
          <motion.div
            style={{ opacity: scene3Opacity, y: scene3Y }}
            className="absolute inset-0 flex flex-col justify-center max-w-6xl mx-auto px-4 pointer-events-auto"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Parada 2 • Campañas Activas
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 font-display">
                  Causas que estamos impulsando hoy
                </h2>
              </div>
              <Link
                to="/campaigns"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                Ver todas las campañas ({campaigns.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Campaign Cards hooked to database */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topCampaigns.map((camp) => {
                const percent = Math.min(100, Math.round(((camp.itemCollectedCount || 0) / (camp.itemGoalCount || 1)) * 100));
                return (
                  <div
                    key={camp.id}
                    className="glass-panel rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={camp.heroImage}
                        alt={camp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/20">
                          {camp.communityName.split(',')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-emerald-800 transition-colors">
                          {camp.title}
                        </h3>
                        <p className="text-stone-600 text-xs mt-1 line-clamp-2 leading-relaxed">
                          {camp.shortDescription}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 pt-3 border-t border-stone-100">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-stone-500 font-medium">Meta física</span>
                          <span className="font-bold text-emerald-800">{percent}% ({camp.itemCollectedCount} / {camp.itemGoalCount})</span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-700 rounded-full transition-all duration-700"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {/* Actions */}
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => openDonationModal(camp, 'in_kind')}
                            className="flex-1 py-2 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold text-center shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"
                          >
                            <Package className="w-3.5 h-3.5" />
                            Donar Víveres
                          </button>
                          <Link
                            to={`/campaigns/${camp.slug}`}
                            className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold text-center transition-colors"
                          >
                            Detalles
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ================= SCENE 4: STOP 3 — DESTINATION IMPACT ================= */}
          <motion.div
            style={{ opacity: scene4Opacity, y: scene4Y }}
            className="absolute inset-0 flex flex-col justify-center max-w-5xl mx-auto px-4 text-center pointer-events-auto"
          >
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 mx-auto mb-3">
              Parada 3 • Impacto Tangible y Directo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display">
              La ayuda llega con dignidad, respeto y transparencia.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
              Cada entrega se documenta con actas de recepción, fotografías institucionales de entrega a directores y COCODEs, y trazabilidad pública para los donantes.
            </p>

            {/* Impact Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="glass-panel p-4 rounded-2xl border border-stone-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-display">
                  {impactStats?.totalItemsDelivered || '814'}+
                </p>
                <p className="text-xs text-stone-600 font-medium mt-1">Paquetes e insumos entregados</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-stone-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-display">
                  {impactStats?.familiesBenefited || '440'}
                </p>
                <p className="text-xs text-stone-600 font-medium mt-1">Familias respaldadas</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-stone-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-display">
                  {impactStats?.communitiesSupported || '4'}
                </p>
                <p className="text-xs text-stone-600 font-medium mt-1">Comunidades de Sololá</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-stone-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-800 font-display">
                  {impactStats?.activeStudentVolunteers || '68'}
                </p>
                <p className="text-xs text-stone-600 font-medium mt-1">Voluntarios universitarios</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                to="/impact"
                className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Explorar Portal de Transparencia
              </Link>
              <Link
                to="/donate"
                className="py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                Realizar una Donación
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Bottom Interactive Road & Animation Stage */}
        <div className="relative z-10 w-full h-24 sm:h-32 border-t-2 border-stone-300/80 bg-stone-200/50 flex items-end">
          
          {/* Road Markings */}
          <div className="absolute inset-x-0 bottom-4 flex justify-around opacity-30">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-8 sm:w-12 h-1.5 bg-amber-400 rounded-full" />
            ))}
          </div>

          {/* SCENE 1 ACTORS (Student walking & loading box into truck) */}
          <motion.div
            style={{ x: studentX, opacity: studentOpacity }}
            className="absolute bottom-6 left-8 z-20 pointer-events-none"
          >
            <StudentIllustration progress={smoothProgress} isCarrying={true} />
          </motion.div>

          {/* Initial Campus Truck (Scene 1) */}
          <motion.div
            style={{ x: truckInitialX, opacity: scene1Opacity }}
            className="absolute bottom-4 left-4 z-10 pointer-events-none"
          >
            <TruckIllustration isMoving={false} cargoOpen={true} />
          </motion.div>

          {/* CONTINUOUS JOURNEY TRUCK (Scenes 2, 3, 4) */}
          <motion.div
            style={{ x: truckJourneyX, opacity: useTransform(smoothProgress, p => p >= 0.22 ? 1 : 0) }}
            className="absolute bottom-4 left-4 z-20 pointer-events-none"
          >
            <TruckIllustration isMoving={true} cargoOpen={false} />
          </motion.div>

          {/* Milestone markers along the bottom road */}
          <div className="absolute inset-x-0 bottom-1 px-8 flex justify-between text-[10px] font-semibold text-stone-500">
            <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-emerald-800" /> Campus Altiplano</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-700" /> Carretera Panajachel - Sololá</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-800" /> Comunidades Destino</span>
          </div>

        </div>

      </div>
    </div>
  );
}
