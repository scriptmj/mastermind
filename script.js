//All objects have their element (for getting and setting attributes) and their colour (for gameplay purposes)
let firstGuess = {
    element: document.getElementById("firstguess"),
    colour: undefined
}
let secondGuess = {
    element: document.getElementById("secondguess"),
    colour: undefined
}
let thirdGuess = {
    element: document.getElementById("thirdguess"),
    colour: undefined
}
let fourthGuess = {
    element: document.getElementById("fourthguess"),
    colour: undefined
}
let guessArray = [];
createGuessArray();

const gameOverText = document.getElementById("gameover");
let round = 1;
let choiceObj = {};
let gameColours = [];
let gameOver = false;
startNewGame();

function startNewGame(){
    for(item of guessArray){
        clearElement(item);
    }
    clearAllRounds();
    createGameColours();
    gameOver = false;
    gameOverText.innerHTML = "";
}

function createGameColours(){
    gameColours = [];
    const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    for(let i = 0 ; i < 4 ; i++){
        let number = Math.floor(Math.random() * 6);
        gameColours.push(colours[number]); 
    }
}

//Creates an array of all the guess objects, in order.
function createGuessArray(){
    guessArray.push(firstGuess);
    guessArray.push(secondGuess);
    guessArray.push(thirdGuess);
    guessArray.push(fourthGuess);
}

//When you pick a colour, this function finds the first empty guess and puts your chosen colour in that guess box.
function pickColour(colour){
    if(!gameOver){
        for(item of guessArray){
            if(item.element.getAttribute("class") === "guess"){
                item.element.setAttribute("class", "guess " + colour);
                item.colour = colour;
                break;
            }
        }
    }
}

//Clears both the element related to the guess #, and the colour in the guess.
function clearElement(item){
    item.element.setAttribute("class", "guess");
    item.colour = undefined;
}

//When all four choices are filled with a colour, commit the play and check if the guesses are correct.
function commitChoice(){
    if(!gameOver && checkValidChoices()){
        updateRoundColours();
        checkCorrectGuesses();
        for(item of guessArray){
            clearElement(item);
        }
        round++;
    }
}

//Takes the guesses and first checks if a colour is on the correct spot, if not, checks if the colour exists elsewhere. Respectively adds a red, grey or no pin into an array.
//The array is later sent to 'insertPins()' to display the pins onto the board.
function checkCorrectGuesses(){
    let gamePins = [];
    for(let i = 0 ; i < 4 ; i++){
        if(guessArray[i].colour === gameColours[i]){
            gamePins.push("red");
        } else if(gameColours.includes(guessArray[i].colour)){
            gamePins.push("grey");
        }
    }
    insertPins(gamePins);
    const isEveryRed = (colour) => colour === "red";
    if(gamePins.length === 4 && gamePins.every(isEveryRed)){
        endGame("Game over, you won!");
    } else if(round === 12 && (gamePins.length <= 4 || gamePins.every(isEveryRed))){
        endGame("Game over, you lost. The correct colour combination was: " + gameColours[0] + ", " + gameColours[1] + ", " + gameColours[2] + ", " + gameColours[3]);
    }
}

//Sets the gameOver to true and shows the correct ending message to the user. Subsequently disables the game until a new game is started.
function endGame(endGameText){
    gameOver = true;
    gameOverText.innerHTML = endGameText;
}

//Takes the input from the correct guesses (array of pin colours). If empty, does nothing, if not empty it puts the pins on the board, in order. Red first, grey second.
function insertPins(gamePins){
    const roundResult = document.getElementById("result " + round);
    if(gamePins[0] !== undefined){
        gamePins.sort();
        gamePins.reverse();
        for(pinColour of gamePins){
            let pinElement = document.createElement('span');
            pinElement.setAttribute("class", "dot " + pinColour);
            roundResult.appendChild(pinElement);
        }
    }
}

//Shows the chosen colours in the game board, on the current round.
function updateRoundColours(){
    currentRound = document.getElementsByClassName("round " + round);
    for(let i = 0 ; i < guessArray.length ; i++){
        currentRound[i].setAttribute("class", "round " + round + " " + guessArray[i].colour);
    }
}

//Resets the 'round' var back to 1. Loops over all rounds, if they have a colour, it resets them. If the round doesn't have a colour, the loop breaks and the clear is done.
function clearAllRounds(){
    round = 1;
    for(let i = 1 ; i < 13 ; i++){
        let currentRound = document.getElementsByClassName("round " + i);
        let currentRoundResult = document.getElementById("result " + i);
        if(currentRound[0].getAttribute("class") !== "round " + i){
            for(item of currentRound){
                item.setAttribute("class", "round " + i);
            }
            currentRoundResult.innerHTML = "";
        } else {
            break;
        }
    }
}

//Checks if the chosen colours are valid. If not, shows an error and returns false. If it is valid, it returns true.
function checkValidChoices(){
    for(item of guessArray){
        if(item.colour === undefined){
            commitError("You did not select four colours");
            return false;
        }
    }
    return true;
}

//Shows a commit error to the user if the chosen colours are not valid.
function commitError(error){
    document.getElementById("commitError").innerHTML = error;
}