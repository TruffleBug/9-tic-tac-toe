let tictactoe = (function(){
    // declare variables
    let gameboardArray = Array.from(' '.repeat(9));
    let allPlayerSelections = [];
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0 ,4, 8],
        [2, 4, 6]
    ];

    // AUTOMATIC TASKS TO SET UP GAME
    // cache DOM (html query selectors)
    const gridButtons = document.querySelectorAll('.gameboard button');
    const zero = document.querySelector('#zero');
    const one = document.querySelector('#one');
    const two = document.querySelector('#two');
    const three = document.querySelector('#three');
    const four = document.querySelector('#four');
    const five = document.querySelector('#five');
    const six = document.querySelector('#six');
    const seven = document.querySelector('#seven');
    const eight = document.querySelector('#eight');
    const startNewGameDialog = document.querySelector('.startNewGameDialog');
    const startNewGameButton = document.querySelector('.startNewGameButton');
    const playerInfoDialog = document.querySelector('.playerInfoDialog');
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.querySelector('form');


    // bind events (click event listeners)
    startNewGameButton.addEventListener('click', () => {
        startNewGameDialog.close();
        playerInfoDialog.showModal();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form, submitButton);
        let player1 = createPlayer(formData.get('player1'));
        let player2 = createPlayer(formData.get('player2'));
        form.reset();
        playerInfoDialog.close();
        // return (player1, player2)
    })

    // gridButtons.forEach((button) => {
    //     // button.addEventListener('click', )
    //     button.addEventListener('click', render())
    // });

    // START UP FUNCTIONS
    startNewGame();
    render();

    // FUNCTIONS GO UNDER HERE
    function startNewGame() {
        startNewGameDialog.showModal();
    }

    function render() {
        console.log(gameboardArray);
        // this.gridButtons.textContent = 'test';
    };

    function createPlayer(name) {
        const newPlayer = Object.create(functionStore);
        newPlayer.name = name;
        newPlayer.playerSelections = [];
        return newPlayer
    };

    const functionStore = {
        myTurn: function(index) {
            if (!allPlayerSelections.includes(index)) {
                this.playerSelections.push(index);
                allPlayerSelections.push(index);
                gameboardArray[index] = this.name;
                render();
                checkForWin(this.name, this.playerSelections);

                console.log(this.name, this.playerSelections);
                console.log('all', allPlayerSelections);
            } else {
                alert('That spot is taken. Try again');
            };
        }
    };
    
    function checkForWin(name, playerSelections) {
        // check for tie
        if(!gameboardArray.includes(' ')) {
            alert('It\'s a tie!');
            gameReset();
        } else {
            let checkForWin = [];
            winningCombos.forEach((combo1) => {
                checkForWin.push(combo1.every((combo2) => playerSelections.includes(combo2)))});

            console.log(checkForWin);
            
            if(checkForWin.includes(true)) {
                alert(`${name} wins!`);
                gameReset();
            };
        }
    };

    function gameReset() {
        gameboardArray = Array.from(' '.repeat(9));
        allPlayerSelections = [];
        player1.playerSelections = [];
        player2.playerSelections = [];
        player1 = {};
        player2 = {};
        render();
    };
    

    return {
        createPlayer
    }
})();

// let player1 = tictactoe.createPlayer('lisa');
// let player2 = tictactoe.createPlayer('clayton');