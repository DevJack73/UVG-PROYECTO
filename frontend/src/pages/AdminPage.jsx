import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Package, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  MapPin, 
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  Building2,
  Edit,
  Trash2
} from 'lucide-react';
import { api } from '../services/api';
import { useCampaigns } from '../context/CampaignContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function AdminPage() {
  const { user } = useAuth();
  const { campaigns, collectionPoints, refreshAll } = useCampaigns();

  const [activeTab, setActiveTab] = useState('donations'); // 'overview', 'donations', 'campaigns', 'communities', 'audit'
  const [donations, setDonations] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Campaign Form Modal
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaignData, setNewCampaignData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    categorySlug: 'alimentos',
    communityName: 'Caserío Chuacruz, Sololá',
    organizer: 'Facultad de Ingeniería UVG',
    heroImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    itemGoalCount: 100,
    monetaryGoal: 10000,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: '2026-06-30',
    needs: [
      { id: 1, name: 'Bolsas de víveres', unit: 'bolsas', target: 100, current: 0, priority: 'high' }
    ]
  });

  // Milestone Update Modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCampaignIdForUpdate, setSelectedCampaignIdForUpdate] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateBody, setUpdateBody] = useState('');

  const loadData = async () => {
    try {
      const [dons, logs, comms] = await Promise.all([
        api.getDonations(),
        api.getAuditLogs(),
        api.getCommunities()
      ]);
      setDonations(dons);
      setAuditLogs(logs);
      setCommunities(comms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdvanceStatus = async (donationId, nextStatus) => {
    try {
      await api.updateDonationStatus(donationId, nextStatus, user?.email || 'admin@uvg.edu.gt');
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
      await loadData();
      await refreshAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      await api.createCampaign(newCampaignData, user?.email || 'admin@uvg.edu.gt');
      setShowNewCampaignModal(false);
      await loadData();
      await refreshAll();
      confetti({ particleCount: 70 });
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePublishUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.addCampaignUpdate(selectedCampaignIdForUpdate, {
        title: updateTitle,
        body: updateBody,
        milestoneType: 'items_verified'
      }, user?.email || 'admin@uvg.edu.gt');
      setShowUpdateModal(false);
      setUpdateTitle('');
      setUpdateBody('');
      await refreshAll();
      alert('¡Actualización de hito publicada con éxito!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-8">
      
      {/* Admin Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-stone-900 text-amber-400">
              Centro de Mando Administrativo
            </span>
            <span className="text-xs text-stone-500 font-medium">
              UVG Campus Altiplano
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display mt-1">
            Gestión Logística y Control de Donaciones
          </h1>
          <p className="text-xs text-stone-600">
            Operador activo: <strong className="text-stone-900">{user?.name}</strong> ({user?.email}) • Rol: <span className="uppercase font-bold text-emerald-900">{user?.role}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewCampaignModal(true)}
            className="py-2.5 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Nueva Campaña</span>
          </button>

          <button
            onClick={() => {
              if (campaigns.length > 0) {
                setSelectedCampaignIdForUpdate(campaigns[0].id);
                setShowUpdateModal(true);
              }
            }}
            className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publicar Hito</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex border-b border-stone-200 space-x-2 sm:space-x-4 overflow-x-auto text-xs font-bold">
        {[
          { id: 'donations', label: 'Verificación de Donaciones', icon: Package, count: donations.length },
          { id: 'campaigns', label: 'Gestor de Campañas', icon: BarChart3, count: campaigns.length },
          { id: 'communities', label: 'Comunidades Aliadas', icon: MapPin, count: communities.length },
          { id: 'audit', label: 'Bitácora de Auditoría', icon: ShieldCheck, count: auditLogs.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 rounded-t-xl flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-emerald-800 text-emerald-950 bg-white shadow-2xs font-extrabold'
                  : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DONATIONS VERIFICATION PIPELINE */}
      {activeTab === 'donations' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-display">
                Recepción, Verificación y Despacho en Ruta
              </h2>
              <p className="text-xs text-stone-500">
                Avanza el estado de cada donación conforme se procesa físicamente en el campus.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pledged (Pendiente de Entrega)
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ml-2" /> Received (En Campus)
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-2" /> Verified (Sellada)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Código</th>
                  <th className="pb-3">Donante</th>
                  <th className="pb-3">Campaña / Destino</th>
                  <th className="pb-3">Contenido / Insumos</th>
                  <th className="pb-3">Estado Actual</th>
                  <th className="pb-3 text-right">Avanzar Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {donations.map((don) => (
                  <tr key={don.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 font-mono font-bold text-emerald-950">
                      {don.donationCode}
                    </td>
                    <td className="py-4">
                      <div className="font-bold text-stone-900">{don.donorName}</div>
                      <div className="text-[11px] text-stone-500">{don.donorEmail}</div>
                    </td>
                    <td className="py-4">
                      <div className="font-semibold text-stone-800 max-w-[180px] truncate">{don.campaignTitle}</div>
                      <div className="text-[11px] text-stone-500">{don.destinationCommunity}</div>
                    </td>
                    <td className="py-4">
                      {don.donationType === 'in_kind' ? (
                        <div className="space-y-0.5">
                          {(don.items || []).map((it, idx) => (
                            <div key={idx} className="text-stone-800">
                              • <strong>{it.quantity} {it.unit}</strong> {it.name}
                            </div>
                          ))}
                          <div className="text-[10px] text-stone-500">Punto: {don.collectionPointName}</div>
                        </div>
                      ) : (
                        <div className="font-mono font-bold text-amber-700">
                          Q{Number(don.amount).toFixed(2)} ({don.paymentMethod})
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        don.status === 'delivered' || don.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : don.status === 'assigned'
                          ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                          : don.status === 'verified'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : don.status === 'received'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-100 text-stone-700 border border-stone-300'
                      }`}>
                        {don.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-1.5">
                      {don.status === 'pledged' && (
                        <button
                          onClick={() => handleAdvanceStatus(don.id, 'received')}
                          className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Confirmar Recepción
                        </button>
                      )}
                      {don.status === 'received' && (
                        <button
                          onClick={() => handleAdvanceStatus(don.id, 'verified')}
                          className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Verificar Insumos
                        </button>
                      )}
                      {don.status === 'verified' && (
                        <button
                          onClick={() => handleAdvanceStatus(don.id, 'assigned')}
                          className="px-2.5 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Cargar en Camión
                        </button>
                      )}
                      {don.status === 'assigned' && (
                        <button
                          onClick={() => handleAdvanceStatus(don.id, 'delivered')}
                          className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Entregar a Comunidad
                        </button>
                      )}
                      {don.status === 'delivered' && (
                        <span className="text-emerald-800 font-bold text-xs flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Entregada
                        </span>
                      )}
                      {don.status === 'completed' && (
                        <span className="text-emerald-800 font-bold text-xs flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Aporte Recibido
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGN MANAGER (CRUD) */}
      {activeTab === 'campaigns' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 font-display">
              Administración de Campañas Institucionales
            </h2>
            <button
              onClick={() => setShowNewCampaignModal(true)}
              className="py-2 px-3.5 bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" /> Nueva Campaña
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((camp) => (
              <div key={camp.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={camp.heroImage}
                    alt={camp.title}
                    className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {camp.categorySlug?.toUpperCase()}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm">{camp.title}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2">{camp.shortDescription}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <span>Meta: <strong>{camp.itemCollectedCount} / {camp.itemGoalCount} víveres</strong></span>
                  <button
                    onClick={() => {
                      setSelectedCampaignIdForUpdate(camp.id);
                      setShowUpdateModal(true);
                    }}
                    className="text-amber-700 hover:text-amber-900 font-bold"
                  >
                    + Publicar Hito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMMUNITIES */}
      {activeTab === 'communities' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-stone-900 font-display">
            Directorio de Comunidades y Puntos de Entrega en Sololá
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communities.map((comm) => (
              <div key={comm.id} className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-900 text-sm">{comm.name}</h3>
                  <span className="text-xs font-mono text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {comm.familiesCount} familias
                  </span>
                </div>
                <p className="text-xs text-stone-600">{comm.description}</p>
                <div className="text-xs text-stone-500 pt-2 border-t border-stone-100">
                  Enlace: <strong>{comm.contactPerson}</strong> ({comm.municipality}, {comm.department})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-stone-900 font-display">
            Registro de Auditoría de Operaciones
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase">
                  <th className="pb-3">Fecha</th>
                  <th className="pb-3">Usuario Operador</th>
                  <th className="pb-3">Acción</th>
                  <th className="pb-3">Entidad</th>
                  <th className="pb-3">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/50">
                    <td className="py-3 font-mono text-stone-500">{log.timestamp}</td>
                    <td className="py-3 font-semibold text-stone-900">{log.user}</td>
                    <td className="py-3 font-bold text-emerald-900">{log.action}</td>
                    <td className="py-3 font-mono">{log.entity}</td>
                    <td className="py-3 text-stone-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NEW CAMPAIGN MODAL */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <h3 className="text-xl font-bold font-display text-stone-900">
              Crear Nueva Campaña Social
            </h3>
            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Título de la Campaña:</label>
                <input
                  type="text"
                  required
                  value={newCampaignData.title}
                  onChange={(e) => setNewCampaignData({ ...newCampaignData, title: e.target.value })}
                  placeholder="Ej: Mochilas Solidarias Pachoj 2026"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Descripción Breve:</label>
                <textarea
                  required
                  rows={2}
                  value={newCampaignData.shortDescription}
                  onChange={(e) => setNewCampaignData({ ...newCampaignData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Comunidad Destino:</label>
                  <input
                    type="text"
                    required
                    value={newCampaignData.communityName}
                    onChange={(e) => setNewCampaignData({ ...newCampaignData, communityName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Organizador (Facultad/Carrera):</label>
                  <input
                    type="text"
                    required
                    value={newCampaignData.organizer}
                    onChange={(e) => setNewCampaignData({ ...newCampaignData, organizer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Meta Física (Víveres/Insumos):</label>
                  <input
                    type="number"
                    required
                    value={newCampaignData.itemGoalCount}
                    onChange={(e) => setNewCampaignData({ ...newCampaignData, itemGoalCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Fondo Monetario Objetivo (GTQ):</label>
                  <input
                    type="number"
                    value={newCampaignData.monetaryGoal}
                    onChange={(e) => setNewCampaignData({ ...newCampaignData, monetaryGoal: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  className="flex-1 py-2.5 border border-stone-300 rounded-xl text-stone-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-900 text-white rounded-xl font-bold"
                >
                  Guardar y Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLISH MILESTONE UPDATE MODAL */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <h3 className="text-xl font-bold font-display text-stone-900">
              Publicar Hito / Actualización de Campaña
            </h3>
            <form onSubmit={handlePublishUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Campaña:</label>
                <select
                  value={selectedCampaignIdForUpdate}
                  onChange={(e) => setSelectedCampaignIdForUpdate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-white"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Título del Hito:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Más de 200 paquetes clasificados en Bodega C-102"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Detalle de la Actualización:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe la jornada, voluntarios participantes o resultados de la entrega..."
                  value={updateBody}
                  onChange={(e) => setUpdateBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 py-2.5 border border-stone-300 rounded-xl text-stone-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl font-bold"
                >
                  Publicar Hito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
