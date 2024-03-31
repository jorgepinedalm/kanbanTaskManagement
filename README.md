# Kanban task management web app

## Demo del proyecto desplegado
[jpinedapps.000webhostapp.com](https://jpinedapps.000webhostapp.com/)

## Iniciar la aplicación

1. Clonar el repositorio
2. Ejecutar el comnado `npm install`
2. Para ejecutar la aplicación, use el comando `npx nx serve kanban-board-management`
3. Abrir `http://localhost:4200/` en su navegador

Para hacer build: `npx nx build kanban-board-management`

Para ejecutar pruebas unitarias `npm run test`

## Librerias o paquetes usados
- [NX](https://nx.dev/)
- [NGXS](https://www.ngxs.io/)
- [PrimeNG](https://primeng.org/)

> **Dado que se usó la versión 18 de NX (angular 17.2), se debe usa una versión de Node.js mayor o igual a 18.13.0 para ejecutar la aplicación.**

## Funcionalidades entregadas
- Carga inicial de tareas de manera predeterminada.
- Alternar el tema entre modo claro/oscuro.
- Alternar la visibilidad de la barra lateral del tablero.
- Agregar nuevas tareas a los tableros disponibles que contengan columnas.
- Ver el detalle de las tareas listadas en un tablero al hacer clic sobre esta.
- Marcar como hechas las subtareas dentro de una tarea (se tacha el nombre de la tarea al marcarla como hecha).
- Cambiar el estado de la tarea desde la visualización de su detalle. Se actualiza la ubicación de en la columna automáticamente.
- Arrastrar y soltar las tareas para ordenar entre las tareas de una columna o mover las tareas entre columnas actualizando su estado.
- Se usa localstorage para mantener la información manejada por el usuario, incluso actualizando página en el navegador.

- Agregar nuevas columnas a los tableros.
- Eliminar tareas
 
## Notas

La solución entregada esta realizada en Angular usando el manejador de monorepos NX en su versión 18 (versión angular 17.2).
Debido a esto, el proyecto consta de una aplicación `kanban-board-management` donde se ubican los componentes y módulos relacionados directamente con la temática de la prueba y de unas librerías (`libs`) que contienen la lógica para el manejo de estado (`store`) y los componentes reutilizables aplicando la arquitectura "Atomic Design" (`ui`). 

Se usó el paquete NGXS para gestionar el estado de la aplicación. Para el manejo de la información se creó un servicio para establecer una carga inicial de los datos visualizados cuya estructura consta de: Boards --> ColumnsState --> Tasks --> Subtasks. Los atributos de cada entidad pueden detallarse en `libs/shared/store/src/lib/models`. Se usa Localstorage para almacenar la información manejada según las acciones destinadas para eso. Se dejó integrado @ngxs/logger-plugin para que pueda mirar facilmente en la consola del navegador el manejo del estado logrado.

Como framework se usó Primeng y parte de utilidades CSS de Tailwind. Además, se incluyó Google Fonts para los iconos usados. Aunque se usó como Primeng y Tailwind, gran parte de los estilos visualizados fueron creados o modificados manualmente a través de los archivos de estilos de los componentes creados immplementando en gran parte la metodología BEM. Esto para coincidir con los estilos propuestos en las capturas de pantallas del documento de la prueba.

Se creó una directiva personalizada para tachar el título de una subtarea cuando se marque como hecha.

Se uso @angular/cdk drag and drop para implementar la funcionalidad de arrastrar y soltar con el fin de ordenar las tareas dentro de una columna o mover las tareas entre columnas. Al sostener una tarea a arrastrar, se muestra el contorno del área donde se puede soltar.

La aplicación cuenta con las funcionalidades de ocultar/mostrar la barra lateral y alternar el modo oscuro. Se intentó tomar como guía la paleta de colores visualizada en las capturas de pantalla del documento de la prueba. Para la funcionalidad de ocultar o mostrar la barra lateral, como no se tenia algún ejemplo en las capturas de pantalla, se propusó una interacción donde no se oculta completamente la barra lateral, sino que se contrae dejando visible solo los iconos en el listado de los tableros y una vista colapsada de los componentes que contiene.

Debido a que se usa la arquitectura Atomic Design dentro de la solución, se creó un servicio que permitiera notificar algunos eventos de elementos que no tenían comunicación directa entre ellos.

Se usa el método OnDestroy de los componentes para cerrar las suscripciones realizadas en ellos.

El código del proyecto cuenta con sus pruebas unitarias para validar su funcionamiento. 

En la solución presentada pretende cumplir con los requisitos técnicos descritos en la prueba. No obstante, la solución se diseñó de tal manera que puedan ser incluidas con facilidad otras funcionalidades dentro de la misma temática, ej.: crear más tableros, agregar columnas, etc.

## Capturas de pantalla del entregable

### Tablero

![image](https://github.com/jorgepinedalm/kanbanTaskManagement/assets/19978011/b3fab38c-c992-44db-affa-cb749c024c46)

### Modo oscuro

![image](https://github.com/jorgepinedalm/kanbanTaskManagement/assets/19978011/c1cd3c34-4409-4284-ab2e-5ab361fc2c47)

### Barra lateral colapsada

![image](https://github.com/jorgepinedalm/kanbanTaskManagement/assets/19978011/a7544f2e-cd38-45ca-8579-cb244e20a47d)

### Modal para crear nueva tarea

![image](https://github.com/jorgepinedalm/kanbanTaskManagement/assets/19978011/f8540f40-f621-4392-bc67-9f2f38529042)

### Detalle de una tarea

![image](https://github.com/jorgepinedalm/kanbanTaskManagement/assets/19978011/a85a7baa-f0d6-4733-ba1d-4193793500da)

