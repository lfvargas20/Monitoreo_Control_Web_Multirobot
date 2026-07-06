// ROS Connection
var ros = new ROSLIB.Ros({
    url: 'ws://192.168.100.18:9090'
    //url: 'ws://10.1.169.24:9090'
    //url: 'wss://honestly-internal-hornet.ngrok-free.app'
});

ros.on('connection', function() {
    console.log('Conectado al servidor de ROS');
    
});

ros.on('error', function(error) {
    console.log('Error al conectar al servidor de ROS:', error);
});

ros.on('close', function() {
    console.log('Conexión al servidor de ROS cerrada');
});


// Variables Globales
const clockTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/clock',
    messageType: 'rosgraph_msgs/Clock'
});


const mapTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/map',
    messageType: 'nav_msgs/OccupancyGrid'
});


// Variables de pose
const robotPoseTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/odom',
    messageType: 'nav_msgs/Odometry'
});

const robotPoseTopic1 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/odom',
    messageType: 'nav_msgs/Odometry'
});

const robotPoseTopic2 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/odom',
    messageType: 'nav_msgs/Odometry'
});

const robotPoseTopic3 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/odom',
    messageType: 'nav_msgs/Odometry'
});

// Variables de mapa
const robotPoseMapTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/odom',
    messageType: 'nav_msgs/Odometry'
});

const robotPoseMapTopic1 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/odom',
    messageType: 'nav_msgs/Odometry'
});

const robotPoseMapTopic2 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/odom',
    messageType: 'nav_msgs/Odometry'
});

const robotPoseMapTopic3 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/odom',
    messageType: 'nav_msgs/Odometry'
});


// Variables para cada robot

const scanTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/scan',
    messageType: 'sensor_msgs/LaserScan'
});

const scanTopic1 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/scan',
    messageType: 'sensor_msgs/LaserScan'
});

const scanTopic2 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/scan',
    messageType: 'sensor_msgs/LaserScan'
});

const scanTopic3 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/scan',
    messageType: 'sensor_msgs/LaserScan'
});

var velTopics = [
    { name: '/amr_0/cmd_vel', listener: null, publisher: null },
    { name: '/amr_1/cmd_vel', listener: null, publisher: null },
    { name: '/amr_2/cmd_vel', listener: null, publisher: null },
    { name: '/amr_3/cmd_vel', listener: null, publisher: null }
]

var activeTopic = null;

function initTopic(robot) {
    robot.listener = new ROSLIB.Topic({
        ros: ros,
        name: robot.name,
        messageType: 'geometry_msgs/Twist'
    });

    robot.publisher = new ROSLIB.Topic({
        ros: ros,
        name: robot.name,
        messageType: 'geometry_msgs/Twist'
    });
}

function deactivateTopic(robot) {
    if (robot.listener) {
        robot.listener.unsubscribe();
        robot.listener = null;
    }
    if (robot.publisher) {
        robot.publisher = null;
    }
}

function selectTopic(topicName) {
    velTopics.forEach(robot => {
        if (robot.name === topicName) {
            if (!robot.publisher) {
                initTopic(robot);
            }
            activeTopic = robot;
        } else {
            deactivateTopic(robot);
        }
    });
}



// Variables de Nav2

const navTrigger1 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/start_navigation',
    messageType: 'std_msgs/Bool'
});

const navTrigger2 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/start_navigation',
    messageType: 'std_msgs/Bool'
});

const navTrigger3 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/start_navigation',
    messageType: 'std_msgs/Bool'
});

const navTrigger4 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/start_navigation',
    messageType: 'std_msgs/Bool'
});

const poseData1_x = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/pose_x',
    messageType: 'std_msgs/String'
});

const poseData1_y = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/pose_y',
    messageType: 'std_msgs/String'
});

const poseData1_yaw = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/pose_yaw',
    messageType: 'std_msgs/String'
});

const poseData2_x = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/pose_x',
    messageType: 'std_msgs/String'
});

const poseData2_y = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/pose_y',
    messageType: 'std_msgs/String'
});

const poseData2_yaw = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/pose_yaw',
    messageType: 'std_msgs/String'
});

const poseData3_x = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/pose_x',
    messageType: 'std_msgs/String'
});

const poseData3_y = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/pose_y',
    messageType: 'std_msgs/String'
});

const poseData3_yaw = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/pose_yaw',
    messageType: 'std_msgs/String'
});

const poseData4_x = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/pose_x',
    messageType: 'std_msgs/String'
});

const poseData4_y = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/pose_y',
    messageType: 'std_msgs/String'
});

const poseData4_yaw = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/pose_yaw',
    messageType: 'std_msgs/String'
});

const goalStatus1 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_0/navigation_status',
    messageType: 'std_msgs/String'
});

const goalStatus2 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_1/navigation_status',
    messageType: 'std_msgs/String'
});

const goalStatus3 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_2/navigation_status',
    messageType: 'std_msgs/String'
});

const goalStatus4 = new ROSLIB.Topic({
    ros: ros,
    name: '/amr_3/navigation_status',
    messageType: 'std_msgs/String'
});

var cancelClient1 = new ROSLIB.Service({
    ros : ros,
    name : '/amr_0/navigate_to_pose/_action/cancel_goal',
    serviceType : 'action_msgs/srv/CancelGoal'
});

var cancelClient2 = new ROSLIB.Service({
    ros : ros,
    name : '/amr_1/navigate_to_pose/_action/cancel_goal',
    serviceType : 'action_msgs/srv/CancelGoal'
});

var cancelClient3 = new ROSLIB.Service({
    ros : ros,
    name : '/amr_2/navigate_to_pose/_action/cancel_goal',
    serviceType : 'action_msgs/srv/CancelGoal'
});

var cancelClient4 = new ROSLIB.Service({
    ros : ros,
    name : '/amr_3/navigate_to_pose/_action/cancel_goal',
    serviceType : 'action_msgs/srv/CancelGoal'
});





let robot1 = document.getElementById('robot1');
let robot2 = document.getElementById('robot2');
let robot3 = document.getElementById('robot3');
let robot4 = document.getElementById('robot4');





function showRobot1() {

    scanTopic1.unsubscribe();
    scanTopic2.unsubscribe();
    scanTopic3.unsubscribe();
    robotPoseTopic1.unsubscribe();
    robotPoseTopic2.unsubscribe();
    robotPoseTopic3.unsubscribe();
    goalStatus2.unsubscribe();
    goalStatus3.unsubscribe();
    goalStatus4.unsubscribe();

    selectTopic('/amr_0/cmd_vel');


    const videoContainer = document.getElementById('camera-container');
    const videoTopic = '/amr_0/camera/image_raw';
    const videoURL = `http://192.168.100.18:8080/stream?topic=${videoTopic}`;

    videoContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = videoURL;
    img.style.width = '669px';
    img.style.height = '402px';
    videoContainer.appendChild(img);

    let rollText = document.getElementById('roll-text');
    let pitchText = document.getElementById('pitch-text');
    let yawText = document.getElementById('yaw-text');

    let textAlarm = document.getElementById('proximity-alarm-text');


    scanTopic.subscribe(function(message) {

        // Lista de rangos del escaneo láser
        const scan = message.ranges;
    
        // Eliminación de valores nulos
        const scanList = scan.filter(element => element !== null);
    
        // Alarma de proximidad
        if (Math.min(...scanList)-0.08 < 0.2) {
            const distance_obs = Math.min(...scanList)-0.08;
            textAlarm.style.color = 'red';
            textAlarm.innerHTML = `Alert! obstacle approaching at ${distance_obs.toFixed(2)} m.`;
        } else {
            textAlarm.style.color = 'green';
            textAlarm.innerHTML = 'No alarm';
        }    
    });

    let lineal_x_value = document.getElementById("linear-velocity-text");
    let angular_z_value = document.getElementById("angular-velocity-text");

    

    let linear_x = 0.00;
    let angular_z = 0.00;

    let linear_x_odom = 0.00;
    let angular_z_odom = 0.00;

    let twist = new ROSLIB.Message({
        linear: {
            x: linear_x,
            y: 0.0,
            z: 0.0
        },
        angular: {
            x: 0.0,
            y: 0.0,
            z: angular_z
        }
    });

    const stopButton = document.getElementById("stop-button");

    stopButton.addEventListener("click", event => {
        linear_x = 0.00;
        angular_z = 0.00;
        twist.linear.x = linear_x;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedXPlusButton = document.getElementById("forward-button");

    speedXPlusButton.addEventListener("click", event => {
        linear_x = linear_x + 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedXMinusButton = document.getElementById("backward-button");

    speedXMinusButton.addEventListener("click", event => {
        linear_x = linear_x - 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedZPlusButton = document.getElementById("clock-button");

    speedZPlusButton.addEventListener("click", event => {
        angular_z = angular_z + 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedZMinusButton = document.getElementById("anticlock-button");

    speedZMinusButton.addEventListener("click", event => {
        angular_z = angular_z - 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    robotPoseTopic.subscribe(function(message) {
        //console.log(message.pose.pose.position.x);
        //console.log(message.pose.pose.position.y);
        linear_x_odom = message.twist.twist.linear.x;
        angular_z_odom = message.twist.twist.angular.z;
        lineal_x_value.innerHTML = `${linear_x_odom.toFixed(2)} m/s`;
        if (Math.abs(linear_x_odom.toFixed(2)) === 0.00) {
            lineal_x_value.innerHTML = '0.00 m/s';
        }
        if (Math.abs(linear_x_odom.toFixed(2)) > 0.00) {
            lineal_x_value.innerHTML = ` ${linear_x_odom.toFixed(2)} m/s`;
        }
        angular_z_value.innerHTML = `${angular_z_odom.toFixed(2)} rad/s`;
        if (Math.abs(angular_z_odom.toFixed(2)) === 0.00) {
            angular_z_value.innerHTML = '0.00 rad/s';
        }
        if (Math.abs(angular_z_odom.toFixed(2)) > 0.00) {
            angular_z_value.innerHTML = ` ${angular_z_odom.toFixed(2)} rad/s`;
        }

        const quaternion = new ROSLIB.Quaternion(message.pose.pose.orientation);
    
        const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
        const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
        const roll = Math.atan2(sinr_cosp, cosr_cosp);
    
        const sinp = Math.sqrt(1 + 2 * (quaternion.w * quaternion.y - quaternion.x * quaternion.z));
        const cosp = Math.sqrt(1 - 2 * (quaternion.w * quaternion.y + quaternion.x * quaternion.z));
        const pitch = (2* Math.atan2(sinp, cosp)) - Math.PI/2;
    
        const siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
        const cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
        const yaw = Math.atan2(siny_cosp, cosy_cosp);
    
        const rollDeg = roll * 180 / Math.PI;
        const pitchDeg = pitch * 180 / Math.PI;
        const yawDeg = yaw * 180 / Math.PI;
    
    
    
        rollText.innerHTML = `${rollDeg.toFixed(2)} °`;
        if (Math.abs(rollDeg.toFixed(2)) === 0.00) {
            rollText.innerHTML = '0.00 °';
        }

        pitchText.innerHTML = `${pitchDeg.toFixed(2)} °`;
        if (Math.abs(pitchDeg.toFixed(2)) === 0.00) {
            pitchText.innerHTML = '0.00 °';
        }

        yawText.innerHTML = `${yawDeg.toFixed(2)} °`;
        if (Math.abs(yawDeg.toFixed(2)) === 0.00) {
            yawText.innerHTML = '0.00 °';
        }
    
        const stabilityAlarm = document.getElementById('stability-alarm-text');
        if (Math.abs(roll) > 0.01 || Math.abs(pitch) > 0.01) {
            stabilityAlarm.style.color = 'red';
            stabilityAlarm.innerHTML = 'Alert! Robot experimenting vibrations.';
        } else {
            stabilityAlarm.style.color = 'green';
            stabilityAlarm.innerHTML = 'No alarm';
        }
    });

    goalStatus1.subscribe(function(message) {
        if (message.data === 'SUCCEEDED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'green';
            completeText.innerHTML = 'Goal completed';
        }

        if (message.data === 'CANCELLED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'red';
            completeText.innerHTML = 'Goal cancelled';
        }
    });

}

function showRobot2() {

    scanTopic.unsubscribe();
    scanTopic2.unsubscribe();
    scanTopic3.unsubscribe();
    robotPoseTopic.unsubscribe();
    robotPoseTopic2.unsubscribe();
    robotPoseTopic3.unsubscribe();
    goalStatus1.unsubscribe();
    goalStatus3.unsubscribe();
    goalStatus4.unsubscribe();

    selectTopic('/amr_1/cmd_vel');

    const videoContainer = document.getElementById('camera-container');
    const videoTopic = '/amr_1/camera/image_raw';
    const videoURL = `http://192.168.100.18:8081/stream?topic=${videoTopic}`;

    videoContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = videoURL;
    img.style.width = '669px';
    img.style.height = '402px';
    videoContainer.appendChild(img);

    let rollText = document.getElementById('roll-text');
    let pitchText = document.getElementById('pitch-text');
    let yawText = document.getElementById('yaw-text');

    let textAlarm = document.getElementById('proximity-alarm-text');

    scanTopic1.subscribe(function(message) {

        // Lista de rangos del escaneo láser
        const scan = message.ranges;
    
        // Eliminación de valores nulos
        const scanList = scan.filter(element => element !== null);
    

        // Alarma de proximidad
        if (Math.min(...scanList)-0.08 < 0.2) {
            const distance_obs = Math.min(...scanList)-0.08;
            textAlarm.style.color = 'red';
            textAlarm.innerHTML = `Alert! obstacle approaching at ${distance_obs.toFixed(2)} m.`;
        } else {
            textAlarm.style.color = 'green';
            textAlarm.innerHTML = 'No alarm';
        }    
    });

    let lineal_x_value = document.getElementById("linear-velocity-text");
    let angular_z_value = document.getElementById("angular-velocity-text");

    

    let linear_x = 0.00;
    let angular_z = 0.00;

    let linear_x_odom = 0.00;
    let angular_z_odom = 0.00;

    let twist = new ROSLIB.Message({
        linear: {
            x: linear_x,
            y: 0.0,
            z: 0.0
        },
        angular: {
            x: 0.0,
            y: 0.0,
            z: angular_z
        }
    });

    const stopButton = document.getElementById("stop-button");

    stopButton.addEventListener("click", event => {
        linear_x = 0.00;
        angular_z = 0.00;
        twist.linear.x = linear_x;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedXPlusButton = document.getElementById("forward-button");

    speedXPlusButton.addEventListener("click", event => {
        linear_x = linear_x + 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedXMinusButton = document.getElementById("backward-button");

    speedXMinusButton.addEventListener("click", event => {
        linear_x = linear_x - 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedZPlusButton = document.getElementById("clock-button");

    speedZPlusButton.addEventListener("click", event => {
        angular_z = angular_z + 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedZMinusButton = document.getElementById("anticlock-button");

    speedZMinusButton.addEventListener("click", event => {
        angular_z = angular_z - 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    robotPoseTopic1.subscribe(function(message) {
        linear_x_odom = message.twist.twist.linear.x;
        angular_z_odom = message.twist.twist.angular.z;
        lineal_x_value.innerHTML = `${linear_x_odom.toFixed(2)} m/s`;
        if (Math.abs(linear_x_odom.toFixed(2)) === 0.00) {
            lineal_x_value.innerHTML = '0.00 m/s';
        }
        if (Math.abs(linear_x_odom.toFixed(2)) > 0.00) {
            lineal_x_value.innerHTML = ` ${linear_x_odom.toFixed(2)} m/s`;
        }
        angular_z_value.innerHTML = `${angular_z_odom.toFixed(2)} rad/s`;
        if (Math.abs(angular_z_odom.toFixed(2)) === 0.00) {
            angular_z_value.innerHTML = '0.00 rad/s';
        }
        if (Math.abs(angular_z_odom.toFixed(2)) > 0.00) {
            angular_z_value.innerHTML = ` ${angular_z_odom.toFixed(2)} rad/s`;
        }
        
        const quaternion = new ROSLIB.Quaternion(message.pose.pose.orientation);
    
        const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
        const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
        const roll = Math.atan2(sinr_cosp, cosr_cosp);
    
        const sinp = Math.sqrt(1 + 2 * (quaternion.w * quaternion.y - quaternion.x * quaternion.z));
        const cosp = Math.sqrt(1 - 2 * (quaternion.w * quaternion.y + quaternion.x * quaternion.z));
        const pitch = (2* Math.atan2(sinp, cosp)) - Math.PI/2;
    
        const siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
        const cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
        const yaw = Math.atan2(siny_cosp, cosy_cosp);
    
        const rollDeg = roll * 180 / Math.PI;
        const pitchDeg = pitch * 180 / Math.PI;
        const yawDeg = yaw * 180 / Math.PI;
    
    
    
        rollText.innerHTML = `${rollDeg.toFixed(2)} °`;
        if (Math.abs(rollDeg.toFixed(2)) === 0.00) {
            rollText.innerHTML = '0.00 °';
        }

        pitchText.innerHTML = `${pitchDeg.toFixed(2)} °`;
        if (Math.abs(pitchDeg.toFixed(2)) === 0.00) {
            pitchText.innerHTML = '0.00 °';
        }

        yawText.innerHTML = `${yawDeg.toFixed(2)} °`;
        if (Math.abs(yawDeg.toFixed(2)) === 0.00) {
            yawText.innerHTML = '0.00 °';
        }
    
        const stabilityAlarm = document.getElementById('stability-alarm-text');
        if (Math.abs(roll) > 0.01 || Math.abs(pitch) > 0.01) {
            stabilityAlarm.style.color = 'red';
            stabilityAlarm.innerHTML = 'Alert! Robot experimenting vibrations.';
        } else {
            stabilityAlarm.style.color = 'green';
            stabilityAlarm.innerHTML = 'No alarm';
        }
    });

    goalStatus2.subscribe(function(message) {
        if (message.data === 'SUCCEEDED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'green';
            completeText.innerHTML = 'Goal completed';
        }

        if (message.data === 'CANCELLED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'red';
            completeText.innerHTML = 'Goal cancelled';
        }
    });

}



function showRobot3() {

    scanTopic.unsubscribe();
    scanTopic1.unsubscribe();
    scanTopic3.unsubscribe();
    robotPoseTopic.unsubscribe();
    robotPoseTopic1.unsubscribe();
    robotPoseTopic3.unsubscribe();
    goalStatus1.unsubscribe();
    goalStatus2.unsubscribe();
    goalStatus4.unsubscribe();

    selectTopic('/amr_2/cmd_vel');

    const videoContainer = document.getElementById('camera-container');
    const videoTopic = '/amr_2/camera/image_raw';
    const videoURL = `http://192.168.100.18:8082/stream?topic=${videoTopic}`;

    videoContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = videoURL;
    img.style.width = '669px';
    img.style.height = '402px';
    videoContainer.appendChild(img);

    let rollText = document.getElementById('roll-text');
    let pitchText = document.getElementById('pitch-text');
    let yawText = document.getElementById('yaw-text');

    let textAlarm = document.getElementById('proximity-alarm-text');

    scanTopic2.subscribe(function(message) {

        // Lista de rangos del escaneo láser
        const scan = message.ranges;
    
        // Eliminación de valores nulos
        const scanList = scan.filter(element => element !== null);

        // Alarma de proximidad
        if (Math.min(...scanList)-0.08 < 0.2) {
            const distance_obs = Math.min(...scanList)-0.08;
            textAlarm.style.color = 'red';
            textAlarm.innerHTML = `Alert! obstacle approaching at ${distance_obs.toFixed(2)} m.`;
        } else {
            textAlarm.style.color = 'green';
            textAlarm.innerHTML = 'No alarm';
        }    
    });

    let lineal_x_value = document.getElementById("linear-velocity-text");
    let angular_z_value = document.getElementById("angular-velocity-text");

    

    let linear_x = 0.00;
    let angular_z = 0.00;

    let linear_x_odom = 0.00;
    let angular_z_odom = 0.00;

    let twist = new ROSLIB.Message({
        linear: {
            x: linear_x,
            y: 0.0,
            z: 0.0
        },
        angular: {
            x: 0.0,
            y: 0.0,
            z: angular_z
        }
    });

    const stopButton = document.getElementById("stop-button");

    stopButton.addEventListener("click", event => {
        linear_x = 0.00;
        angular_z = 0.00;
        twist.linear.x = linear_x;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedXPlusButton = document.getElementById("forward-button");

    speedXPlusButton.addEventListener("click", event => {
        linear_x = linear_x + 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedXMinusButton = document.getElementById("backward-button");

    speedXMinusButton.addEventListener("click", event => {
        linear_x = linear_x - 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedZPlusButton = document.getElementById("clock-button");

    speedZPlusButton.addEventListener("click", event => {
        angular_z = angular_z + 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedZMinusButton = document.getElementById("anticlock-button");

    speedZMinusButton.addEventListener("click", event => {
        angular_z = angular_z - 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    robotPoseTopic2.subscribe(function(message) {
        linear_x_odom = message.twist.twist.linear.x;
        angular_z_odom = message.twist.twist.angular.z;
        lineal_x_value.innerHTML = `${linear_x_odom.toFixed(2)} m/s`;
        if (Math.abs(linear_x_odom.toFixed(2)) === 0.00) {
            lineal_x_value.innerHTML = '0.00 m/s';
        }
        if (Math.abs(linear_x_odom.toFixed(2)) > 0.00) {
            lineal_x_value.innerHTML = ` ${linear_x_odom.toFixed(2)} m/s`;
        }
        angular_z_value.innerHTML = `${angular_z_odom.toFixed(2)} rad/s`;
        if (Math.abs(angular_z_odom.toFixed(2)) === 0.00) {
            angular_z_value.innerHTML = '0.00 rad/s';
        }
        if (Math.abs(angular_z_odom.toFixed(2)) > 0.00) {
            angular_z_value.innerHTML = ` ${angular_z_odom.toFixed(2)} rad/s`;
        }

        const quaternion = new ROSLIB.Quaternion(message.pose.pose.orientation);
    
        const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
        const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
        const roll = Math.atan2(sinr_cosp, cosr_cosp);
    
        const sinp = Math.sqrt(1 + 2 * (quaternion.w * quaternion.y - quaternion.x * quaternion.z));
        const cosp = Math.sqrt(1 - 2 * (quaternion.w * quaternion.y + quaternion.x * quaternion.z));
        const pitch = (2* Math.atan2(sinp, cosp)) - Math.PI/2;
    
        const siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
        const cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
        const yaw = Math.atan2(siny_cosp, cosy_cosp);
    
        const rollDeg = roll * 180 / Math.PI;
        const pitchDeg = pitch * 180 / Math.PI;
        const yawDeg = yaw * 180 / Math.PI;
    
    
    
        rollText.innerHTML = `${rollDeg.toFixed(2)} °`;
        if (Math.abs(rollDeg.toFixed(2)) === 0.00) {
            rollText.innerHTML = '0.00 °';
        }

        pitchText.innerHTML = `${pitchDeg.toFixed(2)} °`;
        if (Math.abs(pitchDeg.toFixed(2)) === 0.00) {
            pitchText.innerHTML = '0.00 °';
        }

        yawText.innerHTML = `${yawDeg.toFixed(2)} °`;
        if (Math.abs(yawDeg.toFixed(2)) === 0.00) {
            yawText.innerHTML = '0.00 °';
        }
    
        const stabilityAlarm = document.getElementById('stability-alarm-text');
        if (Math.abs(roll) > 0.01 || Math.abs(pitch) > 0.01) {
            stabilityAlarm.style.color = 'red';
            stabilityAlarm.innerHTML = 'Alert! Robot experimenting vibrations.';
        } else {
            stabilityAlarm.style.color = 'green';
            stabilityAlarm.innerHTML = 'No alarm';
        }
    });

    goalStatus3.subscribe(function(message) {
        if (message.data === 'SUCCEEDED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'green';
            completeText.innerHTML = 'Goal completed';
        }

        if (message.data === 'CANCELLED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'red';
            completeText.innerHTML = 'Goal cancelled';
        }
    });

    
} 



function showRobot4() {

    scanTopic.unsubscribe();
    scanTopic1.unsubscribe();
    scanTopic2.unsubscribe();
    robotPoseTopic.unsubscribe();
    robotPoseTopic1.unsubscribe();
    robotPoseTopic2.unsubscribe();
    goalStatus1.unsubscribe();
    goalStatus2.unsubscribe();
    goalStatus3.unsubscribe();

    selectTopic('/amr_3/cmd_vel');

    const videoContainer = document.getElementById('camera-container');
    const videoTopic = '/amr_3/camera/image_raw';
    const videoURL = `http://192.168.100.18:8083/stream?topic=${videoTopic}`;

    videoContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = videoURL;
    img.style.width = '669px';
    img.style.height = '402px';
    videoContainer.appendChild(img);

    let rollText = document.getElementById('roll-text');
    let pitchText = document.getElementById('pitch-text');
    let yawText = document.getElementById('yaw-text');

    let textAlarm = document.getElementById('proximity-alarm-text');

    

    scanTopic3.subscribe(function(message) {

        // Lista de rangos del escaneo láser
        const scan = message.ranges;
    
        // Eliminación de valores nulos
        const scanList = scan.filter(element => element !== null);
    
        // Alarma de proximidad
        if (Math.min(...scanList)-0.08 < 0.2) {
            const distance_obs = Math.min(...scanList)-0.08;
            textAlarm.style.color = 'red';
            textAlarm.innerHTML = `Alert! obstacle approaching at ${distance_obs.toFixed(2)} m.`;
        } else {
            textAlarm.style.color = 'green';
            textAlarm.innerHTML = 'No alarm';
        }    
    });

    let lineal_x_value = document.getElementById("linear-velocity-text");
    let angular_z_value = document.getElementById("angular-velocity-text");

    

    let linear_x = 0.00;
    let angular_z = 0.00;

    let linear_x_odom = 0.00;
    let angular_z_odom = 0.00;

    let twist = new ROSLIB.Message({
        linear: {
            x: linear_x,
            y: 0.0,
            z: 0.0
        },
        angular: {
            x: 0.0,
            y: 0.0,
            z: angular_z
        }
    });

    const stopButton = document.getElementById("stop-button");

    stopButton.addEventListener("click", event => {
        linear_x = 0.00;
        angular_z = 0.00;
        twist.linear.x = linear_x;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedXPlusButton = document.getElementById("forward-button");

    speedXPlusButton.addEventListener("click", event => {
        linear_x = linear_x + 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedXMinusButton = document.getElementById("backward-button");

    speedXMinusButton.addEventListener("click", event => {
        linear_x = linear_x - 0.05;
        twist.linear.x = linear_x;
        activeTopic.publisher.publish(twist);
    });

    const speedZPlusButton = document.getElementById("clock-button");

    speedZPlusButton.addEventListener("click", event => {
        angular_z = angular_z + 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    const speedZMinusButton = document.getElementById("anticlock-button");

    speedZMinusButton.addEventListener("click", event => {
        angular_z = angular_z - 0.03;
        twist.angular.z = angular_z;
        activeTopic.publisher.publish(twist);
    });

    robotPoseTopic3.subscribe(function(message) {
        linear_x_odom = message.twist.twist.linear.x;
        angular_z_odom = message.twist.twist.angular.z;
        lineal_x_value.innerHTML = `${linear_x_odom.toFixed(2)} m/s`;
        if (Math.abs(linear_x_odom.toFixed(2)) === 0.00) {
            lineal_x_value.innerHTML = '0.00 m/s';
        }
        if (Math.abs(linear_x_odom.toFixed(2)) > 0.00) {
            lineal_x_value.innerHTML = ` ${linear_x_odom.toFixed(2)} m/s`;
        }
        angular_z_value.innerHTML = `${angular_z_odom.toFixed(2)} rad/s`;
        if (Math.abs(angular_z_odom.toFixed(2)) === 0.00) {
            angular_z_value.innerHTML = '0.00 rad/s';
        }
        if (Math.abs(angular_z_odom.toFixed(2)) > 0.00) {
            angular_z_value.innerHTML = ` ${angular_z_odom.toFixed(2)} rad/s`;
        }

        const quaternion = new ROSLIB.Quaternion(message.pose.pose.orientation);
    
        const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
        const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
        const roll = Math.atan2(sinr_cosp, cosr_cosp);
    
        const sinp = Math.sqrt(1 + 2 * (quaternion.w * quaternion.y - quaternion.x * quaternion.z));
        const cosp = Math.sqrt(1 - 2 * (quaternion.w * quaternion.y + quaternion.x * quaternion.z));
        const pitch = (2* Math.atan2(sinp, cosp)) - Math.PI/2;
    
        const siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
        const cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
        const yaw = Math.atan2(siny_cosp, cosy_cosp);
    
        const rollDeg = roll * 180 / Math.PI;
        const pitchDeg = pitch * 180 / Math.PI;
        const yawDeg = yaw * 180 / Math.PI;
    
    
    
        rollText.innerHTML = `${rollDeg.toFixed(2)} °`;
        if (Math.abs(rollDeg.toFixed(2)) === 0.00) {
            rollText.innerHTML = '0.00 °';
        }

        pitchText.innerHTML = `${pitchDeg.toFixed(2)} °`;
        if (Math.abs(pitchDeg.toFixed(2)) === 0.00) {
            pitchText.innerHTML = '0.00 °';
        }

        yawText.innerHTML = `${yawDeg.toFixed(2)} °`;
        if (Math.abs(yawDeg.toFixed(2)) === 0.00) {
            yawText.innerHTML = '0.00 °';
        }
    
        const stabilityAlarm = document.getElementById('stability-alarm-text');
        if (Math.abs(roll) > 0.01 || Math.abs(pitch) > 0.01) {
            stabilityAlarm.style.color = 'red';
            stabilityAlarm.innerHTML = 'Alert! Robot experimenting vibrations.';
        } else {
            stabilityAlarm.style.color = 'green';
            stabilityAlarm.innerHTML = 'No alarm';
        }
    });

    goalStatus4.subscribe(function(message) {
        if (message.data === 'SUCCEEDED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'green';
            completeText.innerHTML = 'Goal completed';
        }

        if (message.data === 'CANCELLED') {
            const completeText = document.getElementById('goal-text');
            completeText.style.color = 'red';
            completeText.innerHTML = 'Goal cancelled';
        }
    });
}




// -- MAP SECTION --


let mapData = null;
const canvas = document.getElementById('mapCanvas');


const canvas_label = document.getElementById('labelCanvas');
const ctx = canvas_label.getContext('2d');

const canvas_goal = document.getElementById("goal-point-canvas");
const ctx_goal = canvas_goal.getContext('2d');

const legend = document.getElementById('legend');
legend.style.position = 'absolute';
legend.style.top = '-125px';
legend.style.left = '500px';


const resetButton = document.getElementById('reset-button');
resetButton.style.position = 'absolute';
resetButton.style.top = '350px';
resetButton.style.left = '868px';


canvas_goal.style.position = 'absolute';
canvas_goal.style.top = '50px';
canvas_goal.style.left = '50px';


const originalWidth = 778;
const originalHeight = 395;

// Factor de escala para reducir el tamaño del mapa
const scaleFactor = 1.0;

// Dimensiones del mapa escalado
const width = Math.floor(originalWidth * scaleFactor);
const height = Math.floor(originalHeight * scaleFactor);

canvas_label.width = width;
canvas_label.height = height;


canvas_goal.width = width;
canvas_goal.height = height;


const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

const gridColor = '#000000';
const axisColor = '#333';

let xMin = -9.10;
let xMax = 29.79;
let yMin = -9.41;
let yMax = 10.34;

const xTicks = 6;
const yTicks = 6;


function xScale(x) {
    return margin.left + (x - xMin) / (xMax - xMin) * plotWidth;
}

function yScale(y) {
    return margin.top + plotHeight - (y - yMin) / (yMax - yMin) * plotHeight;
}

function drawGridOnlyPlot() {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw plot background
    //ctx.fillStyle = 'white';
    //ctx.fillRect(margin.left, margin.top, plotWidth, plotHeight);

    // Draw border
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(margin.left, margin.top, plotWidth, plotHeight);

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.75;

    // X grid lines
    for (let i = 0; i <= xTicks; i++) {
        const x = xMin + (i / xTicks) * (xMax - xMin);
        const canvasX = xScale(x);

        ctx.beginPath();
        ctx.moveTo(canvasX, margin.top);
        ctx.lineTo(canvasX, margin.top + plotHeight);
        ctx.stroke();
    }

    // Y grid lines
    for (let i = 0; i <= yTicks; i++) {
        const y = yMin + (i / yTicks) * (yMax - yMin);
        const canvasY = yScale(y);

        ctx.beginPath();
        ctx.moveTo(margin.left, canvasY);
        ctx.lineTo(margin.left + plotWidth, canvasY);
        ctx.stroke();
    }
}

function setAxisRanges(newXMin, newXMax, newYMin, newYMax) {
    xMin = newXMin;
    xMax = newXMax;
    yMin = newYMin;
    yMax = newYMax;
    drawGridOnlyPlot(); // Redraw with new ranges
}

setAxisRanges(0, 10, -1, 1);
drawGridOnlyPlot();


mapTopic.subscribe(function(message) {

    const resolution = 0.05;
    const origin = [-9.100560, -9.409646, 0];
    const x0 = origin[0];
    const y0 = origin[1];

    // Identificación del canvas
    
    const ctx3 = document.getElementById('mapCanvas').getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = '50px';
    canvas.style.left = '50px';

    // Dimensiones originales del mapa
    const originalWidth = message.info.width;
    const originalHeight = message.info.height;

    // Factor de escala para reducir el tamaño del mapa
    const scaleFactor = 1;

    // Dimensiones del mapa escalado
    const width = Math.floor(originalWidth * scaleFactor);
    const height = Math.floor(originalHeight * scaleFactor);


    // Actualización del tamaño del canvas
    canvas.width = width;
    canvas.height = height;

    // Visualización del mapa en el canvas
    const imageData = ctx3.createImageData(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const origX = Math.floor(x / scaleFactor);
            const origY = Math.floor((height - 1 - y) / scaleFactor);
            const i = origY * originalWidth + origX;
            const value = message.data[i];
            const color = value === -1 ? 205 : 255 - value * 255 / 100;
            const index = 4 * (y * width + x);
            imageData.data[index + 0] = color;
            imageData.data[index + 1] = color;
            imageData.data[index + 2] = color;
            imageData.data[index + 3] = 255;
        }
    }

    mapData = imageData;
    //ctx3.putImageData(imageData, 0, 0);

    // Retrieve stored paths from localStorage or initialize empty paths
    let robotPaths = {
        robot0: [],
        robot1: [],
        robot2: [],
        robot3: []
    };


    // Function to draw the path of a robot
    function drawRobotPath(ctx, path, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        path.forEach((position, index) => {
            if (index === 0) {
                ctx.moveTo(position.x, position.y);
            } else {
                ctx.lineTo(position.x, position.y);
            }
        });
        ctx.stroke();
    }
    
    robotPoseMapTopic.subscribe(function(message) {
        ctx3.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the map (you may need to store the map image data and redraw it here)
        ctx3.putImageData(mapData, 0, 0);
        const x = message.pose.pose.position.x;
        const y = message.pose.pose.position.y;


        //const x_fixed = (parseFloat(x) + 2).toFixed(2);
        //const y_fixed = (parseFloat(y) + 0.5).toFixed(2);



        const px = scaleFactor*((x/resolution) + 182.0112);
        const py = scaleFactor*((y/resolution) + 188.19292);

        const px1 = scaleFactor*((x1/resolution) + 182.0112);
        const py1 = scaleFactor*((y1/resolution) + 188.19292);

        const px2 = scaleFactor*((x2/resolution) + 182.0112);
        const py2 = scaleFactor*((y2/resolution) + 188.19292);

        const px3 = scaleFactor*((x3/resolution) + 182.0112);
        const py3 = scaleFactor*((y3/resolution) + 188.19292);

        // Add the current position to the path
        robotPaths.robot0.push({ x: px, y: canvas.height - py });


        // Draw the path
        drawRobotPath(ctx3, robotPaths.robot0, 'blue');

        // Draw the current position
        ctx3.fillStyle = 'blue';
        ctx3.beginPath();
        ctx3.arc(px, canvas.height - py, 5.0, 0, 2 * Math.PI); // Larger circle for the current position
        ctx3.fill();

        robotPaths.robot1.push({ x: px1, y: canvas.height - py1 });



        drawRobotPath(ctx3, robotPaths.robot1, 'red');

        ctx3.fillStyle = 'red';
        ctx3.beginPath();
        ctx3.arc(px1, canvas.height - py1, 5.0, 0, 2 * Math.PI);
        ctx3.fill();

        robotPaths.robot2.push({ x: px2, y: canvas.height - py2 });


        drawRobotPath(ctx3, robotPaths.robot2, 'green');

        ctx3.fillStyle = 'green';
        ctx3.beginPath();
        ctx3.arc(px2, canvas.height - py2, 5.0, 0, 2 * Math.PI);
        ctx3.fill();

        robotPaths.robot3.push({ x: px3, y: canvas.height - py3 });

        drawRobotPath(ctx3, robotPaths.robot3, 'orange');

        ctx3.fillStyle = 'orange';
        ctx3.beginPath();
        ctx3.arc(px3, canvas.height - py3, 5.0, 0, 2 * Math.PI);
        ctx3.fill();
    });

});


let x1 = 0;
let y1 = 0;

let x2 = 0;
let y2 = 0;

let x3 = 0;
let y3 = 0;

robotPoseMapTopic1.subscribe(function(message) {
    x1 = message.pose.pose.position.x;
    y1 = message.pose.pose.position.y;
});

robotPoseMapTopic2.subscribe(function(message) {
    x2 = message.pose.pose.position.x;
    y2 = message.pose.pose.position.y;
});

robotPoseMapTopic3.subscribe(function(message) {
    x3 = message.pose.pose.position.x;
    y3 = message.pose.pose.position.y;
});

function reset() {
    location.reload();

}

const xInput = document.getElementById('x-value-input');
const yInput = document.getElementById('y-value-input');
const thetaInput = document.getElementById('theta-value-input');

function startGoal() {
    if (robot1.checked) {
        const x = xInput.value;
        const y = yInput.value;
        const theta = thetaInput.value;

        const radians = theta * (Math.PI / 180);

        poseData1_x.publish({
            data: x
        });

        poseData1_y.publish({
            data: y
        });

        poseData1_yaw.publish({
            data: radians.toString()
        });

        const completeText = document.getElementById('goal-text');
        completeText.style.color = 'blue';
        completeText.innerHTML = 'Goal sent';

        navTrigger1.publish({
            data: true
        });
        
        const px = scaleFactor*((parseFloat(x)/0.05) + 182.0112);
        const py = scaleFactor*((parseFloat(y)/0.05) + 188.19292);
        const radius = 4.5;

        ctx_goal.clearRect(0, 0, canvas_goal.width, canvas_goal.height);
        ctx_goal.fillStyle = 'yellow';
        ctx_goal.beginPath();
        ctx_goal.arc(px, canvas_goal.height - py, radius, 0, 2*Math.PI);
        ctx_goal.fill();
    }

    if (robot2.checked) {
        const x = xInput.value;
        const y = yInput.value;
        const theta = thetaInput.value;

        const radians = theta * (Math.PI / 180);

        poseData2_x.publish({
            data: x
        });

        poseData2_y.publish({
            data: y
        });

        poseData2_yaw.publish({
            data: radians.toString()
        });

        const completeText = document.getElementById('goal-text');
        completeText.style.color = 'blue';
        completeText.innerHTML = 'Goal sent';

        navTrigger2.publish({
            data: true
        });
        
        const px = scaleFactor*((parseFloat(x)/0.05) + 182.0112);
        const py = scaleFactor*((parseFloat(y)/0.05) + 188.19292);
        const radius = 4.5;

        ctx_goal.clearRect(0, 0, canvas_goal.width, canvas_goal.height);
        ctx_goal.fillStyle = 'yellow';
        ctx_goal.beginPath();
        ctx_goal.arc(px, canvas_goal.height - py, radius, 0, 2*Math.PI);
        ctx_goal.fill();
    }

    if (robot3.checked) {
        const x = xInput.value;
        const y = yInput.value;
        const theta = thetaInput.value;

        const radians = theta * (Math.PI / 180);

        poseData3_x.publish({
            data: x
        });

        poseData3_y.publish({
            data: y
        });

        poseData3_yaw.publish({
            data: radians.toString()
        });

        const completeText = document.getElementById('goal-text');
        completeText.style.color = 'blue';
        completeText.innerHTML = 'Goal sent';

        navTrigger3.publish({
            data: true
        });
        
        const px = scaleFactor*((parseFloat(x)/0.05) + 182.0112);
        const py = scaleFactor*((parseFloat(y)/0.05) + 188.19292);
        const radius = 4.5;

        ctx_goal.clearRect(0, 0, canvas_goal.width, canvas_goal.height);
        ctx_goal.fillStyle = 'yellow';
        ctx_goal.beginPath();
        ctx_goal.arc(px, canvas_goal.height - py, radius, 0, 2*Math.PI);
        ctx_goal.fill();
    }

    if (robot4.checked) {
        const x = xInput.value;
        const y = yInput.value;
        const theta = thetaInput.value;

        const radians = theta * (Math.PI / 180);

        poseData4_x.publish({
            data: x
        });

        poseData4_y.publish({
            data: y
        });

        poseData4_yaw.publish({
            data: radians.toString()
        });

        const completeText = document.getElementById('goal-text');
        completeText.style.color = 'blue';
        completeText.innerHTML = 'Goal sent';

        navTrigger4.publish({
            data: true
        });
        
        const px = scaleFactor*((parseFloat(x)/0.05) + 182.0112);
        const py = scaleFactor*((parseFloat(y)/0.05) + 188.19292);
        const radius = 4.5;

        ctx_goal.clearRect(0, 0, canvas_goal.width, canvas_goal.height);
        ctx_goal.fillStyle = 'yellow';
        ctx_goal.beginPath();
        ctx_goal.arc(px, canvas_goal.height - py, radius, 0, 2*Math.PI);
        ctx_goal.fill();
    }
}

function cancelGoal() {
    if (robot1.checked) {
    	const completeText = document.getElementById('goal-text');
    	completeText.style.color = 'red';
        completeText.innerHTML = 'Goal cancelled';

        var request = new ROSLIB.ServiceRequest({
            goal_info: {
                goal_id: {
                    uuid: Array(16).fill(0)
                },
                stamp: {
                    sec: 0,
                    nanosec: 0
                }
            }
        });
        
        cancelClient1.callService(request, function(result) {
            console.log('Cancel response: ', result);
        });
    }

    if (robot2.checked) {
    	const completeText = document.getElementById('goal-text');
    	completeText.style.color = 'red';
        completeText.innerHTML = 'Goal cancelled';
        
        var request = new ROSLIB.ServiceRequest({
            goal_info: {
                goal_id: {
                    uuid: Array(16).fill(0)
                },
                stamp: {
                    sec: 0,
                    nanosec: 0
                }
            }
        });
        
        cancelClient2.callService(request, function(result) {
            console.log('Cancel response: ', result);
        });
    }

    if (robot3.checked) {
    	const completeText = document.getElementById('goal-text');
        completeText.style.color = 'red';
        completeText.innerHTML = 'Goal cancelled';
        
        var request = new ROSLIB.ServiceRequest({
            goal_info: {
                goal_id: {
                    uuid: Array(16).fill(0)
                },
                stamp: {
                    sec: 0,
                    nanosec: 0
                }
            }
        });
        
        cancelClient3.callService(request, function(result) {
            console.log('Cancel response: ', result);
        });
    }

    if (robot4.checked) {
    	const completeText = document.getElementById('goal-text');
    	completeText.style.color = 'red';
        completeText.innerHTML = 'Goal cancelled';
        
        var request = new ROSLIB.ServiceRequest({
            goal_info: {
                goal_id: {
                    uuid: Array(16).fill(0)
                },
                stamp: {
                    sec: 0,
                    nanosec: 0
                }
            }
        });
        
        cancelClient4.callService(request, function(result) {
            console.log('Cancel response: ', result);
        });
    }
}

/*

var getTopics = new ROSLIB.Service({
    ros: ros,
    name: '/rosapi/topics',
    serviceType: 'rosapi_msgs/srv/Topics'
});

getTopics.callService({}, function(result) {
    topics = result.topics;
    for (let i = 0; i < topics.length; i++) {
        console.log(topics[i]);
    }
});
*/
