# web-gestor-documental

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

La aplicaci�n correr� en el servidor de desarrollo LDSGC101.
Para el despliegue de la web, se debe colocar el WAR (WebGestDoc.war) en la ruta /de/ewok/online/multipais/web/vrs, y a continuaci�n usar la herramienta de DC para el despliegue.
Actualmente para generar el WAR, se realiza lo siguiente:
- 	ng build del proyecto Angular para generar la carpeta dist.
- 	Copiamos la carpeta dist al proyecto proyecto-web-gestor-documental.
- 	Hay que ver como mejorarlo o automatizarlo: subir un nivel la carpeta assets (con las im�genes y demas), y 	cambiar en el index.html el base-href = ./dist para que coja la ruta.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
