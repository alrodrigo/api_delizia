// Endpoint dinámico para desempeño individual /api/desempenos/[id]
// Redirige al endpoint principal de desempeños que maneja MongoDB
import desempenosHandler from '../desempenos.js';

export default async function handler(req, res) {
  // Delegar al endpoint principal de desempeños que ya maneja MongoDB
  return desempenosHandler(req, res);
}
