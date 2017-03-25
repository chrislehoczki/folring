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
           0,0,0,0,0,0,0,0,0
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
      this.moveSelectedPieceTo(piece)
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
    if (this.state.piecesLeft > 0) {
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

  render() {
    
    const pieces = this.state.board.map((status, index) => {
      return <Piece key={index} index={index} status={status} handleClick={this.handleClick.bind(this)} />
    })

    return (
      <div className="board">
        {pieces}
      </div>
    )

  }
}


