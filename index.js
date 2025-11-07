var rspDatabase = {
    'rock': {'scissors': 0, 'rock': 0, 'paper': 0},
    'paper': {'rock':0, 'paper':0, 'scissors': 0},
    'scissors': {'paper':0, 'scissors':0, 'rock': 0}
};

let userScore = 0;
let compScore = 0;
let roundIndex = 0;

const buttons = document.querySelectorAll('button[data-choice]');
const roundResult = document.getElementById('roundResult');
const scoreEl = document.getElementById('score');
const historyEl = document.getElementById('history');
const resetBtn = document.getElementById('reset');

function randomChoice() {
  const choices = ['rock','paper','scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function decideWinner(user, comp) {
  if (user === comp) return 'draw';
  if (
    (user === 'rock' && comp === 'scissors') ||
    (user === 'scissors' && comp === 'paper') ||
    (user === 'paper' && comp === 'rock')
  ) return 'win';
  return 'lose';
}

function updateDatabase(user, comp) {
  rspDatabase[user][comp] += 1;
}

function updateUI(user, comp, result) {
  roundIndex += 1;

  roundResult.innerText = `You - ${capitalize(user)}, Computer - ${capitalize(comp)} → ${result === 'win' ? 'You win!' : result === 'lose' ? 'Computer wins!' : 'Draw.'}`;

  const li = document.createElement('li');
  li.innerText = `${roundIndex}. You - ${capitalize(user)}, Computer - ${capitalize(comp)}`;
  historyEl.appendChild(li);

  scoreEl.innerText = `Score: You - ${userScore}, Computer - ${compScore}`;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


function playRound(userChoice) {
  const compChoice = randomChoice();
  const result = decideWinner(userChoice, compChoice);
  updateDatabase(userChoice, compChoice);

  if (result === 'win') userScore += 1;
  if (result === 'lose') compScore += 1;

  updateUI(userChoice, compChoice, result);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.getAttribute('data-choice');
    playRound(choice);
  });
});


resetBtn.addEventListener('click', () => {
  userScore = 0;
  compScore = 0;
  roundIndex = 0;

  Object.keys(rspDatabase).forEach(user => {
    Object.keys(rspDatabase[user]).forEach(comp => {
      rspDatabase[user][comp] = 0;
    });
  });
  roundResult.innerText = '';
  historyEl.innerHTML = '';
  scoreEl.innerText = `Score: You - 0, Computer - 0`;
});

