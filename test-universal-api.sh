#!/bin/bash

# Script para probar la API Universal de Delizia después del redeploy
echo "🧪 PROBANDO API UNIVERSAL DE DELIZIA"
echo "===================================="

API_URL="https://api-delizia.vercel.app"

echo ""
echo "1️⃣ Probando endpoint de empleados..."
curl -s -X GET "$API_URL/api/empleados" \
  -H "Content-Type: application/json" | jq .

echo ""
echo "2️⃣ Probando endpoint de agencias..."
curl -s -X GET "$API_URL/api/agencias" \
  -H "Content-Type: application/json" | jq .

echo ""
echo "3️⃣ Probando crear un empleado de prueba..."
curl -s -X POST "$API_URL/api/empleados" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Roberto Testero Universal",
    "email": "roberto.test.universal@delizia.com",
    "telefono": "999-888-777",
    "cargo": "Probador Universal",
    "agencia": {
      "_id": "test-agency-id",
      "nombre": "Agencia Test Universal"
    },
    "salario": 2800
  }' | jq .

echo ""
echo "4️⃣ Verificando que el empleado se guardó (debería aparecer en la lista)..."
curl -s -X GET "$API_URL/api/empleados" \
  -H "Content-Type: application/json" | jq .

echo ""
echo "✅ PRUEBAS COMPLETADAS"
echo "Si ves datos reales de MongoDB (no los 4 empleados mock), ¡la API funciona!"
echo ""
echo "🔍 DATOS MOCK ANTIGUOS que NO deberían aparecer:"
echo "- Ana García"
echo "- Luis Rodriguez" 
echo "- Carmen Soto"
echo "- Pedro Morales"
echo ""
echo "✅ Si ves empleados diferentes o la lista vacía, ¡MongoDB está funcionando!"
