# Taskboard

![Logo](./public/logo-github.svg)

Taskboard es una aplicación web con una interfaz minimalista para la gestión de tareas. Permite a los usuarios registrarse, iniciar sesión y organizar tareas de forma individual mediante un sistema de asignación personal.

El proyecto está orientado a la práctica de un flujo completo de aplicación moderna utilizando Vue 3 y Firebase, con una arquitectura clara tanto en el frontend como en la base de datos.

---

## Funcionalidades principales

- Registro y login de usuarios
- Vista Dashboard con:
  - Listado de todas las tareas
  - Tareas completadas
  - Tareas no completadas
  - Tareas asignadas
- Asignación de tareas (una tarea no puede ser asignada por más de un usuario)
- Vista Workspace:
  - Muestra únicamente las tareas asignadas al usuario autenticado
- Manejo de estado global
- Diseño responsive y minimalista
- Alertas visuales para acciones importantes

---

## Tecnologías utilizadas

- Vue 3 (Composition API)
- Pinia (manejo de estado)
- Tailwind CSS (estilos principales)
- SCSS (estilos adicionales y responsive)
- Firebase
  - Firebase Authentication
  - Firestore
- SweetAlert
- Font Awesome
- Google Fonts
- Vite
- Vercel

---

## Estructura del proyecto

### Firestore

La base de datos está estructurada en dos colecciones principales:

#### Colección tareas

- Un documento por cada tarea
- Identificador generado de forma aleatoria
- Cada documento contiene un objeto con los siguientes campos:
  - Nombre de la tarea
  - Estado de asignación
  - Estado de completado

#### Colección usuarios

- Un documento por cada usuario registrado
- Cada usuario dispone de una subcolección llamada `workspace`
- Dentro de `workspace`:
  - Un documento por cada tarea asignada al usuario
  - El campo de asignación se establece en `true` cuando la tarea es asignada

---

## Flujo de ramas del proyecto

Durante el desarrollo se trabajó con varias ramas independientes:

- Rama Auth: autenticación, login y registro
- Rama Dashboard: gestión de tareas, dashboard y header
- Rama Workspace: tareas asignadas, refactorización y despliegue

Estas ramas fueron eliminadas tras realizar pull requests y merges mediante squash, consolidando el trabajo en un único commit final.

Este enfoque ha permitido mejorar la frecuencia y calidad de los commits, así como aprovechar de forma más eficiente las capacidades de Firestore.

