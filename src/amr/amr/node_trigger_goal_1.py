import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from std_msgs.msg import Bool, String
from nav2_msgs.action import NavigateToPose
from geometry_msgs.msg import PoseStamped
from tf_transformations import quaternion_from_euler
import math

class StatusPublishingNavigator1(Node):

    def __init__(self):
        super().__init__('node_trigger_goal_1')

        self._action_client = ActionClient(self, NavigateToPose, '/amr_0/navigate_to_pose')

        self.suscription1 = self.create_subscription(Bool, '/amr_0/start_navigation', self.trigger_callback, 10)

        self.suscription2 = self.create_subscription(String, '/amr_0/pose_x', self.pose_x_callback, 10)

        self.suscription3 = self.create_subscription(String, '/amr_0/pose_y', self.pose_y_callback, 10)

        self.suscription4 = self.create_subscription(String, '/amr_0/pose_yaw', self.pose_yaw_callback, 10)

        self.status_publisher = self.create_publisher(String, '/amr_0/navigation_status', 10)

        self.goal_in_progress= False

        self.pose_x = 0.0

        self.pose_y = 0.0

        self.pose_yaw = math.pi

    def trigger_callback(self, msg):
        if msg.data and not self.goal_in_progress:
            self.get_logger().info('Received trigger to navigate!')
            self.goal_sent = True
            self.send_goal()
        elif msg.data and self.goal_in_progress:
            self.get_logger().info('Goal already in progress, ignoring trigger.')

    def pose_x_callback(self, msg):
        self.pose_x = float(msg.data)
    
    def pose_y_callback(self, msg):
        self.pose_y = float(msg.data)

    def pose_yaw_callback(self, msg):
        self.pose_yaw = float(msg.data)

    

    def send_goal(self):
        goal_msg = NavigateToPose.Goal()
        goal_msg.pose = PoseStamped()
        goal_msg.pose.header.frame_id = 'map'
        goal_msg.pose.header.stamp = self.get_clock().now().to_msg()

        goal_msg.pose.pose.position.x = self.pose_x
        goal_msg.pose.pose.position.y = self.pose_y
        goal_msg.pose.pose.position.z = 0.01
        quaternion = quaternion_from_euler(0.0, 0.0, self.pose_yaw)
        goal_msg.pose.pose.orientation.x = quaternion[0]
        goal_msg.pose.pose.orientation.y = quaternion[1]
        goal_msg.pose.pose.orientation.z = quaternion[2]
        goal_msg.pose.pose.orientation.w = quaternion[3]


        self._action_client.wait_for_server()
        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal was rejected.')
            self.publish_status('REJECTED')
            self.goal_in_progress = False
            return

        self.get_logger().info('Goal accepted. Waiting for result...')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result()
        status_str = self.translate_status(result.status)
        self.get_logger().info(f'Navigation finished with status: {status_str}')
        self.publish_status(status_str)
        self.goal_in_progress = False

    def publish_status(self, status: str):
        msg = String()
        msg.data = status
        self.status_publisher.publish(msg)

    def translate_status(self, status_code: int) -> str:
        # These match action_msgs/msg/GoalStatus constants
        status_dict = {
            0: 'UNKNOWN',
            1: 'ACCEPTED',
            2: 'EXECUTING',
            3: 'CANCELING',
            4: 'SUCCEEDED',
            5: 'CANCELED',
            6: 'ABORTED'
        }
        return status_dict.get(status_code, 'UNKNOWN')

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info(f'Navigation feedback: {feedback}')

def main(args=None):
    rclpy.init(args=args)
    node = StatusPublishingNavigator1()
    rclpy.spin(node)
    rclpy.shutdown()
