/**
MOVE - func move

check all directions
  compare number of carrots at each of those cells
    if tied for highest
      choose in WNES order
    if 0 carrots in W,N,E and S
      sleep
 */

/**
Each cell is represented by an object:
  The key is the number of carrots currently in that cell
  The value is an array with two elements: the row index, the col index

  cell = { carrots: [row, col] }
  ex.    {4: [1, 3]}
 */

let garden = [
  [2, 3, 1, 4, 2, 2, 3],
  [2, 3, 0, 4, 0, 3, 0],
  [1, 7, 0, 2, 1, 2, 3],
  [9, 3, 0, 4, 2, 0, 3],
];

let cell = { 0: [1, 3] };

function move(garden, cell) {
  //cell =    { carrots: [row, col] }
  // let carrots = Object.keys(cell)[0]; //carrots in cell   0
  // let location = cell[carrots]; //indices of cell  ex. [1], [3]

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
  console.log(`carrots at each bearing: ${bearings}`);
  let max = bearings[0];
  let index = 0;

  for (let i = 1; i < bearings.length; i++) {
    if (bearings[i] > max) {
      max = bearings[i];
      index = i;
    }
  }

  console.log(`max: ${max}`);
  console.log(`index: ${index}`);

  switch (index) {
    case 0: //west
      cell = { [garden[row][col - 1]]: [row, col - 1] };
      break;
    case 1: //north
      cell = { [garden[row - 1][col]]: [row - 1, col] };
      break;
    case 2: //east
      cell = { [garden[row][col + 1]]: [row, col + 1] };
      break;
    case 3: //south
      cell = { [garden[row + 1][col]]: [row + 1, col] };
      break;
  }

  return cell;
}

/**
 * if no moves available,
 *  noCarrots = true
 * if noCarrots, end loop
 * else, run eat/move
 *
 */
