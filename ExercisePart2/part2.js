import {MobileRobot} from "./mobile-robot.class.js";
import {FlyingRobot} from "./flying-robot.class.js";
import { Robot } from "./robot.class.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { arrayBuffer } from "node:stream/consumers";
const r1 = readline.createInterface({ input, output });

let array_robots = [];
array_robots = [
    new MobileRobot("MobileBot1", 10),
    new MobileRobot("MobileBot2", 15),
    new MobileRobot("MobileBot3", 20),
    new FlyingRobot("FlyingBot1", 100),
    new FlyingRobot("FlyingBot2", 200),
    new FlyingRobot("FlyingBot3", 300),
    new Robot("BasicBot1"),
    new Robot("BasicBot2")
];

let resp;

do {
    console.log(`
        MENU
        --------------------------------
        [1] Show Mobile robots
        [2] Show Flying robots
        [3] Create a robot
        [4] Move robots
        [5] Fly robots
        [6] Show robot info
        [0] Exit
    `);
    console.log("Select an option from the menu:");
    resp = await r1.question("Enter your choice: ");
    switch(resp) {
        case "1": 
            console.log("Showing all mobile robots:");
            array_robots.forEach(robot => {
                if (robot instanceof MobileRobot) {
                    console.log(robot.toString());
                }
            });
            break;
        case "2":
            console.log("Showing all flying robots:");
            array_robots.forEach(robot => {
                if (robot instanceof FlyingRobot) {
                    console.log(robot.toString());
                }
            });
            break;
        case "3":
            let type = await r1.question("Enter the type of robot (mobile/flying/robot): ");
            let model = await r1.question("Enter the model name of the robot: ");
            if (type.toLowerCase() === "mobile") {
                let speed = await r1.question("Enter the speed of the mobile robot: ");
                array_robots.push(new MobileRobot(model, speed));
                console.log("New mobile robot created.");
            } else if(type.toLowerCase() === "flying"){
                let altitude = await r1.question("Enter the altitude of the flying robot: ");
                array_robots.push(new FlyingRobot(model, altitude));
                console.log("New flying robot created.");
            } else if(type.toLowerCase() === "robot"){
                array_robots.push(new Robot(model));
                console.log("New normal robot.");
            } else {
                console.log("Invalid robot type entered.");
            }
            break;
        case "4":
            console.log("Moving all robots:");
            array_robots.forEach(robot => {
                robot.move?.();
            });
            break;
        case "5":
            console.log("Flying all flying robots:");
            array_robots.forEach(robot => {
                robot.fly?.();
            });
            break;
        case "6":
            let position = await r1.question("Enter the position of the robot in the array: ");
            console.log(array_robots[position]?.toString() ?? `No robot found at position ${position}.`);
            break;
        case "0":
            console.log("Exiting the program. Goodbye!");
            break;
        default:
            console.log("Invalid option. Please try again.");
    }
}while(resp != "0");


r1.close();