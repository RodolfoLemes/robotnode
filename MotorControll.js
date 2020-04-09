var Gpio = require('pigpio').Gpio

var motorA = [ // Motor da DIREITA
    new Gpio(4, {mode: Gpio.OUTPUT}),
    new Gpio(27, {mode: Gpio.OUTPUT})
]
var motorB = [ // Motor da ESQUERDA
    new Gpio(23, {mode: Gpio.OUTPUT}),
    new Gpio(24, {mode: Gpio.OUTPUT})
]
var pwmPin = [
    new Gpio(12, {mode: Gpio.OUTPUT}), // DIREITA
    new Gpio(13, {mode: Gpio.OUTPUT})  // ESQUERDA
]

module.exports = {
    regularPWM(motor, pwm) {
        if(motor == 'A') {
            pwmPin[0].pwmWrite(pwm)
        } else {
            pwmPin[1].pwmWrite(pwm)
        }
    },

    forward() {
        motorA[0].digitalWrite(1)
        motorB[0].digitalWrite(1)
        motorA[1].digitalWrite(0)
        motorB[1].digitalWrite(0)
        this.shutdown(false)
    },

    backward() {
        motorA[0].digitalWrite(0)
        motorB[0].digitalWrite(0)
        motorA[1].digitalWrite(1)
        motorB[1].digitalWrite(1)
        this.shutdown(false)
    },

    turn(mode) {
        if(mode) { // DIREITA
            motorA[0].digitalWrite(0)
            motorB[0].digitalWrite(1)
            motorA[1].digitalWrite(1)
            motorB[1].digitalWrite(0)
            this.shutdown(false)
        } else { // ESQUERDA
            motorA[0].digitalWrite(1)
            motorB[0].digitalWrite(0)
            motorA[1].digitalWrite(0)
            motorB[1].digitalWrite(1)
            this.shutdown(false)
        }
    },

    lock() {
        motorA[0].digitalWrite(1)
        motorB[0].digitalWrite(1)
        motorA[1].digitalWrite(1)
        motorB[1].digitalWrite(1)
    },

    shutdown(mode) {
        if(mode) {
            for(let pin = 0; pin < 2; pin++) {
                motorA[pin].digitalWrite(0)
                motorB[pin].digitalWrite(0)
                pwmPin[pin].pwmWrite(0)
            }
        } else {
            for(let pin = 0; pin < 2; pin++) {
                motorA[pin].digitalWrite(0)
                motorB[pin].digitalWrite(0)
            }
        }
    }
}