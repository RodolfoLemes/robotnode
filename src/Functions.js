module.exports = {
    sendDistanceUltrassonicToSocket(io, distance, ultrassonic) {
        io.emit('ultrassonic', {
            distance,
            ultrassonic
        })
    }
}