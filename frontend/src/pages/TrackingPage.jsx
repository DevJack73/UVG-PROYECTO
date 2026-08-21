import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Package, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Building2, 
  Calendar, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import DonationTrackingTimeline from '../components/donations/DonationTrackingTimeline';

export default function TrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const [code, setCode] = useState(initialCode);
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracking = async (trackingCode) => {
    if (!trackingCode.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const found = await api.getDonationByCode(trackingCode);
      if (found) {
        setDonation(found);
      } else {
        setDonation(null);
        setError('No se encontró ninguna donación con el código ingresado. Verifica que coincida con tu voucher (ej: DON-2026-0089).');
      }
    } catch (err) {
      setError('Error al consultar el servicio de trazabilidad.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchTracking(initialCode);
    } else {
      // Default demo tracking
      fetchTracking('DON-2026-0089');
    }
  }, [initialCode]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ code });
    fetchTracking(code);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Trazabilidad y Transparencia
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display mt-2">
          Rastrear Ruta de Mi Donación
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-1">
          Ingresa tu código de voucher para conocer el estado exacto de tus víveres desde su recepción en el campus hasta la entrega a las familias.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
        <div className="flex gap-2 p-1.5 rounded-2xl bg-white border border-stone-300 shadow-md focus-within:ring-2 focus-within:ring-emerald-700">
          <div className="relative flex-1 flex items-center pl-3">
            <Search className="w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Ej: DON-2026-0089"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 text-sm text-stone-900 font-mono font-bold focus:outline-none uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Consultando...' : 'Rastrear'}
          </button>
        </div>

        {/* Demo Code Quick Buttons */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-stone-500">
          <span>Códigos de prueba:</span>
          {['DON-2026-0089', 'DON-2026-0112', 'DON-2026-0125'].map((demoCode) => (
            <button
              key={demoCode}
              type="button"
              onClick={() => {
                setCode(demoCode);
                setSearchParams({ code: demoCode });
                fetchTracking(demoCode);
              }}
              className="font-mono text-emerald-800 hover:underline font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
            >
              {demoCode}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 max-w-xl mx-auto mb-8">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Tracking Result Card */}
      {donation && (
        <div className="glass-panel rounded-3xl border border-stone-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          
          {/* Top Banner */}
          <div className="p-6 sm:p-8 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500 text-stone-950 text-xs font-extrabold rounded-md uppercase font-mono">
                  {donation.donationCode}
                </span>
                <span className="text-xs text-stone-300">
                  {donation.donationType === 'in_kind' ? 'Donación en Especie' : 'Aporte Monetario'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
                {donation.campaignTitle}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Destino: {donation.destinationCommunity}</span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-300">
              <div>Donante: <strong className="text-white">{donation.donorName}</strong></div>
              <div className="text-stone-400 text-[11px] mt-0.5">Registrado: {donation.createdAt}</div>
            </div>
          </div>

          {/* 5-Step Visual Timeline */}
          <div className="p-6 sm:p-10 border-b border-stone-200 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-8 text-center sm:text-left">
              Progreso Logístico en Tiempo Real
            </h3>
            <DonationTrackingTimeline donation={donation} />
          </div>

          {/* Details & Items List */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/50">
            
            {/* Left: Items Summary */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-800" />
                <span>Artículos / Insumos en este Lote</span>
              </h4>

              {donation.items && donation.items.length > 0 ? (
                <div className="divide-y divide-stone-100 text-xs">
                  {donation.items.map((item, i) => (
                    <div key={i} className="py-2 flex justify-between items-center">
                      <span className="font-semibold text-stone-800">{item.name}</span>
                      <span className="font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-stone-600">
                  Monto: <strong>Q{donation.amount}</strong> ({donation.paymentMethod})
                </div>
              )}
            </div>

            {/* Right: Drop-Off & Delivery Point Info */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-800" />
                <span>Punto de Recepción en Campus</span>
              </h4>
              <div className="text-xs space-y-1 text-stone-600">
                <div className="font-semibold text-stone-900">{donation.collectionPointName || 'Edificio Central'}</div>
                <p>Campus Altiplano, Universidad del Valle de Guatemala (Sololá)</p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verificado por equipo de voluntariado UVG</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
