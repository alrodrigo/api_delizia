// Endpoint para empleados
export default function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

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
    const { url, query } = req;
    
    console.log('Empleados endpoint - URL:', url);
    console.log('Empleados endpoint - Query:', query);
    
    // Verificar si es una petición para empleado específico
    // En Vercel, las rutas dinámicas como /empleados/[id] se manejan con query.id
    const empleadoId = query.id;
    
    // Obtener query parameters
    const agenciaFilter = query.agencia;
    const page = query.page;
    const limit = query.limit;

    console.log('Empleados endpoint - ID:', empleadoId);
    console.log('Empleados endpoint - Params:', { agenciaFilter, page, limit });

    // Si hay un ID específico
    if (empleadoId) {
      const empleado = empleadosMock.find(e => e._id === empleadoId);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      return res.json(empleado);
    }

    // Filtrar por agencia si se especifica
    let empleadosFiltrados = empleadosMock;
    
    if (agenciaFilter) {
      empleadosFiltrados = empleadosMock.filter(e => e.agencia._id === agenciaFilter);
    }

    // Devolver todos los empleados con formato esperado
    return res.json({
      success: true,
      count: empleadosFiltrados.length,
      data: empleadosFiltrados,
      pagination: {
        currentPage: parseInt(page) || 1,
        totalPages: 1,
        totalItems: empleadosFiltrados.length,
        itemsPerPage: parseInt(limit) || empleadosFiltrados.length
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
    const { query, body } = req;
    const empleadoId = query.id;
    
    console.log('PUT Empleado - ID:', empleadoId);
    console.log('PUT Empleado - Body:', body);
    
    if (!empleadoId) {
      return res.status(400).json({ success: false, message: 'ID de empleado requerido' });
    }
    
    const empleado = empleadosMock.find(e => e._id === empleadoId);
    if (!empleado) {
      return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    }

    const empleadoActualizado = { 
      ...empleado, 
      ...body, 
      _id: empleadoId // Mantener el ID original
    };
    
    console.log('Empleado actualizado (simulado):', empleadoActualizado);
    
    return res.json({
      success: true,
      message: 'Empleado actualizado correctamente',
      data: empleadoActualizado
    });
  }

  if (req.method === 'DELETE') {
    const { query } = req;
    const empleadoId = query.id;
    
    console.log('DELETE Empleado - ID:', empleadoId);
    
    if (!empleadoId) {
      return res.status(400).json({ success: false, message: 'ID de empleado requerido' });
    }
    
    const empleado = empleadosMock.find(e => e._id === empleadoId);
    if (!empleado) {
      return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    }
    
    console.log('Empleado eliminado (simulado)');
    
    return res.json({
      success: true,
      message: 'Empleado eliminado correctamente'
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
