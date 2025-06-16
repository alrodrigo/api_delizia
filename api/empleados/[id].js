// Endpoint para empleado individual /api/empleados/[id]
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
    const { query } = req;
    const empleadoId = query.id;

    console.log('Empleado individual - ID:', empleadoId);

    const empleado = empleadosMock.find(e => e._id === empleadoId);
    if (!empleado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Empleado no encontrado' 
      });
    }

    return res.json({
      success: true,
      data: empleado
    });
  }

  if (req.method === 'PUT') {
    const { query, body } = req;
    const empleadoId = query.id;

    console.log('Actualizando empleado - ID:', empleadoId);
    console.log('Datos recibidos:', body);

    const empleadoIndex = empleadosMock.findIndex(e => e._id === empleadoId);
    if (empleadoIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Empleado no encontrado' 
      });
    }

    // Actualizar empleado (simulado)
    const empleadoActualizado = {
      ...empleadosMock[empleadoIndex],
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

    console.log('Eliminando empleado - ID:', empleadoId);

    const empleadoIndex = empleadosMock.findIndex(e => e._id === empleadoId);
    if (empleadoIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Empleado no encontrado' 
      });
    }

    console.log('Empleado eliminado (simulado)');

    return res.json({
      success: true,
      message: 'Empleado eliminado correctamente'
    });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
