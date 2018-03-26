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
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                <div>{this.props.value.name}</div>
                <div>{this.props.value.suit}</div>
            </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: shuffle(createDeck()),

        }
    };

    handleClick(i) {
        console.log(this.state.cards);
        const squares = this.state.cards.slice();
        this.setState({ squares: squares });
    }

    renderSquare(card) {
        return <Square
            key={card.name + card.suit}
            value={card}
            onClick={() => { this.handleClick(card) }} />;
    }

    render() {
        let cardSquare = [];
        let status = 'Your move: ' + (this.state.currentPlayer ? 'Jenny' : 'Computer');

        for (let i = 0; i < this.state.cards.length; i++) {
            cardSquare.push(this.renderSquare(this.state.cards[i]))
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div>
                    {cardSquare}
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