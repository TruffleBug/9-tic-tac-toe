// gameboard only needs to load at beginning once (IIFE)
const gameboard = (function() {
    const gameboardArray = Array.from(' '.repeat(9));
    const allPlayerSelections = [];
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0 ,4, 8],
        [2, 4, 6]
    ]
    return {gameboardArray, allPlayerSelections, winningCombos}
})();

// displayController shows gameboard & determines if there is a win
function displayController(name) {
    console.log(gameboard.gameboardArray);
    
    // check for winning combo
    let checkForWin = [];
    gameboard.winningCombos.forEach((combo1) => {
        checkForWin.push(combo1.every((combo2) => name.playerSelections.includes(combo2)))})
    console.log(checkForWin);

    // if win, announce winner & reset game
    if(checkForWin.includes(true)) {
        alert(`${this.name} wins!`);
        gameboard.allPlayerSelections = [];
        gameboard.gameboardArray = Array.from(' '.repeat(9))
        name.playerSelections = [];
        console.log('all', gameboard.allPlayerSelections)
        console.log('gameboard', gameboard.gameboardArray)
        //NEED TO SOMEHOW CLEAR THE SECOND PLAYER'S PLAYERSELECTION ARRAY
    } 
    return 
};

// factory function, createPlayer, with input of name
function createPlayer (name) {
    this.name = name;
    this.playerSelections = [];
    const myTurn = function(index) {
        // check if spot is taken already
        if(!gameboard.allPlayerSelections.includes(index)) {            
            // update playerSelection array, allPlayerSelection arrays, and display
            this.playerSelections.push(index);
            gameboard.allPlayerSelections.push(index);
            gameboard.gameboardArray[index] = name;
            displayController(this);

            //test console logs (can delete)
            console.log(name, this.playerSelections);
            console.log('all', gameboard.allPlayerSelections);

        //     // check for winning combo
        //     let checkForWin = [];
        //     gameboard.winningCombos.forEach((combo1) => {
        //         checkForWin.push(combo1.every((combo2) => this.playerSelections.includes(combo2)))})
        //     console.log(checkForWin);

        //     // if win, announce winner & reset game
        //     if(checkForWin.includes(true)) {
        //         alert(`${name} wins!`);
        //         gameboard.allPlayerSelections = [];
        //         gameboard.gameboardArray = Array.from(' '.repeat(9))
        //         console.log('all', gameboard.allPlayerSelections)
        //         displayController()
        //     }
        } else {
            return console.log('That spot is taken. Try again.')
        };
    };
    return {name, playerSelections, myTurn};
};

const lisa = createPlayer('lisa');
const clayton = createPlayer('clayton');

// // lisa.myTurn(0);
// // clayton.myTurn(5);
// // lisa.myTurn(2);
// // clayton.myTurn(6);

// let testArray = [9, 0, 4, 8, 10, 12];
// // console.log('test ' + testArray.includes(5 && 6 && 3 & 2 && 8))
// const testCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6], 
//     [1, 4, 7],
//     [2, 5, 8],
//     [0 ,4, 8],
//     [2, 4, 6]
// ]

// // if(testCombos.forEach((combo1) => {
// //     combo1.every((combo2) => {
// //         testArray.includes(combo2)
// //     }) 
// // })) {
// //     console.log('test success')    
// // } else {
// //     console.log('test fail')
// // }

// // if(testCombos.forEach((combo1) => combo1.every((combo2) => testArray.includes(combo2)))) {
// //     console.log(`test success`)
// // } else {
// //     console.log('test fail')
// // }

// testCombos.forEach((combo1) => {
//     console.log(combo1.every((combo2) => testArray.includes(combo2)))})