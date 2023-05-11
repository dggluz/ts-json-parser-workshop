# Parsers Workshops (o cómo hacer un parser con TypeScrit y programación funcional)

## Intro

¡Hola! Vamos a aprender a hacer un parser de JSON en TypeScript. Desde cero y sin librerías.

## Instrucciones

### Requisitos

- [nodeJs](https://nodejs.org/es)
- Editor de código de preferencia

### Obtener el código

Bajate el repo (`git clone https://github.com/dggluz/ts-json-parser-workshop.git`), o desde [el sitio del repo](https://github.com/dggluz/ts-json-parser-workshop) y abrí el directorio con tu editor de código de referencia.

### Instalación

Simplemente corré el comando `npm i` para instalar las dependencias.

### Correr los tests

Correr `npm t` para correr los tests. Al comienzo, debería funcionar sólo un _test suite_, y el resto deberían estar _skippeados_. Con `npm t -- --watch` podés volver a correr los tests automáticamente con cada cambio de archivo.

### La dinámica

La idea es sencilla: ir haciendo los ejercicios que están en el archivo [`index.ts`](./src/index.ts) e ir ejecutando los tests correspondientes a cada ejercicio (quitando el `.skip` luego de cada `describe` y guardando los cambios del archivo). Los tests están todos en el directorio [`tests`](./tests/) y cada archivo está numerado con el mismo número que el ejercicio correspondiente.

La idea es primero ejecutar el test correspondiente al ejercicio, chequear que fallen, resolver el ejercicio y chequear que los tests pasen.

**¡Muchos éxitos!**
