/**
EAT - func eat
  params: current cell (curCell)
  add carrots in cell to total carrot count
  update carrots in cell to 0

Each cell is an obj with carrot count and indices:
  { carrots: [row, col] }
 */

let carrotCount = 0;

function eat(curCell) {
  let cellCarrots = Object.keys(curCell)[0]; //carrots in cell
  let location = curCell[cellCarrots]; //indices of cell
  carrotCount += Number(cellCarrots); //add (numerical) carrots to total
  curCell = { 0: [location] }; //update cell carrots to 0
}
