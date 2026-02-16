// 1. Apne function ko import karo
const { add, subtract } = require('./calculator.js');

// 'describe' ek group banata hai (Like a Folder for tests)
describe("Calculator Tests", () =>
     {

    // Test Case 1
    test("should add 2 + 2 to equal 4", () => {
        const result = add(2, 2);
        
        // 'expect' aur 'toBe' assertion hain (Check karne wala police)
        expect(result).toBe(4); 
    });

    // Test Case 2
    test("should subtract 5 - 2 to equal 3", () => {
        expect(subtract(5, 2)).toBe(3);
    });

    // Test Case 3 (Negative check)
    test("should handle negative numbers correctly", () => {
        expect(add(-1, -1)).toBe(-2);
    });

});