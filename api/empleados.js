// Endpoint para empleados
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Datos mock de empleados
  const empleadosMock = [
    {
      _id: '1',
      nombre: 'Ana García',
      email: 'ana.garcia@delizia.com',
      telefono: '987-654-321',
      cargo: 'Vendedora',
      agencia: {
        _id: '1',
        nombre: 'Agencia Central'
      },
      fechaIngreso: '2024-01-15T00:00:00.000Z',
      salario: 2500,
      activo: true
    },
    {
      _id: '2',
      nombre: 'Luis Rodriguez',
      email: 'luis.rodriguez@delizia.com',
      telefono: '987-654-322',
      cargo: 'Supervisor',
      agencia: {
        _id: '1',
        nombre: 'Agencia Central'
      },
      fechaIngreso: '2024-02-01T00:00:00.000Z',
      salario: 3500,
      activo: true
    },
    {
      _id: '3',
      nombre: 'Carmen Soto',
      email: 'carmen.soto@delizia.com',
      telefono: '987-654-323',
      cargo: 'Cajera',
      agencia: {
        _id: '2',
        nombre: 'Agencia Norte'
      },
      fechaIngreso: '2024-02-15T00:00:00.000Z',
      salario: 2200,
      activo: true
    },
    {
      _id: '4',
      nombre: 'Pedro Morales',
      email: 'pedro.morales@delizia.com',
      telefono: '987-654-324',
      cargo: 'Vendedor',
      agencia: {
        _id: '3',
        nombre: 'Agencia Sur'
      },
      fechaIngreso: '2024-03-01T00:00:00.000Z',
      salario: 2600,
      activo: true
    }
  ];

  if (req.method === 'GET') {
    const { url } = req;
    const urlParts = url.split('/');
    const empleadoId = urlParts[urlParts.length - 1];

    // Si hay un ID específico
    if (empleadoId && empleadoId !== 'empleados') {
      const empleado = empleadosMock.find(e => e._id === empleadoId);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      return res.json(empleado);
    }

    // Filtrar por agencia si se especifica
    const { query } = req;
    let empleadosFiltrados = empleadosMock;
    
    if (query && query.agencia) {
      empleadosFiltrados = empleadosMock.filter(e => e.agencia._id === query.agencia);
    }

    // Devolver todos los empleados con formato esperado
    return res.json({
      success: true,
      count: empleadosFiltrados.length,
      data: empleadosFiltrados,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: empleadosFiltrados.length,
        itemsPerPage: empleadosFiltrados.length
      }
    });
  }

  if (req.method === 'POST') {
    const nuevoEmpleado = {
      _id: String(Date.now()),
      ...req.body,
      fechaIngreso: new Date().toISOString(),
      activo: true
    };
    
    return res.status(201).json(nuevoEmpleado);
  }

  if (req.method === 'PUT') {
    const { url } = req;
    const urlParts = url.split('/');
    const empleadoId = urlParts[urlParts.length - 1];
    
    const empleado = empleadosMock.find(e => e._id === empleadoId);
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    const empleadoActualizado = { ...empleado, ...req.body };
    return res.json(empleadoActualizado);
  }

  if (req.method === 'DELETE') {
    const { url } = req;
    const urlParts = url.split('/');
    const empleadoId = urlParts[urlParts.length - 1];
    
    return res.json({ message: 'Empleado eliminado correctamente' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
