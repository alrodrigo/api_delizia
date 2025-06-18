#!/bin/bash

echo "🔧 DIAGNÓSTICO COMPLETO PARA PROBLEMAS DEL FRONTEND"
echo "=================================================="
echo ""

BASE_URL="https://api-delizia.vercel.app/api"

echo "1️⃣ VERIFICANDO TODOS LOS ENDPOINTS:"
echo "===================================="

echo ""
echo "📋 Empleados:"
EMPLEADOS_RESPONSE=$(curl -s -X GET "$BASE_URL/empleados")
echo "Status: $(echo "$EMPLEADOS_RESPONSE" | grep -o '"success":[^,]*' | cut -d':' -f2)"
echo "Count: $(echo "$EMPLEADOS_RESPONSE" | grep -o '"count":[^,]*' | cut -d':' -f2)"

echo ""
echo "🏢 Agencias:"
AGENCIAS_RESPONSE=$(curl -s -X GET "$BASE_URL/agencias")
echo "Status: $(echo "$AGENCIAS_RESPONSE" | grep -o '"success":[^,]*' | cut -d':' -f2)"
echo "Count: $(echo "$AGENCIAS_RESPONSE" | grep -o '"count":[^,]*' | cut -d':' -f2)"

echo ""
echo "📅 Asistencias:"
ASISTENCIAS_RESPONSE=$(curl -s -X GET "$BASE_URL/asistencias")
echo "Status: $(echo "$ASISTENCIAS_RESPONSE" | grep -o '"success":[^,]*' | cut -d':' -f2)"
echo "Count: $(echo "$ASISTENCIAS_RESPONSE" | grep -o '"count":[^,]*' | cut -d':' -f2)"

echo ""
echo "📊 Evaluaciones (desempeños):"
EVALUACIONES_RESPONSE=$(curl -s -X GET "$BASE_URL/evaluaciones")
echo "Status: $(echo "$EVALUACIONES_RESPONSE" | grep -o '"success":[^,]*' | cut -d':' -f2)"
echo "Count: $(echo "$EVALUACIONES_RESPONSE" | grep -o '"count":[^,]*' | cut -d':' -f2)"

echo ""
echo "📝 Observaciones:"
OBSERVACIONES_RESPONSE=$(curl -s -X GET "$BASE_URL/observaciones")
echo "Status: $(echo "$OBSERVACIONES_RESPONSE" | grep -o '"success":[^,]*' | cut -d':' -f2)"
echo "Count: $(echo "$OBSERVACIONES_RESPONSE" | grep -o '"count":[^,]*' | cut -d':' -f2)"

echo ""
echo ""
echo "2️⃣ PROBANDO EDICIÓN DE EMPLEADO:"
echo "================================="

echo ""
echo "Empleado antes de editar:"
curl -s -X GET "$BASE_URL/empleados?id=68532ca13781d5ed8767d00f" | grep -o '"nombre":"[^"]*"'

echo ""
echo "Editando empleado..."
EDIT_RESPONSE=$(curl -s -X PUT "$BASE_URL/empleados?id=68532ca13781d5ed8767d00f" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Carlos Test - EDIT FRONTEND", "cargo": "Senior Frontend Tester"}')

echo "Respuesta de edición:"
echo "$EDIT_RESPONSE" | head -c 200

echo ""
echo ""
echo "Empleado después de editar:"
curl -s -X GET "$BASE_URL/empleados?id=68532ca13781d5ed8767d00f" | grep -o '"nombre":"[^"]*"'

echo ""
echo ""
echo "3️⃣ VERIFICANDO HEADERS CORS:"
echo "============================"

echo ""
echo "Headers del endpoint empleados:"
curl -s -I -X OPTIONS "$BASE_URL/empleados" | grep -i "access-control"

echo ""
echo ""
echo "4️⃣ RESUMEN DEL DIAGNÓSTICO:"
echo "==========================="

echo ""
if [[ "$EMPLEADOS_RESPONSE" == *'"success":true'* ]]; then
  echo "✅ Backend empleados: FUNCIONANDO"
else
  echo "❌ Backend empleados: ERROR"
fi

if [[ "$EVALUACIONES_RESPONSE" == *'"success":true'* ]]; then
  echo "✅ Backend evaluaciones: FUNCIONANDO"
else
  echo "❌ Backend evaluaciones: ERROR"
fi

echo ""
echo "🔗 Endpoints disponibles:"
echo "  - GET/POST/PUT/DELETE $BASE_URL/empleados"
echo "  - GET/POST/PUT/DELETE $BASE_URL/agencias"
echo "  - GET/POST/PUT/DELETE $BASE_URL/asistencias"
echo "  - GET/POST/PUT/DELETE $BASE_URL/evaluaciones"
echo "  - GET/POST/PUT/DELETE $BASE_URL/desempenos"
echo "  - GET/POST/PUT/DELETE $BASE_URL/observaciones"

echo ""
echo "🚨 SI EL FRONTEND NO FUNCIONA, EL PROBLEMA ES:"
echo "  1. El frontend está llamando a endpoints incorrectos"
echo "  2. El frontend no está enviando los headers correctos"
echo "  3. El frontend no está manejando las respuestas correctamente"
echo "  4. Hay algún problema de caché en el navegador"
