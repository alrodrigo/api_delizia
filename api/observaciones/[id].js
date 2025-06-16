// Endpoint para observación individual /api/observaciones/[id]
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
    const observacionId = query.id;

    console.log('Observación individual - ID:', observacionId);

    const observacion = observacionesMock.find(o => o._id === observacionId);
    if (!observacion) {
      return res.status(404).json({ 
        success: false, 
        message: 'Observación no encontrada' 
      });
    }

    return res.json({
      success: true,
      data: observacion
    });
  }

  if (req.method === 'PUT') {
    const { query, body } = req;
    const observacionId = query.id;

    console.log('Actualizando observación - ID:', observacionId);
    console.log('Datos recibidos:', body);

    const observacionIndex = observacionesMock.findIndex(o => o._id === observacionId);
    if (observacionIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Observación no encontrada' 
      });
    }

    // Actualizar observación (simulado)
    const observacionActualizada = {
      ...observacionesMock[observacionIndex],
      ...body,
      _id: observacionId // Mantener el ID original
    };

    console.log('Observación actualizada (simulado):', observacionActualizada);

    return res.json({
      success: true,
      message: 'Observación actualizada correctamente',
      data: observacionActualizada
    });
  }

  if (req.method === 'DELETE') {
    const { query } = req;
    const observacionId = query.id;

    console.log('Eliminando observación - ID:', observacionId);

    const observacionIndex = observacionesMock.findIndex(o => o._id === observacionId);
    if (observacionIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Observación no encontrada' 
      });
    }

    console.log('Observación eliminada (simulado)');

    return res.json({
      success: true,
      message: 'Observación eliminada correctamente'
    });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
