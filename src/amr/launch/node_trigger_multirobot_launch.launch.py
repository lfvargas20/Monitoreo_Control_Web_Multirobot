from launch import LaunchDescription
from launch_ros.actions import Node


def generate_launch_description():
    return LaunchDescription([
        Node(
            package="amr",
            executable="node_trigger_goal_1",
            name="node_trigger_goal_1",
            output="screen"
        ),
        Node(
            package="amr",
            executable="node_trigger_goal_2",
            name="node_trigger_goal_2",
            output="screen"
        ),
        Node(
            package="amr",
            executable="node_trigger_goal_3",
            name="node_trigger_goal_3",
            output="screen"
        ),
        Node(
            package="amr",
            executable="node_trigger_goal_4",
            name="node_trigger_goal_4",
            output="screen"
        ),
    ])
