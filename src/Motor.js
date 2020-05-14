var Gpio = require('pigpio').Gpio

var motorA = [ // Motor da DIREITA
    new Gpio(4, {mode: Gpio.OUTPUT}), // d7 e d8
    new Gpio(27, {mode: Gpio.OUTPUT})
]
var motorB = [ // Motor da ESQUERDA
    new Gpio(23, {mode: Gpio.OUTPUT}), // d4 e d9
    new Gpio(24, {mode: Gpio.OUTPUT})
]
var pwmPin = [ // d5 e d6
    new Gpio(12, {mode: Gpio.OUTPUT}), // DIREITA
    new Gpio(13, {mode: Gpio.OUTPUT})  // ESQUERDA
]

module.exports = {
    pwmValueForward = 122, // Calibra a ida para frente do motor B, pois ele da Ré na função Forward
    pwmValueBackward = 122,// Calibra a ida para trás do motor A, pois ele da Ré na função Backward

    regularPWM(motor, pwm) {
        if(motor == 'A') {
            pwmPin[0].pwmWrite(pwm)
        } else {
            pwmPin[1].pwmWrite(pwm)
        }
    },

    forward() {
        this.shutdown(false)
        motorA[0].digitalWrite(1)
        motorB[0].digitalWrite(1)
        motorA[1].digitalWrite(0)
        motorB[1].digitalWrite(0)
    },

    backward() {
        this.shutdown(false)
        motorA[0].digitalWrite(0)
        motorB[0].digitalWrite(0)
        motorA[1].digitalWrite(1)
        motorB[1].digitalWrite(1)
    },

    turn(mode) {
        this.shutdown(false)
        if(mode) { // DIREITA
            motorA[0].digitalWrite(0)
            motorB[0].digitalWrite(1)
            motorA[1].digitalWrite(1)
            motorB[1].digitalWrite(0)
        } else { // ESQUERDA
            motorA[0].digitalWrite(1)
            motorB[0].digitalWrite(0)
            motorA[1].digitalWrite(0)
            motorB[1].digitalWrite(1)
        }
    },

    lock() {
        this.shutdown(false)
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
    },

    setInitialPosition(encoderA, encoderB) {
        this.shutdown(true)
        pwmPin[0].pwmWrite(122)
        pwmPin[1].pwmWrite(122)
        encoderA.reset()
        encoderB.reset()

        // Seta motor A
        motorA[0].digitalWrite(1)
        motorA[1].digitalWrite(0)
        while(true) {
            let cont = encoderA.getRealCont()
            if(cont > 1) {
                motorA[0].digitalWrite(0)
                motorA[1].digitalWrite(0)
                break
            }
        }

        // Seta motor B
        motorB[1].digitalWrite(0)
        motorB[0].digitalWrite(1)
        while(true) {
            let cont = encoderB.getRealCont()
            if(cont > 1) {
                motorB[0].digitalWrite(0)
                motorB[1].digitalWrite(0)
                break
            }
        }
    },

    calibrateForward(encoderA, encoderB) {
        let initValue = 122
        pwmPin[0].pwmWrite(122)
        pwmPin[1].pwmWrite(initValue)

        this.setInitialPosition()
        this.forward()

        while(true) {
            let contA = encoderA.getRealCont()
            let contB = encoderB.getRealCont()

            if(contA > 2) {
                if(contA === contB) {
                    break
                } else {
                    pwmPin[1] = pwmWrite(initValue + 1)
                    encoderA.reset()
                    encoderB.reset()
                }
            }
        }
    },


}
