const cityForm = document.querySelector("form");
const searchBox = document.querySelector("input");

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchBox.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = ''


  fetch("http://localhost:3000/weather?city=" + location)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.error) {
        console.log(data)

        messageOne.textContent = data.exactLocation;
        messageTwo.textContent = data.forecast;
      }
      else {
        messageOne.textContent = data.error
      }
    });
});
