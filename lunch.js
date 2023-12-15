/** 
function lunchCount
input - garden (matrix of carrot counts)
output - total # of carrots eaten

CREATE 3 HELPER FUNCTIONS:

FIND START - func findStart
determine start pt

EAT - func eat
add carrots in cell to total
and reset that cell to 0 carrots

MOVE - func move
check all directions
compare vals
if tied for highest - choose in WNES order
if no carrots in W,N,E or S - sleep (exit 'move & eat' loop)

Then...
LUNCH - func lunch (contains all three helper functions)
run findStart()
run eat() - even if cell contains 0 carrots

run move()
  if no carrots are available, exit eat/run loop
  otherwise, run eat() followed by move()

return total carrots (once no moves remain)
*/

let carrotCount = 0;
let moreCarrots = true;
let curCell;
let cellAfterEating;

function lunchCount(garden) {
  curCell = findStart(garden); //start cell

  while (moreCarrots) {
    //run until 'break' (in move)
    cellAfterEating = eat(curCell);
    curCell = move(garden, cellAfterEating);
    // if (moreCarrots === false) {
    //   break;
    // }
    // curCell = eatAndMove(curCell); //run eat, then move
  }

  console.log(
    `Baby Leveret ate ${carrotCount} carrots. Time to take a...zzz...`
  );
  return carrotCount;
}

// function eatAndMove(cell) {
//   let cellAfterEating = eat(cell);
//   let nextCell = move(cellAfterEating);
//   return nextCell;
// }

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

  // console.log(`   The "findStart" func has been run.`);
  // console.log(
  //   `Baby Leveret will start at row ${row + 1}, column ${
  //     col + 1
  //   } - that's 'garden[${row}][${col}]' for all you computer nerds out there. Time to eat!`
  // );

  return cell; //this will be our starting position
}

function eat(cell) {
  let cellCarrots = Object.keys(cell)[0]; //carrots in cell
  let indices = cell[cellCarrots]; //indices of cell - ex. [1, 3]
  // console.log(`cellCarrots, before: ${cellCarrots}`);
  // console.log(`carrotCount, before: ${carrotCount}`);
  // console.log(`cell, before: ${cell}`);

  carrotCount += Number(cellCarrots); //add (numerical) carrots to total
  cell["0"] = indices;
  garden[indices[0]][indices[1]] = 0;
  // cell["0"] = indices; //update cell carrots to 0
  // delete cell[cellCarrots]; //delete orig key/val pair

  // console.log(`    --FUNC--`);
  cellCarrots = Number(Object.keys(cell)[0]);
  // console.log(`cellCarrots, after: ${cellCarrots}`);
  // console.log(`carrotCount, after: ${carrotCount}`);
  // console.log(cell);
  // console.log(
  //   `   The "eat" func has been run. ${carrotCount} carrots have been eaten.`
  // );
  return cell;
}

function move(garden, cellA) {
  //cell =    { carrots: [row, col] }
  // let carrots = Object.keys(cell)[0]; //carrots in cell   0
  // let location = cell[carrots]; //indices of cell  ex. [1], [3]

  // console.log(cellA); //{0: [1,3]}

  let arrOfIndices = Object.values(cellA); //[[1,3]]
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

  // console.log(`Max: ${max}`);
  if (max === 0) {
    moreCarrots = false;
  }

  // console.log(`More carrots? ${moreCarrots}`);

  // console.log(`max: ${max}`);
  // console.log(`index: ${index}`);

  switch (index) {
    case 0: //west
      curCell = { [garden[row][col - 1]]: [row, col - 1] };
      break;
    case 1: //north
      curCell = { [garden[row - 1][col]]: [row - 1, col] };
      break;
    case 2: //east
      curCell = { [garden[row][col + 1]]: [row, col + 1] };
      break;
    case 3: //south
      curCell = { [garden[row + 1][col]]: [row + 1, col] };
      break;
  }

  // if (Number(Object.keys(curCell)[0]) === 0) {
  //   moreCarrots = false;
  // }

  // if (moreCarrots === false) {
  //   break;
  // }

  // console.log(`Baby Leveret is moving to ${curCell}`);
  // console.log(`   The "move" func has been run.`);

  return curCell;
}
