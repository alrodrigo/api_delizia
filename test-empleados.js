// Probar endpoint de empleados específicamente
async function testEmpleados() {
  console.log('🧪 Probando endpoint de empleados...');
  
  try {
    const response = await fetch('https://api-delizia.vercel.app/api/empleados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGRlbGl6aWEuY29tIiwicm9sIjoiYWRtaW4ifQ.fake'
      }
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmpleados();
