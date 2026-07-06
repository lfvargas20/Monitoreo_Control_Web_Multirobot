import os

from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch_ros.actions import Node
from launch.launch_description_sources import PythonLaunchDescriptionSource, FrontendLaunchDescriptionSource

def generate_launch_description():
    
    intel_camera = IncludeLaunchDescription(
        PythonLaunchDescriptionSource([os.path.join(
            get_package_share_directory('realsense2_camera'), 
            'launch'), 
            '/rs_launch.py']
        )
    )
    

    rosbridge_websocket_1 = Node(
        package='rosbridge_server',
        executable='rosbridge_websocket',
        name='rosbridge_websocket_1',
        output='screen',
        parameters=[
            {'port': 9090}
        ]
    )


    web_video_server_1 = Node(
        package='web_video_server',
        executable='web_video_server',
        name='web_video_server_1',
        output='screen',
        parameters=[
            {'port': 8080,
             'reliability': 'reliable',
             'history': 'keep_last',
             'depth': 10
             }
        ]
    )

    web_video_server_2 = Node(
        package='web_video_server',
        executable='web_video_server',
        name='web_video_server_2',
        output='screen',
        parameters=[
            {'port': 8081,
             'reliability': 'reliable',
             'history': 'keep_last',
             'depth': 10
             }
        ]
    )

    return LaunchDescription([
        intel_camera,
        rosbridge_websocket_1,
        web_video_server_1,
        web_video_server_2,

    ])

