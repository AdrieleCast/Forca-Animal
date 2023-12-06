const words = ["cachorro", "panda", "cavalo", "girafa", "gato", "gamba", "coelho", "hamster", "rato", "coala"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill('_');
let incorrectLetters = [];
let attempts = 6;

function displayWord() {
    document.getElementById ('word-container').textContent = guessedWord.join(' ');
}

function displayIncorrectLetters() {
    document.getElementById ('incorrect-letters').textContent = `Palpites Incorretos: ${incorrectLetters.join(', ')}`;
}

function displayHangman() {
    document.getElementById('hangman-drawing').style.background = `url('imagens/hangman_${attempts}.png') no-repeat center`;
}

function guessLetter() {
    const inputElement = document.getElementById('letter-input');
    const letter = inputElement.value.toLowerCase();

    if (!letter.match('[a-z]') || letter.length !== 1) {
        alert ("Por favor, insira uma letra válida.");
        return;
    }

    if (guessedWord.includes(letter) || incorrectLetters.includes(letter)) {
        alert("Você já tentou esta letra.");
        return;
    }

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        incorrectLetters.push(letter);
        attempts--;
        displayHangman();
    }

    displayWord();
    displayIncorrectLetters();

    if (guessedWord.join('') === selectedWord) {
        alert(`Parabéns era "${selectedWord}"! Você venceu!`);
        
    }

    if (attempts === 0) {
        alert(`Você perdeu! A palavra era "${selectedWord}".`);
        resetGame();
    }

    inputElement.value = '';
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    incorrectLetters = [];
    attempts = 6;
    displayWord();
    displayIncorrectLetters();
    displayHangman();
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
}

function displayMessage(message) {
    document.getElementById('message-container').textContent = message;
}

// ... (seu código existente)

// Adicione esta função para lidar com a tecla "Enter"
function handleEnter(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
}

// Adicione um ouvinte de evento para o campo de entrada
document.getElementById('letter-input').addEventListener('keyup', handleEnter);

// ... (o resto do seu código)
// ... (seu código existente)

// Adicione um ouvinte de evento para o ícone de reset
document.getElementById('reset-icon').addEventListener('click', resetGame);

// ... (o resto do seu código)

