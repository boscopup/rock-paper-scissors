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