// API Simple para empleados - Solo para diagnóstico
import { connectDB, Empleado } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🔍 Diagnóstico - Intentando conectar a MongoDB...');
    
    // Conectar a MongoDB
    await connectDB();
    
    console.log('✅ MongoDB conectado correctamente');

    const { method, query } = req;

    if (method === 'GET') {
      console.log('📋 Obteniendo empleados...');
      
      // Obtener empleados de la base de datos
      const empleados = await Empleado.find({}).limit(10);
      
      console.log('✅ Empleados encontrados:', empleados.length);
      
      return res.json({
        success: true,
        message: 'API funcionando con MongoDB',
        count: empleados.length,
        data: empleados,
        debug: {
          mongoConnected: true,
          timestamp: new Date().toISOString()
        }
      });
    }

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en diagnóstico:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en diagnóstico',
      error: error.message,
      debug: {
        mongoConnected: false,
        timestamp: new Date().toISOString()
      }
    });
  }
}
