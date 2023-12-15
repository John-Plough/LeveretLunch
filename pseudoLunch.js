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
