// Endpoint para asistencias - MongoDB
import mongoose from 'mongoose';

// Configuración de conexión a MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/delizia';
    const finalUri = mongoUri.includes('/delizia') ? mongoUri : mongoUri.replace('/?', '/delizia?');
    
    console.log('🔍 Conectando a MongoDB desde asistencias...');
    await mongoose.connect(finalUri);
    isConnected = true;
    console.log('✅ MongoDB conectado para asistencias');
  } catch (error) {
    console.error('❌ Error conectando MongoDB en asistencias:', error);
    throw error;
  }
};

// Esquema para asistencias
const asistenciaSchema = new mongoose.Schema({
  empleado: {
    _id: String, 
    nombre: String
  },
  fecha: { type: Date, required: true },
  horaEntrada: String,
  horaSalida: String,
  estado: { type: String, enum: ['presente', 'ausente', 'tardanza'], default: 'presente' },
  observaciones: String
}, { timestamps: true });

const Asistencia = mongoose.models.Asistencia || mongoose.model('Asistencia', asistenciaSchema);

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
    console.log('📅 Asistencias - Method:', req.method, 'Query:', req.query);
    
    // Conectar a MongoDB
    await connectDB();

    const { query, method, body } = req;
    const { id } = query;

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

    return res.status(405).json({ 
      success: false,
      error: 'Método no permitido' 
    });

  } catch (error) {
    console.error('❌ Error en asistencias:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
