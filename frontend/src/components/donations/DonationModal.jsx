import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  CreditCard, 
  CheckCircle2, 
  MapPin, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Trash2,
  Calendar,
  Lock
} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

export default function DonationModal() {
  const { 
    donationModalOpen, 
    closeDonationModal, 
    selectedCampaignForDonation, 
    activeDonationType, 
    setActiveDonationType,
    campaigns,
    collectionPoints,
    showVoucher,
    showReceipt
  } = useCampaigns();

  const { user } = useAuth();

  const [campaignId, setCampaignId] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorType, setDonorType] = useState('Estudiante UVG');
  
  // In-Kind Items State
  const [items, setItems] = useState([
    { name: '', quantity: 1, unit: 'unidades' }
  ]);
  const [collectionPointId, setCollectionPointId] = useState('');
  const [notes, setNotes] = useState('');

  // Monetary State
  const [amount, setAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('•••');
  const [cardHolder, setCardHolder] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCampaignForDonation) {
      setCampaignId(selectedCampaignForDonation.id);
    } else if (campaigns.length > 0) {
      setCampaignId(campaigns[0].id);
    }
  }, [selectedCampaignForDonation, campaigns]);

  useEffect(() => {
    if (user) {
      setDonorName(user.name || '');
      setDonorEmail(user.email || '');
      setCardHolder(user.name || '');
      setDonorType(user.role === 'volunteer' ? 'Voluntario UVG' : 'Estudiante UVG');
    }
    if (collectionPoints.length > 0 && !collectionPointId) {
      setCollectionPointId(collectionPoints[0].id);
    }
  }, [user, collectionPoints]);

  if (!donationModalOpen) return null;

  const currentCampaign = campaigns.find(c => c.id === Number(campaignId)) || selectedCampaignForDonation || campaigns[0];

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: 'unidades' }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index, field, value) => {
    const next = [...items];
    next[index][field] = value;
    setItems(next);
  };

  const handleSubmitInKind = async (e) => {
    e.preventDefault();
    setError(null);

    const validItems = items.filter(i => i.name.trim() !== '');
    if (validItems.length === 0) {
      setError('Por favor especifica al menos un artículo o vívere para donar.');
      return;
    }

    setSubmitting(true);
    try {
      const selectedPoint = collectionPoints.find(p => p.id === Number(collectionPointId)) || collectionPoints[0];
      const res = await api.createInKindDonation({
        campaignId: Number(campaignId),
        donorName: donorName || 'Estudiante Solidario UVG',
        donorEmail: donorEmail || 'anonimo@uvg.edu.gt',
        donorType,
        items: validItems,
        collectionPointId: selectedPoint?.id,
        collectionPointName: selectedPoint?.name,
        notes
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      closeDonationModal();
      showVoucher(res);
    } catch (err) {
      setError(err.message || 'Error al registrar la donación.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitMonetary = async (e) => {
    e.preventDefault();
    setError(null);

    const finalAmount = customAmount ? Number(customAmount) : Number(amount);
    if (!finalAmount || finalAmount <= 0) {
      setError('Por favor ingresa un monto válido en Quetzales.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createMonetaryDonation({
        campaignId: Number(campaignId),
        donorName: donorName || 'Donante Solidario UVG',
        donorEmail: donorEmail || 'donante@uvg.edu.gt',
        donorType,
        amount: finalAmount,
        paymentMethod: 'Tarjeta Crédito/Débito (Sandbox UVG)',
        notes
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });

      closeDonationModal();
      showReceipt(res);
    } catch (err) {
      setError(err.message || 'Error al procesar la donación monetaria.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-emerald-900 to-stone-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase rounded">
                Canal Solidario UVG
              </span>
              <span className="text-xs text-emerald-200 font-medium">
                {currentCampaign?.communityName?.split(',')[0]}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
              Realizar una Donación
            </h2>
          </div>
          <button
            onClick={closeDonationModal}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Donation Type Switcher (In-Kind vs Monetary) */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={() => setActiveDonationType('in_kind')}
            className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeDonationType === 'in_kind'
                ? 'border-emerald-800 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-700" />
            <span>Donar Víveres o Insumos (En Especie)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDonationType('monetary')}
            className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeDonationType === 'monetary'
                ? 'border-amber-600 text-amber-950 bg-white shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Aporte Monetario (Sandbox Seguro)</span>
          </button>
        </div>

        {error && (
          <div className="mx-6 sm:mx-8 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Content Form */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* Target Campaign Selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Campaña a Apoyar:
            </label>
            <select
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.communityName.split(',')[0]})
                </option>
              ))}
            </select>
            {currentCampaign?.needs && currentCampaign.needs.length > 0 && (
              <div className="mt-2 text-xs text-stone-500">
                <span className="font-semibold text-emerald-800">Insumos prioritarios requeridos:</span>{' '}
                {currentCampaign.needs.map(n => `${n.name} (${n.current}/${n.target} ${n.unit})`).join(' • ')}
              </div>
            )}
          </div>

          {/* ================= FORM A: IN-KIND DONATION ================= */}
          {activeDonationType === 'in_kind' ? (
            <form onSubmit={handleSubmitInKind} className="space-y-5">
              
              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Artículos a Entregar:
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Agregar otro artículo
                  </button>
                </div>

                <div className="space-y-2.5">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ej: Frijol negro, Mochilas, Cuadernos..."
                        value={item.name}
                        onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                        required
                        className="flex-3 px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Cant."
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        required
                        className="w-20 px-2.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 text-center focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                        className="flex-1 px-2.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-700 bg-white"
                      >
                        <option value="unidades">unidades</option>
                        <option value="bolsas">bolsas (5 lbs)</option>
                        <option value="cajas">cajas</option>
                        <option value="paquetes">paquetes</option>
                        <option value="prendas">prendas</option>
                        <option value="kits">kits</option>
                      </select>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Campus Collection Point Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Punto de Acopio en UVG Altiplano:
                </label>
                <div className="space-y-2">
                  {collectionPoints.map((point) => (
                    <label
                      key={point.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        Number(collectionPointId) === point.id
                          ? 'border-emerald-700 bg-emerald-50/50 shadow-xs'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="collectionPoint"
                        value={point.id}
                        checked={Number(collectionPointId) === point.id}
                        onChange={(e) => setCollectionPointId(e.target.value)}
                        className="mt-1 text-emerald-800 focus:ring-emerald-700"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-stone-900">{point.name}</div>
                        <div className="text-stone-500">{point.building} • {point.schedule}</div>
                        <div className="text-emerald-800 text-[11px] font-medium mt-0.5">
                          Responsable: {point.responsibleContact}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Donor Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Correo UVG / Personal:</label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{submitting ? 'Generando Voucher...' : 'Confirmar Compromiso y Obtener Voucher Digital'}</span>
                </button>
                <p className="text-center text-[11px] text-stone-500 mt-2">
                  Se generará una constancia con código QR para presentar al momento de entregar los víveres en el campus.
                </p>
              </div>

            </form>
          ) : (
            
            /* ================= FORM B: MONETARY SANDBOX DONATION ================= */
            <form onSubmit={handleSubmitMonetary} className="space-y-5">
              
              {/* Amount Presets */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Selecciona el Monto en Quetzales (GTQ):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['50', '100', '250', '500', '1000'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl border text-sm font-bold transition-all ${
                        amount === val && !customAmount
                          ? 'border-amber-600 bg-amber-500 text-stone-950 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Q{val}
                    </button>
                  ))}
                </div>

                <div className="mt-2.5">
                  <input
                    type="number"
                    min="10"
                    placeholder="O ingresa otro monto personalizado (ej: Q350)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount('');
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800"
                  />
                </div>
              </div>

              {/* Secure Sandbox Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Entorno de Demostración Sandbox</div>
                  <div className="text-amber-800 text-[11px]">
                    Este prototipo procesa donaciones seguras de prueba. No se realizan cargos reales ni se almacenan tarjetas en bases de datos.
                  </div>
                </div>
              </div>

              {/* Sandbox Card Form */}
              <div className="space-y-3 p-4 rounded-2xl border border-stone-200 bg-stone-50/60">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Nombre en la tarjeta:</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                    placeholder="Nombre del Titular"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">Número de Tarjeta (Demo):</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">Vence / CVC:</label>
                    <input
                      type="text"
                      value={`${cardExp} • ${cardCvc}`}
                      readOnly
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-500 bg-stone-100 font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Donor Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Correo para Recibo:</label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tipo de Donante:</label>
                  <select
                    value={donorType}
                    onChange={(e) => setDonorType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white"
                  >
                    <option value="Estudiante UVG">Estudiante UVG</option>
                    <option value="Docente / Catedrático">Docente / Catedrático</option>
                    <option value="Personal Administrativo">Personal Administrativo</option>
                    <option value="Egresado UVG (Alumni)">Egresado UVG (Alumni)</option>
                    <option value="Amigo / Donante Externo">Amigo / Donante Externo</option>
                  </select>
                </div>
              </div>

              {/* Submit Monetary */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {submitting
                      ? 'Procesando aporte...'
                      : `Aportar Q${customAmount || amount}.00 a la Campaña`}
                  </span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
