// Script para probar todos los endpoints directamente
async function testAllEndpoints() {
  console.log('🧪 Probando todos los endpoints...\n');
  
  const baseURL = 'https://api-delizia.vercel.app/api';
  
  const endpoints = [
    'empleados',
    'agencias', 
    'asistencias',
    'desempenos'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`📊 Probando ${endpoint}:`);
      const response = await fetch(`${baseURL}/${endpoint}`);
      const data = await response.json();
      
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Success: ${data.success}`);
      console.log(`✅ Count: ${data.count}`);
      console.log(`✅ Data length: ${data.data ? data.data.length : 'No data array'}`);
      
      if (data.data && data.data.length > 0) {
        console.log(`✅ Primer registro:`, data.data[0]);
      }
      console.log('---\n');
      
    } catch (error) {
      console.error(`❌ Error en ${endpoint}:`, error);
      console.log('---\n');
    }
  }
}

testAllEndpoints();
