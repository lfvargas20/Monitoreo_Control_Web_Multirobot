from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'amr'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, 'param'), glob('param/*.yaml')),
        (os.path.join('share', package_name, 'urdf'), glob('urdf/*.urdf')),
        (os.path.join('share', package_name, 'launch'), glob('models/*')),
        (os.path.join('share', package_name, 'worlds'), glob('worlds/*.world')),
        (os.path.join('share', package_name, 'map'), glob('map/*')),
        (os.path.join('share', package_name, 'models'), glob('models/*.dae*'))
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='lfvargas',
    maintainer_email='lfvargas@espol.edu.ec',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            "node_trigger_goal_1 = amr.node_trigger_goal_1:main",
            "node_trigger_goal_2 = amr.node_trigger_goal_2:main",
            "node_trigger_goal_3 = amr.node_trigger_goal_3:main",
            "node_trigger_goal_4 = amr.node_trigger_goal_4:main",
            "node_trigger_goal_tb3_1 = amr.node_trigger_goal_tb3_1:main",
            "node_trigger_goal_tb3_2 = amr.node_trigger_goal_tb3_2:main",
            "node_trigger_goal_tb3_3 = amr.node_trigger_goal_tb3_3:main",
            "node_trigger_goal_tb3_4 = amr.node_trigger_goal_tb3_4:main",
        ],
    },
)
