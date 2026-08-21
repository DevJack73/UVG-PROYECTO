import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  QrCode, 
  ArrowRight, 
  FileText, 
  Award,
  Sparkles,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCampaigns } from '../context/CampaignContext';
import { api } from '../services/api';
import DonationTrackingTimeline from '../components/donations/DonationTrackingTimeline';

export default function DashboardPage() {
  const { user } = useAuth();
  const { openDonationModal, showVoucher } = useCampaigns();
  const [userDonations, setUserDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserDonations() {
      try {
        const list = await api.getDonations();
        // Filter or display relevant demo donations
        setUserDonations(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUserDonations();
  }, []);

  const latestDonation = userDonations[0];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-10">
      
      {/* User Header Profile Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-800 shadow-md shrink-0">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                {user?.name || 'Comunidad Universitaria'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                {user?.role?.toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Carnet/ID: <span className="font-mono font-bold text-stone-800">{user?.universityId}</span> • {user?.campus || 'Campus Altiplano'}
            </div>
            <div className="text-xs text-emerald-900 font-semibold mt-0.5">
              {user?.department}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => openDonationModal(null, 'in_kind')}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Donar Víveres</span>
          </button>
          <button
            onClick={() => openDonationModal(null, 'monetary')}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Aporte Q</span>
          </button>
        </div>
      </div>

      {/* Volunteer Hours Summary (if applicable) */}
      {user?.role === 'volunteer' && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-emerald-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Horas de Voluntariado Acumuladas
              </div>
              <div className="text-2xl font-extrabold font-display">
                {user.volunteerHours || 42} Horas Acreditadas
              </div>
            </div>
          </div>
          <Link
            to="/volunteer"
            className="py-2.5 px-4 bg-white text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-bold transition-all"
          >
            Ver Próximas Brigadas
          </Link>
        </div>
      )}

      {/* Latest Donation Real-Time Live Status */}
      {latestDonation && latestDonation.donationType === 'in_kind' && (
        <div className="glass-panel rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Trazabilidad Activa
              </span>
              <h2 className="text-lg font-bold text-stone-900 font-display mt-1">
                Tu donación más reciente: {latestDonation.donationCode}
              </h2>
              <div className="text-xs text-stone-500">
                Campaña: <strong>{latestDonation.campaignTitle}</strong>
              </div>
            </div>

            <Link
              to={`/tracking?code=${latestDonation.donationCode}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-lg"
            >
              Ver Trazabilidad Completa <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <DonationTrackingTimeline donation={latestDonation} />
        </div>
      )}

      {/* Complete Donation History Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <span>Historial de Donaciones Registradas</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Total: {userDonations.length} aportes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Código</th>
                <th className="pb-3">Campaña / Destino</th>
                <th className="pb-3">Tipo / Contenido</th>
                <th className="pb-3">Fecha</th>
                <th className="pb-3">Estado</th>
                <th className="pb-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {userDonations.map((don) => (
                <tr key={don.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-emerald-950">
                    {don.donationCode}
                  </td>
                  <td className="py-3.5">
                    <div className="font-bold text-stone-900 max-w-[200px] truncate">{don.campaignTitle}</div>
                    <div className="text-[11px] text-stone-500">{don.destinationCommunity}</div>
                  </td>
                  <td className="py-3.5">
                    {don.donationType === 'in_kind' ? (
                      <span className="text-stone-800 font-semibold">
                        {(don.items || []).map(i => `${i.quantity} ${i.name}`).join(', ')}
                      </span>
                    ) : (
                      <span className="font-bold text-amber-700 font-mono">
                        Q{Number(don.amount).toFixed(2)} (Sandbox)
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 font-mono text-stone-500">{don.createdAt}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      don.status === 'delivered' || don.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : don.status === 'verified'
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : don.status === 'received'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-stone-100 text-stone-700 border border-stone-300'
                    }`}>
                      {don.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {don.donationType === 'in_kind' ? (
                      <button
                        onClick={() => showVoucher(don)}
                        className="p-1.5 text-emerald-800 hover:text-emerald-950 font-bold hover:bg-emerald-50 rounded-lg"
                        title="Ver voucher digital"
                      >
                        <QrCode className="w-4 h-4 inline" /> Voucher
                      </button>
                    ) : (
                      <Link
                        to={`/tracking?code=${don.donationCode}`}
                        className="text-stone-600 hover:text-emerald-800 font-semibold"
                      >
                        Detalles
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
