let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // player O starts
let gameOver = false; // Track if the game is over

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game to start a new round
const resetGame = () => {
    if (!gameOver) return; // Prevent resetting if the game is still ongoing

    // Clear the board
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false; // Enable the boxes
    });

    // Hide the winner message
    msgContainer.classList.add("hide");

    // Reset the turn to Player O
    turn0 = true;

    // Reset the game over flag
    gameOver = false;
};

// Handle the click event for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return; // Prevent clicks if the game is over or box is already filled

        // Make the move
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true; // Disable the clicked box
        checkWinner();
        checkDraw();
    });
});

// Show the winner's message
const showWinner = (win) => {
    msg.innerHTML = `Congratulations, Winner is ${win}`;
    msgContainer.classList.remove("hide");

    // Set the gameOver flag to true after a winner is found
    gameOver = true;
};

// Check if there is a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val); // Show the winner message
                break;
            }
        }
    }
};

// Check if the game is a draw
const checkDraw = () => {
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    // If all boxes are filled and there's no winner, it's a draw
    if (allFilled && !gameOver) {
        msg.innerHTML = "It's a Draw!";
        msgContainer.classList.remove("hide");
        gameOver = true; // Mark game as over
    }
};

// Add an event listener to the "New Game" button
newBtn.addEventListener("click", resetGame);
