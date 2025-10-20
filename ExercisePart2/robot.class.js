class Robot{
    #model;
    #battery;
    
    constructor(model){
        this.#model = model;
        this.#battery = 100; 
    }

    getModel(){
        return this.#model;
    }
    getBattery(){
        return this.#battery;
    }
    setModel(model){
        this.#model = model;
    }
    setBattery(battery){
        if(battery<0 || battery>100){
            console.log("Error, wrong amount of battery");
        }
        else{
            this.#battery = battery;
        }
    }

    charge(){
        this.#battery = 100;
    }
}

export {Robot};
