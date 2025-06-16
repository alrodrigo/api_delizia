// Endpoint para desempeño individual /api/desempenos/[id]
export default function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Datos mock de desempeños
  const desempenosMock = [
    {
      _id: '1',
      empleado: {
        _id: '1',
        nombre: 'Ana García'
      },
      periodo: '2025-06',
      puntuacion: 85,
      metas: {
        ventas: 95,
        atencionCliente: 80,
        puntualidad: 90,
        trabajoEquipo: 75
      },
      observaciones: 'Excelente desempeño en ventas, mejorar trabajo en equipo',
      fechaEvaluacion: '2025-06-15T00:00:00.000Z',
      evaluador: 'Luis Rodriguez'
    },
    {
      _id: '2',
      empleado: {
        _id: '2',
        nombre: 'Luis Rodriguez'
      },
      periodo: '2025-06',
      puntuacion: 92,
      metas: {
        ventas: 90,
        atencionCliente: 95,
        puntualidad: 100,
        trabajoEquipo: 85
      },
      observaciones: 'Excelente liderazgo y puntualidad',
      fechaEvaluacion: '2025-06-15T00:00:00.000Z',
      evaluador: 'Juan Pérez'
    },
    {
      _id: '3',
      empleado: {
        _id: '3',
        nombre: 'Carmen Soto'
      },
      periodo: '2025-06',
      puntuacion: 78,
      metas: {
        ventas: 70,
        atencionCliente: 85,
        puntualidad: 80,
        trabajoEquipo: 80
      },
      observaciones: 'Buen desempeño general, mejorar puntualidad',
      fechaEvaluacion: '2025-06-15T00:00:00.000Z',
      evaluador: 'María García'
    }
  ];

  if (req.method === 'GET') {
    const { query } = req;
    const desempenoId = query.id;

    console.log('Desempeño individual - ID:', desempenoId);

    const desempeno = desempenosMock.find(d => d._id === desempenoId);
    if (!desempeno) {
      return res.status(404).json({ 
        success: false, 
        message: 'Desempeño no encontrado' 
      });
    }

    return res.json({
      success: true,
      data: desempeno
    });
  }

  if (req.method === 'PUT') {
    const { query, body } = req;
    const desempenoId = query.id;

    console.log('Actualizando desempeño - ID:', desempenoId);
    console.log('Datos recibidos:', body);

    const desempenoIndex = desempenosMock.findIndex(d => d._id === desempenoId);
    if (desempenoIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Desempeño no encontrado' 
      });
    }

    // Actualizar desempeño (simulado)
    const desempenoActualizado = {
      ...desempenosMock[desempenoIndex],
      ...body,
      _id: desempenoId // Mantener el ID original
    };

    console.log('Desempeño actualizado (simulado):', desempenoActualizado);

    return res.json({
      success: true,
      message: 'Desempeño actualizado correctamente',
      data: desempenoActualizado
    });
  }

  if (req.method === 'DELETE') {
    const { query } = req;
    const desempenoId = query.id;

    console.log('Eliminando desempeño - ID:', desempenoId);

    const desempenoIndex = desempenosMock.findIndex(d => d._id === desempenoId);
    if (desempenoIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Desempeño no encontrado' 
      });
    }

    console.log('Desempeño eliminado (simulado)');

    return res.json({
      success: true,
      message: 'Desempeño eliminado correctamente'
    });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
