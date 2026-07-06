import os

from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch_ros.actions import Node
from launch.launch_description_sources import PythonLaunchDescriptionSource, FrontendLaunchDescriptionSource

def generate_launch_description():
    gazebo_nav2_multirobot = IncludeLaunchDescription(
        PythonLaunchDescriptionSource([os.path.join(
            get_package_share_directory('amr'), 
            'launch'), 
            '/nav2_multirobot_launch.launch.py']
        )
    )
    
    gazebo_nav2_multirobot_trigger = IncludeLaunchDescription(
        PythonLaunchDescriptionSource([os.path.join(
            get_package_share_directory('amr'), 
            'launch'), 
            '/node_trigger_multirobot_launch.launch.py']
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

    web_video_server_3 = Node(
        package='web_video_server',
        executable='web_video_server',
        name='web_video_server_3',
        output='screen',
        parameters=[
            {'port': 8082,
             'reliability': 'reliable',
             'history': 'keep_last',
             'depth': 10
             }
        ]
    )

    web_video_server_4 = Node(
        package='web_video_server',
        executable='web_video_server',
        name='web_video_server_4',
        output='screen',
        parameters=[
            {'port': 8083,
             'reliability': 'reliable',
             'history': 'keep_last',
             'depth': 10
             }
        ]
    )

    return LaunchDescription([
        gazebo_nav2_multirobot,
        gazebo_nav2_multirobot_trigger,
        rosbridge_websocket_1,
        web_video_server_1,
        web_video_server_2,
        web_video_server_3,
        web_video_server_4
    ])

