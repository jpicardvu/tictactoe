const tictactoe = (() => {
  grid = document.querySelector('.grid')
  let gridSize = 9;
  let board = []
  let shape;
  
  for (i = 0; i < gridSize; i++) {
    board.push('')
    const gridButton = document.createElement('button');
    gridButton.id = 'grid-button-' + i;
    gridButton.classList.add('grid-button-all');
    gridButton.onclick = () => {
      const gridPosition = gridButton.id.slice(12)
      if (this.shape === 'X') {
        this.shape = 'O';
        board[gridPosition] = this.shape;
      }
      else {
        this.shape = 'X';
        board[gridPosition] = this.shape;
      }
      gridButton.innerText = board[gridPosition];
    }
    grid.appendChild(gridButton);
  }
  return {board,shape};
})();

const Player = (name, score, shape) => {
  return {name, score, shape};
}