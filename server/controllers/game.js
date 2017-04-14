export function checkGameWin(board) {
	console.log(board);
    const winningsTable = [
      [0,2,8,11,7,1],
      [2,5,12,15,11,4],
      [5,9,16,19,15,8],
      [12,16,23,26,22,15],
      [19,23,30,33,29,22],
      [22,26,33,35,32,25],
      [25,29,35,36,34,28],
      [21,25,32,34,31,24],
      [17,21,28,31,27,20],
      [10,14,21,24,20,13],
      [3,7,14,17,13,6],
      [1,4,11,14,10,3],
      [4,8,15,18,14,7],
      [8,12,19,22,18,11],
      [15,19,26,29,25,18],
      [22,26,33,35,32,25],
      [18,22,29,32,28,21],
      [14,18,25,28,24,17],
      [7,11,18,21,17,10],
      [11,15,22,25,21,14]
    ]

    let winner = null;

    const player1Piece = 10;
    const player2Piece = 20;
    // Check if I won
    winningsTable.map((circle,index) => {
      let count = 0
      circle.map((piece) => {
        if (board[piece] === player1Piece) { 
          count++ 
        }
      })
      if (count === 6) {
        console.log('OPPONENT 1 WON - ie BLACK');
        winner = 'black';
      }
    })
    // Check if the other player won
    winningsTable.map((circle,index) => {
      let count = 0
      circle.map((piece) => {
        if (board[piece] === player2Piece) { 
          count++ 
        }
      })
      if (count === 6) {
        console.log('OPPONENT 2 WON - ie WHITE')
        winner = 'white'
      }
    })

    return winner;
  }