import React from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  QrCode, 
  Printer, 
  Calendar, 
  Package, 
  ArrowRight, 
  ShieldCheck,
  Share2
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';
import { Link } from 'react-router-dom';

export default function DonationVoucherModal() {
  const { voucherModalOpen, setVoucherModalOpen, currentVoucherData } = useCampaigns();

  if (!voucherModalOpen || !currentVoucherData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Banner */}
        <div className="bg-emerald-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Universidad del Valle de Guatemala • Campus Altiplano
              </div>
              <h3 className="font-extrabold text-sm sm:text-base font-display">
                Voucher Digital de Entrega de Donación
              </h3>
            </div>
          </div>
          <button
            onClick={() => setVoucherModalOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher Ticket Body */}
        <div className="p-6 space-y-5">
          
          {/* Tracking Code Badge & QR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-dashed border-stone-300">
            <div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Código Único de Trazabilidad:
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-mono tracking-tight">
                {currentVoucherData.donationCode}
              </div>
              <div className="text-[11px] text-stone-600 mt-0.5">
                Donante: <span className="font-bold text-stone-800">{currentVoucherData.donorName}</span>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="w-20 h-20 p-1.5 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col items-center justify-center shrink-0">
              <QrCode className="w-14 h-14 text-emerald-900" />
              <span className="text-[8px] font-mono font-bold text-stone-500">ESCANEABLE</span>
            </div>
          </div>

          {/* Destination & Campaign */}
          <div className="text-xs space-y-1">
            <span className="text-stone-500 font-medium">Campaña Asignada:</span>
            <div className="font-bold text-stone-900 text-sm">
              {currentVoucherData.campaignTitle}
            </div>
            <div className="text-emerald-800 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Destino: {currentVoucherData.destinationCommunity}
            </div>
          </div>

          {/* Items to deliver */}
          <div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Víveres / Insumos Registrados:
            </div>
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 divide-y divide-stone-200/60 text-xs">
              {(currentVoucherData.items || []).map((item, i) => (
                <div key={i} className="py-1.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <span className="font-semibold text-stone-800">{item.name}</span>
                  <span className="font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Drop-Off Location & Instructions */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Instrucciones para la Entrega en Campus:</span>
            </div>
            <p className="text-emerald-900/90 leading-relaxed">
              Presenta este voucher digital (o código) en el punto de acopio:{' '}
              <strong>{currentVoucherData.collectionPointName}</strong>. El voluntario receptor escaneará el código y verificará tus artículos.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <Link
              to={`/tracking?code=${currentVoucherData.donationCode}`}
              onClick={() => setVoucherModalOpen(false)}
              className="w-full sm:flex-1 py-3 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold text-center shadow-sm flex items-center justify-center gap-2"
            >
              <span>Ver Línea de Tiempo en Vivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto py-3 px-4 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
