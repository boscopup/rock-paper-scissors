// Initialize global integers computerScore and humanScore to 0
let computerScore = 0;
let humanScore = 0;

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

    // Return string choice
    return stringChoice;
}

/**
 * Function: convertToRPS
 * Params: integer from 1 to 3
 * Returns: string "rock", "paper", or "scissors"
 */
function convertToRPS(number) {
    switch(number) {
    // if number is 1, return "rock"
    case 1:
        return "rock";
    // if number is 2, return "paper"
    case 2:
        return "paper";
    // if number is 3, return "scissors"
    case 3:
        return "scissors";
    // if number is anything else, return ""
    default:
        return "";
    }
}

/**
 * Function getHumanChoice
 * Params: None
 * Returns: string "rock", "paper", or "scissors"
 */
function getHumanChoice() {
    // Initialize stillGoing boolean to true
    let stillGoing = true;
    // Initialize choice string to an empty string. This will be set in the while loop.
    let choice = "";

    // While stillGoing is true
    while (stillGoing) {
        // Prompt user for choice of "rock", "paper", or "scissors"
        choice = prompt("Please choose 'rock', 'paper', or 'scissors'")
        // Convert choice to all lowercase
        choice = choice.toLowerCase();
        // Verify that the choice is one of "rock", "paper" or "scissors"
        if ((choice == "rock") || (choice == "paper") || (choice == "scissors") ) {
        // If choice is valid, set stillGoing to false and return choice
            stillGoing = false;
        }
    }

    // Return valid choice
    return choice;
}

/**
 * Function playRound
 * Params: string computerChoice, string humanChoice
 * Returns: Win/Lose/Tie message
 * 
 * Updates the global computerChoice or humanChoice variables.
 * 
 * Rock beats scissors
 * Paper beats rock
 * Scissors beats paper
 * 
 */
function playRound(computerChoice, humanChoice) {
    // If they are the same, the game is a tie
    if (computerChoice == humanChoice) {
        // Return a tied message
        return createWinLoseTieMessage("tie", computerChoice, humanChoice);
    }

    // if computerChoice is rock and humanChoice is scissors or
    //    computerChoice is paper and humanChoice is rock or
    //    comoputerChoice is scissors and humanChoice is paper
    if (((computerChoice == "rock") && (humanChoice == "scissors")) ||
        ((computerChoice == "paper") && (humanChoice == "rock")) ||
        ((computerChoice == "scissors") && (humanChoice == "paper"))) {
        // Increment computerScore
        computerScore++;

        // Return computer wins message
        return createWinLoseTieMessage("lose", computerChoice, humanChoice);
    } else {
    // Else
        // Increment humanScore
        humanScore++;
        // Return human wins message
        return createWinLoseTieMessage("win", humanChoice, computerChoice);
    }
}

/**
 * function createWinLoseTieMessage
 * Params: string result (win, lose, or tie), 
 *         string winner (rock, paper, scissors), 
 *         string loser (rock, paper, scissors)
 * Returns: string message of the format "You <win|lose|tie>! <<winner> beats <loser>|<winner> ties with <winner>>."
 * 
 */
function createWinLoseTieMessage(result, winner, loser) {
    // Initialize string message to ""
    let message = "";

    // Switch on result
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
 * function capitalize
 * Params: string word
 * Returns: the same string but with the first letter capitalized
 */
function capitalize(word) {
    // Convert the first letter to uppercase and concatenate the rest of the word to that
    return (word.charAt(0).toUpperCase() + word.slice(1));
}