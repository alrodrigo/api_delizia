// Endpoint delegado para empleados - MongoDB
import { connectDB, Empleado } from '../lib/mongodb.js';

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

    console.log('📋 Empleados - Method:', method, 'ID:', id);

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

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en empleados:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
