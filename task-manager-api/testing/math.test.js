const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require("../src/math")

// test('should calculate total with tip', () => {
//   const checkTotal = calculateTip(10, 0.3)
//   expect(checkTotal).toBe(13)
// })

// test('should calculate total with default tip', () => {
//   const checkTotal = calculateTip(10)
//   expect(checkTotal).toBe(12)
// })

test('should calculate celsius from fahrenheit', () => {
  const checkTemp = fahrenheitToCelsius(32)
  expect(checkTemp).toBe(0)

})

test('should calculate fahrenheit from celsius', () => {
  const checkTemp = celsiusToFahrenheit(0)
  expect(checkTemp).toBe(32)
})