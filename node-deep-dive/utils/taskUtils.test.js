// utils/taskUtils.test.js
const { calculatePriority } = require('./taskUtils');

describe("Task Priority Tests", () => {

    test("should return 1 for 'urgent' status", () => {
        expect(calculatePriority("urgent")).toBe(1);
    });

    test("should return 2 for 'high' status", () => {
        expect(calculatePriority("high")).toBe(2);
    });

    test("should return 3 for 'normal' status", () => {
        expect(calculatePriority("normal")).toBe(3);
    });

    // Edge Case: Agar koi ajib sa status aa jaye
    test("should return 5 for unknown status", () => {
        expect(calculatePriority("randomText")).toBe(5);
    });

    // Edge Case: Capital letters handle ho rahe hain?
    test("should handle Case Sensitivity (URGENT -> 1)", () => {
        expect(calculatePriority("URGENT")).toBe(1);
    });
    
    // Edge Case: Agar status empty ho
    test("should return 5 if status is empty", () => {
        expect(calculatePriority("")).toBe(5);
    });

});