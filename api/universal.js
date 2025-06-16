// API unificada para Delizia - Maneja todos los recursos con query parameters
export default function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query, method, body } = req;
  const { resource, id } = query;

  console.log('API Unificada - Resource:', resource, 'ID:', id, 'Method:', method);

  // Datos mock
  const empleadosMock = [
    {
      _id: '1',
      nombre: 'Ana García',
      email: 'ana.garcia@delizia.com',
      telefono: '987-654-321',
      cargo: 'Vendedora',
      agencia: { _id: '1', nombre: 'Agencia Central' },
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
      agencia: { _id: '1', nombre: 'Agencia Central' },
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
      agencia: { _id: '2', nombre: 'Agencia Norte' },
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
      agencia: { _id: '3', nombre: 'Agencia Sur' },
      fechaIngreso: '2024-03-01T00:00:00.000Z',
      salario: 2600,
      activo: true
    }
  ];

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

  const asistenciasMock = [
    {
      _id: '1',
      empleado: { _id: '1', nombre: 'Ana García' },
      fecha: '2025-06-16T00:00:00.000Z',
      horaEntrada: '08:00',
      horaSalida: '17:00',
      estado: 'presente',
      observaciones: 'Llegó puntual'
    },
    {
      _id: '2',
      empleado: { _id: '2', nombre: 'Luis Rodriguez' },
      fecha: '2025-06-16T00:00:00.000Z',
      horaEntrada: '08:15',
      horaSalida: '17:05',
      estado: 'tardanza',
      observaciones: 'Llegó 15 minutos tarde'
    },
    {
      _id: '3',
      empleado: { _id: '3', nombre: 'Carmen Soto' },
      fecha: '2025-06-16T00:00:00.000Z',
      horaEntrada: null,
      horaSalida: null,
      estado: 'ausente',
      observaciones: 'Falta justificada por enfermedad'
    }
  ];

  const desempenosMock = [
    {
      _id: '1',
      empleado: { _id: '1', nombre: 'Ana García' },
      periodo: '2025-06',
      puntuacion: 85,
      metas: { ventas: 95, atencionCliente: 80, puntualidad: 90, trabajoEquipo: 75 },
      observaciones: 'Excelente desempeño en ventas, mejorar trabajo en equipo',
      fechaEvaluacion: '2025-06-15T00:00:00.000Z',
      evaluador: 'Luis Rodriguez'
    },
    {
      _id: '2',
      empleado: { _id: '2', nombre: 'Luis Rodriguez' },
      periodo: '2025-06',
      puntuacion: 92,
      metas: { ventas: 90, atencionCliente: 95, puntualidad: 100, trabajoEquipo: 85 },
      observaciones: 'Excelente liderazgo y puntualidad',
      fechaEvaluacion: '2025-06-15T00:00:00.000Z',
      evaluador: 'Juan Pérez'
    },
    {
      _id: '3',
      empleado: { _id: '3', nombre: 'Carmen Soto' },
      periodo: '2025-06',
      puntuacion: 78,
      metas: { ventas: 70, atencionCliente: 85, puntualidad: 80, trabajoEquipo: 80 },
      observaciones: 'Buen desempeño general, mejorar puntualidad',
      fechaEvaluacion: '2025-06-15T00:00:00.000Z',
      evaluador: 'María García'
    }
  ];

  const observacionesMock = [
    {
      _id: '1',
      empleado: { _id: '1', nombre: 'Ana García' },
      fecha: '2025-06-15T00:00:00.000Z',
      tipo: 'reconocimiento',
      descripcion: 'Excelente atención al cliente, recibió felicitaciones del cliente',
      autor: 'Luis Rodriguez'
    },
    {
      _id: '2',
      empleado: { _id: '2', nombre: 'Luis Rodriguez' },
      fecha: '2025-06-14T00:00:00.000Z',
      tipo: 'mejora',
      descripcion: 'Debe mejorar la organización de su área de trabajo',
      autor: 'Juan Pérez'
    },
    {
      _id: '3',
      empleado: { _id: '3', nombre: 'Carmen Soto' },
      fecha: '2025-06-13T00:00:00.000Z',
      tipo: 'seguimiento',
      descripcion: 'Seguimiento de capacitación en sistema de ventas',
      autor: 'María García'
    }
  ];

  // Función helper para manejar operaciones CRUD
  function handleCRUD(data, resourceName) {
    if (method === 'GET') {
      if (id) {
        // Obtener item específico
        const item = data.find(item => item._id === id);
        if (!item) {
          return res.status(404).json({ success: false, message: `${resourceName} no encontrado` });
        }
        return res.json({ success: true, data: item });
      } else {
        // Obtener lista
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        return res.json({
          success: true,
          count: data.length,
          data: data,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(data.length / limit),
            totalItems: data.length,
            itemsPerPage: limit
          }
        });
      }
    }

    if (method === 'POST') {
      // Crear nuevo item
      const newItem = {
        _id: String(Date.now()),
        ...body,
        fechaCreacion: new Date().toISOString()
      };
      return res.status(201).json({ success: true, message: `${resourceName} creado correctamente`, data: newItem });
    }

    if (method === 'PUT' && id) {
      // Actualizar item
      const itemIndex = data.findIndex(item => item._id === id);
      if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: `${resourceName} no encontrado` });
      }
      const updatedItem = { ...data[itemIndex], ...body, _id: id };
      return res.json({ success: true, message: `${resourceName} actualizado correctamente`, data: updatedItem });
    }

    if (method === 'DELETE' && id) {
      // Eliminar item
      const itemIndex = data.findIndex(item => item._id === id);
      if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: `${resourceName} no encontrado` });
      }
      return res.json({ success: true, message: `${resourceName} eliminado correctamente` });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Routing basado en resource parameter
  switch (resource) {
    case 'empleados':
      return handleCRUD(empleadosMock, 'Empleado');
    case 'agencias':
      return handleCRUD(agenciasMock, 'Agencia');
    case 'asistencias':
      return handleCRUD(asistenciasMock, 'Asistencia');
    case 'desempenos':
      return handleCRUD(desempenosMock, 'Desempeño');
    case 'observaciones':
      return handleCRUD(observacionesMock, 'Observación');
    default:
      // Si no hay resource, es el endpoint raíz
      if (method === 'GET') {
        return res.json({
          message: 'API Delizia funcionando perfectamente',
          timestamp: new Date().toISOString(),
          version: '3.0.0',
          status: 'online',
          endpoints: [
            'GET /api?resource=empleados',
            'GET /api?resource=empleados&id=1',
            'POST /api?resource=empleados',
            'PUT /api?resource=empleados&id=1',
            'DELETE /api?resource=empleados&id=1'
          ]
        });
      }
      return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
}
