// Endpoint para observaciones
export default function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Datos mock de observaciones
  const observacionesMock = [
    {
      _id: '1',
      empleado: {
        _id: '1',
        nombre: 'Ana García'
      },
      fecha: '2025-06-16T00:00:00.000Z',
      tipo: 'positiva',
      categoria: 'Desempeño',
      descripcion: 'Excelente atención al cliente durante todo el día. Mostró paciencia y profesionalismo.',
      observador: 'Luis Rodriguez',
      fechaCreacion: '2025-06-16T14:30:00.000Z'
    },
    {
      _id: '2',
      empleado: {
        _id: '2',
        nombre: 'Luis Rodriguez'
      },
      fecha: '2025-06-15T00:00:00.000Z',
      tipo: 'neutra',
      categoria: 'Puntualidad',
      descripcion: 'Llegó 10 minutos tarde debido a problemas de transporte público.',
      observador: 'Juan Pérez',
      fechaCreacion: '2025-06-15T08:10:00.000Z'
    },
    {
      _id: '3',
      empleado: {
        _id: '3',
        nombre: 'Carmen Soto'
      },
      fecha: '2025-06-14T00:00:00.000Z',
      tipo: 'positiva',
      categoria: 'Trabajo en equipo',
      descripcion: 'Ayudó activamente a sus compañeros durante la jornada de trabajo.',
      observador: 'María García',
      fechaCreacion: '2025-06-14T16:45:00.000Z'
    },
    {
      _id: '4',
      empleado: {
        _id: '1',
        nombre: 'Ana García'
      },
      fecha: '2025-06-13T00:00:00.000Z',
      tipo: 'negativa',
      categoria: 'Procedimientos',
      descripcion: 'No siguió correctamente el protocolo de cierre de caja.',
      observador: 'Luis Rodriguez',
      fechaCreacion: '2025-06-13T18:00:00.000Z'
    }
  ];

  if (req.method === 'GET') {
    const { query } = req;
    
    // Obtener query parameters
    const empleadoFilter = query.empleado;
    const tipoFilter = query.tipo;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    console.log('Observaciones endpoint - Query params:', { empleadoFilter, tipoFilter, page, limit });

    // Filtrar observaciones
    let observacionesFiltradas = observacionesMock;
    
    if (empleadoFilter) {
      observacionesFiltradas = observacionesFiltradas.filter(obs => 
        obs.empleado._id === empleadoFilter || obs.empleado.nombre.toLowerCase().includes(empleadoFilter.toLowerCase())
      );
    }

    if (tipoFilter) {
      observacionesFiltradas = observacionesFiltradas.filter(obs => obs.tipo === tipoFilter);
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const observacionesPaginadas = observacionesFiltradas.slice(startIndex, endIndex);

    const totalPages = Math.ceil(observacionesFiltradas.length / limit);

    return res.json({
      success: true,
      count: observacionesPaginadas.length,
      data: observacionesPaginadas,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: observacionesFiltradas.length,
        itemsPerPage: limit
      }
    });
  }

  if (req.method === 'POST') {
    const nuevaObservacion = {
      _id: String(Date.now()),
      ...req.body,
      fechaCreacion: new Date().toISOString()
    };
    
    console.log('Nueva observación creada (simulado):', nuevaObservacion);
    
    return res.status(201).json({
      success: true,
      message: 'Observación creada correctamente',
      data: nuevaObservacion
    });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
