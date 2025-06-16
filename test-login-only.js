// Script para probar el login específicamente
const API_URL = 'https://api-delizia.vercel.app/api/auth/login';

async function testLogin() {
  console.log('🧪 Probando login en:', API_URL);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@delizia.com',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    console.log('✅ Login response:', data);
    
    if (data.success) {
      console.log('🎉 Login exitoso! Token:', data.token);
    } else {
      console.log('❌ Login falló:', data.message);
    }
    
  } catch (error) {
    console.error('❌ Error de red:', error);
  }
}

testLogin();
