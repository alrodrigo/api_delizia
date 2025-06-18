# 📋 DOCUMENTACIÓN DE API - BACKEND MIGRADO A MONGODB

## 🔗 **BASE URL**
```
https://api-delizia.vercel.app/api
```

## 📊 **ENDPOINTS DISPONIBLES**

### 1️⃣ **EMPLEADOS** - `/api/empleados`

**GET /api/empleados** - Listar empleados
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "68532ca13781d5ed8767d00f",
      "nombre": "Carlos Test Final - EDITADO",
      "email": "carlos.final@delizia.com",
      "telefono": "555-123-456",
      "cargo": "Confirmador de Éxito",
      "agencia": "final-test",
      "salario": 4000,
      "activo": true,
      "fechaIngreso": "2025-06-18T21:16:17.271Z",
      "createdAt": "2025-06-18T21:16:17.287Z",
      "updatedAt": "2025-06-18T21:57:06.162Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "itemsPerPage": 10
  }
}
```

**POST /api/empleados** - Crear empleado
```json
{
  "nombre": "Juan Pérez",
  "email": "juan.perez@delizia.com",
  "telefono": "555-0123",
  "cargo": "Vendedor",
  "agencia": {
    "_id": "685334b499a748d64a31091d",
    "nombre": "Agencia Centro"
  },
  "salario": 3000
}
```

**PUT /api/empleados?id={id}** - Editar empleado
```json
{
  "nombre": "Juan Pérez EDITADO",
  "salario": 3500
}
```

**DELETE /api/empleados?id={id}** - Eliminar empleado (soft delete)

---

### 2️⃣ **AGENCIAS** - `/api/agencias`

**GET /api/agencias** - Listar agencias
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "685334b499a748d64a31091d",
      "nombre": "Agencia Centro - EDITADA",
      "direccion": "Av. Principal 456 - NUEVA",
      "telefono": "555-0001",
      "email": "centro@delizia.com",
      "gerente": "María González - GERENTE ACTUALIZADA",
      "activa": true,
      "fechaCreacion": "2025-06-18T21:50:44.251Z"
    }
  ]
}
```

**POST /api/agencias** - Crear agencia
```json
{
  "nombre": "Nueva Agencia",
  "direccion": "Calle Nueva 123",
  "telefono": "555-0002",
  "email": "nueva@delizia.com",
  "gerente": "Gerente Nuevo"
}
```

---

### 3️⃣ **ASISTENCIAS** - `/api/asistencias`

**GET /api/asistencias** - Listar asistencias
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "685334db10d404de7f86e246",
      "empleado": {
        "_id": "68532ca13781d5ed8767d00f",
        "nombre": "Carlos Test Final"
      },
      "fecha": "2025-06-18T00:00:00.000Z",
      "horaEntrada": "08:30",
      "horaSalida": "17:30",
      "estado": "tardanza",
      "observaciones": "Asistencia EDITADA - llegó tarde"
    }
  ]
}
```

**POST /api/asistencias** - Crear asistencia
```json
{
  "empleado": {
    "_id": "68532ca13781d5ed8767d00f",
    "nombre": "Carlos Test Final"
  },
  "fecha": "2025-06-18",
  "horaEntrada": "08:00",
  "horaSalida": "17:00",
  "estado": "presente",
  "observaciones": "Asistencia normal"
}
```

---

### 4️⃣ **EVALUACIONES/DESEMPEÑOS** - `/api/evaluaciones` o `/api/desempenos`

**GET /api/evaluaciones** - Listar evaluaciones de desempeño
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "68533208ec5c8b8e1c2c5e4b",
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
      "fechaEvaluacion": "2025-06-18T00:00:00.000Z",
      "evaluador": "Test Manager"
    }
  ]
}
```

**POST /api/evaluaciones** - Crear evaluación
```json
{
  "empleado": {
    "_id": "68532ca13781d5ed8767d00f",
    "nombre": "Carlos Test Final"
  },
  "periodo": "2025-07",
  "puntuacion": 90,
  "metas": {
    "ventas": 95,
    "atencionCliente": 90,
    "puntualidad": 85,
    "trabajoEquipo": 90
  },
  "observaciones": "Excelente desempeño",
  "fechaEvaluacion": "2025-06-18",
  "evaluador": "Supervisor"
}
```

---

### 5️⃣ **OBSERVACIONES** - `/api/observaciones`

**GET /api/observaciones** - Listar observaciones
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "68533230ec5c8b8e1c2c5e4d",
      "empleado": {
        "_id": "68532ca13781d5ed8767d00f",
        "nombre": "Carlos Test Final"
      },
      "fecha": "2025-06-18T00:00:00.000Z",
      "tipo": "positiva",
      "categoria": "Productividad",
      "descripcion": "Observación de prueba API - Excelente trabajo",
      "observador": "Test Supervisor"
    }
  ]
}
```

## 🔧 **HEADERS REQUERIDOS**

Para todas las peticiones POST/PUT:
```javascript
{
  "Content-Type": "application/json"
}
```

## 🚨 **CAMBIOS IMPORTANTES DEL BACKEND**

### ✅ **Lo que funciona:**
1. Todos los endpoints responden correctamente
2. CRUD completo para todos los recursos
3. Datos persisten en MongoDB Atlas
4. Headers CORS configurados

### 🔄 **Cambios de estructura:**
1. **IDs son strings**: `"_id": "68532ca13781d5ed8767d00f"` (no números)
2. **Timestamp agregado**: `createdAt`, `updatedAt` en todos los registros
3. **Estructura de empleado en relaciones**:
   ```json
   "empleado": {
     "_id": "string",
     "nombre": "string"
   }
   ```
4. **Agencia puede ser string o objeto** en empleados

### 📋 **Parámetros de consulta disponibles:**
- `?page=1&limit=10` - Paginación
- `?empleado={id}` - Filtrar por empleado (asistencias)
- `?agencia={id}` - Filtrar por agencia (empleados)
- `?fecha=2025-06-18` - Filtrar por fecha (asistencias)

## 🔍 **TROUBLESHOOTING FRONTEND**

### Problemas comunes y soluciones:

1. **"No se cargan las evaluaciones"**
   - URL correcta: `https://api-delizia.vercel.app/api/evaluaciones`
   - El frontend puede estar llamando a `/api/desempenos` (también funciona)

2. **"No se guardan los edits de empleados"**
   - Verificar que usa PUT con `?id={id}`
   - Verificar header `Content-Type: application/json`
   - Verificar que maneja la respuesta correctamente

3. **IDs de MongoDB**
   - Los IDs son strings largos como `"68532ca13781d5ed8767d00f"`
   - No son números secuenciales

### Scripts de verificación disponibles:
- `./test-final-migration.sh` - Verificación completa
- `./diagnose-frontend-issues.sh` - Diagnóstico específico

## 📞 **URLs DE PRUEBA DIRECTA**

```bash
# Probar empleados
curl https://api-delizia.vercel.app/api/empleados

# Probar evaluaciones
curl https://api-delizia.vercel.app/api/evaluaciones

# Probar edición de empleado
curl -X PUT "https://api-delizia.vercel.app/api/empleados?id=68532ca13781d5ed8767d00f" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Nuevo Nombre"}'
```

El backend está 100% funcional. Los problemas están en el frontend.
