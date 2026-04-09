# 📚 LecturasApp

Una aplicación web fullstack para gestionar y compartir tu biblioteca personal de libros, con funcionalidades sociales y chat en tiempo real.

## 🌟 Características

### Gestión de Biblioteca Personal
- ✅ Añadir libros a tu biblioteca personal
- 📊 Organizar libros por colecciones personalizadas
- 🏷️ Estados de lectura: Pendiente, Leyendo, Leído
- ✏️ Crear y editar reseñas personales
- 🔍 Buscador de libros integrado
- 📖 Información detallada de cada libro (autor, editor, fecha de publicación, páginas, valoraciones, etc.)

### Características Sociales
- 👥 Sistema de seguimiento entre usuarios
- 💬 Chat en tiempo real con otros lectores
- 📝 Comentarios en libros
- 👤 Perfiles públicos de usuarios
- 🌐 Feed social para descubrir lecturas de otros usuarios

### Tecnología
- 🔐 Autenticación segura con JWT
- ⚡ Comunicación en tiempo real mediante WebSockets (Socket.IO)
- 🎨 Interfaz moderna y responsive
- 📱 Notificaciones en tiempo real

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Angular 18.2
- **UI/UX**: 
  - Angular CDK
  - FontAwesome icons
  - Animate.css
  - Notiflix/ngx-toastr para notificaciones
- **Comunicación en tiempo real**: Socket.IO Client
- **Lenguaje**: TypeScript 5.5

### Backend
- **Runtime**: Node.js con Express
- **Base de datos**: MongoDB con Mongoose ODM
- **Autenticación**: JWT (jsonwebtoken) + bcrypt
- **WebSockets**: Socket.IO
- **Seguridad**: CORS configurado

### Testing
- **Frontend**: Jasmine + Karma
- **Backend**: Mocha + Chai + Sinon + Supertest

## 📁 Estructura del Proyecto

```
LecturasApp/
├── clientLecturas/          # Aplicación Angular (Frontend)
│   ├── src/
│   │   ├── app/
│   │   │   ├── abstracts/   # Clases abstractas para servicios
│   │   │   ├── interceptors/# Interceptor de autenticación
│   │   │   ├── models/      # Modelos de datos TypeScript
│   │   │   ├── pages/       # Componentes de páginas
│   │   │   │   ├── authpages/    # Login, registro
│   │   │   │   └── contentpages/ # Home, libros, perfil, social, etc.
│   │   │   └── services/    # Servicios de negocio
│   │   └── ...
│   └── package.json
│
└── serverLecturas/          # API REST (Backend)
    ├── controllers/         # Lógica de negocio
    ├── models/             # Modelos Mongoose
    │   ├── Chat.js
    │   ├── Comentario.js
    │   ├── Libro.js
    │   ├── Mensaje.js
    │   └── Usuario.js
    ├── routes/             # Definición de endpoints
    ├── middlewares/        # Middlewares personalizados
    ├── websockets/         # Configuración de Socket.IO
    ├── app.js             # Configuración de Express
    ├── index.js           # Punto de entrada
    └── package.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB instalado y ejecutándose
- Angular CLI (`npm install -g @angular/cli`)

### 1. Clonar el repositorio
```bash
git clone https://github.com/jit87/LecturasApp.git
cd LecturasApp
```

### 2. Configurar el Backend

```bash
cd serverLecturas
npm install
```

Crear un archivo `.env` en la carpeta `serverLecturas` con las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lecturasapp
JWT_SECRET=tu_clave_secreta_aqui
```

Iniciar el servidor:
```bash
# Desarrollo con nodemon
npm run dev

# Producción
npm start
```

### 3. Configurar el Frontend

```bash
cd ../clientLecturas
npm install
```

Iniciar la aplicación Angular:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 📡 API Endpoints

### Autenticación
- `POST /register` - Registro de nuevos usuarios
- `POST /login` - Inicio de sesión

### Libros
- `GET /libros` - Obtener todos los libros del usuario
- `POST /libros` - Añadir un nuevo libro
- `PUT /libros/:id` - Actualizar información de un libro
- `DELETE /libros/:id` - Eliminar un libro

### Colecciones
- `GET /colecciones` - Obtener colecciones del usuario
- `POST /colecciones` - Crear nueva colección

### Social
- `GET /seguidos` - Obtener lista de usuarios seguidos
- `POST /seguidos` - Seguir a un usuario
- `DELETE /seguidos/:id` - Dejar de seguir

### Comentarios
- `GET /comentarios/:libroId` - Obtener comentarios de un libro
- `POST /comentarios` - Añadir comentario

### Chat
- `GET /chats` - Obtener chats del usuario
- `POST /chats` - Crear nuevo chat
- `GET /mensajes/:chatId` - Obtener mensajes de un chat
- `POST /mensajes` - Enviar mensaje

## 🔒 Seguridad

- Autenticación mediante JWT
- Contraseñas hasheadas con bcrypt
- Interceptor HTTP para incluir tokens automáticamente
- CORS configurado para permitir solo orígenes autorizados
- Validación de datos en backend

## 📝 Modelos de Datos

### Usuario
- Información personal
- Lista de seguidos/seguidores
- Biblioteca de libros

### Libro
- Información bibliográfica completa
- Estado de lectura
- Colección asignada
- Reseña personal
- Integración con API de libros (APIid)

### Chat y Mensajes
- Sistema de mensajería en tiempo real
- Historial de conversaciones

### Comentarios
- Sistema de comentarios en libros
- Asociados a usuarios

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👤 Autor

**jit87**
- GitHub: [@jit87](https://github.com/jit87)

## 🙏 Agradecimientos

- Google Books API (por la integración de búsqueda de libros)
- La comunidad de Angular y Node.js
- Todos los contribuidores del proyecto

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
