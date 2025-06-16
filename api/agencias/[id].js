// Endpoint para agencia individual /api/agencias/[id]
export default function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Datos mock de agencias
  const agenciasMock = [
    {
      _id: '1',
      nombre: 'Agencia Central',
      direccion: 'Av. Principal 123, Lima',
      telefono: '01-234-5678',
      email: 'central@delizia.com',
      gerente: 'Juan Pérez',
      activa: true,
      fechaCreacion: '2024-01-15T00:00:00.000Z'
    },
    {
      _id: '2',
      nombre: 'Agencia Norte',
      direccion: 'Jr. Los Olivos 456, Lima Norte',
      telefono: '01-234-5679',
      email: 'norte@delizia.com',
      gerente: 'María García',
      activa: true,
      fechaCreacion: '2024-02-10T00:00:00.000Z'
    },
    {
      _id: '3',
      nombre: 'Agencia Sur',
      direccion: 'Av. Surco 789, Lima Sur',
      telefono: '01-234-5680',
      email: 'sur@delizia.com',
      gerente: 'Carlos López',
      activa: true,
      fechaCreacion: '2024-03-05T00:00:00.000Z'
    }
  ];

  if (req.method === 'GET') {
    const { query } = req;
    const agenciaId = query.id;

    console.log('Agencia individual - ID:', agenciaId);

    const agencia = agenciasMock.find(a => a._id === agenciaId);
    if (!agencia) {
      return res.status(404).json({ 
        success: false, 
        message: 'Agencia no encontrada' 
      });
    }

    return res.json({
      success: true,
      data: agencia
    });
  }

  if (req.method === 'PUT') {
    const { query, body } = req;
    const agenciaId = query.id;

    console.log('Actualizando agencia - ID:', agenciaId);
    console.log('Datos recibidos:', body);

    const agenciaIndex = agenciasMock.findIndex(a => a._id === agenciaId);
    if (agenciaIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Agencia no encontrada' 
      });
    }

    // Actualizar agencia (simulado)
    const agenciaActualizada = {
      ...agenciasMock[agenciaIndex],
      ...body,
      _id: agenciaId // Mantener el ID original
    };

    console.log('Agencia actualizada (simulado):', agenciaActualizada);

    return res.json({
      success: true,
      message: 'Agencia actualizada correctamente',
      data: agenciaActualizada
    });
  }

  if (req.method === 'DELETE') {
    const { query } = req;
    const agenciaId = query.id;

    console.log('Eliminando agencia - ID:', agenciaId);

    const agenciaIndex = agenciasMock.findIndex(a => a._id === agenciaId);
    if (agenciaIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Agencia no encontrada' 
      });
    }

    console.log('Agencia eliminada (simulado)');

    return res.json({
      success: true,
      message: 'Agencia eliminada correctamente'
    });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
