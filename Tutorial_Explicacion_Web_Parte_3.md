### 5. Explicación del archivo `index.js`

#### 5.1 Conexión con Rosbridge (líneas 2-19)

| Líneas | Descripción |
|---|---|
| 2-6 | Conexión de la página web al servidor Rosbridge |
| 8-11 | Confirmación de la conexión por consola |
| 13-15 | Confirmación de error por consola |
| 17-19 | Confirmación de desconexión del servidor Rosbridge por consola |

#### 5.2 Variables de tópicos generales (líneas 23-88)

| 5.2.x | Líneas | Tópico | Descripción |
|---|---|---|---|
| 5.2.1 | 23-27 | `/clock` | Variable constante que almacena el tópico del reloj de simulación |
| 5.2.2 | 30-34 | `/tb3_1/map` | Mapa del entorno (mensajes `OccupancyGrid`) |
| 5.2.3 | 38-42 | `/tb3_1/odom` | Odometría del primer robot. Usado en la sección de indicadores |
| 5.2.4 | 44-48 | `/tb3_2/odom` | Odometría del segundo robot. Usado en la sección de indicadores |
| 5.2.5 | 51-55 | `/tb3_1/odom` | Odometría del primer robot. Usado en la sección del mapa |
| 5.2.6 | 57-61 | `/tb3_2/odom` | Odometría del segundo robot. Usado en la sección del mapa |
| 5.2.7 | 66-70 | `/tb3_1/scan` | Datos del sensor LiDAR del primer robot. Usado en indicadores |
| 5.2.8 | 72-76 | `/tb3_2/scan` | Datos del sensor LiDAR del segundo robot. Usado en indicadores |
| 5.2.9 | 78-82 | `/tb3_1/imu` | Velocidad y orientación del primer robot. Usado en indicadores |
| 5.2.10 | 84-88 | `/tb3_2/imu` | Velocidad y orientación del segundo robot. Usado en indicadores |

#### 5.3 Aislamiento de comandos de velocidad (líneas 92-134)

Variable y funciones que permiten aislar los envíos de comandos de velocidad de cada robot.

#### 5.4 Variables de navegación autónoma (líneas 139-214)

Usadas en la sección de control manual/automático:

| 5.4.x | Líneas | Tópico | Servicio | Descripción |
|---|---|---|---|---|
| 5.4.1 | 139-143 | `/tb3_1/start_navigation` | - | Booleano para iniciar la navegación autónoma del primer robot |
| 5.4.2 | 145-149 | `/tb3_2/start_navigation` | - | Booleano para iniciar la navegación autónoma del segundo robot |
| 5.4.3 | 152-156 | `/tb3_1/pose_x` | - | Posición en `x` de la coordenada de destino del primer robot |
| 5.4.4 | 158-162 | `/tb3_1/pose_y` | - | Posición en `y` de la coordenada de destino del primer robot |
| 5.4.5 | 164-168 | `/tb3_1/pose_yaw` | - | Ángulo de la coordenada de destino del primer robot |
| 5.4.6 | 170-174 | `/tb3_2/pose_x` | - | Posición en `x` de la coordenada de destino del segundo robot |
| 5.4.7 | 176-180 | `/tb3_2/pose_y` | - | Posición en `y` de la coordenada de destino del segundo robot |
| 5.4.8 | 182-186 | `/tb3_2/pose_yaw` | - | Ángulo de la coordenada de destino del segundo robot |
| 5.4.9 | 191-195 | `/tb3_1/navigation_status` | - | Texto que indica si la navegación del primer robot fue exitosa o cancelada |
| 5.4.10 | 197-201 | `/tb3_2/navigation_status` | - | Texto que indica si la navegación del segundo robot fue exitosa o cancelada |
| 5.4.11 | 204-208 | - | `/tb3_1/navigate_to_pose/_action/cancel_goal` | Cancela la navegación autónoma del primer robot |
| 5.4.12 | 210-214 | - | `/tb3_2/navigate_to_pose/_action/cancel_goal` | Cancela la navegación autónoma del segundo robot |

#### 5.5 Elementos del DOM de robots (líneas 220-221)

Variables que almacenan los elementos con `id` `robot1` y `robot2`, correspondientes al primer y segundo robot.

#### 5.6 Función de control del primer robot (líneas 227-420)

Agrega la información del primer robot a la página y permite controlarlo manualmente mediante suscripción y publicación a sus tópicos respectivos.

| Líneas | Descripción |
|---|---|
| 229-235 | Desuscripción de los tópicos que no corresponden al primer robot |
| 238 | Selección del tópico de comando de velocidad, usando las funciones/variables de 5.3 |
| 241-250 | Variables y funciones para ajustar el video del servidor `web-video-server` en la sección de cámara |
| 252-254 | Espacios de texto correspondientes a los ángulos RPY del primer robot |
| 256 | Espacio de texto correspondiente a la alarma de proximidad del primer robot |
| 259-277 | Suscripción a `/tb3_1/scan`: organiza los datos del LiDAR en una lista, elimina valores nulos y agrega texto indicando si el robot está a menos de 0.2 m de un obstáculo |
| 279-280 | Espacios de texto correspondientes a las velocidades lineal y angular del primer robot |
| 284-285 | Variables de comando de velocidad lineal y angular, inicializadas en 0.00 m/s y 0.00 rad/s |
| 290-301 | Mensaje tipo `Twist` con el comando de velocidad del primer robot, construido con las variables anteriores |
| 303-343 | Botones del control manual y sus manejadores de eventos: incrementan/disminuyen la velocidad y publican el mensaje `Twist` al tópico correspondiente |
| 345-358 | Suscripción a la odometría (5.2.3): obtiene velocidad lineal/angular en tiempo real y actualiza los espacios de texto |
| 360-404 | Suscripción al IMU (5.2.9): convierte cuaterniones a ángulos Euler y actualiza los espacios de texto en tiempo real |
| 406-418 | Suscripción al estado de navegación (5.4.9): muestra en la página si la navegación autónoma tuvo éxito o fue cancelada |

#### 5.7 Función de control del segundo robot (líneas 422-610)

Ejecuta los mismos procesos que la función de 5.6, aplicados al segundo robot.

#### 5.8 Mapa del entorno (líneas 621-875)

| Líneas | Descripción |
|---|---|
| 621-739 | Variables y funciones para crear el espacio donde se aloja el mapa del entorno en la página |
| 742-864 | Suscripción al mapa (5.2.2): recibe las celdas del mensaje, redimensiona el mapa al tamaño del espacio disponible, representa a los robots como círculos de colores y dibuja sus trayectorias en tiempo real mediante suscripción simultánea a la odometría (5.2.5) |
| 867-868 | Variables de posición `x` e `y`, inicializadas en `0` |
| 872-875 | Suscripción a la odometría (5.2.6) que actualiza las variables anteriores, usadas en el proceso de 742-864 |

#### 5.9 Nota
El proceso de las líneas 872-875 se ejecuta dentro del proceso de las líneas 742-864.

#### 5.10 Control automático / navegación a coordenadas (líneas 883-1010)

| Líneas | Descripción |
|---|---|
| 883-885 | Espacios de texto de las entradas de coordenadas de destino del control automático (`x`, `y`, `θ`) |
| 887-963 | Función que toma esas coordenadas, inicia la navegación autónoma del robot seleccionado y dibuja un círculo amarillo en el mapa marcando el destino |
| 965-1010 | Función que envía una petición para cancelar la navegación autónoma del robot seleccionado, lo detiene y procesa la respuesta de la petición |
