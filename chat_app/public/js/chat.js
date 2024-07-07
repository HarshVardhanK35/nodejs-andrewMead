const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $location = document.querySelector('#location')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('message', (data) => {
  // console.log(data)
  const html = Mustache.render(messageTemplate, {
    message: data
  })
  $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('location', (url) => {
  console.log(url)
  const html = Mustache.render(locationTemplate, {
    locationURL: url
  })
  $location.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Disable button
  $messageFormButton.setAttribute('disabled', 'disabled')

  const message = e.target.elements.message.value

  socket.emit('sendMessage', message, (error) => {

    // enable the button again
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()

    if(error){
      return console.log(error)
    }
    console.log('Message delivered')
  })
})

// code to access user's location
$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geo Location is not supported by your browser!')
  }

  // disable send-location button
  $sendLocationButton.setAttribute('disabled', 'disabled')

  // fetch location
  navigator.geolocation.getCurrentPosition((position) => {

    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude

    }, () => {
      // enable the send-location button again
      $sendLocationButton.removeAttribute('disabled')

      console.log("location shared!")
    })
  })
})