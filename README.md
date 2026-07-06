# Sistema de Monitoreo y Control Web de Robots Móviles
## Pasos para inicializar el sistema
### Clonación del repositorio
`git clone https://github.com/lfvargas20/Monitoreo_Control_Web_Multirobot.git`
### Eliminación de las carpetas build, install y log
`cd Monitoreo_Control_web_Multirobot`
`rm -rf /build /install /log`
### Compilación
`colcon build --symlink-install`
`source install/setup.bash`
### Comando de activación del proyecto (Terminal 1)
`ros2 launch amr multi_amr_project_launch.launch.py`
### Comando para activar el servidor local de la página web de monitoreo y control de los robots (Terminal 2)
`python3 -m http.server`
### Dirección local de la página web
`localhost:8000`
## Visualización de la página web
