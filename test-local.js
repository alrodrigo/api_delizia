// Servidor local para probar la API simple
import express from 'express';
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Importar el handler de Vercel y adaptarlo
import handlerModule from './index.js';
const handler = handlerModule.default || handlerModule;

// Simular req/res de Vercel para Express
app.all('*', (req, res) => {
  // Adaptar el objeto req para que sea compatible con Vercel
  const mockReq = {
    method: req.method,
    body: req.body,
    query: req.query,
    headers: req.headers,
    url: req.url
  };

  // Adaptar el objeto res para que sea compatible con Vercel
  const mockRes = {
    json: (data) => res.json(data),
    status: (code) => {
      res.status(code);
      return mockRes;
    },
    setHeader: (key, value) => res.setHeader(key, value),
    end: () => res.end()
  };

  // Llamar al handler
  handler(mockReq, mockRes);
});

app.listen(port, () => {
  console.log(`🚀 API Simple ejecutándose en http://localhost:${port}`);
  console.log('📡 Endpoints disponibles:');
  console.log('  GET  / - Estado de la API');
  console.log('  POST / - Login (admin@delizia.com / admin123)');
});
