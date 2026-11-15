//comments are there for me to understand each part clearly :)

let boxes = document.querySelectorAll(".box"); // Accessing all the boxes
let resetButton = document.querySelector(".resetButton");
let message = document.querySelector(".message");
let messageText = document.getElementById("messageText");
let newButton = document.querySelector(".newButton");
let game = document.querySelector(".game");
let confettiContainer = document.querySelector("#confetti");

let turnO = true; // Variable to keep track of the current turn 
// If turnO is true, it's O's turn; if false, it's X's turn

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box clicked");
        if (turnO) { // player O's turn
            box.innerText = "O";
            turnO = false; // Switch to X's turn
        } else { // player X's turn
            box.innerText = "X";
            turnO = true; // Switch to O's turn
        }
        box.disabled = true; // Disable the box after it's clicked
        checkWinner(); // Check if there's a winner after each move
    })
});

const disableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Disable all boxes
    }
};

const enableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Enable all boxes
        box.innerText = ""; // empty the boxes
    }
};


const showWinner = (Winner) => {
    messageText.innerText = `Winner: ${Winner}`;
    disableAllBoxes();
    game.classList.add("fade-out");
    setTimeout(() => {
        game.classList.add("hidden");
        resetButton.classList.add("hidden");
        message.classList.remove("hidden");
        launchConfetti();
    }, 500);
};


const launchConfetti = () => {
    let colors = ["#f8a5d1", "#c69aef", "#a8e6cf", "#ffd3a5", "#b8d8ff"];
    for (let i = 0; i < 70; i++) {
        let piece = document.createElement("span");
        piece.classList.add("confetti-piece");
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.7 + "s";
        piece.style.setProperty(
            "--drift",
            (Math.random() * 200 - 100) + "px"
        );
        confettiContainer.appendChild(piece);
        setTimeout(() => {
            piece.remove();
        }, 3500);
    }
};


const checkWinner = () => {
    for (let combination of winningCombinations) {
        let position1 = boxes[combination[0]].innerText; // Get the text of the first box in the combination (it basically accesses the box and gets the text inside it)
        let position2 = boxes[combination[1]].innerText;
        let position3 = boxes[combination[2]].innerText;
        if (position1 !== "" && position2 !== "" && position3 !== "" && position1 === position2 && position2 === position3) {
            console.log("Winner");
            showWinner(position1); // Show the winner (either O or X)
            return; // Exit the function after a winner is found
        }
    }
    };        


const resetGame = () => {
    turnO = true;
    enableAllBoxes();
    message.classList.add("hidden");
    game.classList.remove("hidden");
    game.classList.remove("fade-out");
    resetButton.classList.remove("hidden");
    confettiContainer.innerHTML = "";
};

resetButton.addEventListener("click", resetGame); // Reset button is clicked, resetGame function is called
newButton.addEventListener("click", resetGame); // New game button is clicked, resetGame function is called