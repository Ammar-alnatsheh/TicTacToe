import React from 'react';
import Cell from './Cell.jsx';
import { timingSafeEqual } from 'crypto';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        firstPlayer: '',
        secondPlayer: '',
        firstPlayerTrun: true,
        board: [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ],
    }

    this.setMark = this.setMark.bind(this);
  }

  componentDidMount() {
    let firstPlayer = prompt('Enter the first player name');
    let secondPlayer = prompt('Enter the second player name');

    this.setState({
        firstPlayer: firstPlayer,
        secondPlayer: secondPlayer,
    });
  }

  setMark(loc) {
    let x = loc[0];
    let y = loc[1];
    let mark = this.state.firstPlayerTrun ? 1 : -1;
    let board = this.state.board;
    
    if ( this.validPlay(x, y) ) {
        board[x][y] = mark;
        if (this.gameOver(board)){
            let playerName = this.state.firstPlayerTrun ? this.state.firstPlayer : this.state.secondPlayer;
            alert("game Over " + playerName + " won the game");
            this.setState({
                board: [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                ],
            });
        } else {
            this.setState({
                firstPlayerTrun : !this.state.firstPlayerTrun
            });
        }

    } else {
        alert("invalid play");
    }
  }

  validPlay(x, y) {
      if(this.state.board[x][y] === 0) {
          return true;
      } else {
          return false;
      }
  }

  gameOver(board) {
      // check cells by rows and cols
      for (let i = 0; i < board.length; i++) {
        if (Math.abs(board[i][0] + board[i][1] + board[i][2]) === 3) {
            return true;
        }
        if (Math.abs(board[0][i] + board[1][i] + board[2][i]) === 3) {
            return true;
        } 
      }

      // check diagonal
      let diagonal1 = board[0][0] + board[1][1] + board[2][2];
      let diagonal2 = board[0][2] + board[1][1] + board[2][0];
      if (Math.abs(diagonal1) === 3 || Math.abs(diagonal2) === 3) {
          return true;
      }

      return false;
  }

  render() {
    return (
      <div className="app">
       <h2>Tic Tac Toe</h2>
        {
            this.state.board.map((row, rowIdx) => {
                return <div className="row">
                {
                    row.map((cell, colIdx) => {
                        return <Cell mark={cell} row={rowIdx} col={colIdx} setMark={this.setMark}/>
                    })
                }
                </div>
            })
        }
       </div>
    );
  }
}

export default App;