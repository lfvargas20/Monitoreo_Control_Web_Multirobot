# Explicación de la interfaz web

Este documento describe la estructura y el funcionamiento del los archivos que componen la interfaz web del robot TurtleBot 3, explicando línea por línea el propósito de cada sección.

## 1. Requisitos previos

* Conocimientos de HTML, CSS y JavaScript
* Conocimientos de ROS (tópicos, nodos)

## 2. Archivos de la interfaz web

* `index.html`
* `styles.css`
* `index.js`

## 3. Explicación del archivo `index.html`

### 3.1 Línea 1

```html
<!DOCTYPE html>
```

Indica al navegador en qué versión de HTML está escrita la página.

### 3.2 Línea 2

```html
<html lang="en">
```

Indica al navegador que está leyendo un archivo `.html`, definiendo además el idioma principal de la página (en este caso, inglés).

### 3.3 Líneas 3-13

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TurtleBot 3 Web Interface</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/easeljs@1/lib/easeljs.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/eventemitter2@6/lib/eventemitter2.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ros2d@0/build/ros2d.js"></script>
</head>
```

Contiene información técnica de la página que no se muestra directamente en ella, encerrada en la etiqueta `head`. El detalle de cada línea se describe a continuación:

| Línea(s) | Código | Descripción |
|---|---|---|
| 4 | `<meta charset="UTF-8">` | Indica la codificación de caracteres |
| 5 | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Indica al navegador las dimensiones y el nivel de zoom de la página |
| 6 | `<title>TurtleBot 3 Web Interface</title>` | Indica el título de la pestaña correspondiente a la página |
| 7-8 | `<link rel="stylesheet" ...>` | Indica los archivos `.css` relacionados a la página, usados para darle diseño |
| 9-12 | `<script src="...roslib..."></script>` etc. | Indica los archivos `.js` de las librerías usadas para ejecutar JavaScript en la página. En este caso se usan las librerías `roslibjs`, `ros2djs` y sus respectivas dependencias |

### 3.4 Líneas 16-208

Contiene el contenido que se visualiza en la página, encerrado en la etiqueta `body`.

#### 3.4.1 Líneas 18-205

Define la separación del contenido visualizado mediante un contenedor `div` principal, dentro del cual se encuentran las diferentes secciones de la página, cada una organizada en su propio contenedor `div`.

| Líneas | Sección | Descripción |
|---|---|---|
| 19-21 | Encabezado | `<div class="grid-item-header">` — Título de la página: "TurtleBot 3 Web Interface" |
| 24-31 | Cámara | Sección de la cámara del robot |
| 33-68 | Mapa | Sección del mapa del entorno del robot |
| 71-116 | Indicadores | Velocidad lineal y angular, alarmas de estabilidad y proximidad |
| 118-196 | Control | Control manual/automático de los robots (ver detalle en 3.4.1.5) |
| 201 | Script | Archivo `.js` usado para ejecutar JavaScript e interactuar con cada sección de la página |

#### 3.4.2 Detalle de la sección de control (líneas 118-196)

| Líneas | Descripción |
|---|---|
| 119 | Título de la sección |
| 121-195 | Contenedor `div` que organiza horizontalmente los tipos de control de los robots |
| 122-155 | Contenedor `div` de la sección de control manual |
| 157-194 | Contenedor `div` de la sección de selección de robots y control automático |

Continuación del tutorial

