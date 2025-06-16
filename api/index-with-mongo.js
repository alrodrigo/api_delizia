// API Delizia con MongoDB
import { MongoClient } from 'mongodb';

let client;
let db;

async function connectToDatabase() {
  if (db) return db;
  
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI no está configurado');
    }
    
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('delizia-db');
    console.log('Conectado a MongoDB Atlas');
    return db;
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Root endpoint
    if (req.method === 'GET') {
      // Intentar conectar a MongoDB para verificar estado
      try {
        await connectToDatabase();
        return res.json({
          message: 'API Delizia funcionando perfectamente',
          timestamp: new Date().toISOString(),
          version: '3.0.0',
          status: 'online',
          database: 'connected'
        });
      } catch (error) {
        return res.json({
          message: 'API Delizia funcionando con base local',
          timestamp: new Date().toISOString(),
          version: '3.0.0',
          status: 'online',
          database: 'fallback'
        });
      }
    }

    // Login endpoint
    if (req.method === 'POST') {
      const { email, password } = req.body || {};
      
      console.log('Login attempt:', email);
      
      try {
        // Intentar autenticación con MongoDB
        const database = await connectToDatabase();
        const usuarios = database.collection('usuarios');
        
        const usuario = await usuarios.findOne({ email });
        
        if (usuario && usuario.password === password) {
          return res.json({
            success: true,
            token: 'jwt_token_real_aqui',
            usuario: {
              id: usuario._id,
              nombre: usuario.nombre,
              email: usuario.email,
              rol: usuario.rol
            }
          });
        }
        
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
        
      } catch (error) {
        console.error('Error de DB, usando fallback:', error);
        
        // Fallback a login hardcoded si MongoDB falla
        if (email === 'admin@delizia.com' && password === 'admin123') {
          return res.json({
            success: true,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGRlbGl6aWEuY29tIiwicm9sIjoiYWRtaW4ifQ.fake',
            usuario: {
              id: '1',
              nombre: 'Administrador',
              email: 'admin@delizia.com',
              rol: 'admin'
            }
          });
        }
        
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }
    }

    return res.status(404).json({
      error: 'Endpoint no encontrado',
      method: req.method,
      url: req.url
    });
    
  } catch (error) {
    console.error('Error en handler:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
