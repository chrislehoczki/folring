import React from "react";

import Piece from "./Piece";

require('./Game.css');

export default class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      pieceSelected: false,
      selectedIndex: null,
      me: 10,
      meSelected: 11,
      piecesLeft: 18,
      board: [
           0,         // 0 - empty slot
          0,0,        // 10 - player 1 piece
         0,0,0,       // 11 - player 1 piece selected
        0,0,0,0,      // 20 - player 2 piece
         0,0,0,       // 21 - player 2 piece selected
        0,0,0,0,
         0,0,0,
        0,0,0,0,
         0,0,0,
          0,0,
           0,0,0,0,0,0,0,0
      ]
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.room) {
      const newState = {...nextProps.room.game.game};
      this.setState({...newState}, () => {
        console.log("NEW STATE", this.state)
      });
    } 

  }

  sendState() {
    this.props.sendState({...this.state})
  }

  handleClick(piece) {
    // If clicking on empty place, add new piece
    if (this.state.board[piece] === 0) {  
      this.addPiece(piece)      
    }
    // If clicking on existing own piece, select the piece
    if (this.state.board[piece] === this.state.me && !this.state.pieceSelected) {
      this.selectPiece(piece)
    }
    // If clicking on selected piece then unselect
    if (this.state.board[piece] === this.state.meSelected && this.state.pieceSelected) {
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
    this.setState({...this.state, pieceSelected: true, selectedIndex: piece }, () => this.sendState())
    this.updatePiece(piece, this.state.meSelected)
  }

  unselectPiece(piece) {
    this.setState({...this.state, pieceSelected: false, selectedIndex: null }, () => this.sendState())
    this.updatePiece(piece, this.state.me)
  }

  addPiece(piece) {
    if (this.state.piecesLeft > 0 && !this.state.pieceSelected) {
      let nextBoard = [...this.state.board]
      nextBoard[piece] = this.state.me
      this.setState({...this.state, piecesLeft: (this.state.piecesLeft - 1), board: nextBoard }, () => this.sendState())     
    }
  }

  clearPiece(piece) {
    this.updatePiece(piece, 0)
  }

  moveSelectedPieceTo(piece) {
    let nextBoard = [...this.state.board]
    nextBoard[piece] = this.state.me
    nextBoard[this.state.selectedIndex] = 0
    this.setState({...this.state, 
      pieceSelected: false, 
      selectedIndex: null,
      board: nextBoard
    }, () => this.sendState())
  }

  highlightNeighbours(piece) {
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
      10: [3,7,14,17,13,3],
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
  }

  clearHghlights() {
    for (var i=0; i<document.querySelectorAll('.piece').length; i++) {
      document.querySelectorAll('.piece')[i].classList.remove("highlight")
    }
  }

  render() {
    const pieces = this.state.board.map((status, index) => {
      return <Piece key={index} index={index} status={status} handleClick={this.handleClick.bind(this)} />
    })
    const neighbors = this.state.pieceSelected ? this.highlightNeighbours(this.state.selectedIndex) : this.clearHghlights()
    return (
      <div className="board">
        {pieces}
      </div>
    )

  }
}


