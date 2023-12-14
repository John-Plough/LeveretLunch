/**
MOVE - func move

check all directions
  compare number of carrots at each of those cells
    if tied for highest
      choose in WNES order
    if 0 carrots in W,N,E and S
      sleep

Each cell is an obj with carrot count and indices:
  { carrots: [row, col] }
 */

// [2, 3, 1, 4, 2, 2, 3]
// [2, 3, 0, 4, 0, 3, 0]
// [1, 7, 0, 2, 1, 2, 3]
// [9, 3, 0, 4, 2, 0, 3]

function move(cell) {
  //cell =    { carrots: [row, col] }
  let carrots = Object.keys(cell)[0]; //carrots in cell   0
  let location = curCell[carrots]; //indices of cell  ex. [1,3]

  let west = garden[1][2]; //0
  let north = garden[0][3]; //4
  let east = garden[1][4]; //0
  let south = garden[2][3]; //2
}
