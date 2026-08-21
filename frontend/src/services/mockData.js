/**
 * UVG Altiplano Community Aid & Donation Platform
 * Realistic Seed Data for Development & Demonstration
 * Context: Universidad del Valle de Guatemala (Campus Altiplano, Sololá)
 * NOTE: All data is fictional for academic demonstration.
 */

export const INITIAL_CATEGORIES = [
  { id: 1, name: 'Alimentos y Nutrición', slug: 'alimentos', icon: 'Apple', color: 'emerald', description: 'Granos básicos, paquetes alimentarios no perecederos y nutrición infantil.' },
  { id: 2, name: 'Educación y Útiles', slug: 'educacion', icon: 'GraduationCap', color: 'blue', description: 'Mochilas, cuadernos, libros de texto y material didáctico para escuelas rurales.' },
  { id: 3, name: 'Ropa y Abrigo', slug: 'ropa', icon: 'Shirt', color: 'indigo', description: 'Ponchos típicos, suéteres térmicos y calzado para la temporada de frío en el altiplano.' },
  { id: 4, name: 'Salud e Higiene', slug: 'higiene', icon: 'HeartPulse', color: 'rose', description: 'Kits de aseo personal, filtros de agua y botiquines comunitarios.' },
  { id: 5, name: 'Emergencia y Resiliencia', slug: 'emergencia', icon: 'AlertTriangle', color: 'amber', description: 'Kits de respuesta rápida ante deslaves, heladas o emergencias climáticas.' },
  { id: 6, name: 'Proyectos Comunitarios', slug: 'proyectos', icon: 'Building', color: 'purple', description: 'Herramientas de huertos escolares, sistemas de captación de agua y reforestación.' }
];

export const INITIAL_COMMUNITIES = [
  {
    id: 1,
    name: 'Caserío Chuacruz',
    department: 'Sololá',
    municipality: 'Sololá',
    description: 'Comunidad agrícola de 120 familias en las partes altas de Sololá. Enfrenta dificultades en temporadas de heladas y acceso a útiles.',
    contactPerson: 'Consejo Comunitario de Desarrollo (COCODE) Chuacruz',
    verifiedStatus: 'verified',
    familiesCount: 120,
    latitude: 14.7735,
    longitude: -91.1895
  },
  {
    id: 2,
    name: 'Aldea Pachoj',
    department: 'Sololá',
    municipality: 'Santa Lucía Utatlán',
    description: 'Comunidad con escuela primaria comunitaria que requiere dotación de libros y estaciones de lavado de manos.',
    contactPerson: 'Comité de Padres de Familia y Dirección Escolar',
    verifiedStatus: 'verified',
    familiesCount: 85,
    latitude: 14.7890,
    longitude: -91.2450
  },
  {
    id: 3,
    name: 'Sector Las Minas',
    department: 'Sololá',
    municipality: 'San Antonio Palopó',
    description: 'Familias artesanas afectadas por bajas temporadas y necesidad de programas de seguridad alimentaria para la niñez.',
    contactPerson: 'Asociación Local de Tejedores y Madres Guías',
    verifiedStatus: 'verified',
    familiesCount: 95,
    latitude: 14.7042,
    longitude: -91.1218
  },
  {
    id: 4,
    name: 'Cantón Xajaxac',
    department: 'Sololá',
    municipality: 'Sololá',
    description: 'Población vecina al campus universitario con proyecto de huertos familiares y refuerzo escolar apoyado por estudiantes UVG.',
    contactPerson: 'Representante Comunitario y Voluntariado UVG',
    verifiedStatus: 'verified',
    familiesCount: 140,
    latitude: 14.7560,
    longitude: -91.1780
  }
];

export const INITIAL_COLLECTION_POINTS = [
  {
    id: 1,
    name: 'Edificio Central — Lobby Principal',
    campus: 'Campus Altiplano (Sololá)',
    building: 'Edificio A, Nivel 1',
    schedule: 'Lunes a Viernes: 07:30 - 17:30 | Sábados: 08:00 - 12:00',
    responsibleContact: 'Licda. María José Morales (Bienestar Estudiantil)',
    phone: '+502 7762-4100 Ext. 104',
    isActive: true,
    storageCapacity: 'Alta (Cajas, bultos y alimentos secos)'
  },
  {
    id: 2,
    name: 'Centro de Acopio y Logística Solidaria',
    campus: 'Campus Altiplano (Sololá)',
    building: 'Bodega C-102 (Área de Talleres)',
    schedule: 'Lunes a Viernes: 08:00 - 16:00',
    responsibleContact: 'Ing. Carlos Mendoza (Coordinación de Logística)',
    phone: '+502 7762-4100 Ext. 210',
    isActive: true,
    storageCapacity: 'Máxima (Pesaje, clasificación y empaque para camión)'
  },
  {
    id: 3,
    name: 'Biblioteca del Campus — Módulo de Útiles',
    campus: 'Campus Altiplano (Sololá)',
    building: 'Edificio B, Nivel 2',
    schedule: 'Lunes a Viernes: 08:00 - 18:00',
    responsibleContact: 'Equipo de Biblioteca y Voluntarios',
    phone: '+502 7762-4100 Ext. 305',
    isActive: true,
    storageCapacity: 'Especializada (Libros, cuadernos y tecnología educativa)'
  }
];

export const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    slug: 'mochilas-de-esperanza-2026',
    title: 'Mochilas de Esperanza: Útiles Escolares para Pachoj',
    categorySlug: 'educacion',
    categoryId: 2,
    communityId: 2,
    communityName: 'Aldea Pachoj, Santa Lucía Utatlán',
    organizer: 'Facultad de Educación y Asociación de Estudiantes UVG',
    creatorEmail: 'educacion.altiplano@uvg.edu.gt',
    shortDescription: 'Dotación de 250 mochilas completas con cuadernos, lápices y libros de lectura para estudiantes de primaria rural.',
    description: 'Al inicio del ciclo escolar, muchos niños en comunidades rurales del altiplano enfrentan la falta de útiles básicos para continuar sus estudios. A través de esta campaña institucional, la comunidad UVG busca asegurar que 250 niños de la Escuela Primaria de Aldea Pachoj cuenten con su mochila completa y materiales didácticos antes de que finalice el mes.',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    monetaryGoal: 15000,
    monetaryCollected: 11250,
    itemGoalCount: 250,
    itemCollectedCount: 188,
    status: 'active',
    isFeatured: true,
    startDate: '2026-02-01',
    endDate: '2026-03-31',
    needs: [
      { id: 101, name: 'Mochilas escolares resistentes', unit: 'unidades', target: 250, current: 195, priority: 'high' },
      { id: 102, name: 'Cuadernos de 100 hojas', unit: 'paquetes de 4', target: 250, current: 210, priority: 'high' },
      { id: 103, name: 'Cajas de lápices de color', unit: 'cajas', target: 250, current: 160, priority: 'medium' },
      { id: 104, name: 'Libros de cuentos infantiles', unit: 'libros', target: 150, current: 85, priority: 'medium' }
    ],
    updates: [
      {
        id: 201,
        date: '2026-02-18',
        title: 'Primera jornada de clasificación en Bodega C-102',
        body: 'El equipo de 18 voluntarios de diferentes ingenierías clasificó más de 120 paquetes de útiles entregados por estudiantes y docentes durante la semana pasada.',
        milestoneType: 'items_verified',
        mediaUrls: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80']
      },
      {
        id: 202,
        date: '2026-02-05',
        title: 'Campaña oficialmente inaugurada en el Campus',
        body: 'Se instalaron los buzones de recolección en el Lobby Central y Biblioteca con apoyo del Consejo Estudiantil.',
        milestoneType: 'collection_started'
      }
    ]
  },
  {
    id: 2,
    slug: 'canasta-solidaria-solola-2026',
    title: 'Canasta Nutricional Solidaria: Caserío Chuacruz',
    categorySlug: 'alimentos',
    categoryId: 1,
    communityId: 1,
    communityName: 'Caserío Chuacruz, Sololá',
    organizer: 'Voluntariado UVG y Carrera de Nutrición',
    creatorEmail: 'solidaridad.altiplano@uvg.edu.gt',
    shortDescription: 'Acopio de granos básicos, avena y alimentos no perecederos para 120 familias en situación de vulnerabilidad alimentaria.',
    description: 'La temporada de heladas en las zonas altas afecta severamente las cosechas familiares de subsistencia. Estudiantes de Nutrición y Agronomía de UVG Altiplano diseñaron una canasta balanceada de alimentos no perecederos de alto valor calórico y proteico para respaldar a 120 hogares de Chuacruz.',
    heroImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    monetaryGoal: 20000,
    monetaryCollected: 16400,
    itemGoalCount: 120,
    itemCollectedCount: 94,
    status: 'active',
    isFeatured: true,
    startDate: '2026-02-10',
    endDate: '2026-04-15',
    needs: [
      { id: 201, name: 'Bolsas de frijol negro (5 lbs)', unit: 'bolsas', target: 240, current: 190, priority: 'high' },
      { id: 202, name: 'Arroz blanco fortificado (5 lbs)', unit: 'bolsas', target: 240, current: 205, priority: 'high' },
      { id: 203, name: 'Avena / Incaparina (bolsas de 450g)', unit: 'paquetes', target: 360, current: 280, priority: 'high' },
      { id: 204, name: 'Aceite vegetal comestible (1L)', unit: 'botellas', target: 120, current: 75, priority: 'medium' }
    ],
    updates: [
      {
        id: 203,
        date: '2026-02-19',
        title: 'Superado el 75% de la meta de granos básicos',
        body: 'Agradecemos a los colaboradores de Servicios Generales y Catedráticos por la masiva donación de frijol e Incaparina.',
        milestoneType: 'goal_reached'
      }
    ]
  },
  {
    id: 3,
    slug: 'abrigo-altiplano-invierno-2026',
    title: 'Calor de Hogar: Ponchos y Ropa Térmica',
    categorySlug: 'ropa',
    categoryId: 3,
    communityId: 3,
    communityName: 'Sector Las Minas, San Antonio Palopó',
    organizer: 'Comité de Proyección Social UVG Altiplano',
    creatorEmail: 'proyeccionsocial@uvg.edu.gt',
    shortDescription: 'Recolección de 300 prendas de abrigo en excelente estado y frazadas térmicas para adultos mayores y niños.',
    description: 'En el altiplano guatemalteco, las temperaturas descienden cerca de los 0°C en las noches de montaña. Esta campaña recolecta suéteres, chamarras, gorros y frazadas térmicas limpias y en perfecto estado, garantizando abrigo digno a familias de sectores vulnerables.',
    heroImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    monetaryGoal: 8000,
    monetaryCollected: 6200,
    itemGoalCount: 300,
    itemCollectedCount: 260,
    status: 'active',
    isFeatured: true,
    startDate: '2026-01-20',
    endDate: '2026-03-15',
    needs: [
      { id: 301, name: 'Frazadas térmicas / Ponchos', unit: 'unidades', target: 150, current: 135, priority: 'high' },
      { id: 302, name: 'Suéteres y chamarras infantiles', unit: 'prendas', target: 150, current: 125, priority: 'high' },
      { id: 303, name: 'Calcetines térmicos nuevos', unit: 'pares', target: 200, current: 140, priority: 'medium' }
    ],
    updates: [
      {
        id: 301,
        date: '2026-02-12',
        title: 'Primera entrega programada para el 5 de marzo',
        body: 'El camión de la universidad transportará los primeros 200 paquetes de abrigo directamente al centro comunitario.',
        milestoneType: 'items_verified'
      }
    ]
  },
  {
    id: 4,
    slug: 'salud-agua-limpia-xajaxac',
    title: 'Agua Segura y Salud Familiar: Cantón Xajaxac',
    categorySlug: 'higiene',
    categoryId: 4,
    communityId: 4,
    communityName: 'Cantón Xajaxac, Sololá',
    organizer: 'Ingeniería Civil & Ambiental UVG',
    creatorEmail: 'ambiental.altiplano@uvg.edu.gt',
    shortDescription: 'Instalación de 40 ecofiltros familiares y kits de higiene preventiva con capacitación técnica comunitaria.',
    description: 'Estudiantes de ingeniería ambiental lideran la distribución e instalación de filtros purificadores de arcilla y plata coloidal (ecofiltros) junto con kits de higiene y talleres prácticos de desinfección de agua para 40 familias.',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    monetaryGoal: 18000,
    monetaryCollected: 14200,
    itemGoalCount: 40,
    itemCollectedCount: 32,
    status: 'active',
    isFeatured: false,
    startDate: '2026-02-01',
    endDate: '2026-04-30',
    needs: [
      { id: 401, name: 'Ecofiltros cerámicos de 20L', unit: 'unidades', target: 40, current: 32, priority: 'high' },
      { id: 402, name: 'Kits de jabón antibacterial y toallas', unit: 'kits', target: 40, current: 36, priority: 'medium' }
    ],
    updates: []
  },
  {
    id: 5,
    slug: 'huertos-escolares-sostenibles-2026',
    title: 'Huertos Escolares y Seguridad Alimentaria',
    categorySlug: 'proyectos',
    categoryId: 6,
    communityId: 2,
    communityName: 'Aldea Pachoj, Santa Lucía Utatlán',
    organizer: 'Ingeniería en Tecnología Agrícola y Forestal UVG',
    creatorEmail: 'agricola.altiplano@uvg.edu.gt',
    shortDescription: 'Herramientas agrícolas, semillas de hortalizas y sistemas de micro-riego para 3 escuelas comunitarias.',
    description: 'Proyecto de desarrollo sostenible que capacita a docentes y niños en el cultivo orgánico de hortalizas (acelga, espinaca, zanahoria y rábano) para enriquecer el programa de refacción escolar con productos frescos.',
    heroImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1200&q=80',
    monetaryGoal: 12000,
    monetaryCollected: 7800,
    itemGoalCount: 60,
    itemCollectedCount: 45,
    status: 'active',
    isFeatured: false,
    startDate: '2026-01-15',
    endDate: '2026-05-15',
    needs: [
      { id: 501, name: 'Palas, azadones y rastrillos pequeños', unit: 'herramientas', target: 30, current: 22, priority: 'medium' },
      { id: 502, name: 'Paquetes de semillas certificadas', unit: 'paquetes', target: 100, current: 80, priority: 'high' }
    ],
    updates: []
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    name: 'Licda. Sofía De León',
    email: 'admin@uvg.edu.gt',
    role: 'admin',
    universityId: 'DOC-2018-091',
    campus: 'Campus Altiplano',
    department: 'Dirección de Proyección y Vida Universitaria',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Ing. Carlos Mendoza',
    email: 'manager@uvg.edu.gt',
    role: 'campaign_manager',
    universityId: 'DOC-2020-142',
    campus: 'Campus Altiplano',
    department: 'Facultad de Ingeniería',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Andrea Morales Tzoc',
    email: 'volunteer@uvg.edu.gt',
    role: 'volunteer',
    universityId: '220412',
    campus: 'Campus Altiplano',
    department: 'Estudiante de Licenciatura en Educación',
    volunteerHours: 42,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 4,
    name: 'Juan José Chonay',
    email: 'donor@uvg.edu.gt',
    role: 'donor',
    universityId: '240189',
    campus: 'Campus Altiplano',
    department: 'Estudiante de Ingeniería en Informática',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_DONATIONS = [
  {
    id: 1,
    donationCode: 'DON-2026-0089',
    donorName: 'Juan José Chonay',
    donorEmail: 'donor@uvg.edu.gt',
    donorType: 'Estudiante UVG (Carnet 240189)',
    campaignId: 1,
    campaignTitle: 'Mochilas de Esperanza: Útiles Escolares para Pachoj',
    campaignSlug: 'mochilas-de-esperanza-2026',
    donationType: 'in_kind',
    items: [
      { name: 'Mochilas escolares resistentes', quantity: 2, unit: 'unidades' },
      { name: 'Cuadernos de 100 hojas', quantity: 6, unit: 'unidades' }
    ],
    collectionPointId: 1,
    collectionPointName: 'Edificio Central — Lobby Principal',
    status: 'delivered',
    createdAt: '2026-02-14 10:30',
    receivedAt: '2026-02-14 14:10',
    verifiedAt: '2026-02-15 09:00',
    assignedAt: '2026-02-16 11:20',
    deliveredAt: '2026-02-18 16:45',
    destinationCommunity: 'Aldea Pachoj, Santa Lucía Utatlán',
    trackingHistory: [
      { status: 'pledged', label: 'Registrada', date: '14 Feb, 10:30', desc: 'Compromiso de donación generado en la plataforma.', icon: 'FileText' },
      { status: 'received', label: 'Recibida en Campus', date: '14 Feb, 14:10', desc: 'Entregada en Lobby Principal - Edificio A.', icon: 'Building2' },
      { status: 'verified', label: 'Verificada e Inventariada', date: '15 Feb, 09:00', desc: 'Voluntariado verificó buen estado y selló el lote.', icon: 'CheckCircle2' },
      { status: 'assigned', label: 'Cargada en Camión', date: '16 Feb, 11:20', desc: 'Asignada al despacho logístico #DESP-042.', icon: 'Truck' },
      { status: 'delivered', label: 'Entregada a la Comunidad', date: '18 Feb, 16:45', desc: 'Distribuida a directores y padres de familia en Pachoj.', icon: 'HeartHandshake' }
    ]
  },
  {
    id: 2,
    donationCode: 'DON-2026-0104',
    donorName: 'Dra. Lucrecia Gómez',
    donorEmail: 'lgomez@uvg.edu.gt',
    donorType: 'Docente UVG',
    campaignId: 2,
    campaignTitle: 'Canasta Nutricional Solidaria: Caserío Chuacruz',
    campaignSlug: 'canasta-solidaria-solola-2026',
    donationType: 'monetary',
    amount: 500.00,
    currency: 'GTQ',
    paymentMethod: 'Sandbox Tarjeta Visa / Master (Demo)',
    transactionRef: 'TXN-UVG-8849201',
    status: 'completed',
    createdAt: '2026-02-17 15:20',
    notes: 'Aporte para compra de sacos de frijol fortificado.',
    receiptUrl: '#receipt-104',
    destinationCommunity: 'Caserío Chuacruz, Sololá'
  },
  {
    id: 3,
    donationCode: 'DON-2026-0112',
    donorName: 'Comunidad Egresados Altiplano',
    donorEmail: 'alumni.altiplano@uvg.edu.gt',
    donorType: 'Egresados UVG',
    campaignId: 3,
    campaignTitle: 'Calor de Hogar: Ponchos y Ropa Térmica',
    campaignSlug: 'abrigo-altiplano-invierno-2026',
    donationType: 'in_kind',
    items: [
      { name: 'Frazadas térmicas / Ponchos', quantity: 20, unit: 'unidades' },
      { name: 'Suéteres y chamarras infantiles', quantity: 15, unit: 'prendas' }
    ],
    collectionPointId: 2,
    collectionPointName: 'Centro de Acopio y Logística Solidaria (Bodega C-102)',
    status: 'verified',
    createdAt: '2026-02-18 11:00',
    receivedAt: '2026-02-18 14:00',
    verifiedAt: '2026-02-19 10:15',
    destinationCommunity: 'Sector Las Minas, San Antonio Palopó',
    trackingHistory: [
      { status: 'pledged', label: 'Registrada', date: '18 Feb, 11:00', desc: 'Compromiso registrado en plataforma.', icon: 'FileText' },
      { status: 'received', label: 'Recibida en Campus', date: '18 Feb, 14:00', desc: 'Recibida en Bodega C-102.', icon: 'Building2' },
      { status: 'verified', label: 'Verificada e Inventariada', date: '19 Feb, 10:15', desc: 'Clasificada y lista para carga en ruta.', icon: 'CheckCircle2' },
      { status: 'assigned', label: 'Pendiente de Carga', date: 'Próximamente', desc: 'Programada para ruta del 5 de marzo.', icon: 'Truck' },
      { status: 'delivered', label: 'Entrega Final', date: 'Pendiente', desc: 'Entrega directa a las familias.', icon: 'HeartHandshake' }
    ]
  },
  {
    id: 4,
    donationCode: 'DON-2026-0125',
    donorName: 'Marco Antonio Yaxón',
    donorEmail: 'myaxon@uvg.edu.gt',
    donorType: 'Personal Administrativo',
    campaignId: 1,
    campaignTitle: 'Mochilas de Esperanza: Útiles Escolares para Pachoj',
    campaignSlug: 'mochilas-de-esperanza-2026',
    donationType: 'in_kind',
    items: [
      { name: 'Cajas de lápices de color', quantity: 5, unit: 'cajas' },
      { name: 'Libros de cuentos infantiles', quantity: 8, unit: 'libros' }
    ],
    collectionPointId: 1,
    collectionPointName: 'Edificio Central — Lobby Principal',
    status: 'received',
    createdAt: '2026-02-19 09:15',
    receivedAt: '2026-02-19 16:30',
    destinationCommunity: 'Aldea Pachoj, Santa Lucía Utatlán',
    trackingHistory: [
      { status: 'pledged', label: 'Registrada', date: '19 Feb, 09:15', desc: 'Voucher digital emitido.', icon: 'FileText' },
      { status: 'received', label: 'Recibida en Campus', date: '19 Feb, 16:30', desc: 'Recepción confirmada en Lobby.', icon: 'Building2' },
      { status: 'verified', label: 'En proceso de verificación', date: 'En cola', desc: 'Pendiente de control de calidad.', icon: 'CheckCircle2' },
      { status: 'assigned', label: 'Pendiente de Asignación', date: 'Próximamente', desc: '', icon: 'Truck' },
      { status: 'delivered', label: 'Entrega Final', date: 'Pendiente', desc: '', icon: 'HeartHandshake' }
    ]
  },
  {
    id: 5,
    donationCode: 'DON-2026-0130',
    donorName: 'Estudiante Anónimo UVG',
    donorEmail: 'anonimo@uvg.edu.gt',
    donorType: 'Comunidad Universitaria',
    campaignId: 2,
    campaignTitle: 'Canasta Nutricional Solidaria: Caserío Chuacruz',
    campaignSlug: 'canasta-solidaria-solola-2026',
    donationType: 'in_kind',
    items: [
      { name: 'Avena / Incaparina (bolsas de 450g)', quantity: 10, unit: 'paquetes' }
    ],
    collectionPointId: 1,
    collectionPointName: 'Edificio Central — Lobby Principal',
    status: 'pledged',
    createdAt: '2026-02-20 08:45',
    destinationCommunity: 'Caserío Chuacruz, Sololá',
    trackingHistory: [
      { status: 'pledged', label: 'Registrada', date: '20 Feb, 08:45', desc: 'Voucher activo para entrega en campus.', icon: 'FileText' },
      { status: 'received', label: 'Pendiente de Entrega', date: 'En espera', desc: 'Llevar paquete a Lobby Edificio Central.', icon: 'Building2' },
      { status: 'verified', label: 'Pendiente', date: '-', desc: '', icon: 'CheckCircle2' },
      { status: 'assigned', label: 'Pendiente', date: '-', desc: '', icon: 'Truck' },
      { status: 'delivered', label: 'Pendiente', date: '-', desc: '', icon: 'HeartHandshake' }
    ]
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 1, timestamp: '2026-02-20 11:30', user: 'admin@uvg.edu.gt', action: 'CAMPAIGN_STATUS_UPDATE', entity: 'Campaign #1', details: 'Actualizó progreso y verificó meta del 75%' },
  { id: 2, timestamp: '2026-02-19 10:15', user: 'volunteer@uvg.edu.gt', action: 'DONATION_VERIFIED', entity: 'DON-2026-0112', details: 'Verificó 20 frazadas térmicas en Bodega C-102' },
  { id: 3, timestamp: '2026-02-18 16:45', user: 'manager@uvg.edu.gt', action: 'LOGISTICS_DELIVERED', entity: 'DON-2026-0089', details: 'Confirmó entrega final a Escuela de Aldea Pachoj' },
  { id: 4, timestamp: '2026-02-17 15:20', user: 'system_gateway', action: 'SANDBOX_PAYMENT_PROCESSED', entity: 'DON-2026-0104', details: 'Procesó donación monetaria por Q500.00' }
];

export const IMPACT_METRICS = {
  totalDonationsCount: 130,
  totalItemsDelivered: 814,
  totalMonetaryCollectedGTQ: 55650,
  activeCampaignsCount: 5,
  completedCampaignsCount: 12,
  communitiesSupported: 4,
  familiesBenefited: 440,
  activeStudentVolunteers: 68,
  volunteerHoursLogged: 520
};
