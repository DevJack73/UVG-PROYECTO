import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          Marco Normativo y Ético
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display mt-2">
          Políticas de Privacidad, Términos y Transparencia
        </h1>
        <p className="text-stone-600 text-sm mt-2">
          Universidad del Valle de Guatemala • Campus Altiplano
        </p>
      </div>

      {/* Policy 1: Privacy by Design & Dignity */}
      <div id="privacy" className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-display">
          <Lock className="w-5 h-5" />
          <h2>1. Política de Privacidad y Dignidad Humana</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          En UVG Solidaria aplicamos el principio de <em>Privacidad desde el Diseño</em>. La información recopilada de los donantes (nombre, correo institucional y teléfono) se utiliza estrictamente para generar vouchers de entrega y remitir constancias oficiales de donación.
        </p>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
          <strong>Protección a Beneficiarios:</strong> Está terminantemente prohibido publicar nombres completos, fotografías de rostros de menores o direcciones residenciales de las familias receptoras. Toda la ayuda se canaliza mediante convenios formales con COCODEs y escuelas públicas.
        </div>
      </div>

      {/* Policy 2: Terms of Use */}
      <div id="terms" className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-display">
          <FileText className="w-5 h-5" />
          <h2>2. Términos y Condiciones de Uso</h2>
        </div>
        <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 list-disc pl-5 leading-relaxed">
          <li>Las donaciones en especie registradas constituyen un compromiso voluntario que debe entregarse en los puntos de acopio oficiales del Campus Altiplano.</li>
          <li>Los alimentos deben encontrarse en empaque original sellado, no perecederos y con un mínimo de 3 meses previos a su fecha de vencimiento.</li>
          <li>La ropa de abrigo donada debe encontrarse limpia, lavada y en excelente estado de conservación.</li>
          <li>Los aportes monetarios en el entorno sandbox académico son de carácter demostrativo y seguro.</li>
        </ul>
      </div>

      {/* Policy 3: Logistics & Auditing */}
      <div id="donations" className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-display">
          <ShieldCheck className="w-5 h-5" />
          <h2>3. Trazabilidad y Auditoría Institucional</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Cada entrega cuenta con una bitácora digital e historial de pesaje en bodega. Los informes consolidados se presentan periódicamente ante el Comité de Proyección Social de la Universidad y quedan a disposición para consulta en el Portal de Transparencia.
        </p>
      </div>

    </div>
  );
}
