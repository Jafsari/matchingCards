import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Square from './square';

// section for holding and displaying matched cards
class MatchedBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.value,
            matchedPairs: this.props.pairs,
        };
    }

    renderSquare(card) {
        return <Square
            key={card.name + card.suit}
            value={card}
            bg="white"/>
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

export default MatchedBoard;