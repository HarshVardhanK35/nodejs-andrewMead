const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar_template').innerHTML

// Options - Query String
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoScroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

  // Visible height
  const visibleHeight = $messages.offsetHeight

  // Height of messages container
  const containerHeight = $messages.scrollHeight

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight

  if (containerHeight - newMessageHeight <= scrollOffset + 1) {
    $messages.scrollTop = $messages.scrollHeight
  }
}

socket.on('message', (data) => {
  // console.log(data)

  const html = Mustache.render(messageTemplate, {
    username: data.username,
    message: data.text,
    createdAt: moment(data.createdAt).format('h:mm a')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoScroll()
})

socket.on('location', (data) => {
  // console.log(data)

  const html = Mustache.render(locationTemplate, {
    username: data.username,
    locationURL: data.url,
    createdAt: moment(data.createdAt).format('h:mm a')
  })
  $messages.insertAdjacentHTML('beforeend', html)

  autoScroll()
})

socket.on("roomData", (data) => {

  const html = Mustache.render(sidebarTemplate, {
    room: data.room,
    users: data.users
  })
  $sidebar.innerHTML = html
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
    }, 
    () => {
      // enable the send-location button again
      $sendLocationButton.removeAttribute('disabled')
      console.log("location shared!")
    })
  })
})

socket.emit('join', { username, room }, (err) => {
  if (err) {
    alert(err)
    location.href = '/'
  }
});