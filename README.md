# MODA Tienda (Vite + React + Firebase)

Proyecto final tipo **tienda de ropa** con:

- **Mapa del sitio** (`/sitemap`)
- **Menú persistente** + **breadcrumbs**
- **Página 404** y **403**
- **Secciones**: Inicio (3 secciones informativas), Login, Registro, Dashboard (protegido)
- **Rutas protegidas** + **sesión** + **roles** (Admin / Usuario)
- **Consumo de API mock/local** (productos) + eventos (click, input, animaciones)
- **Sanitización** (DOMPurify) + manejo seguro de errores + logs (login/accesos/errores)
- **Secciones base obligatorias**: Inicio, Login, Registro, Dashboard (protegido)

## Requisitos

- Node.js 18+ (recomendado 20+)

## Ejecutar

Instalar:

```bash
npm install
```

Levantar en red local (accesible por IP):

```bash
npm run dev
```

Vite está configurado con `server.host=true`, así que podrás entrar desde otro equipo con:

- `http://TU_IP_LOCAL:5173`

## Firebase

La configuración está en `src/firebase/firebaseConfig.js` y se toma de variables de entorno:

- Copia `.env.example` a `.env.local`
- Rellena las variables `VITE_FIREBASE_*`

En Firestore se usan colecciones:

- `users` (rol por usuario)
- `orders` (pedidos)
- `logs` (login/accesos/errores)

## Seguridad aplicada

- Sanitizacion de inputs con DOMPurify (`src/lib/sanitize.js`)
- Validaciones por regex y campos obligatorios (`src/lib/validators.js`)
- Coherencia de datos en backend simulado (pedidos/productos)
- Manejo seguro de errores (mensajes genericos al usuario)
- Logs de eventos en Firestore: login, access, error
- Evitar datos sensibles en codigo: variables de entorno (`.env.local`)

## S-SDLC y Auditoria

- Documento S-SDLC: `docs/SS-DLC.md`
- Documento de auditoria de red: `docs/AUDITORIA-RED.md`
