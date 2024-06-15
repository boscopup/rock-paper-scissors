// Initiate the game on page load
// Script loading in index.html is deferred until after the HTML loads
playGame();

/**
 * Function: getComputerChoice
 * Params: None
 * Returns: random string option of "rock", "paper", or "scissors"
 */
function getComputerChoice() {
    // Calculate random number from 1 to 3
    randomNumber = Math.floor(Math.random() * 3) + 1;

    // Convert 1 to 3 number to string of "rock", "paper", or "scissors"
    stringChoice = convertToRPS(randomNumber);

    return stringChoice;
}

/**
 * Function: convertToRPS
 * Params: integer from 1 to 3
 * Returns: string "rock", "paper", or "scissors"
 */
function convertToRPS(number) {
    switch(number) {
    case 1:
        return "rock";
    case 2:
        return "paper";
    case 3:
        return "scissors";
    default:
        return "";
    }
}

/**
 * Function: capitalize
 * Params: string word
 * Returns: the same string but with the first letter capitalized
 */
function capitalize(word) {
    // Convert the first letter to uppercase and concatenate the rest of the word to that
    return (word.charAt(0).toUpperCase() + word.slice(1));
}

/**
 * Function: playGame
 * Params: None
 * Returns: Nothing 
 */
function playGame() {
    let computerScore = 0;
    let humanScore = 0;

    const container = document.querySelector("#container");
    container.style = "display: flex; flex-direction: column; align-items: center;";

    // Make sure div is empty at the start of the game. This is
    // necessary for subsequent game play.
    container.replaceChildren();

    // Create Score bar
    const scoreBar = document.createElement("div");

    // Create buttons for player to select "Rock", "Paper", or "Scissors"
    const buttonDiv = document.createElement("div");

    const rpsImages = document.createElement("div");
    rpsImages.style = "display:flex; flex-direction: row; justify-content: space-evenly;";

    const RPS_IMAGE_WIDTH = "75px";
    const rpsComputer = document.createElement("img");
    const rpsHuman = document.createElement("img");
    rpsComputer.style.width = RPS_IMAGE_WIDTH;
    rpsComputer.src = "./images/rock.png";

    rpsHuman.style.width = RPS_IMAGE_WIDTH;
    rpsHuman.src = "./images/rock.png";
    rpsImages.appendChild(rpsComputer);
    rpsImages.appendChild(rpsHuman);

    const roundResults = document.createElement("div");
    roundResults.textContent = "";

    const ROUND_RESULTS_IMAGE_WIDTH = "71px";
    const ROUND_RESULTS_IMAGE_HEIGHT = "78px";
    const roundResultsImage = document.createElement("img");
    roundResultsImage.style.visibility = "hidden";
    roundResultsImage.style.width = ROUND_RESULTS_IMAGE_WIDTH;
    roundResultsImage.style.height = ROUND_RESULTS_IMAGE_HEIGHT;
    

    buttonDiv.style = "display:flex; flex-direction: row; justify-content: center;";
    const rockButton = document.createElement("button");
    const paperButton = document.createElement("button");
    const scissorsButton = document.createElement("button");

    rockButton.textContent = "Rock";
    paperButton.textContent = "Paper";
    scissorsButton.textContent = "Scissors";

    buttonDiv.appendChild(rockButton);
    buttonDiv.appendChild(paperButton);
    buttonDiv.appendChild(scissorsButton);

    container.appendChild(scoreBar);
    container.appendChild(rpsImages);
    container.appendChild(roundResults);
    container.appendChild(roundResultsImage);
    container.appendChild(buttonDiv);

    // Add event listener on buttons to call playRound with button choice
    rockButton.addEventListener("click", playRound);
    paperButton.addEventListener("click", playRound);
    scissorsButton.addEventListener("click", playRound);

    // Initialize score bar
    setScores();

    /**
     * Function: playRound, nested function inside playGame
     * Params: event
     * Returns: nothing
     * 
     * Updates the computerChoice or humanChoice variables.
     * 
     * Rock beats scissors
     * Paper beats rock
     * Scissors beats paper
     * 
     */
    function playRound(e) {
        let humanChoice = e.target.textContent.toLowerCase();
        console.log(humanChoice);

        let computerChoice = getComputerChoice();

        // Display choice images
        switch (computerChoice) {
            case "rock":
                rpsComputer.src = "./images/rock.png";
                break;
            case "paper":
                rpsComputer.src = "./images/paper.png";
                break;
            case "scissors":
                rpsComputer.src = "./images/scissors.png";
                break;
        }

        switch (humanChoice) {
            case "rock":
                rpsHuman.src = "./images/rock.png";
                break;
            case "paper":
                rpsHuman.src = "./images/paper.png";
                break;
            case "scissors":
                rpsHuman.src = "./images/scissors.png";
                break;
        }

        // If they are the same, the game is a tie
        if (computerChoice == humanChoice) {
            createWinLoseTieMessage("tie", computerChoice, humanChoice);
        } else {
            // If computer wins, send a "lose" message, since the human loses
            // Otherwise, the human wins, so send a "win" message.
            if (((computerChoice == "rock") && (humanChoice == "scissors")) ||
                ((computerChoice == "paper") && (humanChoice == "rock")) ||
                ((computerChoice == "scissors") && (humanChoice == "paper"))) {
                computerScore++;
                createWinLoseTieMessage("lose", computerChoice, humanChoice);
            } else {
                humanScore++;
                createWinLoseTieMessage("win", humanChoice, computerChoice);
            }
        }
        setScores();
        if (computerScore == 5 || humanScore == 5) {
            const resultDiv = document.createElement("div");
            resultDiv.textContent = getFinalResultsMessage(computerScore, humanScore);

            const newGameButton = document.createElement("button");
            newGameButton.textContent = "New Game";
            newGameButton.addEventListener("click", playGame);

            container.replaceChildren(resultDiv, newGameButton);
        }
        return;
    }
    /** END playRound function */

    /**
     * Function: setScores, nested function inside playGame
     * Params: None
     * Returns: nothing 
     */
    function setScores() {
        scoreBar.textContent = `Computer: ${computerScore}    Human: ${humanScore}`
        return;
    }
    /** END setScores function */

    /**
     * Function: createWinLoseTieMessage, nested function inside playGame
     * Params: string result (win, lose, or tie), 
     *         string winner (rock, paper, scissors), 
     *         string loser (rock, paper, scissors)
     * Returns: string message of the format "You <win|lose|tie>! <<winner> beats <loser>|<winner> ties with <winner>>."
     * 
     */
    function createWinLoseTieMessage(result, winner, loser) {
        let message = "";

        switch (result) {
            // If win, return, "You win! <winner capitalized> beats <loser>."
            // If lose, return, "You lose! <winner capitalized> beats <loser>."
            case "win":
            case "lose":
                message = `You ${result}! ${capitalize(winner)} beats ${loser}.`;
                break;
            // If tie, return, "You tie! <winner capitalized> ties with <winner>."
            case "tie":
                message = `You tie! ${capitalize(winner)} ties with ${loser}.`;
                break;
        }

        if (winner != loser) {
            switch (winner) {
                case "rock":
                    roundResultsImage.src = "./images/RockBeatsScissors.png";
                    break;
                case "paper":
                    roundResultsImage.src = "./images/PaperBeatsRock.png";
                    break;
                case "scissors":
                    roundResultsImage.src = "./images/ScissorsBeatsPaper.png";
                    break;
            }
            roundResultsImage.style.visibility = "visible";    
        } else {
            // Tied, so no image
            roundResultsImage.style.visibility = "hidden";
        }

        // Return the message
        roundResults.textContent = message;
        return;
    }
    /** END createWinLoseTieMessage function */

    return; // playGame
}

/**
 * Function: getFinalResultsMessage
 * Params: number computerScore, number humanScore
 * Returns: string message
 */
function getFinalResultsMessage(computerScore, humanScore) {
    // Compare computerScore and humanScore and declare winner of game
    let message = "";
    if (computerScore > humanScore) {
        message = `Computer wins! Final score ${computerScore} to ${humanScore}.`;
    } else if (computerScore < humanScore) {
        message = `You win! Final score ${humanScore} to ${computerScore}.`;
    } else {
        message = `You tied! Final score ${computerScore} to ${humanScore}`;
    }

    return message;
}

