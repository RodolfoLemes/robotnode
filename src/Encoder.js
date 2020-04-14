const Gpio = require('pigpio').Gpio
const io = require('../index')

// Considerando um Encoder de 10 cm com 12 furos
const DISTANCE = 2.62

class Encoder {
    constructor(motor, pin) {
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
            setDistance(true);
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
        this.distance = DISTANCE * this.cont
    }

    getDistance() {
        return this.distance
    }

    getCont() {
        return this.cont
    }

}

module.exports = Encoder