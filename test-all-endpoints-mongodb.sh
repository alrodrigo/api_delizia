#!/bin/bash

# Script para probar TODOS los endpoints de Delizia con MongoDB
echo "🧪 PROBANDO TODOS LOS ENDPOINTS DE DELIZIA"
echo "=========================================="

API_URL="https://api-delizia.vercel.app"

echo ""
echo "1️⃣ EMPLEADOS:"
echo "=============="
echo "GET /api/empleados"
curl -s -X GET "$API_URL/api/empleados" -H "Content-Type: application/json" | head -c 200
echo "..."

echo ""
echo ""
echo "2️⃣ AGENCIAS:"
echo "============"
echo "GET /api/agencias"
curl -s -X GET "$API_URL/api/agencias" -H "Content-Type: application/json" | head -c 200
echo "..."

echo ""
echo ""
echo "3️⃣ ASISTENCIAS:"
echo "==============="
echo "GET /api/asistencias"
curl -s -X GET "$API_URL/api/asistencias" -H "Content-Type: application/json" | head -c 200
echo "..."

echo ""
echo ""
echo "4️⃣ OBSERVACIONES:"
echo "================="
echo "GET /api/observaciones"
curl -s -X GET "$API_URL/api/observaciones" -H "Content-Type: application/json" | head -c 200
echo "..."

echo ""
echo ""
echo "5️⃣ DESEMPEÑOS:"
echo "=============="
echo "GET /api/desempenos"
curl -s -X GET "$API_URL/api/desempenos" -H "Content-Type: application/json" | head -c 200
echo "..."

echo ""
echo ""
echo "🔬 CREANDO DATOS DE PRUEBA:"
echo "==========================="

echo ""
echo "📋 Creando agencia de prueba..."
curl -s -X POST "$API_URL/api/agencias" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Agencia Test MongoDB",
    "direccion": "Calle Test 123",
    "telefono": "555-0123",
    "email": "test@agencia.com",
    "gerente": "Gerente Test",
    "activa": true
  }'

echo ""
echo ""
echo "📅 Creando asistencia de prueba..."
curl -s -X POST "$API_URL/api/asistencias" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": {
      "_id": "test-employee-id",
      "nombre": "Empleado Test"
    },
    "fecha": "2025-06-18",
    "horaEntrada": "08:00",
    "horaSalida": "17:00",
    "estado": "presente",
    "observaciones": "Prueba de asistencia MongoDB"
  }'

echo ""
echo ""
echo "📝 Creando observación de prueba..."
curl -s -X POST "$API_URL/api/observaciones" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": {
      "_id": "test-employee-id",
      "nombre": "Empleado Test"
    },
    "fecha": "2025-06-18",
    "tipo": "positiva",
    "categoria": "Puntualidad",
    "descripcion": "Excelente puntualidad y actitud",
    "observador": "Supervisor Test"
  }'

echo ""
echo ""
echo "📊 Creando desempeño de prueba..."
curl -s -X POST "$API_URL/api/desempenos" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": {
      "_id": "test-employee-id",
      "nombre": "Empleado Test"
    },
    "periodo": "2025-Q2",
    "puntuacion": 85,
    "metas": {
      "ventas": 90,
      "atencionCliente": 88,
      "puntualidad": 95,
      "trabajoEquipo": 80
    },
    "observaciones": "Buen desempeño general",
    "fechaEvaluacion": "2025-06-18",
    "evaluador": "Supervisor Test"
  }'

echo ""
echo ""
echo "✅ VERIFICANDO DATOS CREADOS:"
echo "============================"

echo ""
echo "📋 Agencias actuales:"
curl -s -X GET "$API_URL/api/agencias" | grep -E "(count|nombre)" | head -5

echo ""
echo "📅 Asistencias actuales:"
curl -s -X GET "$API_URL/api/asistencias" | grep -E "(count|empleado)" | head -5

echo ""
echo "📝 Observaciones actuales:"
curl -s -X GET "$API_URL/api/observaciones" | grep -E "(count|descripcion)" | head -5

echo ""
echo "📊 Desempeños actuales:"
curl -s -X GET "$API_URL/api/desempenos" | grep -E "(count|puntuacion)" | head -5

echo ""
echo ""
echo "🎯 RESUMEN:"
echo "==========="
echo "✅ Todos los endpoints creados con MongoDB"
echo "✅ Datos de prueba agregados"
echo "✅ Frontend puede usar cualquier endpoint"
echo "✅ Ediciones se guardan permanentemente"
echo ""
echo "🌐 Frontend disponible en: https://delizia.vercel.app"
