import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  Shield, 
  User, 
  Package, 
  Sparkles, 
  Search, 
  LogOut, 
  CheckCircle,
  Truck,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCampaigns } from '../../context/CampaignContext';

export default function Navbar() {
  const { user, switchRole, logout, isAdmin, isManager, isVolunteer } = useAuth();
  const { openDonationModal } = useCampaigns();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Campañas', path: '/campaigns' },
    { name: 'Donar', path: '/donate' },
    { name: 'Rastrear Ayuda', path: '/tracking' },
    { name: 'Transparencia', path: '/impact' },
    { name: 'Voluntariado', path: '/volunteer' },
  ];

  const roleLabels = {
    donor: 'Donante / Comunidad',
    volunteer: 'Voluntario UVG',
    campaign_manager: 'Gestor de Campaña',
    admin: 'Administrador'
  };

  const roleBadgeColors = {
    donor: 'bg-stone-100 text-stone-700 border-stone-300',
    volunteer: 'bg-blue-100 text-blue-800 border-blue-300',
    campaign_manager: 'bg-amber-100 text-amber-900 border-amber-300',
    admin: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-stone-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center shadow-md group-hover:bg-emerald-800 transition-colors">
              <HeartHandshake className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight font-display">
                  UVG Solidaria
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-md">
                  Altiplano
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Universidad del Valle de Guatemala • Sololá
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-emerald-900 bg-emerald-50/80 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & User Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-2xs transition-all ${
                  roleBadgeColors[user?.role || 'donor']
                }`}
                title="Cambiar rol para demostración"
              >
                <User className="w-3.5 h-3.5" />
                <span>{roleLabels[user?.role || 'donor']}</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-stone-200 py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Modo Demostración (Roles)
                  </div>
                  {Object.entries(roleLabels).map(([roleKey, label]) => (
                    <button
                      key={roleKey}
                      onClick={() => {
                        switchRole(roleKey);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        user?.role === roleKey ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-stone-700'
                      }`}
                    >
                      <span>{label}</span>
                      {user?.role === roleKey && <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Portal Link based on Role */}
            {isAdmin || isManager ? (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Panel de Gestión</span>
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5 text-emerald-300" />
                <span>Mi Panel</span>
              </Link>
            )}

            {/* Direct Donation CTA */}
            <button
              onClick={() => openDonationModal(null, 'in_kind')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Donar Ahora</span>
            </button>

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => openDonationModal(null, 'in_kind')}
              className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold"
            >
              Donar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Cambiar Rol Demo:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleLabels).map(([roleKey, label]) => (
                <button
                  key={roleKey}
                  onClick={() => {
                    switchRole(roleKey);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 text-left rounded-lg text-xs font-medium border ${
                    user?.role === roleKey ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold' : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {label.split('/')[0]}
                </button>
              ))}
            </div>

            <div className="pt-2 flex gap-2">
              <Link
                to={isAdmin || isManager ? "/admin" : "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                {isAdmin || isManager ? "Panel de Gestión" : "Mi Panel"}
              </Link>
              <Link
                to="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold"
              >
                Hacer Donación
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
