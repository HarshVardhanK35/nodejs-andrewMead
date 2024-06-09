const calculateTip = (bill, tipPercent = 0.2) => {
  const total = bill * tipPercent
  return bill + total;
}

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
  return (temp * 1.8) + 32
}

module.exports = {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit
}