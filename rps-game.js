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
 * Function: getHumanChoice
 * Params: None
 * Returns: string "rock", "paper", or "scissors"
 */
function getHumanChoice() {
    let stillGoing = true;
    let choice = "";

    while (stillGoing) {
        // Prompt user for choice
        choice = prompt("Please choose 'rock', 'paper', or 'scissors'");

        // Convert choice to all lowercase
        choice = choice.toLowerCase();

        // Verify choice. If valid, end loop. If not valid, prompt user again.
        if ((choice == "rock") || (choice == "paper") || (choice == "scissors") ) {
            stillGoing = false;
        }
    }

    // Return valid choice
    return choice;
}



/**
 * Function: createWinLoseTieMessage
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

    // Return the message
    return message;
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
    // Create buttons for player to select "Rock", "Paper", or "Scissors"
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const rockButton = document.createElement("button");
    const paperButton = document.createElement("button");
    const scissorsButton = document.createElement("button");

    rockButton.textContent = "Rock";
    paperButton.textContent = "Paper";
    scissorsButton.textContent = "Scissors";

    container.appendChild(rockButton);
    container.appendChild(paperButton);
    container.appendChild(scissorsButton);
    body.appendChild(container);

    // Add event listener on buttons to call playRound with button choice
    rockButton.addEventListener("click", playRound);
    paperButton.addEventListener("click", playRound);
    scissorsButton.addEventListener("click", playRound);

    // Add a div for displaying results
    // Display running score
    // Announce winner once one player reaches 5 points

    let computerScore = 0;
    let humanScore = 0;

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

        // If they are the same, the game is a tie
        if (computerChoice == humanChoice) {
            handleMessage(createWinLoseTieMessage("tie", computerChoice, humanChoice));
        } else {
            // If computer wins, send a "lose" message, since the human loses
            // Otherwise, the human wins, so send a "win" message.
            if (((computerChoice == "rock") && (humanChoice == "scissors")) ||
                ((computerChoice == "paper") && (humanChoice == "rock")) ||
                ((computerChoice == "scissors") && (humanChoice == "paper"))) {
                computerScore++;
                handleMessage(createWinLoseTieMessage("lose", computerChoice, humanChoice));
            } else {
                humanScore++;
                handleMessage(createWinLoseTieMessage("win", humanChoice, computerChoice));
            }
        }

        if (computerScore == 5 || humanScore == 5) {
            const resultDiv = document.createElement("div");
            resultDiv.textContent = getFinalResultsMessage(computerScore, humanScore);
            container.replaceChildren(resultDiv);
        }
        return;
    }
    /** END playRound function */


/*


    // Print message
    console.log(message);
*/
    return;
}

/**
 * Function: handleMessage
 * Params: message - text to be displayed for results of round
 * Returns: nothing
 */
function handleMessage(message) {
    // TODO: Change to display on screen
    console.log(message);
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