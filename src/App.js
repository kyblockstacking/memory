import React, { Component } from 'react';
import pictures from "../src/stuff.json"

class App extends Component {

  state = {
    pictureArray: pictures,
    score: 0
  }

  lose = () => {
    console.log("YOU LOSE");

    let newArr = this.state.pictureArray;

    for (let i = 0; i < newArr.length; i++) {
      newArr[i].clicked = false;
    }

    let x = this.shuffle(newArr)

    this.setState({
      pictureArray: x,
      score: 0
    })
  }

  shuffle = (array) => {
    let kevin = array;
    let emptyKevin = [];

    while (kevin.length > 0) {

      let a = Math.floor(Math.random() * (kevin.length - 1))
      emptyKevin.push(kevin[a])
      kevin.splice(a, 1)

    }

    return emptyKevin;

  }

  next = (res) => {
    console.log("next...")

    let regScore = this.state.score + 1
    let hiScore = this.state.highscore + 1;

    if (this.state.score > this.state.highscore) {
      hiScore = this.state.score;
    }

    res.clicked = true

    let y = this.shuffle(this.state.pictureArray)
    console.log(y);
    this.setState({
      score: regScore,
      highscore: hiScore,
      pictureArray: y
    })

  }

  // Tracks the score
  scoreTracker = (res) => {

    res.clicked ? this.lose() : this.next(res);
  }

style = {
  dogs: {
    cursor: "pointer",
    maxHeight: "200px",
    maxWidth: "200px"
  }
}

  // Display all images to DOM
  display = () => {
    let pics = this.state.pictureArray.map((item) => {
      return (
        <img
          key={item.id}
          alt=""
          src={item.url}
          onClick={() => this.scoreTracker(item)}
          style={this.style.dogs}
          className="rounded border border-primary"
        ></img>
      )
    })
    return pics
  }

  // Show DOM
  render() {
    return (
      <div>
        score: {this.state.score}
        <br></br>
        {/* highscore: {this.state.highscore} */}
        <br></br>
        <h3>Doggie Clicky</h3>
        <br></br>
        {this.display()}
      </div>
    );
  }
}

export default App;
