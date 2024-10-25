let tictactoe = (function(){
    // declare variables
    // this.game = {};
    // let game = this.game;
    let gameboardArray = Array.from(' '.repeat(9));
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
    const startNewGameDialog = document.querySelector('.startNewGameDialog');
    const startNewGameButton = document.querySelector('.startNewGameButton');
    const playerInfoDialog = document.querySelector('.playerInfoDialog');
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.querySelector('form');
    const playerNames = document.querySelector('.playerNames');
    const restartButton = document.querySelector('.restartButton');


    // bind events (click event listeners)
    startNewGameButton.addEventListener('click', () => {
        gridButtons.forEach((button) => {
            button.textContent = ' ';
            button.disabled = false;
        });
        startNewGameDialog.close();
        playerInfoDialog.showModal();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form, submitButton);
        this.player1 = createPlayer(formData.get('player1'));
        this.player2 = createPlayer(formData.get('player2'));
        playerNames.textContent = `${formData.get('player1')} vs. ${formData.get('player2')}`;
        this.activePlayer = this.player1;
        form.reset();
        playerInfoDialog.close();
    })

    gridButtons.forEach((button) => {
        // button.addEventListener('click', )
        button.addEventListener('click', (e) => {
            // console.log('activePlayer name', this.activePlayer.name)
            let marker;
            let winAlert = this.activePlayer.myTurn(e.target.id.slice(-1));
            if (this.activePlayer.name == this.player1.name ) {
                this.activePlayer = this.player2;
                 marker = 'X';
            } else {
                this.activePlayer = this.player1;
                marker = 'O';
            };
            button.textContent = marker;
            button.disabled = true;
            if (winAlert) {
                alert(winAlert);
            };
            // checkForWin(activePlayer.name, activePlayer.playerSelections);
        });
    });

    restartButton.addEventListener('click', (e) => gameReset())

    // START UP FUNCTIONS
    startNewGame();
    render();

    // FUNCTIONS GO UNDER HERE
    function startNewGame() {
        startNewGameDialog.showModal();
    };
    
    function render() {
        // console.log({gameboardArray});
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
            this.playerSelections.push(Number(index));
            gameboardArray[index] = this.name;
            render();
            let winAlert = checkForWin(this.name, this.playerSelections);
            return winAlert
            // console.log(this.name, this.playerSelections);
        }
    };
    
    function checkForWin(name, playerSelections) {
        // check for tie
        if(!gameboardArray.includes(' ')) {
            render();
            alert('It\'s a tie!');
            gameReset();
        } else {
            console.log({name})
            console.log({playerSelections})
            console.log({winningCombos})
            let checkForWinArray = [];
            console.log({checkForWinArray})
            winningCombos.forEach((combo1) => {
                checkForWinArray.push(combo1.every((combo2) => playerSelections.includes(combo2)))});
            
            console.log({checkForWinArray});

            if(checkForWinArray.includes(true)) {
                let winAlert = `${name} wins!`;
                gameReset();
                return winAlert;
            };
        }
        };
        
    function gameReset() {
        gameboardArray = Array.from(' '.repeat(9));
        player1.playerSelections = [];
        player2.playerSelections = [];
        player1 = {};
        player2 = {};
        this.activePlayer = this.player1;
        render();
        startNewGame();
    };
            
    return {
        createPlayer
    }
})();

// let player1 = tictactoe.createPlayer('lisa');
// let player2 = tictactoe.createPlayer('clayton');

//DELETE RENDER SINCE IT'S ONLY CONSOLE LOGGING
//IT'S PUSHING INTO WRONG PLAYERSELECTION ARRAY