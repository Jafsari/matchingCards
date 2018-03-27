import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// individual card on the board
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: "None",
            backgroundColor: this.props.bg || "black",
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

export default Square;