#!/bin/bash

echo "🔧 Recreando endpoints corruptos..."

# Agencias - usando el patrón de empleados
cat > api/agencias.js << 'EOF'
// Endpoint para agencias - MongoDB
import { connectDB, Agencia } from '../lib/mongodb.js';

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
    const { id } = query;

    console.log('🏢 Agencias - Method:', method, 'ID:', id);

    if (method === 'GET') {
      if (id) {
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

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en agencias:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
EOF

# Asistencias - usando el patrón de empleados
cat > api/asistencias.js << 'EOF'
// Endpoint para asistencias - MongoDB
import { connectDB, Asistencia } from '../lib/mongodb.js';

export default async function handler(req, res) {
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
    const { id } = query;

    console.log('📅 Asistencias - Method:', method, 'ID:', id);

    if (method === 'GET') {
      if (id) {
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

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en asistencias:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
EOF

echo "✅ Archivos recreados correctamente"
