# IoT Firefighter Mission Tracking System

* AWS serverless dashboard web application
* Raspberry Pi implementation as team hub IoT device for team member on-body BLE sensors
* Can be easily deployed as AWS CloudFormation stacks using [Serverless Framework](https://serverless.com/)

This project provides a solution to allow real time monitoring of firefighter team status and location as well as visualization of data from team member's on-body sensor.

## Resources and Implementation Overview
Overview of how resources are used to implementation the different components of the project.

* Hardware: Ti CC2650 SensorTags, Raspberry Pi 3
* Web frameworks: Serverless Framework, Express.js
* AWS (Amazon Web Services): IoT Core, Lambda, DynamoDB, API Gateway, CloudFormation

####  On-body Sensor <= Ti SensorTag

As a proof of concept, [Ti CC2650STK SensorTag](http://www.ti.com/tool/CC2650STK)s are used in this project as an on-body BLE (Bluetooth Low Energy) sensors for firefighter team members. Ambient temperature, humidity, air pressure and motion data from the SensorTag are used in this project. 

* Note that the SensorTag used is a stand in device for specialized equipment. SensorTag cannot provide other vital information in real life firefighting situations and is not designed to be used in extreme environments. As a result, some of the data in this project are simulated.

#### Hub/Gateway IoT<= Raspberry Pi 3

Raspberry Pi 3 is used as a team hub and act as a gateway to send data from BLE on-body sensors to the cloud. It also allows for the team's location and status signals to be sent to the cloud.

The Python scripts developed in this project connects the Raspberry Pi to CC2650 SensorTags, gets data every second, and publish it to AWS IoT core through an MQTT topic. It also provides asynchronous Bluetooth connection capability to the automatically and dynamically connect and re-connect to the BLE devices. 

(GPS and Zigbee can be implemented with the appropriate hardware addons and modification to the project.)

* The code to run on the Raspberry Pi is located in the [_linux\_iot_/](linux\_iot) directory.

####  AWS Setup and Deployment <= Serverless Framework, AWS CloudFormation

[Serverless Framework](https://serverless.com/) was used to deploy the serverless web application in this project. Additional CloudFormation template codes are added to the serverless application definition to allow setup for all other AWS resources needed for this project such as DynamoDB and S3 bucket. The resources are defined in the _serverles.yml_ files.

#### Data Processing and Storage <= AWS IoT core, AWS Lambda, AWS DynamoDB

AWS IoT core is used to receive the data send by the Raspberry Pi Team Hub. The data is redirected to an AWS Lambda function, which will parse the data and store it in DynamoDB. 

* The AWS Lambda function code used to parse the data is located in the directory [_aws/data-process_/](aws/data-process).


####  Webapp Backend <= AWS Lambda, Express.js, AWS API Gateway 

Due to the dynamic nature of the website, Express.js is used as the web framework for the tracker dashboard web application, with AWS API Gateway providing a public endpoint for accessing the website. Google Maps API and amCharts are used in the web application to visualize the data. 

Apart from HTML pages, REST APIs are also built using Express to support real-time data update through AJAX calls.

* The code to the dashboard web application is located in the directory [_aws/web_](aws/web) .


#### Static Assets Hosting <= AWS S3

An AWS S3 bucket is used to host all the static elements for the web application including image, frontend JavaScript, and CSS files. Since only the HTML web pages are served to the client through AWS API Gateway, the static web assets are obtained by the client browser separately through the bucket's publicly accessible endpoint. 

(AWS CloudFront can be used to setup a content delivering network for the bucket.)



  
# Setup and deploy
(To be completed)

#### AWS IoT core

#### Raspberry Pi 

#### AWS Lambda and DynamoDB (to parse and save data) 

#### Serverless dashboard web application
