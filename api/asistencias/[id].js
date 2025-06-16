// Endpoint para asistencia individual /api/asistencias/[id]
export default function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

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
    const { query } = req;
    const asistenciaId = query.id;

    console.log('Asistencia individual - ID:', asistenciaId);

    const asistencia = asistenciasMock.find(a => a._id === asistenciaId);
    if (!asistencia) {
      return res.status(404).json({ 
        success: false, 
        message: 'Asistencia no encontrada' 
      });
    }

    return res.json({
      success: true,
      data: asistencia
    });
  }

  if (req.method === 'PUT') {
    const { query, body } = req;
    const asistenciaId = query.id;

    console.log('Actualizando asistencia - ID:', asistenciaId);
    console.log('Datos recibidos:', body);

    const asistenciaIndex = asistenciasMock.findIndex(a => a._id === asistenciaId);
    if (asistenciaIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Asistencia no encontrada' 
      });
    }

    // Actualizar asistencia (simulado)
    const asistenciaActualizada = {
      ...asistenciasMock[asistenciaIndex],
      ...body,
      _id: asistenciaId // Mantener el ID original
    };

    console.log('Asistencia actualizada (simulado):', asistenciaActualizada);

    return res.json({
      success: true,
      message: 'Asistencia actualizada correctamente',
      data: asistenciaActualizada
    });
  }

  if (req.method === 'DELETE') {
    const { query } = req;
    const asistenciaId = query.id;

    console.log('Eliminando asistencia - ID:', asistenciaId);

    const asistenciaIndex = asistenciasMock.findIndex(a => a._id === asistenciaId);
    if (asistenciaIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Asistencia no encontrada' 
      });
    }

    console.log('Asistencia eliminada (simulado)');

    return res.json({
      success: true,
      message: 'Asistencia eliminada correctamente'
    });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
