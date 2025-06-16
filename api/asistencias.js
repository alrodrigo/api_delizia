// Endpoint para asistencias
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Datos mock de asistencias
  const asistenciasMock = [
    {
      _id: '1',
      empleado: {
        _id: '1',
        nombre: 'Ana García'
      },
      fecha: '2025-06-16T00:00:00.000Z',
      horaEntrada: '08:00',
      horaSalida: '17:00',
      estado: 'presente',
      observaciones: 'Llegó puntual'
    },
    {
      _id: '2',
      empleado: {
        _id: '2',
        nombre: 'Luis Rodriguez'
      },
      fecha: '2025-06-16T00:00:00.000Z',
      horaEntrada: '08:15',
      horaSalida: '17:05',
      estado: 'tardanza',
      observaciones: 'Llegó 15 minutos tarde'
    },
    {
      _id: '3',
      empleado: {
        _id: '3',
        nombre: 'Carmen Soto'
      },
      fecha: '2025-06-16T00:00:00.000Z',
      horaEntrada: null,
      horaSalida: null,
      estado: 'ausente',
      observaciones: 'Falta justificada por enfermedad'
    }
  ];

  if (req.method === 'GET') {
    const { url } = req;
    
    // Parsear URL y query parameters
    const urlObj = new URL(url, 'https://dummy.com');
    const pathParts = urlObj.pathname.split('/');
    const asistenciaId = pathParts[pathParts.length - 1];
    
    // Obtener query parameters
    const empleadoFilter = urlObj.searchParams.get('empleado');
    const fechaFilter = urlObj.searchParams.get('fecha');

    console.log('Asistencias endpoint - URL:', url);
    console.log('Asistencias endpoint - Query params:', { empleadoFilter, fechaFilter });

    // Si hay un ID específico
    if (asistenciaId && asistenciaId !== 'asistencias' && !asistenciaId.includes('?')) {
      const asistencia = asistenciasMock.find(a => a._id === asistenciaId);
      if (!asistencia) {
        return res.status(404).json({ message: 'Asistencia no encontrada' });
      }
      return res.json(asistencia);
    }

    // Filtrar por empleado o fecha si se especifica
    let asistenciasFiltradas = asistenciasMock;

    if (empleadoFilter) {
      asistenciasFiltradas = asistenciasFiltradas.filter(a => a.empleado._id === empleadoFilter);
    }

    if (fechaFilter) {
      asistenciasFiltradas = asistenciasFiltradas.filter(a => a.fecha.startsWith(fechaFilter));
    }

    return res.json({
      success: true,
      count: asistenciasFiltradas.length,
      data: asistenciasFiltradas,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: asistenciasFiltradas.length,
        itemsPerPage: asistenciasFiltradas.length
      }
    });
  }

  if (req.method === 'POST') {
    const nuevaAsistencia = {
      _id: String(Date.now()),
      ...req.body,
      fecha: req.body.fecha || new Date().toISOString()
    };
    
    return res.status(201).json(nuevaAsistencia);
  }

  if (req.method === 'PUT') {
    const { url } = req;
    const urlParts = url.split('/');
    const asistenciaId = urlParts[urlParts.length - 1];
    
    const asistencia = asistenciasMock.find(a => a._id === asistenciaId);
    if (!asistencia) {
      return res.status(404).json({ message: 'Asistencia no encontrada' });
    }

    const asistenciaActualizada = { ...asistencia, ...req.body };
    return res.json(asistenciaActualizada);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
