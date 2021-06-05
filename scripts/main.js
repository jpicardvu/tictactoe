const Player = (name, score, shape) => {
  return {name, score, shape};
}

const tictactoe = (() => {
  grid = document.querySelector('.grid');
  let gridSize = 9;
  let board = [];
  let Player1 = Player();
  let Player2 = Player();
  let shape;
  
  const updateButton = document.querySelector('#update-btn');
  updateButton.onclick = () => {
    const player1Input = document.querySelector('#player1-input');
    const player2Input = document.querySelector('#player2-input');
    const player1Name = document.querySelector('#player1-name');
    const player2Name = document.querySelector('#player2-name');
    tictactoe.Player1.name = player1Input.value;
    tictactoe.Player2.name = player2Input.value;
    if (player1Input.value !== '') {
      player1Name.textContent = tictactoe.Player1.name + ':';
    }
    if (player2Input.value !== '') {
      player2Name.textContent = tictactoe.Player2.name + ':';
    }
  }
  const restartButton = document.querySelector('#restart-btn');
  restartButton.onclick = () => {
    const gridButtonAll = document.querySelectorAll('.grid-button-all');
    gridButtonAll.forEach( button => {
    button.innerText = '';
    });
    tictactoe.board = Array(gridSize).fill('');
    tictactoe.shape = '';
  }
  
  for (i = 0; i < gridSize; i++) {
    board.push('')
    const gridButton = document.createElement('button');
    gridButton.id = 'grid-button-' + i;
    gridButton.classList.add('grid-button-all');
    gridButton.onclick = () => {
      const gridPosition = gridButton.id.slice(12)
      if (tictactoe.shape === 'X' && tictactoe.board[gridPosition] === '') {
        tictactoe.shape = 'O';
        tictactoe.board[gridPosition] = tictactoe.shape;
      }
      else if (tictactoe.board[gridPosition] === '') {
        tictactoe.shape = 'X'; 
        tictactoe.board[gridPosition] = tictactoe.shape;
      }
      gridButton.innerText = tictactoe.board[gridPosition];
    }
    grid.appendChild(gridButton);
  }
  return {board, shape, Player1, Player2};
})();