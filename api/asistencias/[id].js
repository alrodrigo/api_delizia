// Endpoint dinámico para asistencia individual /api/asistencias/[id]
// Redirige al endpoint principal de asistencias que maneja MongoDB
import asistenciasHandler from '../asistencias.js';

export default async function handler(req, res) {
  // Delegar al endpoint principal de asistencias que ya maneja MongoDB
  return asistenciasHandler(req, res);
}
