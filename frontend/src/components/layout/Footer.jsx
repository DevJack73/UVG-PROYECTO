import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, MapPin, Mail, Phone, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1 & 2: Institutional Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
                <HeartHandshake className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight font-display">
                  UVG Solidaria
                </span>
                <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
                  Campus Altiplano
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed pr-6">
              Plataforma institucional de proyección social y ayuda comunitaria liderada por estudiantes, docentes y colaboradores de la Universidad del Valle de Guatemala, Campus Altiplano (Sololá). Conectamos la solidaridad universitaria con causas verificadas en las comunidades del altiplano occidental.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Gestión de donaciones responsable y 100% auditable</span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-display">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/campaigns" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Campañas Activas
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Cómo Donar Víveres o Fondos
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Rastrear Mi Donación (Código)
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Portal de Transparencia
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Programa de Voluntariado UVG
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sololá Campus Locations */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-display">
              Puntos de Acopio
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Lobby Principal — Edificio A, Nivel 1 (07:30 - 17:30)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Bodega de Logística C-102 (Área de Talleres)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Módulo de Biblioteca — Edificio B, Nivel 2</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Academic Note */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-display">
              Contacto Campus
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>solidaridad.altiplano@uvg.edu.gt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+502 7762-4100 Ext. 104</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Cantón Molino, Sololá, Guatemala</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} UVG Solidaria — Iniciativa de la Universidad del Valle de Guatemala (Campus Altiplano).
          </p>

          <div className="flex items-center gap-4">
            <Link to="/legal#privacy" className="hover:text-stone-400 transition-colors">
              Política de Privacidad
            </Link>
            <span>•</span>
            <Link to="/legal#terms" className="hover:text-stone-400 transition-colors">
              Términos de Uso
            </Link>
            <span>•</span>
            <Link to="/legal#donations" className="hover:text-stone-400 transition-colors">
              Transparencia y Dignidad
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
