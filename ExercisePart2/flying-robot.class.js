import { Robot } from "./robot.class.js";

export class FlyingRobot extends Robot {
    #altitude;

    constructor(model, battery, altitude) {
        super(model, battery);
        this.#altitude = altitude;
    }

    getAltitude() {
        return this.#altitude;
    }

    fly() {
        if (this.battery >= 50) {
            console.log(`Flying ${this.model} to ${this.#altitude} meters`);
            this.battery -= 50;
        } else {
            console.log(`${this.model} does not have enough battery to fly.`);
        }
    }

    toString() {
        return `Robot Type: FlyingRobot, Model: ${this.model}, Battery: ${this.battery}%, Altitude: ${this.#altitude} meters`;
    }
}