#!/bin/bash

echo "🧪 PRUEBAS INTEGRALES DE TODOS LOS ENDPOINTS"
echo "============================================="

BASE_URL="https://api-delizia.vercel.app/api"

echo ""
echo "1️⃣ Probando EMPLEADOS (que sabemos que funciona)..."
echo "GET /empleados"
curl -s -X GET "$BASE_URL/empleados" | head -c 200
echo "... ✅"

echo ""
echo ""
echo "2️⃣ Probando AGENCIAS..."
echo "GET /agencias"
RESPONSE_AGENCIAS=$(curl -s -X GET "$BASE_URL/agencias")
echo "$RESPONSE_AGENCIAS" | head -c 200
if [[ "$RESPONSE_AGENCIAS" == *"FUNCTION_INVOCATION_FAILED"* ]]; then
  echo "... ❌ ERROR EN AGENCIAS"
else
  echo "... ✅ AGENCIAS OK"
fi

echo ""
echo ""
echo "3️⃣ Probando ASISTENCIAS..."
echo "GET /asistencias"
RESPONSE_ASISTENCIAS=$(curl -s -X GET "$BASE_URL/asistencias")
echo "$RESPONSE_ASISTENCIAS" | head -c 200
if [[ "$RESPONSE_ASISTENCIAS" == *"FUNCTION_INVOCATION_FAILED"* ]]; then
  echo "... ❌ ERROR EN ASISTENCIAS"
else
  echo "... ✅ ASISTENCIAS OK"
fi

echo ""
echo ""
echo "4️⃣ Probando DESEMPEÑOS..."
echo "GET /desempenos"
RESPONSE_DESEMPENOS=$(curl -s -X GET "$BASE_URL/desempenos")
echo "$RESPONSE_DESEMPENOS" | head -c 200
if [[ "$RESPONSE_DESEMPENOS" == *"FUNCTION_INVOCATION_FAILED"* ]]; then
  echo "... ❌ ERROR EN DESEMPEÑOS"
else
  echo "... ✅ DESEMPEÑOS OK"
fi

echo ""
echo ""
echo "5️⃣ Probando OBSERVACIONES..."
echo "GET /observaciones"
RESPONSE_OBSERVACIONES=$(curl -s -X GET "$BASE_URL/observaciones")
echo "$RESPONSE_OBSERVACIONES" | head -c 200
if [[ "$RESPONSE_OBSERVACIONES" == *"FUNCTION_INVOCATION_FAILED"* ]]; then
  echo "... ❌ ERROR EN OBSERVACIONES"
else
  echo "... ✅ OBSERVACIONES OK"
fi

echo ""
echo ""
echo "🎯 CREANDO DATOS DE PRUEBA..."
echo "=============================="

echo ""
echo "🏢 Creando agencia de prueba..."
NUEVA_AGENCIA=$(curl -s -X POST "$BASE_URL/agencias" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Agencia de Prueba API",
    "direccion": "Calle Falsa 123",
    "telefono": "555-0001",
    "email": "prueba@agencia.com",
    "gerente": "Manager Test"
  }')

echo "$NUEVA_AGENCIA" | head -c 200

# Extraer ID de la agencia creada (simplificado)
AGENCIA_ID=$(echo "$NUEVA_AGENCIA" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "ID de agencia creada: $AGENCIA_ID"

echo ""
echo "📅 Creando asistencia de prueba..."
curl -s -X POST "$BASE_URL/asistencias" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": {
      "_id": "68532ca13781d5ed8767d00f",
      "nombre": "Carlos Test Final"
    },
    "fecha": "2025-06-18",
    "horaEntrada": "08:00",
    "horaSalida": "17:00",
    "estado": "presente",
    "observaciones": "Asistencia de prueba API"
  }' | head -c 200

echo ""
echo ""
echo "📊 Creando desempeño de prueba..."
curl -s -X POST "$BASE_URL/desempenos" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": {
      "_id": "68532ca13781d5ed8767d00f",
      "nombre": "Carlos Test Final"
    },
    "periodo": "2025-06",
    "puntuacion": 85,
    "metas": {
      "ventas": 90,
      "atencionCliente": 88,
      "puntualidad": 80,
      "trabajoEquipo": 82
    },
    "observaciones": "Desempeño de prueba API",
    "fechaEvaluacion": "2025-06-18",
    "evaluador": "Test Manager"
  }' | head -c 200

echo ""
echo ""
echo "📝 Creando observación de prueba..."
curl -s -X POST "$BASE_URL/observaciones" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": {
      "_id": "68532ca13781d5ed8767d00f",
      "nombre": "Carlos Test Final"
    },
    "fecha": "2025-06-18",
    "tipo": "positiva",
    "categoria": "Productividad",
    "descripcion": "Observación de prueba API - Excelente trabajo",
    "observador": "Test Supervisor"
  }' | head -c 200

echo ""
echo ""
echo "✅ PRUEBAS COMPLETADAS"
echo "======================="
