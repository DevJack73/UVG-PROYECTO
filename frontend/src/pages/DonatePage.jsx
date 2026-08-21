import React, { useState } from 'react';
import { 
  Package, 
  CreditCard, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Building2, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { useCampaigns } from '../context/CampaignContext';
import CampaignCard from '../components/campaigns/CampaignCard';

export default function DonatePage() {
  const { campaigns, collectionPoints, openDonationModal } = useCampaigns();
  const [selectedType, setSelectedType] = useState('in_kind');

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Canal Oficial de Donaciones
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display mt-2">
          Cómo Donar y Apoyar a la Comunidad
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Tú decides la forma de sumarte: aportando víveres o insumos físicos en el campus, o mediante donaciones monetarias seguras.
        </p>
      </div>

      {/* Two Main Donation Channels Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Channel 1: In-Kind Donations */}
        <div className="glass-panel p-8 rounded-3xl border-2 border-emerald-700/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-stone-900 font-display">
              1. Donación de Víveres e Insumos (En Especie)
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Dona alimentos no perecederos (frijol, arroz, avena, Incaparina), útiles escolares (mochilas, cuadernos, lápices), suéteres o frazadas térmicas limpias y kits de higiene.
            </p>

            <div className="space-y-2 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Generas voucher con código QR de entrega</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Entregas en Lobby, Bodega C-102 o Biblioteca</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Rastreo en vivo hasta que se entrega en la comunidad</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => openDonationModal(null, 'in_kind')}
              className="w-full py-3.5 px-6 bg-emerald-900 hover:bg-emerald-950 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Registrar Donación en Especie</span>
            </button>
          </div>
        </div>

        {/* Channel 2: Monetary Donations */}
        <div className="glass-panel p-8 rounded-3xl border-2 border-amber-500/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <CreditCard className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-stone-900 font-display">
              2. Aporte Monetario Solidario (Sandbox)
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Contribuye directamente a los fondos de compra a granel para filtros purificadores de agua, transporte y adquisición coordinada de insumos agrícolas y escolares.
            </p>

            <div className="space-y-2 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Entorno de demostración sandbox seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Recibo digital instantáneo con token único</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Auditoría de compras y rendición de cuentas pública</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => openDonationModal(null, 'monetary')}
              className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Realizar Aporte Monetario</span>
            </button>
          </div>
        </div>

      </div>

      {/* Collection Points Reference */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-stone-900 font-display mb-6">
          Horarios y Puntos de Acopio en UVG Altiplano
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collectionPoints.map((point) => (
            <div key={point.id} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <div className="font-bold text-stone-900 text-base">{point.name}</div>
              <div className="text-xs text-emerald-800 font-semibold mt-0.5">{point.building}</div>
              <div className="text-xs text-stone-600 mt-2">{point.schedule}</div>
              <div className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-stone-100">
                Contacto: <strong>{point.responsibleContact}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
