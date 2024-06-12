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