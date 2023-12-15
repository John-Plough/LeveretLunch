function eatAndMove(cell) {
  let cellAfterEating = eat(cell);
  let nextCell = move(cellAfterEating);
  return nextCell;
}
