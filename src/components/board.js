import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Square from './square';
import MatchedBoard from './matchedBoard';

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
        square.setState({
            backgroundColor: "red",
        })

        // once the user has selected 2 cards
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
        if (this.state.remainingCards === 0) {
            this.setState({
                winningMessage: "WINNER: " + user,
            })
            return
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

export default Board;