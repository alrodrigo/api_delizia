// Endpoint para agencias
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
    const { url } = req;
    const urlParts = url.split('/');
    const agenciaId = urlParts[urlParts.length - 1];

    // Si hay un ID específico
    if (agenciaId && agenciaId !== 'agencias') {
      const agencia = agenciasMock.find(a => a._id === agenciaId);
      if (!agencia) {
        return res.status(404).json({ message: 'Agencia no encontrada' });
      }
      return res.json(agencia);
    }

    // Devolver todas las agencias
    return res.json({
      success: true,
      count: agenciasMock.length,
      data: agenciasMock,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: agenciasMock.length,
        itemsPerPage: agenciasMock.length
      }
    });
  }

  if (req.method === 'POST') {
    const nuevaAgencia = {
      _id: String(Date.now()),
      ...req.body,
      fechaCreacion: new Date().toISOString(),
      activa: true
    };
    
    return res.status(201).json(nuevaAgencia);
  }

  if (req.method === 'PUT') {
    const { url } = req;
    const urlParts = url.split('/');
    const agenciaId = urlParts[urlParts.length - 1];
    
    const agencia = agenciasMock.find(a => a._id === agenciaId);
    if (!agencia) {
      return res.status(404).json({ message: 'Agencia no encontrada' });
    }

    const agenciaActualizada = { ...agencia, ...req.body };
    return res.json(agenciaActualizada);
  }

  if (req.method === 'DELETE') {
    const { url } = req;
    const urlParts = url.split('/');
    const agenciaId = urlParts[urlParts.length - 1];
    
    return res.json({ message: 'Agencia eliminada correctamente' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
