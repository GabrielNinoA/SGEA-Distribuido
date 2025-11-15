# Ejemplos de Body Raw para Postman - Microservicio de Empleados

## 1. Generar Token de Autenticación
**Método:** `POST`  
**URL:** `http://localhost:3307/auth/generate-test-token`  
**Headers:** `Content-Type: application/json`  
**Body:** (Empty - Sin body)

**Response esperado:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. Crear Nuevo Empleado (ADMIN)
**Método:** `POST`  
**URL:** `http://localhost:3307/employees`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token-aqui>
```

**Body Raw (JSON):**
```json
{
  "nombre": "Juan Pérez García",
  "documento": "12345678",
  "fecha_ingreso": "2024-11-15",
  "salario": 2500.00,
  "nickname": "juan.perez",
  "password": "SecurePassword123"
}
```

---

## 3. Obtener Todos los Empleados
**Método:** `GET`  
**URL:** `http://localhost:3307/employees`  
**Headers:**
```
Authorization: Bearer <token-aqui>
```
**Body:** (Empty - Sin body)

**Response esperado:**
```json
[
  {
    "id_empleado": 1,
    "id_usuario": 1,
    "nombre": "Juan Pérez García",
    "documento": "12345678",
    "estado": "ACTIVO",
    "fecha_ingreso": "2024-11-15",
    "salario": 2500.00,
    "usuario": {
      "id_usuario": 1,
      "nickname": "juan.perez",
      "rol": "EMPLE"
    }
  }
]
```

---

## 4. Obtener Empleado por ID
**Método:** `GET`  
**URL:** `http://localhost:3307/employees/1`  
**Headers:**
```
Authorization: Bearer <token-aqui>
```
**Body:** (Empty - Sin body)

**Response esperado:**
```json
{
  "id_empleado": 1,
  "id_usuario": 1,
  "nombre": "Juan Pérez García",
  "documento": "12345678",
  "estado": "ACTIVO",
  "fecha_ingreso": "2024-11-15",
  "salario": 2500.00,
  "usuario": {
    "id_usuario": 1,
    "nickname": "juan.perez",
    "rol": "EMPLE"
  }
}
```

---

## 5. Actualizar Empleado (ADMIN)
**Método:** `PUT`  
**URL:** `http://localhost:3307/employees/1`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token-aqui>
```

**Body Raw (JSON):**
```json
{
  "nombre": "Juan Pérez García Actualizado",
  "salario": 3000.00
}
```

**Response esperado:**
```json
{
  "id_empleado": 1,
  "id_usuario": 1,
  "nombre": "Juan Pérez García Actualizado",
  "documento": "12345678",
  "estado": "ACTIVO",
  "fecha_ingreso": "2024-11-15",
  "salario": 3000.00,
  "usuario": {
    "id_usuario": 1,
    "nickname": "juan.perez",
    "rol": "EMPLE"
  }
}
```

---

## 6. Eliminar Empleado (ADMIN)
**Método:** `DELETE`  
**URL:** `http://localhost:3307/employees/1`  
**Headers:**
```
Authorization: Bearer <token-aqui>
```
**Body:** (Empty - Sin body)

**Response esperado:**
```json
{
  "message": "Empleado eliminado correctamente"
}
```

---

## 7. Contar Empleados Activos (Público)
**Método:** `GET`  
**URL:** `http://localhost:3307/employees/public/count`  
**Headers:** `Content-Type: application/json`  
**Body:** (Empty - Sin body)

**Response esperado:**
```json
{
  "count": 5,
  "timestamp": "2024-11-15T01:50:00Z"
}
```

---

## Resumen de Endpoints

| Método | Endpoint | Autenticación | Rol Requerido | Descripción |
|--------|----------|---------------|---------------|-------------|
| POST | `/auth/generate-test-token` | No | - | Generar token JWT de prueba |
| GET | `/employees/public/count` | Opcional | - | Contar empleados activos (público) |
| GET | `/employees` | Sí | ADMIN, EMPLE | Obtener todos los empleados |
| GET | `/employees/:id` | Sí | ADMIN, EMPLE | Obtener un empleado por ID |
| POST | `/employees` | Sí | ADMIN | Crear nuevo empleado |
| PUT | `/employees/:id` | Sí | ADMIN | Actualizar empleado |
| DELETE | `/employees/:id` | Sí | ADMIN | Eliminar empleado (soft delete) |

---

## Notas Importantes

1. **Token JWT**: Todos los endpoints protegidos requieren el encabezado `Authorization: Bearer <token>`
2. **Roles**: 
   - `ADMIN`: Acceso total (crear, actualizar, eliminar)
   - `EMPLE`: Lectura solamente
3. **Campos obligatorios en POST**:
   - `nombre` (string, máx 100 caracteres)
   - `documento` (string, máx 20 caracteres, único)
   - `fecha_ingreso` (date en formato YYYY-MM-DD)
   - `salario` (número decimal)
   - `nickname` (string, único)
   - `password` (string)

4. **Estado del empleado**: Por defecto es `ACTIVO`. Al eliminar, se cambia a `INACTIVO` (soft delete)
5. **Formato de fecha**: Use `YYYY-MM-DD` para `fecha_ingreso`
6. **Formato de salario**: Use número decimal con máximo 2 decimales (ej: 2500.00)

---

## Flujo de Prueba Recomendado

1. **Generar Token**: POST `/auth/generate-test-token` → Copiar el token
2. **Crear Empleado**: POST `/employees` con el token (rol ADMIN)
3. **Listar Empleados**: GET `/employees` con el token
4. **Obtener Empleado**: GET `/employees/1` con el token
5. **Actualizar Empleado**: PUT `/employees/1` con nuevos datos
6. **Contar Empleados**: GET `/employees/public/count` (sin token)
7. **Eliminar Empleado**: DELETE `/employees/1` con el token (rol ADMIN)
