
const http = require('http');

// Temporary student data
let students = [];
let nextId = 1;

// Function to read JSON data from request
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', reject);
    });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {

    // Set response header
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    try {

        // GET: Display all students
        if (req.method === 'GET' && pathname === '/students') {

            res.writeHead(200);
            res.end(JSON.stringify(students));
        }

        // POST: Add a new student
        else if (req.method === 'POST' && pathname === '/students') {

            const data = await getRequestBody(req);

            if (!data.name || !data.course) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    message: 'Name and course are required'
                }));
            }

            const newStudent = {
                id: nextId++,
                name: data.name,
                course: data.course
            };

            students.push(newStudent);

            res.writeHead(201);
            res.end(JSON.stringify({
                message: 'Student added successfully',
                student: newStudent
            }));
        }

        // PUT: Update an existing student
        else if (req.method === 'PUT' && pathname.startsWith('/students/')) {

            const id = Number(pathname.split('/')[2]);

            const student = students.find(s => s.id === id);

            if (!student) {
                res.writeHead(404);
                return res.end(JSON.stringify({
                    message: 'Student not found'
                }));
            }

            const data = await getRequestBody(req);

            if (data.name) student.name = data.name;
            if (data.course) student.course = data.course;

            res.writeHead(200);
            res.end(JSON.stringify({
                message: 'Student updated successfully',
                student: student
            }));
        }

        // DELETE: Remove a student
        else if (req.method === 'DELETE' && pathname.startsWith('/students/')) {

            const id = Number(pathname.split('/')[2]);

            const index = students.findIndex(s => s.id === id);

            if (index === -1) {
                res.writeHead(404);
                return res.end(JSON.stringify({
                    message: 'Student not found'
                }));
            }

            students.splice(index, 1);

            res.writeHead(200);
            res.end(JSON.stringify({
                message: 'Student deleted successfully'
            }));
        }

        // Handle invalid routes
        else {
            res.writeHead(404);
            res.end(JSON.stringify({
                message: 'Route not found'
            }));
        }

    } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
            message: 'Invalid JSON data'
        }));
    }

});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
