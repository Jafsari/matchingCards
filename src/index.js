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
        <button className="square">
            {this.props.value}
        </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    };

    render() {
        return(
            <div> HELLO </div>
        )
    }
}


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div><h2>Card Matching</h2></div>
                <div className="game-board">
                    {/* <Board /> */}
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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