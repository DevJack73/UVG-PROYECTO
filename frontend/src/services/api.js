import {
  INITIAL_CAMPAIGNS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTION_POINTS,
  INITIAL_COMMUNITIES,
  INITIAL_DONATIONS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  IMPACT_METRICS
} from './mockData';

// Local storage key constants for reactive database persistence
const STORAGE_KEYS = {
  CAMPAIGNS: 'uvg_aid_campaigns',
  DONATIONS: 'uvg_aid_donations',
  USERS: 'uvg_aid_users',
  CATEGORIES: 'uvg_aid_categories',
  COLLECTION_POINTS: 'uvg_aid_collection_points',
  COMMUNITIES: 'uvg_aid_communities',
  AUDIT_LOGS: 'uvg_aid_audit_logs',
  CURRENT_USER: 'uvg_aid_current_user',
  TOKEN: 'uvg_aid_auth_token'
};

// Initialize LocalStorage with seed data if not present
function initializeStore() {
  if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COLLECTION_POINTS)) {
    localStorage.setItem(STORAGE_KEYS.COLLECTION_POINTS, JSON.stringify(INITIAL_COLLECTION_POINTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMUNITIES)) {
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(INITIAL_COMMUNITIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
  }
}

initializeStore();

function getItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Storage read error:', e);
    return fallback;
  }
}

function setItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

function logAudit(action, entity, details, userEmail = 'system') {
  const logs = getItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  const now = new Date();
  const newLog = {
    id: Date.now(),
    timestamp: now.toISOString().replace('T', ' ').substring(0, 16),
    user: userEmail,
    action,
    entity,
    details
  };
  const updatedLogs = [newLog, ...logs];
  setItem(STORAGE_KEYS.AUDIT_LOGS, updatedLogs);
}

// REST API Service layer
export const api = {
  // --- AUTHENTICATION ---
  async login(email, password) {
    await new Promise(r => setTimeout(r, 400));
    const users = getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      const token = 'sanctum_mock_token_' + Math.random().toString(36).substring(2);
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      logAudit('AUTH_LOGIN', `User #${user.id}`, `Inicio de sesión exitoso como ${user.role}`, user.email);
      return { success: true, token, user };
    }
    throw new Error('Credenciales inválidas. Por favor verifique su correo institucional UVG.');
  },

  async register(userData) {
    await new Promise(r => setTimeout(r, 500));
    const users = getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Ya existe una cuenta con este correo institucional.');
    }
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'donor',
      universityId: userData.universityId || 'UVG-' + Math.floor(100000 + Math.random() * 900000),
      campus: 'Campus Altiplano',
      department: userData.department || 'Comunidad Universitaria',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    const token = 'sanctum_mock_token_' + Math.random().toString(36).substring(2);
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    logAudit('AUTH_REGISTER', `User #${newUser.id}`, `Registro de nuevo usuario: ${newUser.name}`, newUser.email);
    return { success: true, token, user: newUser };
  },

  async getCurrentUser() {
    const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userJson ? JSON.parse(userJson) : null;
  },

  async logout() {
    const user = await this.getCurrentUser();
    if (user) {
      logAudit('AUTH_LOGOUT', `User #${user.id}`, 'Cierre de sesión', user.email);
    }
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return { success: true };
  },

  // Switch role quickly in demo mode
  async switchDemoUser(role) {
    const users = getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    const target = users.find(u => u.role === role) || users[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(target));
    return target;
  },

  // --- CAMPAIGNS ---
  async getCampaigns(filters = {}) {
    await new Promise(r => setTimeout(r, 200));
    let list = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    
    if (filters.category && filters.category !== 'all') {
      list = list.filter(c => c.categorySlug === filters.category || c.categoryId === Number(filters.category));
    }
    if (filters.status && filters.status !== 'all') {
      list = list.filter(c => c.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.shortDescription.toLowerCase().includes(q) ||
        c.communityName.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getCampaignBySlug(slug) {
    await new Promise(r => setTimeout(r, 200));
    const list = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    return list.find(c => c.slug === slug || String(c.id) === String(slug)) || null;
  },

  async createCampaign(campaignData, userEmail = 'admin@uvg.edu.gt') {
    await new Promise(r => setTimeout(r, 400));
    const list = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const slug = campaignData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      slug,
      monetaryCollected: 0,
      itemCollectedCount: 0,
      itemGoalCount: (campaignData.needs || []).reduce((sum, n) => sum + (Number(n.target) || 0), 0) || 100,
      status: 'active',
      isFeatured: campaignData.isFeatured || false,
      updates: []
    };
    const updated = [newCampaign, ...list];
    setItem(STORAGE_KEYS.CAMPAIGNS, updated);
    logAudit('CREATE_CAMPAIGN', `Campaign #${newCampaign.id}`, `Creada campaña: ${newCampaign.title}`, userEmail);
    return newCampaign;
  },

  async updateCampaign(id, campaignData, userEmail = 'admin@uvg.edu.gt') {
    await new Promise(r => setTimeout(r, 300));
    const list = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const index = list.findIndex(c => c.id === Number(id));
    if (index === -1) throw new Error('Campaña no encontrada');
    
    list[index] = { ...list[index], ...campaignData, updatedAt: new Date().toISOString() };
    setItem(STORAGE_KEYS.CAMPAIGNS, list);
    logAudit('UPDATE_CAMPAIGN', `Campaign #${id}`, `Actualizada información de campaña`, userEmail);
    return list[index];
  },

  async addCampaignUpdate(campaignId, updateData, userEmail = 'admin@uvg.edu.gt') {
    await new Promise(r => setTimeout(r, 300));
    const list = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const campaign = list.find(c => c.id === Number(campaignId));
    if (!campaign) throw new Error('Campaña no encontrada');
    
    const newUpdate = {
      id: Date.now(),
      date: new Date().toISOString().substring(0, 10),
      title: updateData.title,
      body: updateData.body,
      milestoneType: updateData.milestoneType || 'items_verified',
      mediaUrls: updateData.mediaUrls || []
    };
    campaign.updates = [newUpdate, ...(campaign.updates || [])];
    setItem(STORAGE_KEYS.CAMPAIGNS, list);
    logAudit('ADD_UPDATE', `Campaign #${campaignId}`, `Publicada actualización de hito: ${newUpdate.title}`, userEmail);
    return newUpdate;
  },

  // --- DONATIONS & LOGISTICS ---
  async getDonations(filters = {}) {
    await new Promise(r => setTimeout(r, 200));
    let list = getItem(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    if (filters.status && filters.status !== 'all') {
      list = list.filter(d => d.status === filters.status);
    }
    if (filters.type && filters.type !== 'all') {
      list = list.filter(d => d.donationType === filters.type);
    }
    if (filters.campaignId) {
      list = list.filter(d => d.campaignId === Number(filters.campaignId));
    }
    if (filters.userEmail) {
      list = list.filter(d => d.donorEmail.toLowerCase() === filters.userEmail.toLowerCase());
    }
    return list;
  },

  async getDonationByCode(code) {
    await new Promise(r => setTimeout(r, 200));
    const list = getItem(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    return list.find(d => d.donationCode.toUpperCase() === code.trim().toUpperCase()) || null;
  },

  async createInKindDonation(donationData) {
    await new Promise(r => setTimeout(r, 400));
    const donations = getItem(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    const campaigns = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const campaign = campaigns.find(c => c.id === Number(donationData.campaignId));

    const donationCode = `DON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-GT', { day: '2-digit', month: 'short' }) + ', ' + now.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' });

    const newDonation = {
      id: Date.now(),
      donationCode,
      donorName: donationData.donorName || 'Estudiante Solidario UVG',
      donorEmail: donationData.donorEmail || 'anonimo@uvg.edu.gt',
      donorType: donationData.donorType || 'Comunidad Universitaria',
      campaignId: donationData.campaignId,
      campaignTitle: campaign ? campaign.title : 'Campaña Solidaria',
      campaignSlug: campaign ? campaign.slug : '',
      donationType: 'in_kind',
      items: donationData.items || [],
      collectionPointId: donationData.collectionPointId,
      collectionPointName: donationData.collectionPointName || 'Edificio Central — Lobby Principal',
      status: 'pledged',
      createdAt: now.toISOString().substring(0, 16).replace('T', ' '),
      destinationCommunity: campaign ? campaign.communityName : 'Comunidad Altiplano',
      notes: donationData.notes || '',
      trackingHistory: [
        { status: 'pledged', label: 'Registrada', date: formattedDate, desc: 'Voucher digital generado. Listo para entrega en campus.', icon: 'FileText' },
        { status: 'received', label: 'Pendiente de Entrega', date: 'En espera', desc: `Presentar en: ${donationData.collectionPointName || 'Lobby Central'}`, icon: 'Building2' },
        { status: 'verified', label: 'Pendiente', date: '-', desc: 'Control de calidad y pesaje.', icon: 'CheckCircle2' },
        { status: 'assigned', label: 'Pendiente', date: '-', desc: 'Carga en camión de distribución.', icon: 'Truck' },
        { status: 'delivered', label: 'Pendiente', date: '-', desc: 'Entrega en comunidad de destino.', icon: 'HeartHandshake' }
      ]
    };

    const updated = [newDonation, ...donations];
    setItem(STORAGE_KEYS.DONATIONS, updated);

    // Update campaign progress
    if (campaign) {
      const itemsCount = (donationData.items || []).reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
      campaign.itemCollectedCount = (campaign.itemCollectedCount || 0) + itemsCount;
      setItem(STORAGE_KEYS.CAMPAIGNS, campaigns);
    }

    logAudit('CREATE_DONATION_PLEDGE', newDonation.donationCode, `Compromiso de donación física creado por ${newDonation.donorName}`, newDonation.donorEmail);
    return newDonation;
  },

  async createMonetaryDonation(donationData) {
    await new Promise(r => setTimeout(r, 600));
    const donations = getItem(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    const campaigns = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const campaign = campaigns.find(c => c.id === Number(donationData.campaignId));

    const donationCode = `DON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();

    const newDonation = {
      id: Date.now(),
      donationCode,
      donorName: donationData.donorName || 'Donante Solidario UVG',
      donorEmail: donationData.donorEmail || 'donante@uvg.edu.gt',
      donorType: donationData.donorType || 'Comunidad Universitaria',
      campaignId: donationData.campaignId,
      campaignTitle: campaign ? campaign.title : 'Campaña Solidaria',
      campaignSlug: campaign ? campaign.slug : '',
      donationType: 'monetary',
      amount: Number(donationData.amount) || 100,
      currency: 'GTQ',
      paymentMethod: donationData.paymentMethod || 'Tarjeta Demo Sandbox (Aprobada)',
      transactionRef: `TXN-SANDBOX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: 'completed',
      createdAt: now.toISOString().substring(0, 16).replace('T', ' '),
      destinationCommunity: campaign ? campaign.communityName : 'Comunidad Altiplano',
      notes: donationData.notes || '',
      receiptUrl: `#receipt-${donationCode}`
    };

    const updated = [newDonation, ...donations];
    setItem(STORAGE_KEYS.DONATIONS, updated);

    // Update campaign monetary total
    if (campaign) {
      campaign.monetaryCollected = (campaign.monetaryCollected || 0) + newDonation.amount;
      setItem(STORAGE_KEYS.CAMPAIGNS, campaigns);
    }

    logAudit('CREATE_MONETARY_DONATION', newDonation.donationCode, `Donación monetaria sandbox completada por Q${newDonation.amount}`, newDonation.donorEmail);
    return newDonation;
  },

  // Update physical donation status along the 5-step lifecycle
  async updateDonationStatus(donationId, newStatus, userEmail = 'volunteer@uvg.edu.gt') {
    await new Promise(r => setTimeout(r, 300));
    const donations = getItem(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);
    const donation = donations.find(d => d.id === Number(donationId));
    if (!donation) throw new Error('Donación no encontrada');

    const previousStatus = donation.status;
    donation.status = newStatus;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-GT', { day: '2-digit', month: 'short' }) + ', ' + now.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' });

    // Update timeline step
    if (donation.trackingHistory) {
      const stepIndex = ['pledged', 'received', 'verified', 'assigned', 'delivered'].indexOf(newStatus);
      if (stepIndex !== -1 && donation.trackingHistory[stepIndex]) {
        donation.trackingHistory[stepIndex].date = formattedDate;
        if (newStatus === 'received') donation.trackingHistory[stepIndex].desc = 'Recepción confirmada en centro de acopio.';
        if (newStatus === 'verified') donation.trackingHistory[stepIndex].desc = 'Verificación e inventario completados con éxito.';
        if (newStatus === 'assigned') donation.trackingHistory[stepIndex].desc = 'Asignada a despacho logístico de camión UVG.';
        if (newStatus === 'delivered') donation.trackingHistory[stepIndex].desc = 'Entregada y firmada por directores comunitarios.';
      }
    }

    setItem(STORAGE_KEYS.DONATIONS, donations);
    logAudit('UPDATE_DONATION_STATUS', donation.donationCode, `Cambio de estado: ${previousStatus} -> ${newStatus}`, userEmail);
    return donation;
  },

  // --- GENERAL STATS & METADATA ---
  async getImpactStats() {
    await new Promise(r => setTimeout(r, 150));
    const campaigns = getItem(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
    const donations = getItem(STORAGE_KEYS.DONATIONS, INITIAL_DONATIONS);

    const totalMonetary = donations
      .filter(d => d.donationType === 'monetary' && d.status === 'completed')
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    const totalInKindDelivered = donations
      .filter(d => d.donationType === 'in_kind' && (d.status === 'delivered' || d.status === 'verified'))
      .reduce((sum, d) => sum + (d.items || []).reduce((acc, i) => acc + (Number(i.quantity) || 1), 0), 0);

    return {
      ...IMPACT_METRICS,
      totalDonationsCount: donations.length + 125, // with historical
      totalItemsDelivered: totalInKindDelivered + 740,
      totalMonetaryCollectedGTQ: totalMonetary + 48000,
      activeCampaignsCount: campaigns.filter(c => c.status === 'active').length,
      completedCampaignsCount: 12
    };
  },

  async getCategories() {
    return getItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  async getCollectionPoints() {
    return getItem(STORAGE_KEYS.COLLECTION_POINTS, INITIAL_COLLECTION_POINTS);
  },

  async getCommunities() {
    return getItem(STORAGE_KEYS.COMMUNITIES, INITIAL_COMMUNITIES);
  },

  async getAuditLogs() {
    return getItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }
};
