var encoderA = document.getElementById('encoderA')
var encoderB = document.getElementById('encoderB')

socket.on('encoder', function(data) {
    console.log(data)
    if(data.type == 'A') {
        encoderA.innerText = "Distancia: " + data.encoder.distance + "---- Cont: " + data.encoder.cont  
    } else {
        encoderB.innerText = "Distancia: " + data.encoder.distance + "---- Cont: " + data.encoder.cont
    }
})
