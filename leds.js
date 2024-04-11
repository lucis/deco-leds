const Gpio = require('pigpio').Gpio;

const RED_PIN = 17; // GPIO pin for red color
const GREEN_PIN = 22; // GPIO pin for green color
const BLUE_PIN = 24; // GPIO pin for blue color

// Initialize GPIO pins

// Function to update RGB values
function updateRGB(red, green, blue) {
    const redLed = new Gpio(RED_PIN, {mode: Gpio.OUTPUT});
    const greenLed = new Gpio(GREEN_PIN, {mode: Gpio.OUTPUT});
    const blueLed = new Gpio(BLUE_PIN, {mode: Gpio.OUTPUT});

    const gamma = 3.5

    red = 255 * ((red / 255) ** gamma)
    green = 255 * ((green / 255) ** gamma)
    blue = 255 * ((blue / 255) ** gamma)

    redLed.pwmWrite(red);
    greenLed.pwmWrite(green);
    blueLed.pwmWrite(blue);
}

module.exports = updateRGB
