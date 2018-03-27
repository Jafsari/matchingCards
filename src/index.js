import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './components/board';


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


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);