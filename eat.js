/**
EAT - func eat
  params: current cell
  add carrots in cell to total carrot count
  update carrots in cell to 0
 */

/**
Each cell is represented by an object:
  The key is the number of carrots currently in that cell
  The value is an array with two elements: the row index, the col index

  cell = { carrots: [row, col] }
  ex.    {4: [1, 3]}
 */

let carrotCount = 0;

function eat(cell) {
  let cellCarrots = Object.keys(cell)[0]; //carrots in cell
  let indices = cell[cellCarrots]; //indices of cell - ex. [1, 3]
  console.log(`cellCarrots, before: ${cellCarrots}`);
  console.log(`cell, before: ${cell}`);

  carrotCount += Number(cellCarrots); //add (numerical) carrots to total
  cell["0"] = indices; //update cell carrots to 0
  delete cell[cellCarrots]; //delete orig key/val pair

  console.log(`    --FUNC--`);
  cellCarrots = Object.keys(cell)[0];
  console.log(`cellCarrots, after: ${cellCarrots}`);
  console.log(`cell, after: ${cell}`);
  return cell;
}

console.log(cell);
console.log(cell);
