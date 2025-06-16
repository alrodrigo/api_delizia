// Script para simular las peticiones que hace el frontend
import axios from 'axios';

const API_URL = 'https://api-delizia.vercel.app/api';

// Simular el token que usa el frontend
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGRlbGl6aWEuY29tIiwicm9sIjoiYWRtaW4ifQ.fake';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

async function testEndpoints() {
  console.log('🔍 Probando conexión frontend -> API...\n');
  
  const endpoints = [
    { name: 'Empleados', url: '/empleados' },
    { name: 'Agencias', url: '/agencias' },
    { name: 'Asistencias', url: '/asistencias' },
    { name: 'Desempeños', url: '/desempenos' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Probando ${endpoint.name}...`);
      const response = await axiosInstance.get(endpoint.url);
      console.log(`✅ ${endpoint.name}: OK (${response.data.count} registros)`);
    } catch (error) {
      console.log(`❌ ${endpoint.name}: ERROR`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Data: ${JSON.stringify(error.response.data)}`);
      } else {
        console.log(`   Error: ${error.message}`);
      }
    }
    console.log('');
  }
  
  // Probar con parámetros como lo hace el frontend
  try {
    console.log('📡 Probando empleados con parámetros...');
    const response = await axiosInstance.get('/empleados', { 
      params: { page: 1, limit: 10 } 
    });
    console.log(`✅ Empleados con params: OK (${response.data.count} registros)`);
  } catch (error) {
    console.log('❌ Empleados con params: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

testEndpoints().catch(console.error);
