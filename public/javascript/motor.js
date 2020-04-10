var up = document.getElementById("up")
var left = document.getElementById("left")
var down = document.getElementById("down")
var right = document.getElementById("right")
var sliderA = document.getElementById('sliderInputA')
var sliderB = document.getElementById('sliderInputB')

document.addEventListener ('keypress', (event) => {
    const keyName = event.key;
    switch(keyName) {
        case 'w':
            socket.emmit('motor', { direction: 'up' })
            break
        case 'a':
            socket.emmit('motor', { direction: 'left' })
            break
        case 's':
            socket.emmit('motor', { direction: 'down' })
            break
        case 'd':
            socket.emmit('motor', { direction: 'right' })
            break
    }
})

up.addEventListener('click', function() {
    socket.emmit('motor', { direction: 'up' })
})    
left.addEventListener('click', function() {
    socket.emmit('motor', { direction: 'left' })
})    
down.addEventListener('click', function() {
    socket.emmit('motor', { direction: 'down' })
})    
right.addEventListener('click', function() {
    socket.emmit('motor', { direction: 'right' })
})
sliderA.addEventListener('change', function() {
    var pwm = parseInt(this.value)
    socket.emmit('pwm', { pwm, motor: 'A' })
})
sliderB.addEventListener('change', function() {
    var pwm = parseInt(this.value)
    socket.emmit('pwm', { pwm, motor: 'B' })
})