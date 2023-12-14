/** CREATE findStart FUNC
func determines indices of starting position
  make startArr = []

  if rows are odd, add middle row to startArr
  if rows are even, add both middle rows to startArr
  if cols are odd, add middle col to startArr
  if cols are even, add both middle cols to startArr
  
  compare startArr positions, and choose the one with most carrots
  return indices
 */

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
  let indices = [rowA, colA];

  //even rows & even cols
  if (evenRows && evenCols) {
    if (garden[rowB][colB] > mostCarrots) {
      mostCarrots = garden[rowB][colB];
      indices = [rowB, colB];
    }
    if (garden[rowB][colA] > mostCarrots) {
      mostCarrots = garden[rowB][colA];
      indices = [rowB, colA];
    }
    if (garden[rowA][colB] > mostCarrots) {
      mostCarrots = garden[rowA][colB];
      indices = [rowA, colB];
    }
  }

  //even rows, odd cols
  else if (evenRows) {
    if (garden[rowB][colA] > mostCarrots) {
      mostCarrots = garden[rowB][colA];
      indices = [rowB, colA];
    }
  }

  //odd rows, even cols
  else if (evenCols) {
    if (garden[rowA][colB] > mostCarrots) {
      mostCarrots = garden[rowA][colB];
      indices = [rowA, colB];
    }
  }

  console.log(`Most carrots: ${mostCarrots}`);
  console.log(`Starting index: ${indices}`);
  return indices; //this will be our starting position
}
