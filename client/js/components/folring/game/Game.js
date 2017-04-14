import React from "react";

import Piece from "./Piece";

import winGame from '../../../helpers/win_game';
import newGame from '../../../helpers/new_game';

if (process.env.BROWSER) {
  require('./Game.css');
}

export default class Game extends React.Component {

  constructor() {
    super();
    // this.state = {
    //   pieceSelected: false,
    //   selectedIndex: null,
    //   me: 10,
    //   meSelected: 11,
    //   piecesLeft: 18,
    //   turn: 0,
    //   board: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    //   // 0 - empty slot
    //   // 10 - player 1 piece (black)
    //   // 11 - player 1 piece selected
    //   // 20 - player 2 piece (white)
    //   // 21 - player 2 piece selected
    // }
    this.state = newGame;
  }

  componentDidMount() {
    // Set correct height and vertical position for the game board
    const board = document.querySelector('.folring-holder')
    board.style.height = board.offsetWidth+"px"

    // const messaging = document.querySelector('#messaging')
    // messaging.style.height = "calc(100% - "+parseInt(board.offsetWidth+54)+"px)"
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.room.game) {
      // Determine which side the player is
      if (nextProps.user != undefined) {

        if ( nextProps.user._id === nextProps.room.players[0]._id) {
          this.playerSide = 0
          console.log("I AM BLACK")
        }
        if ( nextProps.room.players.length > 1 ) {
          if (nextProps.user._id === nextProps.room.players[1]._id) {
            this.playerSide = 1
            console.log("I AM WHITE")
          }
        }
      }
      const newState = {...nextProps.room.game};
      this.setState({...newState}, () => {
        console.log("NEW STATE", this.state)
      });
    } 
  }

  sendState() {
    // this.checkTheGame();
    
    // Send game state to server
    this.props.sendGame({game: this.state})
  }

  handleClick(piece) {
    console.log("HANDLING CLICK")
    // If it's not my turn, don't even process
    if (this.playerSide != this.state.turn) { return }

      console.log("GETTING PAST PLAYER SIDE")

    const myPiece = this.playerSide === 0 ? 10 : 20
    const myPieceSelected = this.playerSide === 0 ? 11 : 21

    // If clicking on empty place, add new piece
    if (this.state.board[piece] === 0) {
      if (document.querySelector('#p'+piece).classList.contains("jumpTo")) {
        const eatFrom = this.getEdible({ from: this.state.selectedIndex, to: piece })
        const opponentPiece = this.playerSide === 0 ? 20 : 10
        // If eating spot has enemy piece, eat it
        if (this.state.board[eatFrom] === opponentPiece) {
          this.eatPiece({ at: eatFrom, andGoTo: piece })
        }
      }
      else {
        this.addPiece(piece) 
      }
    }
    // If clicking on existing own piece, select the piece
    if (this.state.board[piece] === myPiece && !this.state.pieceSelected) {

      this.selectPiece(piece)
    }
    // If clicking on selected piece then unselect
    if (this.state.board[piece] === myPieceSelected && this.state.pieceSelected) {
      this.unselectPiece(piece)
    }
    // If clicking on empty place and something was selected then move the piece
    if (this.state.board[piece] === 0 && this.state.pieceSelected) {
      if (document.querySelector('#p'+piece).classList.contains("highlight")) {
        this.moveSelectedPieceTo(piece)
      }
    }
  }

  updatePiece(piece, value) {
    let nextBoard = [...this.state.board]
    nextBoard[piece] = value
    this.setState({
      board: nextBoard
    }, () => this.sendState())
  }

  selectPiece(piece) {
    const myPieceSelected = this.playerSide === 0 ? 11 : 21
    this.setState({...this.state, pieceSelected: true, selectedIndex: piece }, () => this.sendState())
    this.updatePiece(piece, myPieceSelected)
  }

  unselectPiece(piece) {
    const myPiece = this.playerSide === 0 ? 10 : 20
    this.setState({...this.state, pieceSelected: false, selectedIndex: null }, () => this.sendState())
    this.updatePiece(piece, myPiece)
  }

  addPiece(piece) {
    // If I am player number 0 add black piece (10) otherwise add white (20)
    const myPiece = this.playerSide === 0 ? 10 : 20
    if (this.state.piecesLeft > 0 && !this.state.pieceSelected) {
      let nextBoard = [...this.state.board]
      nextBoard[piece] = myPiece
      // Change turns
      const nextTurn = this.state.turn === 0 ? 1 : 0
      this.setState({...this.state, turn: nextTurn, piecesLeft: (this.state.piecesLeft - 1), board: nextBoard }, () => this.sendState())
    }
  }

  eatPiece(options) {
    const myPiece = this.playerSide === 0 ? 10 : 20
    // Clear the spot where enemy piece was and move the piece that ate it over to it's destination
    let nextBoard = [...this.state.board]
    nextBoard[this.state.selectedIndex] = 0
    nextBoard[options.at] = 0
    nextBoard[options.andGoTo] = myPiece
    const nextTurn = this.state.turn === 0 ? 1 : 0
    this.setState({
      turn: nextTurn, 
      pieceSelected: false, 
      selectedIndex: null,
      board: nextBoard
    }, () => this.sendState())
  }

  clearPiece(piece) {
    this.updatePiece(piece, 0)
  }

  moveSelectedPieceTo(piece) {
    const myPiece = this.playerSide === 0 ? 10 : 20
    let nextBoard = [...this.state.board]
    nextBoard[piece] = myPiece
    nextBoard[this.state.selectedIndex] = 0
    const nextTurn = this.state.turn === 0 ? 1 : 0
    this.setState({...this.state, 
      turn: nextTurn, 
      pieceSelected: false, 
      selectedIndex: null,
      board: nextBoard
    }, () => this.sendState())
  }

  highlightNeighbours(piece) {
    // This is a map of neighbours for each piece.
    // When player selects a piece we will add highlight class for the neighbours
    // so that can be used to check for allowed moves
    const mapOfNeighbours = {
      0: [1,2,4],
      1: [0,4,7,3],
      2: [0,4,8,5],
      3: [1,7,10,6],
      4: [0,2,8,11,7,1],
      5: [2,8,12,9],
      6: [3,10,13],
      7: [1,4,11,14,10,3],
      8: [2,5,12,15,11,4],
      9: [16,12,5],
      10: [3,7,14,17,13,6],
      11: [4,8,15,18,14,7],
      12: [5,9,16,19,15,8],
      13: [6,10,17,20],
      14: [7,11,18,21,17,10],
      15: [8,12,19,22,18,11],
      16: [23,19,12,9],
      17: [10,14,21,24,20,13],
      18: [11,15,22,25,21,14],
      19: [12,16,23,26,22,15],
      20: [13,17,24,27],
      21: [14,18,25,28,24,17],
      22: [15,19,26,29,25,18],
      23: [30,26,19,16],
      24: [17,21,28,31,27,20],
      25: [18,22,29,32,28,21],
      26: [19,23,30,33,29,22],
      27: [20,24,31],
      28: [21,25,32,34,31,24],
      29: [22,26,33,35,32,25],
      30: [33,26,23],
      31: [24,28,34,27],
      32: [25,29,35,34,28],
      33: [26,30,35,29],
      34: [28,32,31,36],
      35: [29,33,32,36],
      36: [32,35,34]
    }
    mapOfNeighbours[piece].map((piece, index) => {
      document.querySelector('#p'+piece).classList.add("highlight")
    })
    this.highlightHuntingZone(piece)
  }

  getEdible(options) {
    const eatingTable = [
      [{d:3,e:1},{d:11,e:4},{d:5,e:2}],
      [{d:6,e:3},{d:14,e:7},{d:8,e:4}],
      [{d:7,e:4},{d:15,e:8},{d:9,e:5}],
      [{d:17,e:10},{d:11,e:7},{d:0,e:1}],
      [{d:10,e:7},{d:18,e:11},{d:12,e:8}],
      [{d:0,e:2},{d:11,e:8},{d:19,e:12}],
      [{d:20,e:13},{d:14,e:10},{d:1,e:3}],
      [{d:13,e:10},{d:21,e:14},{d:15,e:11},{d:2,e:4}],
      [{d:1,e:4},{d:14,e:11},{d:22,e:15},{d:16,e:12}],
      [{d:2,e:5},{d:15,e:12},{d:23,e:16}],
      [{d:24,e:17},{d:18,e:14},{d:4,e:7}],
      [{d:0,e:4},{d:3,e:7},{d:17,e:14},{d:25,e:18},{d:19,e:15},{d:5,e:8}],
      [{d:4,e:8},{d:18,e:15},{d:26,e:19}],
      [{d:27,e:20},{d:21,e:17},{d:7,e:10}],
      [{d:1,e:7},{d:6,e:10},{d:20,e:17},{d:28,e:21},{d:22,e:18},{d:8,e:11}],
      [{d:2,e:8},{d:7,e:11},{d:21,e:18},{d:29,e:22},{d:9,e:12},{d:23,e:19}],
      [{d:8,e:12},{d:22,e:19},{d:30,e:23}],
      [{d:3,e:10},{d:31,e:24},{d:25,e:21},{d:11,e:14}],
      [{d:4,e:11},{d:10,e:14},{d:24,e:21},{d:32,e:25},{d:26,e:22},{d:12,e:15}],
      [{d:5,e:12},{d:11,e:15},{d:25,e:22},{d:33,e:26}],
      [{d:6,e:13},{d:28,e:24},{d:14,e:17}],
      [{d:7,e:14},{d:13,e:17},{d:27,e:24},{d:34,e:28},{d:29,e:25},{d:15,e:18}],
      [{d:8,e:15},{d:14,e:18},{d:28,e:25},{d:35,e:29},{d:30,e:26},{d:16,e:19}],
      [{d:9,e:16},{d:15,e:19},{d:29,e:26}],
      [{d:10,e:17},{d:32,e:28},{d:18,e:21}],
      [{d:11,e:18},{d:17,e:21},{d:31,e:28},{d:36,e:32},{d:33,e:29},{d:19,e:22}],
      [{d:12,e:19},{d:18,e:22},{d:32,e:29}],
      [{d:13,e:20},{d:34,e:31},{d:21,e:24}],
      [{d:14,e:21},{d:20,e:24},{d:35,e:32},{d:22,e:25}],
      [{d:15,e:22},{d:21,e:25},{d:34,e:32},{d:23,e:26}],
      [{d:16,e:23},{d:22,e:26},{d:35,e:33}],
      [{d:17,e:24},{d:36,e:34},{d:25,e:28}],
      [{d:18,e:25},{d:24,e:28},{d:26,e:29}],
      [{d:19,e:26},{d:25,e:29},{d:36,e:35}],
      [{d:21,e:28},{d:27,e:31},{d:29,e:32}],
      [{d:22,e:29},{d:28,e:32},{d:30,e:33}],
      [{d:25,e:32},{d:31,e:34},{d:33,e:35}]
    ]

    let ediblePiece
    // Let's cycle through that table and find out which piece can be eated, 
    // based on from/to pieces received from handleClick()
    eatingTable[options.from].forEach(function(zone) {
      if (zone.d === options.to) {
        ediblePiece = zone.e
      }
    })
    return ediblePiece
  }

  highlightHuntingZone(piece) {
    // This marks jump spots and edible spots by adding CSS classes

    // index = starting point
    // d = destination for jump
    // e = spot to get eaten
    const eatingTable = [
      [{d:3,e:1},{d:11,e:4},{d:5,e:2}],
      [{d:6,e:3},{d:14,e:7},{d:8,e:4}],
      [{d:7,e:4},{d:15,e:8},{d:9,e:5}],
      [{d:17,e:10},{d:11,e:7},{d:0,e:1}],
      [{d:10,e:7},{d:18,e:11},{d:12,e:8}],
      [{d:0,e:2},{d:11,e:8},{d:19,e:12}],
      [{d:20,e:13},{d:14,e:10},{d:1,e:3}],
      [{d:13,e:10},{d:21,e:14},{d:15,e:11},{d:2,e:4}],
      [{d:1,e:4},{d:14,e:11},{d:22,e:15},{d:16,e:12}],
      [{d:2,e:5},{d:15,e:12},{d:23,e:16}],
      [{d:24,e:17},{d:18,e:14},{d:4,e:7}],
      [{d:0,e:4},{d:3,e:7},{d:17,e:14},{d:25,e:18},{d:19,e:15},{d:5,e:8}],
      [{d:4,e:8},{d:18,e:15},{d:26,e:19}],
      [{d:27,e:20},{d:21,e:17},{d:7,e:10}],
      [{d:1,e:7},{d:6,e:10},{d:20,e:17},{d:28,e:21},{d:22,e:18},{d:8,e:11}],
      [{d:2,e:8},{d:7,e:11},{d:21,e:18},{d:29,e:22},{d:9,e:12},{d:23,e:19}],
      [{d:8,e:12},{d:22,e:19},{d:30,e:23}],
      [{d:3,e:10},{d:31,e:24},{d:25,e:21},{d:11,e:14}],
      [{d:4,e:11},{d:10,e:14},{d:24,e:21},{d:32,e:25},{d:26,e:22},{d:12,e:15}],
      [{d:5,e:12},{d:11,e:15},{d:25,e:22},{d:33,e:26}],
      [{d:6,e:13},{d:28,e:24},{d:14,e:17}],
      [{d:7,e:14},{d:13,e:17},{d:27,e:24},{d:34,e:28},{d:29,e:25},{d:15,e:18}],
      [{d:8,e:15},{d:14,e:18},{d:28,e:25},{d:35,e:29},{d:30,e:26},{d:16,e:19}],
      [{d:9,e:16},{d:15,e:19},{d:29,e:26}],
      [{d:10,e:17},{d:32,e:28},{d:18,e:21}],
      [{d:11,e:18},{d:17,e:21},{d:31,e:28},{d:36,e:32},{d:33,e:29},{d:19,e:22}],
      [{d:12,e:19},{d:18,e:22},{d:32,e:29}],
      [{d:13,e:20},{d:34,e:31},{d:21,e:24}],
      [{d:14,e:21},{d:20,e:24},{d:35,e:32},{d:22,e:25}],
      [{d:15,e:22},{d:21,e:25},{d:34,e:32},{d:23,e:26}],
      [{d:16,e:23},{d:22,e:26},{d:35,e:33}],
      [{d:17,e:24},{d:36,e:34},{d:25,e:28}],
      [{d:18,e:25},{d:24,e:28},{d:26,e:29}],
      [{d:19,e:26},{d:25,e:29},{d:36,e:35}],
      [{d:21,e:28},{d:27,e:31},{d:29,e:32}],
      [{d:22,e:29},{d:28,e:32},{d:30,e:33}],
      [{d:25,e:32},{d:31,e:34},{d:33,e:35}]
    ]

    eatingTable[piece].map((zones,index) => {
      document.querySelector('#p'+zones.d).classList.add("jumpTo")
      document.querySelector('#p'+zones.e).classList.add("getsEaten")
    })

  }

  clearHghlights() {
    for (var i=0; i<document.querySelectorAll('.piece').length; i++) {
      document.querySelectorAll('.piece')[i].classList.remove("highlight")
      document.querySelectorAll('.piece')[i].classList.remove("getsEaten")
      document.querySelectorAll('.piece')[i].classList.remove("jumpTo")
    }
  }

  // checkTheGame() {
  //   const winningsTable = [
  //     [0,2,8,11,7,1],
  //     [2,5,12,15,11,4],
  //     [5,9,16,19,15,8],
  //     [12,16,23,26,22,15],
  //     [19,23,30,33,29,22],
  //     [22,26,33,35,32,25],
  //     [25,29,35,36,34,28],
  //     [21,25,32,34,31,24],
  //     [17,21,28,31,27,20],
  //     [10,14,21,24,20,13],
  //     [3,7,14,17,13,6],
  //     [1,4,11,14,10,3],
  //     [4,8,15,18,14,7],
  //     [8,12,19,22,18,11],
  //     [15,19,26,29,25,18],
  //     [22,26,33,35,32,25],
  //     [18,22,29,32,28,21],
  //     [14,18,25,28,24,17],
  //     [7,11,18,21,17,10],
  //     [11,15,22,25,21,14]
  //   ]

  //   let winFound = false

  //   const myPiece = this.playerSide === 0 ? 10 : 20
  //   const opponentPiece = this.playerSide === 0 ? 20 : 10
  //   // Check if I won
  //   winningsTable.map((circle,index) => {
  //     let count = 0
  //     circle.map((piece) => {
  //       if (this.state.board[piece] === myPiece) { 
  //         count++ 
  //       }
  //     })
  //     if (count === 6) {
  //       alert("I WON")
  //       return false
  //     }
  //   })
  //   // Check if the other player won
  //   winningsTable.map((circle,index) => {
  //     let count = 0
  //     circle.map((piece) => {
  //       if (this.state.board[piece] === opponentPiece) { 
  //         count++ 
  //       }
  //     })
  //     if (count === 6) {
  //       alert("I LOST")
  //       return false
  //     }
  //   })
  // }

  render() {
    const pieces = this.state.board.map((status, index) => {
      return <Piece key={index} index={index} status={status} handleClick={this.handleClick.bind(this)} />
    })
    const neighbors = this.state.pieceSelected ? this.highlightNeighbours(this.state.selectedIndex) : this.clearHghlights()
    
    const boardClass = this.state.turn === 0 ? "board turnBlack" : "board turnWhite"

    return (
      <div className={boardClass}>
        <div className="background"><div className="pieceCount">You have {this.state.piecesLeft} pieces left</div></div>
        {pieces}
      </div>
    )

  }
}


