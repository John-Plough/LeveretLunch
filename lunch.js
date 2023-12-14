/** lunchCount: return # of carrots eaten
 *input - garden (matrix of carrot counts)
 *output - # of carrots
 */

/** CREATE HELPER FUNCTIONS:

START - func findStart
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

function lunchCount(garden) {}

[
  [1, 1, 1],
  [0, 1, 1],
  [9, 1, 9],
];

[
  [9, 9, 9, 9],
  [9, 3, 1, 0],
  [9, 1, 4, 2],
  [9, 9, 1, 0],
];

[
  [2, 3, 1, 4, 2, 2, 3],
  [2, 3, 0, 4, 0, 3, 0],
  [1, 7, 0, 2, 1, 2, 3],
  [9, 3, 0, 4, 2, 0, 3],
];
