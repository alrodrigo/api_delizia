// Endpoint para observaciones - MongoDB
import { connectDB, Observacion } from '../lib/mongodb.js';

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
    // Conectar a MongoDB
    await connectDB();

    const { query, method, body } = req;
    const { id } = query;

    console.log('📝 Observaciones - Method:', method, 'ID:', id);

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

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en observaciones:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
