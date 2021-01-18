//TODO Delete all console.logs

//All objects have their element (for getting and setting attributes) and their colour (for gameplay purposes)
let firstGuess = {
    element: document.getElementById("firstguess"),
    colour: undefined
}
let secondguess = {
    element: document.getElementById("secondguess"),
    colour: undefined
}
let thirdguess = {
    element: document.getElementById("thirdguess"),
    colour: undefined
}
let fourthguess = {
    element: document.getElementById("fourthguess"),
    colour: undefined
}
let guessArray = [];
createGuessArray();
let round = 1;
let choiceObj = {};

//Creates an array of all the guess objects, in order.
function createGuessArray(){
    guessArray.push(firstGuess);
    guessArray.push(secondguess);
    guessArray.push(thirdguess);
    guessArray.push(fourthguess);
}

function pickColour(colour){
    //console.log("picking " + colour);
    for(item of guessArray){
        //console.log(item.element);
        if(item.element.getAttribute("class") === "guess"){
            //console.log("setting colour " + colour);
            item.element.setAttribute("class", "guess " + colour);
            item.colour = colour;
            break;
        }
    }
}

//TODO possibly redundant
function clearElement(item){
    //console.log("clearing");
    //console.log(guessElement.getAttribute("class"));
    item.element.setAttribute("class", "guess");
    item.colour = undefined;
    //console.log(guessElement.getAttribute("class"));
}

function commitChoice(){
    if(checkChoices()){
        //console.log("commit");
        console.log(round);
        updateRoundColours();
        //Puts the guesses in the table for the current round


        //Checks the guesses

        //Displays the results in the table next to the round

        //Clears the guesses
        for(item of guessArray){
            clearElement(item);
        }
        round++;
    }
}

function updateRoundColours(){
    currentRound = document.getElementsByClassName("round " + round);
    for(i = 0 ; i < guessArray.length ; i++){
        currentRound[i].setAttribute("class", "round " + round + " " + guessArray[i].colour);
    }
    console.log(currentRound);
}

function checkChoices(){
    for(item of guessArray){
        if(item.colour === undefined){
            commitError("You did not select four colours");
            return false;
        }
    }
    return true;
}

function commitError(error){
    document.getElementById("commitError").innerHTML = error;
}