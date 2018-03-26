import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// individual card on the board
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

// section for holding and displaying matched cards
class MatchedBoard extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.pairs);
        this.state = {
            user: this.props.value,
            matchedPairs: this.props.pairs,
        };
    }

    renderSquare(card) {
        return <Square
            key={card.name + card.suit}
            value={card}/>
    }

    render() {
        let matchedCards = [];
        let score = this.state.matchedPairs.length / 2;
        this.state.matchedPairs.forEach(card => {
            matchedCards.push(this.renderSquare(card));
        });
        return (
            <div>
                <div><h3>{this.state.user}</h3></div>
                <div><h3 className="matchedBoardScore">{score}</h3></div>
                <div>
                    {this.state.score}
                </div>
                <div>
                    {matchedCards}
                </div>
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: shuffle(createDeck()),
            currentPlayer: true,
            pairs: {
                'Jenny': [],
                'Computer': []
            }

        }
        this.cardsChosen = [];
        this.clickedSquares = [];
    };

    handleClick(card, square) {
        this.cardsChosen.push(card);
        this.clickedSquares.push(square);
        square.setState({
            backgroundColor: "red",
        })

        // once the user has selected 2 cards
        if (this.cardsChosen.length === 2) {
            setTimeout(() => { this.handleEndOfTurn() }, 300);
        }
    }

    handleEndOfTurn() {
        // if the value of the 2 cards match
        if (checkMatch(this.cardsChosen)) {
            let user = this.state.currentPlayer ? 'Jenny' : 'Computer'
            console.log("match!");
            // making a copy of the points/pairs dictionary to use in setState
            let pairs = Object.assign({}, this.state.pairs);

            // increase current player's point

            // add the set to the user's pairs
            this.cardsChosen.forEach(card => {
                pairs[user].push(card)
            });
            console.log(this.state.pairs[user])

            this.setState({
                pairs: pairs,
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
                <div className="row">
                    <div className="col-2">
                        <MatchedBoard
                            key="Jenny"
                            value="Jenny"
                            pairs={this.state.pairs["Jenny"]} />
                    </div>

                    <div className="col-8">
                        {cardSquare}
                    </div>

                    <div className="col-2">
                        <MatchedBoard
                            key="Computer"
                            value="Computer"
                            pairs={this.state.pairs["Computer"]} />
                    </div>
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