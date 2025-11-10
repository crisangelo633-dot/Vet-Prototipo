# Vet Clinic – Setup y Ejecución

Aplicación Angular con UI tipo dashboard (sidebar/topbar), login con roles y funciones principales: Citas, Dueños, Mascotas e Historial. Usa una API mock (json-server) y también guarda en `localStorage` como respaldo para la demo.

## Requisitos
- Node.js 18+
- npm 9+

## 1) Instalar dependencias
```bash
npm ci
```

## 2) Iniciar API mock (json-server)
```bash
npm run api
# La API queda en http://localhost:3001
```
Datos iniciales en `db.json` (vets, owners, pets, appointments, records, users).

## 3) Iniciar frontend (Angular)
```bash
npm start
# Navegar a http://localhost:4200
```
Si ya hay algo usando 4200, puedes usar 4201:
```bash
npx ng serve --port 4201 --host localhost
# http://localhost:4201
```

## Credenciales de prueba
- admin / admin123 (admin)
- recep / recep123 (recep)
- vet / vet123 (vet)

## Rutas principales
- `/auth` Login
- `/dashboard` Inicio (tiles)
- `/appointments` Citas (FullCalendar)
- `/owners` Registrar dueños
- `/pets` Registrar mascotas
- `/records` Historial por mascota

## Funcionalidades clave
- Login con roles (admin/recep/vet) y rutas protegidas.
- Sidebar con visibilidad por rol.
- Citas: crear, validar solapamientos, guardar en API y en `localStorage` (`appointments_local`). Toasts de confirmación.
- Dueños/Mascotas: formularios con guardado en API y espejo en `localStorage` (`owners_local`, `pets_local`). Toasts de confirmación.
- Historial: selector de mascota y tabla. Combina API con `localStorage` (`records_local`).

## Estilos/Recursos
- Tipografía: Inter (Google Fonts)
- Iconos: Bootstrap Icons
- FullCalendar y Bootstrap CSS cargados por CDN en `src/index.html` (evita problemas de bundling).

## Troubleshooting
- “CSS de FullCalendar no resuelve”: se usan CDN en `src/index.html`. No incluir `@fullcalendar/.../index.css` en `angular.json`.
- “localStorage is not defined”: ya se manejó para SSR; si llegas a ver esto, refresca en modo browser (no SSR) con `ng serve`.
- Server no levanta en 4200: usa 4201 (`--port 4201`).
- API sin datos nuevos: revisa `db.json` y reinicia `npm run api`.

## Scripts útiles
- `npm run api` Inicia json-server en 3001
- `npm start` Inicia Angular en 4200
- `ng build` Compila el frontend

## Notas
- Para la demo, las entidades también se guardan en `localStorage` para no perder datos si la API falla.
