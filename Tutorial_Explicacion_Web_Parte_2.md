### 4. Explicación del archivo `style.css`

Define la apariencia visual de cada sección y componente de la página. La mayoría de las reglas siguen el mismo patrón: aplican características a los elementos dentro de un contenedor `div` con una clase o `id` determinado.

| Líneas | Etiqueta, clase o ID | Descripción |
|---|---|---|
| 1-9 | `body` | Reglas generales aplicadas a todos los elementos dentro de `body` |
| 11-16 | `h2` | Estilo de los títulos de cada sección de la página |
| 18-25 | `.grid-container` | Estilo del contenedor de las secciones de la página |
| 27-37 | `.grid-item-header` | Estilo del titulo de la página |
| 40-45 | `.grid-item` | Estilo de los contenedores de las secciones de la página |
| 47-50 | `.top-item` | Estilo de los contenedores de las secciones superiores de la página |
| 52-55 | `.low-item` | Estilo de los contenedores de las secciones inferiores de la página |
| 58-62 | `.indicators` | Estilo del contenedor de la sección de indicadores |
| 64-72 | `.indicator-box` | Estilo del contenedor que agrupa los indicadores |
| 74-78 | `.indicator-box-hbox` | Estilo del contenido del contenedor que agrupa el valor del ángulo Roll y la velocidad lineal |
| 81-84 | `.indicator-label` | Estilo de las etiquetas de los indicadores |
| 86-89 | `.indicator-value` | Estilo de los valores de las etiquetas de los indicadores  |
| 91-93 | `.first-label` | Estilo de la etiqueta correspondiente al ángulo Roll |
| 95-97 | `.item1` | Estilo de los valores de los ángulos Roll y Pitch |
| 99-102 | `.item2` | Estilo de la etiqueta de velocidad lineal |
| 104-106 | `.item3` | Estilo de los valores de las velocidades lineal y angular |
| 108-111 | `.item4` | Estilo de la etiqueta de velocidad angular |
| 113-115 | `.item5` | Estilo de la etiqueta de velocidad lineal |
| 117-119 | `.item6` | Estilo de la etiqueta del ángulo Yaw |
| 121-126 | `.buttons-container` | Estilo de los contenedores de control manual y automático |
| 128-132 | `.vbox-buttons` | Estilo del contenedor de los botones de rotación y stop del control manual |
| 134-140 | `.button` | Estilo de los botones de control manual |
| 142-145 | `.button:hover` | Apariencia de los botones al pasar el cursor sobre ellos |
| 158-162 | `.horizontal-container` | Organización de los contenedores de control manual y automáticov |
| 164-169 | `.vertical-container` | Estilo de las etiquetas y entradas del control automático |
| 171-176 | `.horizontal-container-pose` | Organización de las etiquetas y entradas del control automático |
| 178-180 | `.navigation-container` | Organización de las etiquetas y entradas del control automático |
| 182-188 | `.navigation-button` | Estilo de los botones del control automático |
| 190-195 | `.nav-button` | Organización de los botones del control automático |
| 197-203 | `.input-field` |  Estilo de las entradas del control automático |
| 205-209 | `.canvas-container` | Organización del contenedor del mapa |
| 211-213 | `.label` | Estilo y organización de las etiquetas de los ejes del mapa |
| 215-222 | `.vertical-label-container` | Organización de los valores del eje `y` del mapa |
| 224-230 | `.horizontal-label-container` | Organización de los valores del eje `x` del mapa |
| 232-236 | `#x-label` | Estilo de los valores del eje `x` del mapa |
| 238-241 | `#y-label` | Estilo de los valores del eje `y` del mapa |
| 243-246 | `.goal-status` | Estilo del texto de la sección de control automático que informa si la navegación fue iniciada, completada o cancelada |
| 248-255 | `.grouped-fields` | Organización del contenedor de los checkboxes de los robots |
| 257-260 | `.field` | Organización de los checkboxes de los robots |
| 262-264 | `.radio-checkbox input[type="radio"]:checked + label` | Estilo de las etiquetas de los checkboxes de los robots |
| 266-268 | `#robot1` | Color del checkbox del primer robot |
| 270-272 | `#robot2` | Color del checkbox del segundo robot |
| 283-285 | `.radio-checkbox label::before` | Estilo de los checkboxes de los robots |
| 287-291 | `.legend` | Organización y estilo de las etiquetas de los robots en la sección del mapa |
