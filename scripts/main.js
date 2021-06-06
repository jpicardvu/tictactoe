const Player = (name, score, shape) => {
  return {name, score, shape};
}

const gameBoard = (() => {
  grid = document.querySelector('.grid');
  let gridSize = 9;
  let boardArray = [];
  let shape;
  const updateButton = document.querySelector('#update-btn');
  updateButton.onclick = () => {
    const player1Input = document.querySelector('#player1-input');
    const player2Input = document.querySelector('#player2-input');
    const player1Name = document.querySelector('#player1-name');
    const player2Name = document.querySelector('#player2-name');
    if (player1Input.value !== '' && player1Input.value !== 'Player 1') {
      gameController.PlayerOne.name = player1Input.value;
      player1Name.textContent = gameController.PlayerOne.name + ':';
    }
    if (player2Input.value !== '' & player2Input.value !== 'Player 2') {
      gameController.PlayerTwo.name = player2Input.value;
      player2Name.textContent = gameController.PlayerTwo.name + ':';
    }
  }
  const restartButton = document.querySelector('#restart-btn');
  restartButton.onclick = () => {
    const gridButtonAll = document.querySelectorAll('.grid-button-all');
    gridButtonAll.forEach( button => {
    button.innerText = '';
    })
    gameBoard.boardArray = Array(gridSize).fill('');
    gameBoard.shape = '';
  }
  
  for (i = 0; i < gridSize; i++) {
    boardArray.push('')
    const gridButton = document.createElement('button');
    const player1Score = document.querySelector('#player1-score');
    const player2Score = document.querySelector('#player2-score');
    gridButton.id = 'grid-button-' + i;
    gridButton.classList.add('grid-button-all');
    gridButton.onclick = () => {
      const gridPosition = gridButton.id.slice(12)
      if (gameBoard.shape === 'X' && gameBoard.boardArray[gridPosition] === '') {
        gameBoard.shape = 'O';
        gameBoard.boardArray[gridPosition] = gameBoard.shape;
      }
      else if (gameBoard.boardArray[gridPosition] === '') {
        gameBoard.shape = 'X'; 
        gameBoard.boardArray[gridPosition] = gameBoard.shape;
      }
      gridButton.innerText = gameBoard.boardArray[gridPosition];
      let winningPlayer = gameController.winnerCheck();
      if (winningPlayer === 'X') {
        gameController.PlayerOne.score = gameController.PlayerOne.score + 1 || 1;
        alert(`${gameController.PlayerOne.name} wins!`);
        restartButton.click();
        player1Score.textContent = gameController.PlayerOne.score
      }
      else if (winningPlayer === 'O') {
        gameController.PlayerTwo.score = gameController.PlayerTwo.score + 1 || 1
        alert(`${gameController.PlayerTwo.name} wins!`);
        restartButton.click();
        player2Score.textContent = gameController.PlayerTwo.score
      }
    }
    grid.appendChild(gridButton);
  }
  return {boardArray, shape};
})();

const gameController = (() => {
  let PlayerOne = Player(name='Player 1');
  let PlayerTwo = Player(name='Player 2');

  const winCombos = {
    horizontal1: [0,1,2],
    horizontal2: [3,4,5],
    horizontal3: [6,7,8],
    vertical1: [0,3,6],
    vertical2: [1,4,7],
    vertical3: [2,5,8],
    diagonal1: [0,4,8],
    diagonal2: [2,4,6]
  }
  
  const winnerCheck = () => {
    const XIndices = gameBoard.boardArray.map((e, i) => e === 'X' ? i : '').filter(String);
    const OIndices = gameBoard.boardArray.map((e, i) => e === 'O' ? i : '').filter(String);
    for (let key in winCombos) {
      if ( winCombos[key].every( x => XIndices.includes(x)) ) {
        let winner = 'X';
        return winner;
      }
    }
    for (let key in winCombos) {
      if ( winCombos[key].every( o => OIndices.includes(o)) ) {
        let winner = 'O';
        return winner;
      }
    }
  };
  return {PlayerOne, PlayerTwo, winnerCheck};
})();