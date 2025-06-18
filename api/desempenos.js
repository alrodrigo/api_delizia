// Endpoint para desempeños - MongoDB
import { connectDB, Desempeno } from '../lib/mongodb.js';

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

    console.log('📊 Desempeños - Method:', method, 'ID:', id);

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

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en desempeños:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
