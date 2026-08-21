import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  CreditCard, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Building2,
  Share2,
  AlertCircle
} from 'lucide-react';
import { useCampaigns } from '../context/CampaignContext';
import { api } from '../services/api';

export default function CampaignDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openDonationModal, collectionPoints } = useCampaigns();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCampaign() {
      try {
        const found = await api.getCampaignBySlug(slug);
        setCampaign(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCampaign();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen text-stone-500 text-sm">
        Cargando información de la campaña...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-stone-800">Campaña no encontrada</h2>
        <p className="text-xs text-stone-500 mt-2">La campaña solicitada no existe o fue archivada.</p>
        <Link to="/campaigns" className="mt-4 inline-block px-4 py-2 bg-emerald-900 text-white rounded-xl text-xs font-bold">
          Volver a Campañas
        </Link>
      </div>
    );
  }

  const itemPercent = Math.min(100, Math.round(((campaign.itemCollectedCount || 0) / (campaign.itemGoalCount || 1)) * 100));
  const moneyPercent = campaign.monetaryGoal ? Math.min(100, Math.round(((campaign.monetaryCollected || 0) / campaign.monetaryGoal) * 100)) : 0;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Hero & Details & Updates */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Card */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
            <div className="relative h-72 sm:h-96">
              <img
                src={campaign.heroImage}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-emerald-900/90 text-emerald-200 text-xs font-bold rounded-full border border-emerald-700 backdrop-blur-md">
                  {campaign.categorySlug?.toUpperCase()}
                </span>
                {campaign.isFeatured && (
                  <span className="px-3 py-1 bg-amber-500 text-stone-950 text-xs font-extrabold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Destacada
                  </span>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{campaign.communityName}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
                  {campaign.title}
                </h1>
              </div>
            </div>

            {/* Organizer & Dates Strip */}
            <div className="p-6 bg-stone-50 border-b border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-400 font-medium block">Organizador:</span>
                <span className="font-bold text-stone-800">{campaign.organizer}</span>
              </div>
              <div>
                <span className="text-stone-400 font-medium block">Período de Acopio:</span>
                <span className="font-semibold text-stone-800">
                  {campaign.startDate} al {campaign.endDate}
                </span>
              </div>
              <div>
                <span className="text-stone-400 font-medium block">Estado Actual:</span>
                <span className="font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Activa y Recibiendo
                </span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-stone-900 font-display">
                Sobre la Campaña y Contexto Comunitario
              </h2>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {campaign.description}
              </p>
            </div>
          </div>

          {/* Breakdown of Specific Requested Needs */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-800" />
                <span>Insumos y Víveres Solicitados</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                Verificación en tiempo real
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(campaign.needs || []).map((need) => {
                const needPercent = Math.min(100, Math.round((need.current / need.target) * 100));
                return (
                  <div key={need.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{need.name}</h4>
                        <span className="text-[11px] text-stone-500">Unidad: {need.unit}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        need.priority === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {need.priority === 'high' ? 'Alta Prioridad' : 'Media'}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-stone-500">Recaudado:</span>
                        <span className="text-emerald-900 font-bold">{need.current} de {need.target}</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-700 rounded-full"
                          style={{ width: `${needPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Updates Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Bitácora de Hitos y Avances</span>
            </h3>

            {campaign.updates && campaign.updates.length > 0 ? (
              <div className="space-y-6 border-l-2 border-emerald-800/30 pl-4 sm:pl-6 ml-2">
                {campaign.updates.map((update) => (
                  <div key={update.id} className="relative space-y-2">
                    <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-800 ring-4 ring-emerald-100" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                        {update.date}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">• Hito Verificado</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{update.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{update.body}</p>
                    {update.mediaUrls && update.mediaUrls.length > 0 && (
                      <div className="pt-2">
                        <img
                          src={update.mediaUrls[0]}
                          alt={update.title}
                          className="rounded-2xl max-h-48 w-full object-cover border border-stone-200 shadow-xs"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-stone-500 text-xs">
                No hay actualizaciones publicadas recientemente para esta campaña.
              </div>
            )}
          </div>

        </div>

        {/* Right Sticky Column: Direct Action Box & Drop-Off Points */}
        <div className="space-y-6">
          
          {/* Main Donation Action Box */}
          <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-lg sticky top-24 space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Súmate a esta causa
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 font-display mt-2">
                ¿Cómo deseas apoyar?
              </h3>
            </div>

            {/* Item Progress Bar */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950 flex items-center gap-1">
                  <Package className="w-4 h-4 text-emerald-800" />
                  Meta Física:
                </span>
                <span className="font-extrabold text-emerald-900 font-mono">
                  {itemPercent}%
                </span>
              </div>
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-800 rounded-full"
                  style={{ width: `${itemPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-emerald-800 flex justify-between font-medium">
                <span>Recolectados: <strong>{campaign.itemCollectedCount}</strong></span>
                <span>Objetivo: <strong>{campaign.itemGoalCount}</strong></span>
              </div>
            </div>

            {/* Monetary Progress Bar */}
            {campaign.monetaryGoal && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-950 flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    Fondo Solidario:
                  </span>
                  <span className="font-extrabold text-amber-900 font-mono">
                    {moneyPercent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${moneyPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-amber-800 flex justify-between font-medium">
                  <span>Q{Number(campaign.monetaryCollected || 0).toLocaleString()}</span>
                  <span>Meta: Q{Number(campaign.monetaryGoal).toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => openDonationModal(campaign, 'in_kind')}
                className="w-full py-3.5 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span>Donar Víveres o Insumos</span>
              </button>

              <button
                onClick={() => openDonationModal(campaign, 'monetary')}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Aporte Monetario Seguro (Sandbox)</span>
              </button>
            </div>

            {/* Drop-off reminder */}
            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 space-y-2">
              <div className="font-bold text-stone-700 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-800" />
                <span>Puntos de Acopio en UVG Altiplano:</span>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc text-stone-600 text-[11px]">
                <li>Lobby Central (Edificio A)</li>
                <li>Bodega de Logística C-102</li>
                <li>Biblioteca (Edificio B)</li>
              </ul>
            </div>

            {/* Dignity Guarantee */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Entrega directa y respetuosa con actas auditables.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
