#!/bin/bash

echo "🔍 Probando conexión frontend -> API..."
echo ""

API_URL="https://api-delizia.vercel.app/api"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGRlbGl6aWEuY29tIiwicm9sIjoiYWRtaW4ifQ.fake"

echo "📡 Probando Empleados..."
response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$API_URL/empleados")
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "✅ Empleados: OK"
else
    echo "❌ Empleados: ERROR (código: $http_code)"
fi
echo ""

echo "📡 Probando Agencias..."
response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$API_URL/agencias")
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "✅ Agencias: OK"
else
    echo "❌ Agencias: ERROR (código: $http_code)"
fi
echo ""

echo "📡 Probando Asistencias..."
response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$API_URL/asistencias")
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "✅ Asistencias: OK"
else
    echo "❌ Asistencias: ERROR (código: $http_code)"
fi
echo ""

echo "📡 Probando Desempeños..."
response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$API_URL/desempenos")
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "✅ Desempeños: OK"
else
    echo "❌ Desempeños: ERROR (código: $http_code)"
fi
echo ""

echo "📡 Probando empleados con parámetros..."
response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$API_URL/empleados?page=1&limit=10")
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "✅ Empleados con params: OK"
else
    echo "❌ Empleados con params: ERROR (código: $http_code)"
fi
echo ""

echo "🔍 Probando un endpoint específico que use el frontend..."
fecha=$(date +%Y-%m-%d)
response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$API_URL/asistencias?fecha=$fecha")
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "✅ Asistencias con fecha: OK"
else
    echo "❌ Asistencias con fecha: ERROR (código: $http_code)"
fi
