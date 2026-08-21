import React from 'react';
import { 
  FileText, 
  Building2, 
  CheckCircle2, 
  Truck, 
  HeartHandshake, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function DonationTrackingTimeline({ donation }) {
  if (!donation) return null;

  const steps = [
    {
      key: 'pledged',
      label: '1. Registrada',
      icon: FileText,
      color: 'blue',
      title: 'Compromiso Registrado',
      desc: 'El donante generó el voucher digital en la plataforma.'
    },
    {
      key: 'received',
      label: '2. Recibida en Campus',
      icon: Building2,
      color: 'amber',
      title: 'Recepción en Punto de Acopio',
      desc: `Entregado en ${donation.collectionPointName || 'Lobby Central'}.`
    },
    {
      key: 'verified',
      label: '3. Verificada e Inventariada',
      icon: CheckCircle2,
      color: 'emerald',
      title: 'Control de Calidad y Clasificación',
      desc: 'El equipo de voluntariado revisó buen estado y selló lote.'
    },
    {
      key: 'assigned',
      label: '4. Cargada en Camión',
      icon: Truck,
      color: 'indigo',
      title: 'Despacho Logístico en Ruta',
      desc: 'Cargada en el camión de la universidad rumbo a la comunidad.'
    },
    {
      key: 'delivered',
      label: '5. Entregada con Dignidad',
      icon: HeartHandshake,
      color: 'emerald',
      title: 'Distribución Final a Familias',
      desc: `Entregada formalmente a líderes en ${donation.destinationCommunity || 'comunidad'}.`
    }
  ];

  const statusOrder = ['pledged', 'received', 'verified', 'assigned', 'delivered'];
  const currentIndex = statusOrder.indexOf(donation.status);

  return (
    <div className="w-full">
      
      {/* Desktop Horizontal Stepper */}
      <div className="hidden lg:grid grid-cols-5 gap-2 relative">
        
        {/* Connecting progress line */}
        <div className="absolute top-6 left-12 right-12 h-1 bg-stone-200 -z-0">
          <div
            className="h-full bg-emerald-700 transition-all duration-700"
            style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-emerald-800 text-white shadow-lg ring-4 ring-emerald-200 scale-110'
                    : isCompleted
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="mt-3">
                <span
                  className={`text-xs font-bold block ${
                    isCurrent ? 'text-emerald-950 font-extrabold' : isCompleted ? 'text-stone-800' : 'text-stone-400'
                  }`}
                >
                  {step.label}
                </span>

                {donation.trackingHistory && donation.trackingHistory[idx] && donation.trackingHistory[idx].date && (
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold block mt-0.5">
                    {donation.trackingHistory[idx].date}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const historyEntry = donation.trackingHistory ? donation.trackingHistory[idx] : null;

          return (
            <div key={step.key} className="flex items-start gap-3.5 relative">
              
              {/* Vertical line connecting nodes */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-10 left-5 -ml-px w-0.5 h-10 ${
                    idx < currentIndex ? 'bg-emerald-700' : 'bg-stone-200'
                  }`}
                />
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 transition-all ${
                  isCurrent
                    ? 'bg-emerald-800 text-white ring-4 ring-emerald-100 shadow-md'
                    : isCompleted
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-400 border border-stone-200'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-emerald-950' : 'text-stone-800'}`}>
                    {step.label}
                  </span>
                  {historyEntry && historyEntry.date && (
                    <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {historyEntry.date}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  {historyEntry?.desc || step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
