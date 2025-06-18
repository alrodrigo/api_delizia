// Test básico para agencias
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🧪 Test Agencias - Method:', req.method);
    
    return res.json({
      success: true,
      message: 'Test endpoint funcionando',
      method: req.method,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en test-agencias:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
      stack: error.stack
    });
  }
}
