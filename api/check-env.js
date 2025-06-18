// Endpoint para verificar configuración de variables de entorno
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const mongoUri = process.env.MONGODB_URI;
    
    return res.json({
      success: true,
      message: 'Verificación de variables de entorno',
      hasMongoUri: !!mongoUri,
      uriLength: mongoUri ? mongoUri.length : 0,
      uriPrefix: mongoUri ? mongoUri.substring(0, 20) + '...' : 'No configurado',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
