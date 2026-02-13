# HelpDesk - Sistema de Gestión de Tickets

Aplicación web completa para la gestión de tickets de soporte técnico. Este proyecto consume una API REST en Laravel y presenta una interfaz moderna, responsiva y funcional.

## Tabla de Contenidos
- [Objetivo](#objetivo)
- [Tecnologías y Stack](#tecnologías-y-stack)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Futuras Mejoras](#futuras-mejoras)

## Objetivo
El objetivo de este proyecto es demostrar habilidades en **frontend**, enfocándose en buenas prácticas, consumo de APIs, manejo de estado global y una experiencia de usuario (UI/UX) pulida.

---

## Tecnologías y Stack

### Core
* **React 19**: Biblioteca principal de UI.
* **TypeScript**: Para tipado estático robusto y escalabilidad.
* **Vite**: Build tool para un entorno de desarrollo rápido.

### Estilos y Diseño
* **TailwindCSS**: Utilizado para un estilizado rápido y consistente.
* **Diseño**: Basado en principios de Clean UI, con soporte para **Dark Mode**.
* **Iconografía**: Material Icons.

### Gestión de Estado y Datos
* **Zustand**: Elegido por su simplicidad y ligereza frente a Redux para el estado global (tickets, filtros, paginación).
* **Axios**: Cliente HTTP para las peticiones a la API.

---

## Decisiones Técnicas

Durante el desarrollo se tomaron las siguientes decisiones para garantizar calidad y mantenibilidad:

1.  **Arquitectura Modular**: Se separó la lógica en `hooks`, los componentes visuales en `components/ui`, y las vistas en `layout`, facilitando la reutilización y el testing.
2.  **Estado Global con Zustand**: Se optó por Zustand en lugar de Redux o Context API puro para evitar el "boilerplate" excesivo y mejorar el rendimiento con selectores simples.
3.  **Validaciones Inline**: Para mejorar la UX, las validaciones ocurren en tiempo real o al intentar enviar formularios, dando feedback inmediato al usuario mediante Toasts.
4.  **Custom Hooks**: Se extrajo la lógica de negocio (CRUD de tickets) a `useTickets.ts` para mantener los componentes de la vista limpios.

---

## Instalación y Ejecución

Sigue estos pasos para levantar el proyecto localmente.

### Prerrequisitos
* Node.js (v16 o superior)
* Backend de Laravel corriendo en `http://127.0.0.1:8000`

### Pasos

1.  **Clonar el repositorio y entrar a la carpeta:**
    ```bash
    git clone <TU_URL_DEL_REPO>
    cd <NOMBRE_DE_TU_CARPETA>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el entorno de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    La aplicación estará disponible en: `http://localhost:5173`

---

## Estructura del Proyecto

```text
src/
├── components/
│   ├── ui/              # Componentes base reutilizables (Button, Badge, Toast, ThemeSwitch)
│   ├── layout/          # Estructura principal (Sidebar, Header, Layout)
│   └── tickets/         # Funcionalidad core (TicketsPage, Tabla, Modales de CRUD)
├── hooks/
│   ├── useTickets.ts    # Lógica de operaciones CRUD y consumo de API
│   ├── useModal.ts      # Gestión de estado de ventanas modales
│   └── useTheme.tsx     # Control de modo oscuro (Dark Mode)
├── interfaces/
│   └── index.ts         # Definiciones de tipos y contratos de TypeScript
├── services/
│   └── api.ts           # Cliente Axios configurado para la API de Laravel
├── store/
│   └── ticketStore.ts   # Estado global de la aplicación con Zustand
├── utils/
│   ├── constants.ts     # Enums y constantes (Prioridades, Estados)
│   └── helpers.ts       # Funciones de utilidad y formateo
├── HelpDeskApp.tsx      # Componente raíz de la aplicación
└── main.tsx             # Punto de entrada de React/Vite
```

## Características Implementadas

### Gestión de Tickets
- ✅ **CRUD Completo**: Crear, Leer, Editar y Eliminar tickets.
- ✅ **Listado Avanzado**: Paginación integrada con el backend.
- ✅ **Filtros y Búsqueda**: Filtrado por Estado, Prioridad y Búsqueda por Asunto (con *debounce*).

### UI / UX
- ✅ **Dark Mode**: Detección automática y cambio manual.
- ✅ **Feedback al Usuario**: Sistema de notificaciones (Toasts) para éxito y error.
- ✅ **Estados de Carga**: Indicadores visuales durante peticiones a la API.
- ✅ **Responsive**: Adaptable a diferentes tamaños de pantalla.

---

## 📈 Futuras Mejoras (What I would improve)
*Como parte de la evaluación técnica, estas son las funcionalidades y optimizaciones que implementaría con más tiempo para escalar el sistema:*

### Seguridad y Usuarios
- **Sistema de Autenticación (Login)**: Implementar un flujo de acceso seguro con JWT para proteger las rutas y gestionar sesiones.
- **Gestión de Roles**: Diferenciar permisos entre administradores de soporte y usuarios finales.

### Colaboración y Comunicación
- **Comentarios en Tickets**: Añadir una sección de historial de comentarios dentro de cada ticket para facilitar el seguimiento.
- **Notificaciones de Cambios**: Implementar alertas en tiempo real o correos electrónicos cuando el estado de un ticket sea actualizado.

### Funcionalidades del Sistema
- **Sección de Configuración**: Panel de ajustes para que el usuario personalice su perfil y preferencias del sistema.
- **Manejo de Adjuntos**: Permitir la carga de imágenes o documentos para proporcionar más contexto en los reportes de soporte.

### Excelencia Técnica
- **Testing Robusto**: Agregar **Unit Tests** (Vitest) y **E2E Tests** (Cypress) para asegurar la estabilidad de las operaciones críticas.
- **Optimización de Caché**: Integrar **React Query (TanStack Query)** para manejar estados de "stale-while-revalidate" y reducir la latencia de la red.
- **Documentación de Componentes**: Implementar **Storybook** para documentar la biblioteca de UI y facilitar la escalabilidad del diseño.