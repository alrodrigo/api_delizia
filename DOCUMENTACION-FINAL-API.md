# DOCUMENTACIÓN API PARA FRONTEND - VERSIÓN FINAL

## 🎯 Estado Actual: COMPLETAMENTE FUNCIONAL
Fecha: $(date)

### ✅ Confirmaciones de Funcionalidad:
- ✅ Persistencia real en MongoDB Atlas
- ✅ CRUD completo en todos los endpoints
- ✅ Estructura de respuesta estándar
- ✅ Validación de campos requeridos
- ✅ Paginación implementada
- ✅ Endpoint universal funcional
- ✅ Redirección de rutas [id] a query params
- ✅ CORS configurado correctamente

---

## 🚀 URLs BASE

### Desarrollo Local:
```
http://localhost:3000
```

### Producción:
```
https://api-delizia-simple.vercel.app
```

---

## 📊 ENDPOINTS PRINCIPALES

### 1. EMPLEADOS

#### Listar empleados (con paginación)
```bash
GET /api/empleados?page=1&limit=10&agencia=ID_AGENCIA
```

#### Obtener empleado específico
```bash
GET /api/empleados?id=EMPLEADO_ID
```

#### Crear empleado
```bash
POST /api/empleados
Content-Type: application/json

{
  "nombre": "Juan Carlos",           # REQUERIDO
  "apellido": "Pérez García",        # REQUERIDO
  "ci": "12345678",                  # REQUERIDO
  "sexo": "masculino",               # REQUERIDO: masculino|femenino|otro
  "edad": 28,                        # REQUERIDO
  "email": "juan@email.com",         # REQUERIDO
  "telefono": "+591 987654321",
  "direccion": "Calle Falsa 123",    # REQUERIDO
  "puesto": "Vendedor",              # REQUERIDO
  "agencia": "AGENCIA_ID",           # REQUERIDO: ID de agencia
  "salario": 3500,
  "fechaNacimiento": "1995-06-15",
  "antecedentes": "Sin antecedentes",
  "cargosAnteriores": "Ninguno",
  "recomendaciones": "Excelente"
}
```

#### Actualizar empleado
```bash
PUT /api/empleados?id=EMPLEADO_ID
Content-Type: application/json

{
  "telefono": "+591 999888777",
  "salario": 4000
}
```

#### Eliminar empleado
```bash
DELETE /api/empleados?id=EMPLEADO_ID
```

### 2. AGENCIAS

#### Listar agencias
```bash
GET /api/agencias?page=1&limit=10
```

#### Crear agencia
```bash
POST /api/agencias
Content-Type: application/json

{
  "nombre": "Agencia Central",
  "direccion": "Av. Principal 123",
  "telefono": "+591 123456789",
  "email": "central@agencia.com",
  "gerente": "María González"
}
```

### 3. ASISTENCIAS

#### Listar asistencias
```bash
GET /api/asistencias?page=1&limit=10&empleadoId=EMPLEADO_ID
```

#### Registrar asistencia
```bash
POST /api/asistencias
Content-Type: application/json

{
  "empleado": "EMPLEADO_ID",
  "fecha": "2024-01-15",
  "horaEntrada": "08:00",
  "horaSalida": "17:00",
  "estado": "presente",              # presente|ausente|tardanza
  "observaciones": "Llegó puntual"
}
```

### 4. EVALUACIONES/DESEMPEÑOS

#### Listar evaluaciones
```bash
GET /api/desempenos?page=1&limit=10&empleadoId=EMPLEADO_ID
# También funciona: /api/evaluaciones
```

#### Crear evaluación
```bash
POST /api/desempenos
Content-Type: application/json

{
  "empleado": "EMPLEADO_ID",
  "periodo": "2024-Q1",
  "puntuacion": 85,
  "puntualidad": 4,                  # 1-5
  "proactividad": 5,                 # 1-5
  "calidadServicio": 4,              # 1-5
  "metas": {
    "ventas": 90,
    "atencionCliente": 85,
    "puntualidad": 95,
    "trabajoEquipo": 80
  },
  "observaciones": "Buen desempeño",
  "fechaEvaluacion": "2024-01-15",
  "evaluador": "Supervisor Test"
}
```

### 5. OBSERVACIONES

#### Listar observaciones
```bash
GET /api/observaciones?page=1&limit=10&empleadoId=EMPLEADO_ID
```

#### Crear observación
```bash
POST /api/observaciones
Content-Type: application/json

{
  "empleado": "EMPLEADO_ID",
  "fecha": "2024-01-15",
  "tipo": "positiva",                # positiva|correctiva
  "categoria": "Actitud",
  "descripcion": "Excelente atención al cliente",
  "observador": "Supervisor Test"
}
```

---

## 🌐 ENDPOINT UNIVERSAL

El endpoint universal permite acceder a todos los datos desde una sola URL:

### Dashboard (todos los datos)
```bash
GET /api/universal?tipo=all
```

### Por tipo específico
```bash
GET /api/universal?tipo=empleados&page=1&limit=10
GET /api/universal?tipo=agencias&page=1&limit=10
GET /api/universal?tipo=asistencias&empleadoId=ID
GET /api/universal?tipo=desempenos&empleadoId=ID
GET /api/universal?tipo=observaciones&empleadoId=ID
```

### Crear via universal
```bash
POST /api/universal?tipo=empleados
POST /api/universal?tipo=agencias
# etc.
```

### Actualizar via universal
```bash
PUT /api/universal?tipo=empleados&id=ID
```

### Eliminar via universal
```bash
DELETE /api/universal?tipo=empleados&id=ID
```

---

## 📋 ESTRUCTURA DE RESPUESTA ESTÁNDAR

### Respuesta exitosa (listado)
```json
{
  "success": true,
  "count": 5,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

### Respuesta exitosa (item único)
```json
{
  "success": true,
  "data": {...}
}
```

### Respuesta exitosa (creación)
```json
{
  "success": true,
  "message": "Empleado creado correctamente",
  "data": {...}
}
```

### Respuesta de error
```json
{
  "success": false,
  "message": "Empleado no encontrado",
  "error": "Detalles del error"
}
```

---

## 🔐 AUTENTICACIÓN

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@delizia.com",
  "password": "admin123"
}
```

### Respuesta de login
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "1",
    "nombre": "Administrador",
    "email": "admin@delizia.com",
    "rol": "admin"
  }
}
```

---

## ⚠️ NOTAS IMPORTANTES

### 1. Query Parameters vs Rutas Dinámicas
- ✅ **USAR:** `/api/empleados?id=123`
- ❌ **NO USAR:** `/api/empleados/123`
- Los endpoints `[id].js` redirigen a query params

### 2. Campos Relacionales
Los campos `empleado` y `agencia` aceptan:
- ID como string: `"empleado": "64f123..."`
- Objeto completo: `"empleado": {"_id": "64f123...", "nombre": "Juan"}`

### 3. IDs en MongoDB
- Todos los IDs son strings
- Formato: ObjectId convertido a string
- Ejemplo: `"64f1234567890abcdef123456"`

### 4. Filtros Disponibles
- `empleadoId`: Filtrar por empleado específico
- `agenciaId`: Filtrar por agencia específica
- `page` y `limit`: Paginación
- `_t`: Parámetro anti-caché (ignorado por la API)

### 5. CORS
- Configurado para permitir todos los orígenes
- Métodos: GET, POST, PUT, DELETE, OPTIONS
- Headers permitidos incluyen Authorization

---

## 🧪 SCRIPT DE PRUEBAS

Para verificar toda la funcionalidad:
```bash
# Desarrollo local
./test-frontend-compatibility.sh

# Producción
./test-frontend-compatibility.sh production
```

---

## 🔄 ESTADO DE LOS DATOS

### Persistencia Real
- ✅ MongoDB Atlas conectado
- ✅ Datos persisten entre requests
- ✅ Validaciones en schemas
- ✅ Timestamps automáticos

### Validaciones Implementadas
- Campos requeridos en empleados
- Enum values para sexo y estado
- Formato de email validado
- Rangos numéricos en evaluaciones

---

## 📞 SOPORTE Y DEBUGGING

### Logs de la API
Los logs incluyen información detallada de cada request:
- Método HTTP usado
- IDs procesados
- Errores con stack trace
- Confirmaciones de operaciones

### Códigos de Estado HTTP
- `200`: Operación exitosa
- `201`: Recurso creado
- `301`: Redirección (endpoints [id])
- `400`: Error en request
- `404`: Recurso no encontrado
- `405`: Método no permitido
- `500`: Error interno del servidor

### Headers de Respuesta
- `Access-Control-Allow-Origin: *`
- `Content-Type: application/json`
- Headers CORS completos para preflight
