const Gpio = require('pigpio').Gpio

const MICROSECONDS_PER_CM = 1e6/34321
const SAMPLES = 5

async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}

class Ultrassonic {
    constructor(echoPin, triggerPin) {
        this.trigger = new Gpio(triggerPin, { mode: Gpio.OUTPUT });
        this.echo = new Gpio(echoPin, { mode: Gpio.INPUT, alert: true });

        this.trigger.digitalWrite(0)

        this.measures = []
    }

    init() {
        let startTick;

        echo.on('alert', (level, tick) => {
            if (level == 1) {
                startTick = tick;
            } else {
                const endTick = tick;
                const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
                let measure = diff / 2 / MICROSECONDS_PER_CM
                if(measure > 400) return
                this.measures.push(diff / 2 / MICROSECONDS_PER_CM);
            }
        });
    }

    getMeasure() {
        for(let i = 0; i < SAMPLES; i++) {
            this.trigger.trigger(10, 1)
            await delay(100)
        }

        var averageMeasure = 0
        for(let measure of this.measures) {
            averageMeasure = averageMeasure + measure
        }
        averageMeasure = averageMeasure / this.measures.length

        return averageMeasure
    }
}

module.exports = Ultrassonic