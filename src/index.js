import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "hi",
        }
    };

    render() {
        return(
        <button className="square" onClick={()=>this.props.onClick()}>
            {this.props.value}
        </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: shuffle(createDeck()),
            squares: Array(1).fill(null),

        }
    };

    handleClick(i) {
        console.log(this.state.cards);
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
      }

    renderSquare(i) {
        return (
          <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        );
      }

    render() {
        return (
            <div>
                <div>
                    {this.renderSquare(0)}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div><h2>Card Matching</h2></div>
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// =======================================

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function card(value, name, suit) {
    this.name = name;
    this.suit = suit;
}

function createDeck() {
    let cards = [];
    let numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            cards.push(new card(j + 1, numbers[j], suits[i]));
        }
    }
    return cards;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);