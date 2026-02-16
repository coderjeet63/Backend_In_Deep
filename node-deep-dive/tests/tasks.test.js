const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js'); // Hamara Express App
require('dotenv').config();

// 1. SETUP: Test shuru hone se pehle DB connect karo
beforeAll(async () => {
    // Hum "test" database use karenge taaki asli data kharab na ho
    // Agar .env mein MONGO_URI hai, toh uske end mein '/test-db' laga dena
    const testDB = "mongodb://localhost:27017/test-tasks";
    await mongoose.connect(testDB);
});

// 2. CLEANUP: Test khatam hone par connection band karo
afterAll(async () => {
    await mongoose.connection.close();
});

// 3. TESTS
describe("Task API Tests", () => {

    // Test Case 1: GET /tasks
    test("GET /tasks should return 200 and list of tasks", async () => {
        // Act: Request bhejo
        const response = await request(app).get("/tasks");

        // Assert: Check karo
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        // Check karo ki data array hai ya nahi
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Test Case 2: Galat Route (404 Check)
    test("GET /random-route should return 404", async () => {
        const response = await request(app).get("/kuch-bhi-route");
        // Express by default 404 deta hai HTML mein, agar tumne handle nahi kiya
        // Toh hum bas status code check karenge
        expect(response.statusCode).toBe(404);
    });

});


describe("POST /tasks", () => {

    test("should create a new task", async () => {

        const newTask = {
    title: "Learn Testing",
    description: "Testing CRUD APIs", // 👈 ADD THIS
    status: "pending",
    priority: 3
};


        const res = await request(app)
            .post("/tasks")
            .send(newTask);

        console.log(res.body); // only body, not full res

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Learn Testing");

    });

});



describe("GET /tasks/:id", () => {

    test("should get the task", async () => {

        // 1️⃣ Create task
        const createdTask = await request(app)
            .post("/tasks")
            .send({
                title: "Old Title",
                description: "Old desc",
                status: "pending",
                priority: 2
            });

        const taskId = createdTask.body.data._id;

        // 2️⃣ Get by ID
        const res = await request(app)
            .get(`/tasks/${taskId}`);

        console.log(res.body);

        // 3️⃣ Assertions
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Old Title");
        expect(res.body.description).toBe("Old desc");
        expect(res.body.priority).toBe(2);
        expect(res.body._id).toBe(taskId);

    });

});


 describe("PATCH /tasks/:id", () => {

    test("should update a task", async () => {

        // 1️⃣ Create task
        const createdTask = await request(app)
            .post("/tasks")
            .send({
                title: "Old Title",
                description: "Old desc",
                status: "pending",
                priority: 2
            });

        const taskId = createdTask.body.data._id;

        // 2️⃣ Update task
        const res = await request(app)
            .patch(`/tasks/${taskId}`)
            .send({
                title: "Updated Title"
            });

        console.log(res.body);

        // 3️⃣ Assertions
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Updated Title");

    });

});

