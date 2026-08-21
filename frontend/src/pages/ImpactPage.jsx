import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Package, 
  Users, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Building2,
  Lock
} from 'lucide-react';
import { api } from '../services/api';
import { useCampaigns } from '../context/CampaignContext';

export default function ImpactPage() {
  const { impactStats, campaigns } = useCampaigns();
  const [auditLogs, setAuditLogs] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [logs, comms] = await Promise.all([
          api.getAuditLogs(),
          api.getCommunities()
        ]);
        setAuditLogs(logs);
        setCommunities(comms);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Rendición de Cuentas Institucional
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display mt-2">
          Portal de Transparencia e Impacto Social
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          En la Universidad del Valle de Guatemala creemos en una gestión 100% auditable. Conoce en cifras reales cómo se moviliza la ayuda solidaria.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-display">
            {impactStats?.totalItemsDelivered || '814'}
          </div>
          <div className="text-xs font-semibold text-stone-600 mt-1">Paquetes e Insumos Entregados</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-display">
            {impactStats?.familiesBenefited || '440'}
          </div>
          <div className="text-xs font-semibold text-stone-600 mt-1">Familias Respaldadas</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center mx-auto mb-3">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display">
            Q{Number(impactStats?.totalMonetaryCollectedGTQ || 55650).toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-stone-600 mt-1">Fondos Solidarios Auditados</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-display">
            {impactStats?.communitiesSupported || '4'}
          </div>
          <div className="text-xs font-semibold text-stone-600 mt-1">Comunidades de Sololá</div>
        </div>
      </div>

      {/* Verified Communities Supported */}
      <div className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Comunidades y Sectores en Alianza
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Coordinación directa con Consejos Comunitarios de Desarrollo (COCODEs) y directores de escuelas públicas.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Convenios Activos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.map((comm) => (
            <div key={comm.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{comm.name}</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {comm.municipality}, {comm.department}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {comm.description}
              </p>
              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
                <span>Enlace Comunitario: <strong>{comm.contactPerson}</strong></span>
                <span className="font-mono text-emerald-900 font-bold">{comm.familiesCount} hogares</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dignified Privacy Principles Banner */}
      <div className="p-8 rounded-3xl bg-stone-900 text-white space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
          <Lock className="w-4 h-4" />
          <span>Política de Privacidad y Dignidad Humana</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
          Por qué no publicamos fotografías ni datos identificables de familias vulnerables
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
          En estricto apego al marco ético universitario y los estándares internacionales de derechos humanos, la plataforma de UVG Altiplano prohíbe el uso de imágenes invasivas o basadas en la compasión. La transparencia se demuestra mediante actas de recepción comunitaria, auditorías financieras, pesajes en bodega y validación técnica por docentes y directores de carrera.
        </p>
      </div>

      {/* Public Audit Log */}
      <div className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900 font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <span>Registro Público de Operaciones Auditadas</span>
          </h2>
          <span className="text-xs font-mono text-stone-500">
            Log Blockchain / DB Seguro
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Fecha y Hora</th>
                <th className="pb-3">Acción Operativa</th>
                <th className="pb-3">Entidad / Registro</th>
                <th className="pb-3">Detalle / Verificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/50">
                  <td className="py-3 font-mono text-stone-500">{log.timestamp}</td>
                  <td className="py-3 font-bold text-emerald-900">{log.action}</td>
                  <td className="py-3 font-mono">{log.entity}</td>
                  <td className="py-3 text-stone-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
