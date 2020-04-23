var ultrassonicA = document.getElementById('ultrassonicA')
var ultrassonicB = document.getElementById('ultrassonicB')

socket.on('ultrassonic', function (data) {
	if(data.ultrassonic == 'A') {
		ultrassonicA.innerText = "Ultrassonic A --- " + data.distance.toFixed(2) + "cm"
	} else {
		ultrassonicB.innerText = "Ultrassonic B --- " + data.distance.toFixed(2) + "cm"
	}
})
