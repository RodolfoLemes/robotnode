module.exports = {
    async sendDistanceUltrassonicToSocket(io, ultrassonic, name) {
        let distance = await ultrassonic.getMeasure()
        console.log(distance)
        io.emit('ultrassonic', {
            distance,
            ultrassonic: name
        })
    }
}
