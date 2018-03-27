import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Square from './square';
import MatchedBoard from './matchedBoard';

// Board holds the cards and the current game status
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: shuffle(createDeck()),
            currentPlayer: true,
            remainingCards: 52,
            pairs: {
                'You': [],
                'Computer': []
            },
            winningMessage: "",
        }
        this.cardsChosen = [];
        this.clickedSquares = [];
    };

    handleClick(card, square) {
        this.cardsChosen.push(card);
        this.clickedSquares.push(square);
        this.setBackground(square, "pink");

        // once the user has selected 2 cards, pause for .3 seconds so user can view selected cards
        if (this.cardsChosen.length === 2) {
            setTimeout(() => { this.handleEndOfTurn() }, 300);
        }
    }

    handleEndOfTurn() {
        let user = this.state.currentPlayer ? 'You' : 'Computer'

        // if the value of the 2 cards match, add cards to player's pairs
        if (checkMatch(this.cardsChosen)) {
            let pairs = Object.assign({}, this.state.pairs);
            this.cardsChosen.forEach(card => {
                pairs[user].push(card)
            });
            this.setState({
                remainingCards: this.state.remainingCards - 2,
                pairs: pairs,
            });
            // hide the visibility of the 2 matched cards
            this.hideVisibility(this.clickedSquares[0]);
            this.hideVisibility(this.clickedSquares[1])
        }
        else {
            this.setState({
                currentPlayer: !this.state.currentPlayer,
            });
        }

        // if there are no more visible cards, announce winner and terminate
        if (this.state.remainingCards === 0) {
            this.setState({
                winningMessage: "WINNER: " + user,
            })
            return
        }
        // reset clicked cards because "turn" is over (not necessarily user)
        this.setBackground(this.clickedSquares[0], "black");
        this.setBackground(this.clickedSquares[1], "black");

        this.cardsChosen = [];
        this.clickedSquares = [];
    }

    // sets background state of a square
    setBackground(square, color) {
        square.setState({
            backgroundColor: color,
        })
    }

    // sets visibility state of a square to "hidden"
    hideVisibility(square) {
        square.setState({
            visibility: "hidden",
        })
    }

    renderSquare(card) {
        return <Square
            key={card.name + card.suit}
            value={card}
            onClick={(square) => { this.handleClick(card, square) }} />;
    }

    render() {
        let cardSquare = [];
        let status = this.state.currentPlayer ? 'You' : 'Computer';

        for (let i = 0; i < this.state.cards.length; i++) {
            cardSquare.push(this.renderSquare(this.state.cards[i]))
        }

        return (
            <div>
                <div className="status">Current move: <strong>{status}</strong></div>
                <div className="status"><strong>{this.state.winningMessage}</strong></div>
                <div className="row">
                    <div className="col-2">
                        <MatchedBoard
                            key="You"
                            value="You"
                            pairs={this.state.pairs["You"]} />
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

// ===============CARD METHODS========================

// Returns true if the 2 cards selected are a match.
function checkMatch(cards) {
    return cards[0].name === cards[1].name;
}

// Shuffles the deck of 52 cards
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

// creats an IN-ORDER deck of 52 cards
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

export default Board;