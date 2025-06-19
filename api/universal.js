// Endpoint universal para todas las entidades - MongoDB
import { connectDB, Empleado, Agencia, Asistencia, Desempeno, Observacion } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();
    const { query, method, body } = req;
    const { tipo, id, empleadoId, agenciaId } = query;

    console.log('🌐 Universal - Method:', method, 'Tipo:', tipo, 'ID:', id);

    // GET: Obtener datos según el tipo especificado
    if (method === 'GET') {
      if (tipo === 'empleados') {
        if (id) {
          const empleado = await Empleado.findById(id);
          if (!empleado) {
            return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
          }
          return res.json({ success: true, data: empleado });
        } else {
          const page = parseInt(query.page) || 1;
          const limit = parseInt(query.limit) || 10;
          const skip = (page - 1) * limit;

          let filter = {};
          if (agenciaId) filter['agencia'] = agenciaId;

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

      if (tipo === 'agencias') {
        if (id) {
          const agencia = await Agencia.findById(id);
          if (!agencia) {
            return res.status(404).json({ success: false, message: 'Agencia no encontrada' });
          }
          return res.json({ success: true, data: agencia });
        } else {
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

      if (tipo === 'asistencias') {
        if (id) {
          const asistencia = await Asistencia.findById(id);
          if (!asistencia) {
            return res.status(404).json({ success: false, message: 'Asistencia no encontrada' });
          }
          return res.json({ success: true, data: asistencia });
        } else {
          const page = parseInt(query.page) || 1;
          const limit = parseInt(query.limit) || 10;
          const skip = (page - 1) * limit;

          let filter = {};
          if (empleadoId) filter['empleado'] = empleadoId;
          if (query.fecha) filter['fecha'] = new Date(query.fecha);

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

      if (tipo === 'desempenos' || tipo === 'evaluaciones') {
        if (id) {
          const desempeno = await Desempeno.findById(id);
          if (!desempeno) {
            return res.status(404).json({ success: false, message: 'Evaluación no encontrada' });
          }
          return res.json({ success: true, data: desempeno });
        } else {
          const page = parseInt(query.page) || 1;
          const limit = parseInt(query.limit) || 10;
          const skip = (page - 1) * limit;

          let filter = {};
          if (empleadoId) filter['empleado'] = empleadoId;

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

      if (tipo === 'observaciones') {
        if (id) {
          const observacion = await Observacion.findById(id);
          if (!observacion) {
            return res.status(404).json({ success: false, message: 'Observación no encontrada' });
          }
          return res.json({ success: true, data: observacion });
        } else {
          const page = parseInt(query.page) || 1;
          const limit = parseInt(query.limit) || 10;
          const skip = (page - 1) * limit;

          let filter = {};
          if (empleadoId) filter['empleado'] = empleadoId;

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

      // Endpoint especial: obtener todos los datos de una vez (útil para dashboard)
      if (tipo === 'all' || tipo === 'dashboard') {
        const empleados = await Empleado.find().limit(5);
        const agencias = await Agencia.find({ activa: true }).limit(5);
        const asistenciasRecientes = await Asistencia.find().sort({ fecha: -1 }).limit(5);
        const evaluacionesRecientes = await Desempeno.find().sort({ fechaEvaluacion: -1 }).limit(5);
        const observacionesRecientes = await Observacion.find().sort({ fecha: -1 }).limit(5);

        return res.json({
          success: true,
          data: {
            empleados: empleados,
            agencias: agencias,
            asistencias: asistenciasRecientes,
            evaluaciones: evaluacionesRecientes,
            observaciones: observacionesRecientes
          },
          counts: {
            empleados: await Empleado.countDocuments(),
            agencias: await Agencia.countDocuments({ activa: true }),
            asistencias: await Asistencia.countDocuments(),
            evaluaciones: await Desempeno.countDocuments(),
            observaciones: await Observacion.countDocuments()
          }
        });
      }

      return res.status(400).json({ 
        success: false, 
        message: 'Tipo de datos no especificado o inválido. Use: empleados, agencias, asistencias, desempenos, observaciones, all' 
      });
    }

    // POST: Crear nuevos registros
    if (method === 'POST') {
      if (tipo === 'empleados') {
        const nuevoEmpleado = new Empleado(body);
        const empleadoGuardado = await nuevoEmpleado.save();
        return res.status(201).json({
          success: true,
          message: 'Empleado creado correctamente',
          data: empleadoGuardado
        });
      }

      if (tipo === 'agencias') {
        const nuevaAgencia = new Agencia(body);
        const agenciaGuardada = await nuevaAgencia.save();
        return res.status(201).json({
          success: true,
          message: 'Agencia creada correctamente',
          data: agenciaGuardada
        });
      }

      if (tipo === 'asistencias') {
        const nuevaAsistencia = new Asistencia(body);
        const asistenciaGuardada = await nuevaAsistencia.save();
        return res.status(201).json({
          success: true,
          message: 'Asistencia registrada correctamente',
          data: asistenciaGuardada
        });
      }

      if (tipo === 'desempenos' || tipo === 'evaluaciones') {
        const nuevoDesempeno = new Desempeno(body);
        const desempenoGuardado = await nuevoDesempeno.save();
        return res.status(201).json({
          success: true,
          message: 'Evaluación creada correctamente',
          data: desempenoGuardado
        });
      }

      if (tipo === 'observaciones') {
        const nuevaObservacion = new Observacion(body);
        const observacionGuardada = await nuevaObservacion.save();
        return res.status(201).json({
          success: true,
          message: 'Observación creada correctamente',
          data: observacionGuardada
        });
      }

      return res.status(400).json({ 
        success: false, 
        message: 'Tipo no especificado para creación' 
      });
    }

    // PUT: Actualizar registros existentes
    if (method === 'PUT' && id) {
      let modelo, nombreTipo;
      
      if (tipo === 'empleados') {
        modelo = Empleado;
        nombreTipo = 'Empleado';
      } else if (tipo === 'agencias') {
        modelo = Agencia;
        nombreTipo = 'Agencia';
      } else if (tipo === 'asistencias') {
        modelo = Asistencia;
        nombreTipo = 'Asistencia';
      } else if (tipo === 'desempenos' || tipo === 'evaluaciones') {
        modelo = Desempeno;
        nombreTipo = 'Evaluación';
      } else if (tipo === 'observaciones') {
        modelo = Observacion;
        nombreTipo = 'Observación';
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'Tipo no válido para actualización' 
        });
      }

      const registroActualizado = await modelo.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
      );

      if (!registroActualizado) {
        return res.status(404).json({ 
          success: false, 
          message: `${nombreTipo} no encontrado` 
        });
      }

      return res.json({
        success: true,
        message: `${nombreTipo} actualizado correctamente`,
        data: registroActualizado
      });
    }

    // DELETE: Eliminar registros
    if (method === 'DELETE' && id) {
      let modelo, nombreTipo;
      
      if (tipo === 'empleados') {
        modelo = Empleado;
        nombreTipo = 'Empleado';
      } else if (tipo === 'agencias') {
        modelo = Agencia;
        nombreTipo = 'Agencia';
      } else if (tipo === 'asistencias') {
        modelo = Asistencia;
        nombreTipo = 'Asistencia';
      } else if (tipo === 'desempenos' || tipo === 'evaluaciones') {
        modelo = Desempeno;
        nombreTipo = 'Evaluación';
      } else if (tipo === 'observaciones') {
        modelo = Observacion;
        nombreTipo = 'Observación';
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'Tipo no válido para eliminación' 
        });
      }

      const registroEliminado = await modelo.findByIdAndDelete(id);

      if (!registroEliminado) {
        return res.status(404).json({ 
          success: false, 
          message: `${nombreTipo} no encontrado` 
        });
      }

      return res.json({
        success: true,
        message: `${nombreTipo} eliminado correctamente`
      });
    }

    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });

  } catch (error) {
    console.error('❌ Error en universal:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
