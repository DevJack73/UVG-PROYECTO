import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  CreditCard, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Users, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';

export default function CampaignCard({ campaign }) {
  const { openDonationModal } = useCampaigns();

  const itemPercent = Math.min(100, Math.round(((campaign.itemCollectedCount || 0) / (campaign.itemGoalCount || 1)) * 100));
  const moneyPercent = campaign.monetaryGoal ? Math.min(100, Math.round(((campaign.monetaryCollected || 0) / campaign.monetaryGoal) * 100)) : 0;

  return (
    <div className="glass-panel rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Hero Image & Tags */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={campaign.heroImage}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 bg-emerald-900/90 backdrop-blur-md text-emerald-200 text-xs font-bold rounded-full border border-emerald-700/40 shadow-xs">
            {campaign.categorySlug ? campaign.categorySlug.toUpperCase() : 'SOLIDARIDAD'}
          </span>
          {campaign.isFeatured && (
            <span className="px-2.5 py-1 bg-amber-500 text-stone-950 text-xs font-extrabold rounded-full flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              Destacada
            </span>
          )}
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-semibold truncate drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{campaign.communityName}</span>
          </div>
          <span className="font-mono text-[11px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
            Hasta {new Date(campaign.endDate).toLocaleDateString('es-GT', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-stone-900 text-lg group-hover:text-emerald-900 transition-colors font-display line-clamp-2">
            {campaign.title}
          </h3>

          <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
            {campaign.shortDescription}
          </p>

          <div className="mt-3 text-[11px] text-stone-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Organiza: <strong>{campaign.organizer}</strong></span>
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
          
          {/* Physical Items Goal Progress */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-stone-600 font-medium flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-emerald-800" />
                Meta de Víveres/Insumos:
              </span>
              <span className="font-bold text-emerald-900">
                {itemPercent}% ({campaign.itemCollectedCount} / {campaign.itemGoalCount})
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-full transition-all duration-700"
                style={{ width: `${itemPercent}%` }}
              />
            </div>
          </div>

          {/* Monetary Goal if applicable */}
          {campaign.monetaryGoal && (
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-stone-600 font-medium flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                  Fondo Solidario:
                </span>
                <span className="font-bold text-amber-800">
                  {moneyPercent}% (Q{Number(campaign.monetaryCollected || 0).toLocaleString()} / Q{Number(campaign.monetaryGoal).toLocaleString()})
                </span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-700"
                  style={{ width: `${moneyPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => openDonationModal(campaign, 'in_kind')}
              className="flex-1 py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Donar Víveres</span>
            </button>

            <button
              onClick={() => openDonationModal(campaign, 'monetary')}
              className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors"
              title="Aporte monetario sandbox"
            >
              Q Aporte
            </button>

            <Link
              to={`/campaigns/${campaign.slug}`}
              className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors"
              title="Ver detalles completos"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
