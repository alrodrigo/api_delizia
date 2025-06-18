// Endpoint dinámico para agencia individual /api/agencias/[id]
// Redirige al endpoint principal de agencias que maneja MongoDB
import agenciasHandler from '../agencias.js';

export default async function handler(req, res) {
  // Delegar al endpoint principal de agencias que ya maneja MongoDB
  return agenciasHandler(req, res);
}
