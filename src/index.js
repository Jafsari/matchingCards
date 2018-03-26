import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: "None",
            backgroundColor: "pink",
        }
    };

    render() {
        let bgColor = this.state.backgroundColor;
        let displayStatus = this.state.visibility;
        return (
            <button className="square" style={{ backgroundColor: bgColor, visibility: displayStatus }}
                onClick={() => this.props.onClick(this)}>
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
            currentPlayer: true,
            points: {
                'Jenny': 0,
                'Computer': 0
            }

        }
        this.cardsChosen = [];
        this.clickedSquares = [];
    };

    handleClick(card, square) {
        this.cardsChosen.push(card);
        this.clickedSquares.push(square);
        console.log(this.cardsChosen);
        square.setState({
            backgroundColor: "red",
        })

        // once the user has selected 2 cards
        if (this.cardsChosen.length === 2) {
            setTimeout(()=>{this.handleEndOfTurn()},300);
        }
    }

    handleEndOfTurn() {
        // if the value of the 2 cards match
        if (checkMatch(this.cardsChosen)) {
            console.log("match!");
            // making a copy of the points dictionary to use in setState
            let points = Object.assign({}, this.state.points);
            // increase current player's point
            points[this.state.currentPlayer ? 'Jenny' : 'Computer'] += 1;
            this.setState({
                points: points,
            });

            // hide the visibility of the 2 matched cards
            this.clickedSquares[0].setState({
                visibility: "hidden",
            });
            this.clickedSquares[1].setState({
                visibility: "hidden",
            });
        }
        else {
            this.setState({
                currentPlayer: !this.state.currentPlayer,
            });
        }
        // reset clicked cards because "turn" is over (not necessarily user)
        this.clickedSquares[0].setState({
            backgroundColor: "pink",
        })
        this.clickedSquares[1].setState({
            backgroundColor: "pink",
        })
        this.cardsChosen = [];
        this.clickedSquares = [];

    }

    renderSquare(card) {
        return <Square
            key={card.name + card.suit}
            value={card}
            onClick={(square) => { this.handleClick(card, square) }} />;
    }

    render() {
        let cardSquare = [];
        let status = this.state.currentPlayer ? 'Jenny' : 'Computer';

        for (let i = 0; i < this.state.cards.length; i++) {
            cardSquare.push(this.renderSquare(this.state.cards[i]))
        }

        return (
            <div>
                <div className="status">Your move: <strong>{status}</strong></div>
                <div>
                    {cardSquare}
                </div>

                <div className="scoreboard">
                    <span id="userScore">Jenny: {this.state.points["Jenny"]}</span>
                    <span id="computerScore">Computer: {this.state.points["Computer"]}</span>
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

// ===============CARD METHODS========================

function checkMatch(cards) {
    return cards[0].name === cards[1].name;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function card(name, suit) {
    this.name = name;
    this.suit = suit;
}

function createDeck() {
    let cards = [];
    let numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            cards.push(new card(numbers[j], suits[i]));
        }
    }
    return cards;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);