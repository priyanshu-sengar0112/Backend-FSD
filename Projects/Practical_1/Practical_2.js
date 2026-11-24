// Practical 2 – DOM-like Event Handling in Node.js



const EventEmitter = require('events');

// Create an event emitter
const dom = new EventEmitter();

// Simulate button click event
dom.on('click', () => {
    console.log("Button clicked!");
});

// Simulate mouseover event
dom.on('mouseover', () => {
    console.log("Mouse is over the button!");
});

// Simulate form submission
dom.on('submit', (username) => {
    console.log("Form submitted successfully!");
    console.log("Welcome, " + username);
});

// Trigger events
console.log("DOM-like Event Handling Demo");

dom.emit('click');

dom.emit('mouseover');

dom.emit('submit', 'Priyanshu');
