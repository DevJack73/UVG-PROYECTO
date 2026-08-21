import React from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  Building2,
  Lock
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';
import { Link } from 'react-router-dom';

export default function ReceiptModal() {
  const { receiptModalOpen, setReceiptModalOpen, currentReceiptData } = useCampaigns();

  if (!receiptModalOpen || !currentReceiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-stone-900 px-6 py-5 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              Q
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Constancia de Aporte Solidario
              </div>
              <h3 className="font-extrabold text-sm sm:text-base font-display text-white">
                Recibo Digital Oficial
              </h3>
            </div>
          </div>
          <button
            onClick={() => setReceiptModalOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Ticket */}
        <div className="p-6 space-y-5">
          
          {/* Main Amount Card */}
          <div className="text-center p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest">
              Aporte Procesado con Éxito
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display mt-1">
              Q{Number(currentReceiptData.amount).toFixed(2)}
            </div>
            <div className="text-xs text-stone-500 font-mono mt-1">
              Ref. Transacción: {currentReceiptData.transactionRef}
            </div>
          </div>

          {/* Breakdown Info */}
          <div className="space-y-3 text-xs border-y border-stone-200 py-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Donante:</span>
              <span className="font-bold text-stone-800">{currentReceiptData.donorName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Correo Electrónico:</span>
              <span className="font-medium text-stone-800">{currentReceiptData.donorEmail}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Campaña:</span>
              <span className="font-bold text-emerald-900 text-right max-w-[220px] truncate">
                {currentReceiptData.campaignTitle}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Método de Pago:</span>
              <span className="font-medium text-stone-700 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                {currentReceiptData.paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Fecha y Hora:</span>
              <span className="font-mono text-stone-600">{currentReceiptData.createdAt}</span>
            </div>
          </div>

          {/* Institutional Transparency Guarantee */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              Este aporte queda registrado en el fondo auditado de proyección comunitaria de UVG Altiplano.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={() => setReceiptModalOpen(false)}
              className="w-full sm:flex-1 py-3 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold text-center shadow-sm"
            >
              Listo / Cerrar
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto py-3 px-4 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Recibo</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
