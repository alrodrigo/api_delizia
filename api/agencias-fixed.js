// Endpoint para agencias - MongoDB
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
    
    console.log('🔍 Conectando a MongoDB desde agencias...');
    await mongoose.connect(finalUri);
    isConnected = true;
    console.log('✅ MongoDB conectado para agencias');
  } catch (error) {
    console.error('❌ Error conectando MongoDB en agencias:', error);
    throw error;
  }
};

// Esquema para agencias
const agenciaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: String,
  telefono: String,
  email: String,
  gerente: String,
  activa: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now }
}, { timestamps: true });

const Agencia = mongoose.models.Agencia || mongoose.model('Agencia', agenciaSchema);

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
    console.log('🏢 Agencias - Method:', req.method, 'Query:', req.query);
    
    // Conectar a MongoDB
    await connectDB();

    const { query, method, body } = req;
    const { id } = query;

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
      // Marcar agencia como inactiva en lugar de eliminar
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

    return res.status(405).json({ 
      success: false,
      error: 'Método no permitido' 
    });

  } catch (error) {
    console.error('❌ Error en agencias:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
