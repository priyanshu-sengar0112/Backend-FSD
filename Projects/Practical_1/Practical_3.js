// Practical 3 – Visualize the Event Loop



const fs = require('fs');

console.log("Start of Program");

// Read a file to create an I/O callback
fs.readFile(__filename, () => {

    console.log("Inside File Reading Callback");

    // Executes before the event loop continues
    process.nextTick(() => {
        console.log("1. Process NextTick");
    });

    // Executes in the check phase
    setImmediate(() => {
        console.log("2. SetImmediate");
    });

    // Executes in the timers phase
    setTimeout(() => {
        console.log("3. SetTimeout");
    }, 0);
});

console.log("End of Program");
