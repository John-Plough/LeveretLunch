/** lunchCount: return # of carrots eaten
 *input - garden (matrix of carrot counts)
 *output - # of carrots
 */

/** CREATE HELPER FUNCTIONS:

FIND START - func findStart
determine start pt

EAT - func eat
add carrots in cell to total
and reset that cell to 0 carrots

MOVE - func move
check all directions
compare vals
if tied for highest, choose in WNES order
if no carrots in W,N,E or S
sleep

return total (# of carrots) */

let carrotCount = 0;

function lunchCount(garden) {
  let cell = findStart(garden);

  cellAfterEating = eat(cell);

  nextCell = move(garden, cellAfterEating);
  cellAfterEating = eat(nextCell);

  nextCell = move(garden, cellAfterEating);
  cellAfterEating = eat(nextCell);

  nextCell = move(garden, cellAfterEating);
  cellAfterEating = eat(nextCell);

  nextCell = move(garden, cellAfterEating);
  cellAfterEating = eat(nextCell);

  return carrotCount;
}

function findStart(garden) {
  //func to calculate starting indices
  const startArr = [];
  let numOfRows = garden.length;
  let numOfCols = garden[0].length;
  let evenRows = false;
  let evenCols = false;

  //find row/s
  let rowA; //which row to start on
  let rowB; //plus this one, if even rows
  if (numOfRows % 2 === 0) {
    //if even number of rows
    evenRows = true;
    rowA = numOfRows / 2 - 1;
    rowB = numOfRows / 2;
  } else {
    //odd number of rows
    rowA = Math.ceil(numOfRows / 2) - 1;
  }

  //find column/s
  let colA; //which col to start on
  let colB; //plus this one, if even columns
  if (numOfCols % 2 === 0) {
    //if even number of cols
    evenCols = true;
    colA = numOfCols / 2 - 1;
    colB = numOfCols / 2;
  } else {
    //odd number of cols
    colA = Math.ceil(numOfCols / 2) - 1;
  }

  //populate startArr with objs that contain possible starting positions
  startArr[0] = { [garden[rowA][colA]]: [rowA, colA] }; //array position = {carrots: [indices]}
  if (evenRows && evenCols) {
    startArr[1] = { [garden[rowB][colB]]: [rowB, colB] };
    startArr[2] = { [garden[rowB][colA]]: [rowB, colA] };
    startArr[3] = { [garden[rowA][colB]]: [rowA, colB] };
  } else if (evenRows) {
    startArr[2] = { [garden[rowB][colA]]: [rowB, colA] };
  } else if (evenCols) {
    startArr[3] = { [garden[rowA][colB]]: [rowA, colB] };
  }

  //assign indices of starting position, based on max carrots:

  //odd rows & odd cols (default)
  let mostCarrots = garden[rowA][colA];
  let indices = [[rowA], [colA]];

  //even rows & even cols
  if (evenRows && evenCols) {
    if (garden[rowB][colB] > mostCarrots) {
      mostCarrots = garden[rowB][colB];
      indices = [[rowB], [colB]];
    }
    if (garden[rowB][colA] > mostCarrots) {
      mostCarrots = garden[rowB][colA];
      indices = [[rowB], [colA]];
    }
    if (garden[rowA][colB] > mostCarrots) {
      mostCarrots = garden[rowA][colB];
      indices = [[rowA], [colB]];
    }
  }

  //even rows, odd cols
  else if (evenRows) {
    if (garden[rowB][colA] > mostCarrots) {
      mostCarrots = garden[rowB][colA];
      indices = [[rowB], [colA]];
    }
  }

  //odd rows, even cols
  else if (evenCols) {
    if (garden[rowA][colB] > mostCarrots) {
      mostCarrots = garden[rowA][colB];
      indices = [[rowA], [colB]];
    }
  }

  let row = indices[0][0];
  let col = indices[1][0];

  let cell = { [garden[row][col]]: [row, col] };
  //  cell = { carrots: [row, col] }

  console.log(`   The "findStart" func has been run.`);
  console.log(
    `Baby Leveret will start at row ${row + 1}, column ${
      col + 1
    }. Time to start eating!`
  );

  return cell; //this will be our starting position
}

function eat(cell) {
  let cellCarrots = Object.keys(cell)[0]; //carrots in cell
  let indices = cell[cellCarrots]; //indices of cell - ex. [1, 3]
  // console.log(`cellCarrots, before: ${cellCarrots}`);
  // console.log(`cell, before: ${cell}`);

  carrotCount += Number(cellCarrots); //add (numerical) carrots to total
  garden[indices[0]][indices[1]] = 0;
  // cell["0"] = indices; //update cell carrots to 0
  // delete cell[cellCarrots]; //delete orig key/val pair

  // console.log(`    --FUNC--`);
  cellCarrots = Object.keys(cell)[0];
  // console.log(`cellCarrots, after: ${cellCarrots}`);
  // console.log(`cell, after: ${cell}`);
  console.log(
    `   The "eat" func has been run. ${carrotCount} carrots have been eaten.`
  );
  return cell;
}

function move(garden, cell) {
  //cell =    { carrots: [row, col] }
  // let carrots = Object.keys(cell)[0]; //carrots in cell   0
  // let location = cell[carrots]; //indices of cell  ex. [1], [3]

  // console.log(cell);

  let arrOfIndices = Object.values(cell); //[[1,3]]
  let row = arrOfIndices[0][0];
  let col = arrOfIndices[0][1];

  const bearings = []; //create arr to hold options for next move

  //define carrots in cell at all potential moves
  //if val is undefined, reassign to 0

  let west;
  if (col > 0) {
    west = garden[row][col - 1]; //0 carrots
  } else {
    west = 0;
  }

  let north;
  if (row > 0) {
    north = garden[row - 1][col]; //4 carrots
  } else {
    north = 0;
  }

  let east;
  if (col < garden[0].length - 1) {
    east = garden[row][col + 1]; //4 carrots
  } else {
    east = 0;
  }

  let south;
  if (row < garden.length - 1) {
    south = garden[row + 1][col]; //4 carrots
  } else {
    south = 0;
  }

  bearings.push(west, north, east, south);
  // console.log(`carrots at each bearing: ${bearings}`);
  let max = bearings[0];
  let index = 0;

  for (let i = 1; i < bearings.length; i++) {
    if (bearings[i] > max) {
      max = bearings[i];
      index = i;
    }
  }

  // console.log(`max: ${max}`);
  // console.log(`index: ${index}`);

  let nextCell;

  switch (index) {
    case 0: //west
      nextCell = { [garden[row][col - 1]]: [row, col - 1] };
      break;
    case 1: //north
      nextCell = { [garden[row - 1][col]]: [row - 1, col] };
      break;
    case 2: //east
      nextCell = { [garden[row][col + 1]]: [row, col + 1] };
      break;
    case 3: //south
      nextCell = { [garden[row + 1][col]]: [row + 1, col] };
      break;
  }
  // console.log(`Baby Leveret is moving to ${nextCell}`);
  console.log(`   The "move" func has been run.`);

  console.log(nextCell);
  return nextCell;
}

// [
//   [1, 1, 1],
//   [0, 1, 1],
//   [9, 1, 9],
// ];

// [
//   [9, 9, 9, 9],
//   [9, 3, 1, 0],
//   [9, 1, 4, 2],
//   [9, 9, 1, 0],
// ];

// [
//   [2, 3, 1, 4, 2, 2, 3],
//   [2, 3, 0, 4, 0, 3, 0],
//   [1, 7, 0, 2, 1, 2, 3],
//   [9, 3, 0, 4, 2, 0, 3],
// ];
