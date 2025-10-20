import { Robot } from "./robot.class.js";

export class MobileRobot extends Robot{
    #speed;

    constructor(model,speed){
        super(model);
        this.#speed = speed;
    }
    getSpeed(){
        return this.#speed
    }
    move(){
        console.log(`Moving ${this.getModel()} at ${this.#speed} km/h`);
        this.setBattery(this.getBattery() - 20);
    }

    toString(){
        return `Model: ${this.getModel()}, Battery: ${this.getBattery()}%, Speed: ${this.#speed} km/h`;
    }
}