// Redirección de asistencias/[id] a asistencias?id=
export default async function handler(req, res) {
  const { id } = req.query;
  
  // Redirigir a la URL con query parameter
  const redirectUrl = `/api/asistencias?id=${id}`;
  
  // Para requests API, devolver una respuesta que indique el endpoint correcto
  if (req.headers['content-type']?.includes('application/json') || 
      req.headers['accept']?.includes('application/json')) {
    return res.status(301).json({
      success: false,
      message: 'Este endpoint ha sido movido',
      redirectTo: redirectUrl,
      note: 'Use /api/asistencias?id=' + id + ' en su lugar'
    });
  }
  
  // Para otros casos, redirigir
  return res.redirect(301, redirectUrl);
}
