// Practical 1 – Custom EventEmitter


const EventEmitter = require('events');

// Create an EventEmitter object
const event = new EventEmitter();

// Create greet event
event.on('greet', () => {
    console.log("Hello! Welcome to Node.js Events.");
});

// Create exit event
event.on('exit', () => {
    console.log("Exit event triggered. Goodbye!");
});

// Trigger the events
console.log("Starting EventEmitter Demo...");

event.emit('greet');
event.emit('exit');
