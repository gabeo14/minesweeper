import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import Cell from "./Cell";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      board: [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "]
      ],
      state: "new",
      mines: 10,
      difficulty: 1
    }
  }
  newGame = event => {
    axios
    .post("http://minesweeper-api.herokuapp.com/games", {difficulty: this.state.difficulty})
    .then(response =>{
      this.setState(response.data)
    })
  }

  check = (row, column) => {
    if(this.state.id === 0) {
      return
    }
    console.log(`Good clickin on ${row} and ${column} bruv`)
    axios
    .post(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/check`, {row: row, col: column})
    .then(response =>{
      this.setState(response.data)
    })
  }

  flag = (row, column) => {
    if(this.state.id === 0) {
      return
    }
    console.log(`Good clickin on ${row} and ${column} bruv`)
    axios
    .post(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`, {row: row, col: column})
    .then(response =>{
      this.setState(response.data)
    })
  }

  gameMessage = () => {
    if(this.state.id === 0) {
      return <p>Click to start new game</p>
    }
    return <p> You are playing game # {this.state.id}</p>
  }

  render() {
    return (
      <div className="App">
        <header>Sweep those mines!</header>
        <main>
          <table className="table1">
            <tbody>
              <tr>
                <td colSpan={this.state.board[0].length}>
                  <button onClick={this.newGame}>
                    New Game
                  </button>
                  {
                    this.gameMessage()
                  }
                  <p>There are {this.state.mines} mines</p>
                </td>
              </tr>
              {
                this.state.board.map((row, rowIndex) => {
                 return (
                  <tr>
                    {
                      row.map((value, index) => {
                        return <Cell value = {value} row = {rowIndex} column = {index} check = {this.check} flag = {this.flag}/>
                      })
                    }
                  </tr>
                 ) 
                })
              }
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}

export default App
