const Task = require('../../model/taskSchema');
// Humne pura model hi mock kar diya! 
// Ab Task.find() asli DB mein nahi jayega.
jest.mock('../../model/taskSchema'); 

describe("Task Controller Unit Test", () => {
    
    test("should return list of tasks without DB", async () => {
        const mockTasks = [{ title: "Mock Task 1" }, { title: "Mock Task 2" }];
        
        // Task.find ko bolo ki ye fake array return kare
        Task.find.mockResolvedValue(mockTasks);

        const result = await Task.find();

        expect(result.length).toBe(2);
        expect(result[0].title).toBe("Mock Task 1");
        
        // Verification: Kya Mongoose ko call gaya?
        expect(Task.find).toHaveBeenCalled();
    });

});