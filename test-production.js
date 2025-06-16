// Probar login directo en producción
async function testProductionLogin() {
  console.log('🧪 Probando login en PRODUCCIÓN...');
  
  try {
    const response = await fetch('https://api-delizia.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@delizia.com',
        password: 'admin123'
      })
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testProductionLogin();
