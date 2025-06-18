// Endpoint dinámico para observación individual /api/observaciones/[id]
// Redirige al endpoint principal de observaciones que maneja MongoDB
import observacionesHandler from '../observaciones.js';

export default async function handler(req, res) {
  // Delegar al endpoint principal de observaciones que ya maneja MongoDB
  return observacionesHandler(req, res);
}
