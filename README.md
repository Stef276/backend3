# Proyecto Final – Backend con Node.js, Express, Tests y Docker

Este proyecto implementa un servidor en **Node.js + Express**, con manejo de usuarios, mascotas, adopciones, documentación Swagger, tests funcionales y dockerización completa.

---

##  Objetivos de la Entrega Final

###  Documentación
- Documentación completa del módulo **Users** usando **Swagger**.

###  Tests Funcionales
- Tests funcionales implementados para **todos los endpoints de `adoption.router.js`**.
- Se incluyen pruebas de:
  - Casos de éxito
  - Casos de error
  - Validaciones

###  Docker
- Se incluye un **Dockerfile funcional** para construir la imagen del proyecto.
- El proyecto puede ejecutarse usando Docker:
  
```bash
docker build -t tuusuario/tuimagen .
docker run -p 8080:8080 tuusuario/tuimagen
