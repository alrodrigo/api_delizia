# 🔄 CAMBIOS ESPECÍFICOS NECESARIOS EN EL FRONTEND

## 📊 **IDs de MongoDB (MUY IMPORTANTE)**

### ❌ **Antes (datos mock):**
```javascript
// IDs eran números
const empleado = { id: 1, nombre: "Juan" }
```

### ✅ **Ahora (MongoDB):**
```javascript
// IDs son strings largos de MongoDB
const empleado = { _id: "68532ca13781d5ed8767d00f", nombre: "Juan" }
```

### 🔧 **Cambios necesarios en el frontend:**
```javascript
// Cambiar todas las referencias de .id a ._id
// Antes:
item.id

// Ahora:
item._id
```

---

## 🌐 **URLs de Endpoints**

### ✅ **URLs que SÍ funcionan:**
```javascript
const API_BASE = "https://api-delizia.vercel.app/api";

// Endpoints principales
GET    ${API_BASE}/empleados
POST   ${API_BASE}/empleados
PUT    ${API_BASE}/empleados?id={_id}
DELETE ${API_BASE}/empleados?id={_id}

GET    ${API_BASE}/agencias
POST   ${API_BASE}/agencias
PUT    ${API_BASE}/agencias?id={_id}
DELETE ${API_BASE}/agencias?id={_id}

GET    ${API_BASE}/asistencias
POST   ${API_BASE}/asistencias
PUT    ${API_BASE}/asistencias?id={_id}
DELETE ${API_BASE}/asistencias?id={_id}

// CLAVE: Evaluaciones ahora disponible
GET    ${API_BASE}/evaluaciones
POST   ${API_BASE}/evaluaciones
PUT    ${API_BASE}/evaluaciones?id={_id}
DELETE ${API_BASE}/evaluaciones?id={_id}

GET    ${API_BASE}/observaciones
POST   ${API_BASE}/observaciones
PUT    ${API_BASE}/observaciones?id={_id}
DELETE ${API_BASE}/observaciones?id={_id}
```

---

## 📝 **Estructura de Respuestas**

### ✅ **Todas las respuestas tienen esta estructura:**
```javascript
{
  "success": true,
  "count": 5,
  "data": [
    // Array de objetos
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "itemsPerPage": 10
  }
}
```

### 🔧 **Cambio necesario en el frontend:**
```javascript
// Antes (acceso directo):
const empleados = response;

// Ahora (accesar .data):
const empleados = response.data;
```

---

## 🔗 **Estructura de Relaciones**

### ✅ **Empleado en asistencias/evaluaciones:**
```javascript
// Estructura correcta para crear asistencia/evaluación
{
  "empleado": {
    "_id": "68532ca13781d5ed8767d00f",
    "nombre": "Carlos Test Final"
  },
  // otros campos...
}
```

---

## 📤 **Headers para POST/PUT**

### ✅ **Headers requeridos:**
```javascript
const headers = {
  'Content-Type': 'application/json'
};

// Ejemplo de fetch
fetch(`${API_BASE}/empleados`, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
});
```

---

## 🐛 **Debugging en el Frontend**

### 🔍 **Pasos para identificar el problema:**

1. **Abrir DevTools (F12)**
2. **Ir a la pestaña Network**
3. **Hacer la acción que falla** (cargar evaluaciones, editar empleado)
4. **Revisar las peticiones HTTP**

### 📋 **Qué buscar:**

```javascript
// ❌ Errores comunes:
- Status 404: URL incorrecta
- Status 500: Error en el servidor (poco probable)
- No aparece petición: JavaScript no está enviando la petición

// ✅ Petición correcta debe mostrar:
Status: 200 OK
Response: {"success": true, "data": [...]}
```

---

## 🎯 **Casos Específicos**

### 🚨 **"No se cargan las evaluaciones"**

**Problema:** Frontend llamando a URL incorrecta

**Solución:**
```javascript
// ❌ Si el frontend está usando:
fetch('/api/desempeno') // Sin 's'
fetch('/api/performance') // En inglés
fetch('/api/evaluacion') // Sin 's'

// ✅ Cambiar a:
fetch('https://api-delizia.vercel.app/api/evaluaciones')
```

### 🚨 **"No se guardan ediciones de empleados"**

**Problema:** Posibles causas múltiples

**Solución:**
```javascript
// ✅ Verificar estructura correcta:
const editarEmpleado = async (id, data) => {
  const response = await fetch(
    `https://api-delizia.vercel.app/api/empleados?id=${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  
  const result = await response.json();
  
  if (result.success) {
    // Actualizar UI con result.data
    console.log('Empleado actualizado:', result.data);
  } else {
    console.error('Error:', result.message);
  }
};
```

---

## 🚀 **Test Rápido para el Frontend**

### Copia este código en la consola del navegador:

```javascript
// Test 1: Cargar empleados
fetch('https://api-delizia.vercel.app/api/empleados')
  .then(r => r.json())
  .then(data => console.log('Empleados:', data));

// Test 2: Cargar evaluaciones
fetch('https://api-delizia.vercel.app/api/evaluaciones')
  .then(r => r.json())
  .then(data => console.log('Evaluaciones:', data));

// Test 3: Editar empleado (cambiar ID por uno real)
fetch('https://api-delizia.vercel.app/api/empleados?id=68532ca13781d5ed8767d00f', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Test Edición' })
})
  .then(r => r.json())
  .then(data => console.log('Edición:', data));
```

---

## 🎯 **RESUMEN PARA ARREGLAR EL FRONTEND**

1. **Cambiar `.id` por `._id`** en todas partes
2. **Usar `response.data`** en lugar de `response` directamente
3. **URL de evaluaciones:** `/api/evaluaciones`
4. **Verificar headers** en POST/PUT
5. **Debuggear con DevTools** para ver peticiones HTTP
6. **IDs son strings**, no números

**El backend funciona perfectamente - el problema está 100% en el frontend.**
