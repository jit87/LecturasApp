# 📚 LecturasApp

Una aplicación web fullstack para gestionar y compartir tu biblioteca personal de libros, con funcionalidades sociales y chat en tiempo real.

## 🌟 Características

### Gestión de Biblioteca Personal
- Añadir libros a tu biblioteca personal
- Organizar libros por colecciones personalizadas
- Estados de lectura: Pendiente, Leído
- Crear y editar reseñas personales
- Buscador de libros integrado
- Información detallada de cada libro (autor, editor, fecha de publicación, páginas, valoraciones, etc.)

### Características Sociales
- Sistema de seguimiento entre usuarios
- Chat en tiempo real con otros lectores
- Comentarios sobre los libros
- Perfiles públicos de usuarios
- Feed social para descubrir lecturas de otros usuarios

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

### Autenticación, registro y config. de usuario
- `POST /registro` - Registro de nuevos usuarios
- `POST /login` - Inicio de sesión
- `GET /usuario/:email` - Obtener usuario por email
- `GET /usuarioId/:email` - Obtener ID de usuario por email
- `GET /usuarioPorId/:id` - Obtener usuario por ID
- `PUT /modificar-pass` - Modificar contraseña
- `PUT /modificar-nombre` - Modificar nombre
- `PUT /modificar-email` - Modificar email
- `PUT /modificar-imagen` - Modificar imagen de perfil
- `PUT /modificar-bio` - Modificar biografía
- `PUT /modificar-apariencia` - Modificar preferencias de apariencia
- `DELETE /eliminar-usuario/:id` - Eliminar cuenta de usuario

### Libros (requiere autenticación)
- `POST /libros` - Añadir un nuevo libro
- `GET /libros/todos/:id` - Obtener todos los libros del usuario
- `GET /libros/todos` - Obtener todos los libros (para sección social)
- `GET /libros/libro/:id` - Obtener un libro específico por ID
- `GET /libros/APIid/:APIid` - Obtener libro por ID de API externa
- `GET /libros/leidos/:id` - Obtener libros leídos por el usuario
- `PUT /libros/:id` - Actualizar información de un libro
- `DELETE /libros/:id` - Eliminar un libro

### Colecciones (requiere autenticación)
- `POST /colecciones` - Crear nueva colección
- `GET /colecciones/todas/:id` - Obtener todas las colecciones del usuario
- `DELETE /colecciones/:id` - Eliminar una colección

### Seguidos (requiere autenticación)
- `POST /seguidos` - Seguir a un usuario
- `GET /seguidos/todos` - Obtener lista de usuarios seguidos
- `GET /seguidos/seguidores` - Obtener lista de seguidores
- `GET /seguidos/seguidores/:id` - Obtener seguidores de un usuario específico
- `GET /seguidos/seguidos/:id` - Obtener seguidos de un usuario específico
- `DELETE /seguidos/:id` - Dejar de seguir a un usuario

### Comentarios (requiere autenticación)
- `POST /comentarios` - Añadir comentario
- `GET /comentarios/todos/:idLibro/:tipo` - Obtener comentarios de un libro por tipo
- `DELETE /comentarios/:id` - Eliminar comentario

### Chats (requiere autenticación)
- `POST /chats` - Crear nuevo chat
- `GET /chats/todos/:id` - Obtener chats del usuario

### Mensajes (requiere autenticación)
- `POST /mensajes` - Enviar mensaje
- `GET /mensajes/todos/:id` - Obtener mensajes de un chat


## 🔒 Seguridad

- Autenticación mediante JWT
- Contraseñas hasheadas con bcrypt
- Interceptor HTTP para incluir tokens automáticamente
- CORS configurado para permitir solo orígenes autorizados
- Validación de datos en backend

## 📝 Modelos de Datos

### Usuario
- **nombre**: String (requerido)
- **email**: String (requerido, único)
- **password**: String (requerido, hasheado)
- **colecciones**: [String] 
- **imagen**: String (URL de imagen de perfil)
- **seguidores**: [ObjectId] 
- **seguidos**: [ObjectId] 
- **bio**: String 
- **apariencia**: String (preferencias de tema/apariencia)
- **librosLeidos**: [String] 

### Libro
- **_idUsuario**: String (requerido)
- **titulo**: String (requerido)
- **autores**: [String] (requerido)
- **editor**: String
- **fechaPublicacion**: String
- **descripcion**: String
- **pageCount**: Number
- **averageRating**: Number
- **ratingsCount**: Number
- **contentVersion**: String
- **imagen**: String (URL de portada)
- **lengua**: String
- **previewLink**: String
- **estado**: String (default: "Pendiente")
- **coleccion**: String (default: "No clasificado")
- **categorias**: String
- **APIid**: String (ID de API externa de libros)
- **resena**: String 
- **timestamps**: true 

### Chat
- **participantes**: Array 
- **ultimoMensaje**: String
- **fecha**: Date 

### Mensaje
- **_idChat**: String (requerido)
- **_idUsuario**: String (requerido)
- **nombre**: String 
- **texto**: String 
- **fecha**: Date 

### Comentario
- **_idUsuario**: String (requerido)
- **_idLibro**: String (requerido)
- **texto**: String (requerido)
- **fecha**: Date 
- **tipo**: String (default: 'libro', requerido)


## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👤 Autor

**jit87**
- GitHub: [@jit87](https://github.com/jit87)

## 🙏 Agradecimientos

- Google Books API (por la integración de búsqueda de libros)

