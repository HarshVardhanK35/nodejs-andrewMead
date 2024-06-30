const socket = io()

socket.on('message', (data) => {
  console.log(data)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const message = e.target.elements.message.value
  socket.emit('sendMessage', message)
})

// code to access user's location
document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geo Location is not supported by your browser!')
  }

  // fetch location
  navigator.geolocation.getCurrentPosition((position) => {

    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    
  })
})