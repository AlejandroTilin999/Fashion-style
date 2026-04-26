# Aplicacion S-SDLC - MODA Tienda

## 1) Analisis
- Activos: cuentas de usuario, roles, pedidos, carrito y logs.
- Amenazas principales: inyeccion de input, acceso no autorizado, exposicion de informacion en errores, fuga de configuracion.
- Requisitos de seguridad definidos:
  - autenticacion con sesion
  - rutas protegidas y control por roles
  - sanitizacion de inputs
  - validaciones frontend y coherencia de datos en backend simulado
  - logging de eventos de seguridad

## 2) Diseno
- Arquitectura SPA con Vite + React.
- Modulos de seguridad:
  - `src/lib/sanitize.js`: sanitizacion con DOMPurify
  - `src/lib/validators.js`: regex y reglas de coherencia
  - `src/auth/RequireAuth.jsx`: proteccion de rutas
  - `src/auth/AuthContext.jsx`: manejo de sesion, roles y logs
- Secretos en entorno:
  - Firebase movido a variables `VITE_FIREBASE_*` en `.env.local`.

## 3) Codificacion
- Implementaciones aplicadas:
  - Inicio/Login/Registro/Dashboard protegido activos.
  - Breadcrumbs + pagina 404 + 404 de productos no encontrados.
  - Consumo de API real (Fake Store API) con fallback mock/local.
  - Eventos dinamicos: click, input y animaciones CSS.
  - Logs de eventos: login, access y error.
  - Errores seguros: no se expone stack ni mensajes internos al usuario.

## 4) Pruebas
- Pruebas funcionales:
  - login/registro/salida de sesion
  - dashboard y admin protegidos por rol
  - busqueda sin resultados dispara estado 404 animado
- Pruebas de seguridad:
  - entrada con caracteres especiales y payload HTML/JS en formularios
  - validacion de regex para correo, password y nombre
  - coherencia de pedido (items y total)
- Pruebas de build:
  - `npm run build` exitoso.
