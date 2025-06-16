// Script para probar la API desplegada en Vercel
const API_URL = 'TU_URL_DE_VERCEL_AQUI'; // Reemplazar con la URL real

async function testAPI() {
  console.log('🧪 Probando API Delizia Simple...\n');
  
  try {
    // Test 1: GET endpoint
    console.log('1. Probando GET /');
    const getResponse = await fetch(API_URL);
    const getData = await getResponse.json();
    console.log('✅ GET Response:', getData);
    console.log('');

    // Test 2: POST login exitoso
    console.log('2. Probando POST / (login exitoso)');
    const loginResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@delizia.com',
        password: 'admin123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login exitoso:', loginData);
    console.log('');

    // Test 3: POST login fallido
    console.log('3. Probando POST / (login fallido)');
    const badLoginResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'wrong@email.com',
        password: 'wrong'
      })
    });
    const badLoginData = await badLoginResponse.json();
    console.log('❌ Login fallido (esperado):', badLoginData);

  } catch (error) {
    console.error('❌ Error al probar la API:', error);
  }
}

// Ejecutar tests si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testAPI();
}

export { testAPI };
