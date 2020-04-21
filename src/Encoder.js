const Gpio = require('pigpio').Gpio

// Considerando um Encoder de 10 cm com 12 furos
// Roda com 15 cm de diametro
const DISTANCE = 3.927

class Encoder {
    constructor(io, motor, pin) {
        this.motor = motor
        this.pin = pin
        this.cont = 0
        this.distance = 0
        this.gpio = new Gpio(this.pin, {
            mode: Gpio.INPUT,
            edge: Gpio.FALLING_EDGE
        })

        this.gpio.on('interrupt', () => {
            this.cont++
            this.setDistance();
            console.log(this.cont)
            io.emit('encoder', { 
                    type: this.motor,
                    encoder: {
                        distance: this.getDistance(),
                        cont: this.getCont()
                    }
                })
        })
    }

    setDistance() {
        this.distance = DISTANCE * (this.cont / 2)
    }

    getDistance() {
        return this.distance
    }

    getCont() {
        return (this.cont / 2)
    }

}

module.exports = (io, motor, pin) => new Encoder(io, motor, pin)
