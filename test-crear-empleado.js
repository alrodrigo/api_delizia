// Test específico para crear empleados - Diagnóstico completo
import fetch from 'node-fetch';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-delizia-simple.vercel.app' 
  : 'http://localhost:3000';

console.log('🔍 DIAGNÓSTICO: Creación de Empleados');
console.log('📍 URL Base:', API_URL);
console.log('=' .repeat(60));

// Datos de prueba para crear empleado
const empleadoMinimo = {
  nombre: "Juan Test",
  email: "juan.test@example.com"
};

const empleadoCompleto = {
  nombre: "María",
  apellido: "González",
  ci: "12345678",
  sexo: "femenino",
  edad: 30,
  email: "maria.gonzalez@delizia.com",
  telefono: "099123456",
  direccion: "Av. Principal 123",
  fechaNacimiento: "1993-05-15",
  puesto: "Vendedora",
  cargo: "Empleada Senior",
  agencia: "Agencia Centro",
  salario: 25000,
  antecedentes: "Sin antecedentes",
  cargosAnteriores: "Vendedora en otra empresa",
  recomendaciones: "Excelente empleada"
};

async function testCrearEmpleados() {
  try {
    console.log('\n1️⃣ TEST: Crear empleado con datos mínimos');
    console.log('Datos:', JSON.stringify(empleadoMinimo, null, 2));
    
    const responseMinimo = await fetch(`${API_URL}/api/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoMinimo)
    });

    console.log('Status:', responseMinimo.status);
    const resultMinimo = await responseMinimo.text();
    
    try {
      const jsonMinimo = JSON.parse(resultMinimo);
      console.log('Respuesta:', JSON.stringify(jsonMinimo, null, 2));
      
      if (jsonMinimo.success) {
        console.log('✅ Empleado mínimo creado exitosamente');
      } else {
        console.log('❌ Error al crear empleado mínimo:', jsonMinimo.message);
      }
    } catch (e) {
      console.log('❌ Respuesta no es JSON válido:', resultMinimo);
    }

    console.log('\n' + '='.repeat(40));

    console.log('\n2️⃣ TEST: Crear empleado con datos completos');
    console.log('Datos (resumidos):', `{nombre: "${empleadoCompleto.nombre}", apellido: "${empleadoCompleto.apellido}", email: "${empleadoCompleto.email}"}`);
    
    const responseCompleto = await fetch(`${API_URL}/api/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoCompleto)
    });

    console.log('Status:', responseCompleto.status);
    const resultCompleto = await responseCompleto.text();
    
    try {
      const jsonCompleto = JSON.parse(resultCompleto);
      console.log('Respuesta:', JSON.stringify(jsonCompleto, null, 2));
      
      if (jsonCompleto.success) {
        console.log('✅ Empleado completo creado exitosamente');
        console.log('📄 ID del empleado:', jsonCompleto.data._id);
      } else {
        console.log('❌ Error al crear empleado completo:', jsonCompleto.message);
      }
    } catch (e) {
      console.log('❌ Respuesta no es JSON válido:', resultCompleto);
    }

    console.log('\n' + '='.repeat(40));

    // Test de campos problemáticos
    console.log('\n3️⃣ TEST: Campos que pueden causar problemas');
    
    const empleadoProblematico = {
      nombre: "", // Nombre vacío
      email: "test@test.com"
    };

    console.log('Datos problemáticos:', JSON.stringify(empleadoProblematico, null, 2));
    
    const responseProblematico = await fetch(`${API_URL}/api/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoProblematico)
    });

    console.log('Status:', responseProblematico.status);
    const resultProblematico = await responseProblematico.text();
    
    try {
      const jsonProblematico = JSON.parse(resultProblematico);
      console.log('Respuesta:', JSON.stringify(jsonProblematico, null, 2));
    } catch (e) {
      console.log('❌ Respuesta no es JSON válido:', resultProblematico);
    }

  } catch (error) {
    console.error('❌ Error general en las pruebas:', error.message);
  }
}

async function verificarEsquema() {
  console.log('\n4️⃣ VERIFICACIÓN: Esquema actual de empleados');
  
  try {
    const response = await fetch(`${API_URL}/api/empleados?limit=1`);
    const result = await response.json();
    
    if (result.success && result.data && result.data.length > 0) {
      console.log('Estructura de empleado existente:');
      const empleado = result.data[0];
      console.log('Campos disponibles:', Object.keys(empleado));
    } else {
      console.log('No hay empleados existentes para verificar estructura');
    }
  } catch (error) {
    console.error('Error verificando esquema:', error.message);
  }
}

// Ejecutar todas las pruebas
async function ejecutarDiagnostico() {
  await testCrearEmpleados();
  await verificarEsquema();
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 Diagnóstico completado');
  console.log('📝 Revisa los errores específicos arriba para identificar el problema');
}

ejecutarDiagnostico();
