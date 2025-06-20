// Función para el endpoint raíz
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Root endpoint
  if (req.method === 'GET') {
    return res.json({
      message: 'API Delizia funcionando perfectamente',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      status: 'online',
      endpoints: {
        'GET /': 'Estado de la API',
        'POST /': 'Login',
        'GET /api': 'Estado de la API (alternativo)'
      }
    });
  }

  // Login endpoint
  if (req.method === 'POST') {
    const { email, password } = req.body || {};
    
    console.log('Login attempt:', email);
    
    // Login hardcoded para prueba
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

  return res.status(404).json({
    error: 'Endpoint no encontrado',
    method: req.method,
    path: req.url
  });
}
