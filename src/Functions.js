const io = require('../index')

module.exports = {
    sendDistanceUltrassonicToSocket(distance, ultrassonic) {
        io.emit('ultrassonic', {
            distance,
            ultrassonic
        })
    }
}