const {isWinner} = require("../tic-tac-toe");

// Todo: Writing about this
describe("Test isWinner - positive case", function () {
    test("isWinner - horizontal - 1", () => {
        let boardState = [
            "X", "X", "X",
            "Y", "Y", "",
            "", "", "",
        ];
        expect(isWinner(boardState)).toBe(true);
    });
    
    test("isWinner - horizontal - 2", () => {
        let boardState = [
            "Y", "Y", "",
            "X", "X", "X",
            "", "", "",
        ];
        expect(isWinner(boardState)).toBe(true);
    });

    test("isWinner - horizontal - 3", () => {
        let boardState = [
            "Y", "Y", "",
            "", "", "",
            "X", "X", "X",
        ];
        expect(isWinner(boardState)).toBe(true);
    });
    
    test("isWinner - diagonal - 1", () => {
        const boardState = [
            "X", "Y", "X",
            "Y", "X", "",
            "", "", "X",
        ];
        expect(isWinner(boardState)).toBe(true);
    });

    test("isWinner - diagonal - 2", () => {
        const boardState = [
            "X", "Y", "X",
            "Y", "X", "",
            "X", "", "",
        ];
        expect(isWinner(boardState)).toBe(true);
    });
    
    test("isWinner - vertical - 1", () => {
        const boardState = [
            "X", "Y", "X",
            "X", "X", "",
            "X", "", "",
        ];
        expect(isWinner(boardState)).toBe(true);
    });

    test("isWinner - vertical - 2", () => {
        const boardState = [
            "Y", "X", "X",
            "X", "X", "",
            "", "X", "",
        ];
        expect(isWinner(boardState)).toBe(true);
    });

    test("isWinner - vertical - 2", () => {
        const boardState = [
            "Y", "X", "X",
            "Y", "", "X",
            "", "", "X",
        ];
        expect(isWinner(boardState)).toBe(true);
    });
    
});

test("isWinner - No move", () => {
    const boardState = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];
    expect(isWinner(boardState)).toBe(false);
});