// Endpoint para desempeños
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
    const { url } = req;
    
    // Parsear URL y query parameters
    const urlObj = new URL(url, 'https://dummy.com');
    const pathParts = urlObj.pathname.split('/');
    const desempenoId = pathParts[pathParts.length - 1];
    
    // Obtener query parameters
    const empleadoFilter = urlObj.searchParams.get('empleado');
    const periodoFilter = urlObj.searchParams.get('periodo');

    console.log('Desempeños endpoint - URL:', url);
    console.log('Desempeños endpoint - Query params:', { empleadoFilter, periodoFilter });

    // Si hay un ID específico
    if (desempenoId && desempenoId !== 'desempenos' && !desempenoId.includes('?')) {
      const desempeno = desempenosMock.find(d => d._id === desempenoId);
      if (!desempeno) {
        return res.status(404).json({ message: 'Desempeño no encontrado' });
      }
      return res.json(desempeno);
    }

    // Filtrar por empleado o período si se especifica
    let desempenosFiltrados = desempenosMock;

    if (empleadoFilter) {
      desempenosFiltrados = desempenosFiltrados.filter(d => d.empleado._id === empleadoFilter);
    }

    if (periodoFilter) {
      desempenosFiltrados = desempenosFiltrados.filter(d => d.periodo === periodoFilter);
    }

    return res.json({
      success: true,
      count: desempenosFiltrados.length,
      data: desempenosFiltrados,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: desempenosFiltrados.length,
        itemsPerPage: desempenosFiltrados.length
      }
    });
  }

  if (req.method === 'POST') {
    const nuevoDesempeno = {
      _id: String(Date.now()),
      ...req.body,
      fechaEvaluacion: new Date().toISOString()
    };
    
    return res.status(201).json(nuevoDesempeno);
  }

  if (req.method === 'PUT') {
    const { url } = req;
    const urlParts = url.split('/');
    const desempenoId = urlParts[urlParts.length - 1];
    
    const desempeno = desempenosMock.find(d => d._id === desempenoId);
    if (!desempeno) {
      return res.status(404).json({ message: 'Desempeño no encontrado' });
    }

    const desempenoActualizado = { ...desempeno, ...req.body };
    return res.json(desempenoActualizado);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
