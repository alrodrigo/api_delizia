#!/bin/bash

echo "🔄 PROBANDO CON DATOS COMPLETOS SEGÚN ESPECIFICACIÓN DEL FRONTEND"
echo "=================================================================="

BASE_URL="https://api-delizia.vercel.app/api"

echo ""
echo "1️⃣ Creando empleado con TODOS los campos que necesita el frontend..."

curl -s -X POST "$BASE_URL/empleados" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellido": "Rodríguez",
    "ci": "12345678",
    "sexo": "masculino",
    "edad": 35,
    "email": "juan.rodriguez@delizia.com",
    "telefono": "555-123-4567",
    "direccion": "Av. Libertador 456",
    "fechaNacimiento": "1989-05-15",
    "fechaIngreso": "2024-01-01",
    "puesto": "Gerente de Ventas",
    "cargo": "Gerente de Ventas",
    "agencia": "685334b499a748d64a31091d",
    "salario": 45000,
    "antecedentes": "5 años de experiencia en ventas retail",
    "cargosAnteriores": "Vendedor (2018-2020), Supervisor (2020-2022)",
    "recomendaciones": "Excelente capacidad de liderazgo y orientación a resultados"
  }' | head -c 300

echo ""
echo ""
echo "2️⃣ Creando evaluación con campos específicos del frontend..."

curl -s -X POST "$BASE_URL/evaluaciones" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado": "68532ca13781d5ed8767d00f",
    "periodo": "2025-06",
    "puntuacion": 85,
    "puntualidad": 4,
    "proactividad": 3,
    "calidadServicio": 5,
    "observaciones": "Excelente rendimiento general, destaca en calidad de servicio",
    "fechaEvaluacion": "2025-06-18",
    "evaluador": "Supervisor Principal"
  }' | head -c 300

echo ""
echo ""
echo "3️⃣ Verificando que los datos se guardaron correctamente..."

echo ""
echo "📋 Empleados con estructura completa:"
curl -s -X GET "$BASE_URL/empleados" | head -c 500

echo ""
echo ""
echo "📊 Evaluaciones con campos específicos:"
curl -s -X GET "$BASE_URL/evaluaciones" | head -c 500

echo ""
echo ""
echo "✅ ESTRUCTURAS ACTUALIZADAS SEGÚN ESPECIFICACIÓN DEL FRONTEND"
