// API Universal para manejar todas las rutas - MongoDB
import { connectDB, Empleado, Agencia, Asistencia, Observacion, Desempeno } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers más completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Conectar a MongoDB
    await connectDB();

    const { query, method, body, url } = req;
    const path = url.split('?')[0]; // Obtener path sin query params
    const pathParts = path.split('/').filter(p => p);
    
    console.log('Universal API - Path:', path, 'Method:', method);
    console.log('Universal API - PathParts:', pathParts);
    console.log('Universal API - Query:', query);

    // Determinar el tipo de endpoint y ID si existe
    let endpoint = '';
    let id = null;
    
    if (pathParts.includes('empleados')) {
      endpoint = 'empleados';
      const empleadosIndex = pathParts.indexOf('empleados');
      id = pathParts[empleadosIndex + 1] || query.id;
    } else if (pathParts.includes('agencias')) {
      endpoint = 'agencias';
      const agenciasIndex = pathParts.indexOf('agencias');
      id = pathParts[agenciasIndex + 1] || query.id;
    } else if (pathParts.includes('asistencias')) {
      endpoint = 'asistencias';
      const asistenciasIndex = pathParts.indexOf('asistencias');
      id = pathParts[asistenciasIndex + 1] || query.id;
    } else if (pathParts.includes('observaciones')) {
      endpoint = 'observaciones';
      const observacionesIndex = pathParts.indexOf('observaciones');
      id = pathParts[observacionesIndex + 1] || query.id;
    } else if (pathParts.includes('desempenos')) {
      endpoint = 'desempenos';
      const desempenosIndex = pathParts.indexOf('desempenos');
      id = pathParts[desempenosIndex + 1] || query.id;
    }

    console.log('Universal API - Endpoint:', endpoint, 'ID:', id);

    // Enrutamiento por endpoint
    switch (endpoint) {
      case 'empleados':
        return await handleEmpleados(req, res, method, query, body, id);
      case 'agencias':
        return await handleAgencias(req, res, method, query, body, id);
      case 'asistencias':
        return await handleAsistencias(req, res, method, query, body, id);
      case 'observaciones':
        return await handleObservaciones(req, res, method, query, body, id);
      case 'desempenos':
        return await handleDesempenos(req, res, method, query, body, id);
      default:
        return res.status(404).json({ 
          success: false, 
          message: 'Endpoint no encontrado',
          availableEndpoints: ['empleados', 'agencias', 'asistencias', 'observaciones', 'desempenos']
        });
    }

  } catch (error) {
    console.error('❌ Error en Universal API:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

// Handler para Empleados
async function handleEmpleados(req, res, method, query, body, id) {
  console.log('📋 Manejando empleados - Method:', method, 'ID:', id);

  if (method === 'GET') {
    if (id) {
      // Obtener empleado específico
      const empleado = await Empleado.findById(id);
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
    } else {
      // Obtener lista de empleados
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      let filter = {};
      if (query.agencia) {
        filter['agencia._id'] = query.agencia;
      }

      const empleados = await Empleado.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Empleado.countDocuments(filter);

      return res.json({
        success: true,
        count: empleados.length,
        data: empleados,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }
  }

  if (method === 'POST') {
    // Crear nuevo empleado
    const nuevoEmpleado = new Empleado(body);
    const empleadoGuardado = await nuevoEmpleado.save();
    
    console.log('✅ Empleado creado:', empleadoGuardado);
    
    return res.status(201).json({
      success: true,
      message: 'Empleado creado correctamente',
      data: empleadoGuardado
    });
  }

  if (method === 'PUT' && id) {
    // Actualizar empleado
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!empleadoActualizado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Empleado no encontrado' 
      });
    }

    console.log('✅ Empleado actualizado:', empleadoActualizado);

    return res.json({
      success: true,
      message: 'Empleado actualizado correctamente',
      data: empleadoActualizado
    });
  }

  if (method === 'DELETE' && id) {
    // Eliminar empleado
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Empleado no encontrado' 
      });
    }

    console.log('✅ Empleado eliminado:', empleadoEliminado);

    return res.json({
      success: true,
      message: 'Empleado eliminado correctamente'
    });
  }

  return res.status(405).json({ error: 'Método no permitido para empleados' });
}

// Handler para Agencias
async function handleAgencias(req, res, method, query, body, id) {
  console.log('🏢 Manejando agencias - Method:', method, 'ID:', id);

  if (method === 'GET') {
    if (id) {
      // Obtener agencia específica
      const agencia = await Agencia.findById(id);
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
    } else {
      // Obtener lista de agencias
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      const agencias = await Agencia.find({ activa: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Agencia.countDocuments({ activa: true });

      return res.json({
        success: true,
        count: agencias.length,
        data: agencias,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }
  }

  if (method === 'POST') {
    // Crear nueva agencia
    const nuevaAgencia = new Agencia(body);
    const agenciaGuardada = await nuevaAgencia.save();
    
    console.log('✅ Agencia creada:', agenciaGuardada);
    
    return res.status(201).json({
      success: true,
      message: 'Agencia creada correctamente',
      data: agenciaGuardada
    });
  }

  if (method === 'PUT' && id) {
    // Actualizar agencia
    const agenciaActualizada = await Agencia.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!agenciaActualizada) {
      return res.status(404).json({ 
        success: false, 
        message: 'Agencia no encontrada' 
      });
    }

    console.log('✅ Agencia actualizada:', agenciaActualizada);

    return res.json({
      success: true,
      message: 'Agencia actualizada correctamente',
      data: agenciaActualizada
    });
  }

  if (method === 'DELETE' && id) {
    // Marcar agencia como inactiva
    const agenciaEliminada = await Agencia.findByIdAndUpdate(
      id,
      { activa: false },
      { new: true }
    );

    if (!agenciaEliminada) {
      return res.status(404).json({ 
        success: false, 
        message: 'Agencia no encontrada' 
      });
    }

    console.log('✅ Agencia desactivada:', agenciaEliminada);

    return res.json({
      success: true,
      message: 'Agencia eliminada correctamente'
    });
  }

  return res.status(405).json({ error: 'Método no permitido para agencias' });
}

// Handler para Asistencias
async function handleAsistencias(req, res, method, query, body, id) {
  console.log('📅 Manejando asistencias - Method:', method, 'ID:', id);

  if (method === 'GET') {
    if (id) {
      // Obtener asistencia específica
      const asistencia = await Asistencia.findById(id);
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
    } else {
      // Obtener lista de asistencias
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      let filter = {};
      if (query.empleado) {
        filter['empleado._id'] = query.empleado;
      }
      if (query.fecha) {
        filter.fecha = new Date(query.fecha);
      }

      const asistencias = await Asistencia.find(filter)
        .sort({ fecha: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Asistencia.countDocuments(filter);

      return res.json({
        success: true,
        count: asistencias.length,
        data: asistencias,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }
  }

  if (method === 'POST') {
    // Crear nueva asistencia
    const nuevaAsistencia = new Asistencia(body);
    const asistenciaGuardada = await nuevaAsistencia.save();
    
    console.log('✅ Asistencia creada:', asistenciaGuardada);
    
    return res.status(201).json({
      success: true,
      message: 'Asistencia registrada correctamente',
      data: asistenciaGuardada
    });
  }

  if (method === 'PUT' && id) {
    // Actualizar asistencia
    const asistenciaActualizada = await Asistencia.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!asistenciaActualizada) {
      return res.status(404).json({ 
        success: false, 
        message: 'Asistencia no encontrada' 
      });
    }

    console.log('✅ Asistencia actualizada:', asistenciaActualizada);

    return res.json({
      success: true,
      message: 'Asistencia actualizada correctamente',
      data: asistenciaActualizada
    });
  }

  if (method === 'DELETE' && id) {
    // Eliminar asistencia
    const asistenciaEliminada = await Asistencia.findByIdAndDelete(id);

    if (!asistenciaEliminada) {
      return res.status(404).json({ 
        success: false, 
        message: 'Asistencia no encontrada' 
      });
    }

    console.log('✅ Asistencia eliminada:', asistenciaEliminada);

    return res.json({
      success: true,
      message: 'Asistencia eliminada correctamente'
    });
  }

  return res.status(405).json({ error: 'Método no permitido para asistencias' });
}

// Handler para Observaciones
async function handleObservaciones(req, res, method, query, body, id) {
  console.log('📝 Manejando observaciones - Method:', method, 'ID:', id);

  if (method === 'GET') {
    if (id) {
      // Obtener observación específica
      const observacion = await Observacion.findById(id);
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
    } else {
      // Obtener lista de observaciones
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      let filter = {};
      if (query.empleado) {
        filter['empleado._id'] = query.empleado;
      }
      if (query.tipo) {
        filter.tipo = query.tipo;
      }

      const observaciones = await Observacion.find(filter)
        .sort({ fecha: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Observacion.countDocuments(filter);

      return res.json({
        success: true,
        count: observaciones.length,
        data: observaciones,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }
  }

  if (method === 'POST') {
    // Crear nueva observación
    const nuevaObservacion = new Observacion(body);
    const observacionGuardada = await nuevaObservacion.save();
    
    console.log('✅ Observación creada:', observacionGuardada);
    
    return res.status(201).json({
      success: true,
      message: 'Observación creada correctamente',
      data: observacionGuardada
    });
  }

  if (method === 'PUT' && id) {
    // Actualizar observación
    const observacionActualizada = await Observacion.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!observacionActualizada) {
      return res.status(404).json({ 
        success: false, 
        message: 'Observación no encontrada' 
      });
    }

    console.log('✅ Observación actualizada:', observacionActualizada);

    return res.json({
      success: true,
      message: 'Observación actualizada correctamente',
      data: observacionActualizada
    });
  }

  if (method === 'DELETE' && id) {
    // Eliminar observación
    const observacionEliminada = await Observacion.findByIdAndDelete(id);

    if (!observacionEliminada) {
      return res.status(404).json({ 
        success: false, 
        message: 'Observación no encontrada' 
      });
    }

    console.log('✅ Observación eliminada:', observacionEliminada);

    return res.json({
      success: true,
      message: 'Observación eliminada correctamente'
    });
  }

  return res.status(405).json({ error: 'Método no permitido para observaciones' });
}

// Handler para Desempeños
async function handleDesempenos(req, res, method, query, body, id) {
  console.log('📊 Manejando desempeños - Method:', method, 'ID:', id);

  if (method === 'GET') {
    if (id) {
      // Obtener desempeño específico
      const desempeno = await Desempeno.findById(id);
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
    } else {
      // Obtener lista de desempeños
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      let filter = {};
      if (query.empleado) {
        filter['empleado._id'] = query.empleado;
      }
      if (query.periodo) {
        filter.periodo = query.periodo;
      }

      const desempenos = await Desempeno.find(filter)
        .sort({ fechaEvaluacion: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Desempeno.countDocuments(filter);

      return res.json({
        success: true,
        count: desempenos.length,
        data: desempenos,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }
  }

  if (method === 'POST') {
    // Crear nuevo desempeño
    const nuevoDesempeno = new Desempeno(body);
    const desempenoGuardado = await nuevoDesempeno.save();
    
    console.log('✅ Desempeño creado:', desempenoGuardado);
    
    return res.status(201).json({
      success: true,
      message: 'Desempeño registrado correctamente',
      data: desempenoGuardado
    });
  }

  if (method === 'PUT' && id) {
    // Actualizar desempeño
    const desempenoActualizado = await Desempeno.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!desempenoActualizado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Desempeño no encontrado' 
      });
    }

    console.log('✅ Desempeño actualizado:', desempenoActualizado);

    return res.json({
      success: true,
      message: 'Desempeño actualizado correctamente',
      data: desempenoActualizado
    });
  }

  if (method === 'DELETE' && id) {
    // Eliminar desempeño
    const desempenoEliminado = await Desempeno.findByIdAndDelete(id);

    if (!desempenoEliminado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Desempeño no encontrado' 
      });
    }

    console.log('✅ Desempeño eliminado:', desempenoEliminado);

    return res.json({
      success: true,
      message: 'Desempeño eliminado correctamente'
    });
  }

  return res.status(405).json({ error: 'Método no permitido para desempeños' });
}
