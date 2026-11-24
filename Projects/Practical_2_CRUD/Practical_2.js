
const fs = require('fs');

// 1. CREATE a file
fs.writeFile('student.txt', 'Name: Priyanshu\nCourse: B.Tech CSE', (err) => {
    if (err) {
        console.log("Error creating file:", err);
        return;
    }

    console.log("File created successfully!");

    // 2. READ the file
    fs.readFile('student.txt', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        console.log("\nFile Content:");
        console.log(data);

        // 3. UPDATE the file
        fs.appendFile('student.txt', '\nYear: 2nd Year', (err) => {
            if (err) {
                console.log("Error updating file:", err);
                return;
            }

            console.log("\nFile updated successfully!");

            // Read updated content
            fs.readFile('student.txt', 'utf8', (err, updatedData) => {
                if (err) {
                    console.log("Error reading updated file:", err);
                    return;
                }

                console.log("\nUpdated File Content:");
                console.log(updatedData);

                // 4. DELETE the file
                fs.unlink('student.txt', (err) => {
                    if (err) {
                        console.log("Error deleting file:", err);
                        return;
                    }

                    console.log("\nFile deleted successfully!");
                });
            });
        });
    });
});
