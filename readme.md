# Task Timer

Mini-aplicación para crear y gestionar tareas temporizadas con API REST e interfaz web en tiempo real.

## 🚀 Configuración (5 pasos)

1. **Clonar e instalar dependencias raíz:**

   ```bash
   git clone <repository-url>
   cd task-timer
   npm install
   ```

2. **Instalar dependencias del backend:**

   ```bash
   cd api
   npm install
   cd ..
   ```

3. **Instalar dependencias del frontend:**

   ```bash
   cd web
   npm install
   cd ..
   ```

4. **Ejecutar la aplicación completa:**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

## 📁 Estructura del Proyecto

```
task-timer/
├── api/                 # Backend Node.js/Express
│   ├── models/task.js   # Modelo de datos en memoria
│   ├── routes/tasks.js  # Rutas POST/GET /tasks
│   └── index.js         # Servidor principal
├── web/                 # Frontend React/Vite
│   └── src/
│       ├── components/  # TaskForm, TaskList
│       └── App.jsx      # Componente principal
└── package.json         # Scripts de arranque
```

## 🛠️ Stack Tecnológico

- **Backend:** Node.js + Express + Joi + CORS + Morgan
- **Frontend:** React + Vite + Tailwind CSS (CDN)
- **Persistencia:** En memoria (sin base de datos externa)

## 📋 Funcionalidades Implementadas

### Backend API

- `POST /tasks` - Crear tarea con validaciones (title no vacío, minutes 1-120)
- `GET /tasks` - Listar tareas ordenadas por fecha descendente
- Manejo de errores HTTP estándar (400/422/500)
- Middleware de logging de requests
- Validaciones

### Frontend

- Formulario para crear tareas con validación client-side
- Lista que se actualiza automáticamente al crear tareas
- Indicadores de loading y manejo de errores
- UI moderna y completamente responsiva
- Diseño mobile-first con Tailwind CSS CDN

## 🤖 Uso de IA - Prompts Utilizados

| Prompt Utilizado                                                                                                             | Resultado Obtenido                         | Ajustes Realizados                                          |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------- |
| "Genera una estructura en node con Express y middleware de logging con las siguientes indicaciones... (Texto del Documento)" | Servidor base con configuración de Express | Agregué manejo específico de errores 404                    |
| "Genera un componente React para formulario de tareas con validación"                                                        | TaskForm con useState y validación         | Agregué validación del lado cliente y mejor feedback visual |
| "Ajusta el siguiente componente con un diseño moderno responsivo con Tailwind CSS"                                           | Componentes con clases Tailwind            | Revisé estructura y pase componentes a español              |
| "Genera un archivo readme.md con las siguientes indicaciones.... "                                                           | Documento readme para                      | Ajusté contenido que se mostraba                            |

## ⏱️ Tiempo Invertido

- **Setup inicial y backend:** 20 minutos
- **Frontend React con Vite:** 25 minutos
- **Documentación y commits:** 15 minutos
- **Total:** ~60 minutos
