import React, { useState } from 'react';
import { Search, Filter, Sparkles, MapPin, Package, HeartHandshake } from 'lucide-react';
import CampaignCard from '../components/campaigns/CampaignCard';
import { useCampaigns } from '../context/CampaignContext';

export default function CampaignsPage() {
  const { campaigns, categories, openDonationModal } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCategory = selectedCategory === 'all' || camp.categorySlug === selectedCategory || camp.categoryId === Number(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || camp.status === selectedStatus;
    const matchesSearch = 
      camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.communityName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Catálogo Oficial de Proyección Social
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display mt-2">
          Campañas de Ayuda Comunitaria
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Iniciativas lideradas por facultades y carreras de UVG Campus Altiplano para apoyar a comunidades y escuelas rurales de Sololá.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, comunidad o necesidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Status Selector */}
          <div className="w-full sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activas (En recolección)</option>
              <option value="completed">Completadas</option>
            </select>
          </div>

        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Categorías:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Todas ({campaigns.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCampaigns.map((camp) => (
          <CampaignCard key={camp.id} campaign={camp} />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-bold text-stone-700 text-base">No se encontraron campañas</h3>
          <p className="text-xs text-stone-500 mt-1">
            Prueba ajustando los filtros de búsqueda o categoría.
          </p>
        </div>
      )}

    </div>
  );
}
