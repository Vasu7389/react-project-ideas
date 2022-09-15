### Welcome to the #react30 Day 3 challenge.

In this challenge we will develop a tic-tac-toe game using react basic concepts with little JS programming logic around that.

### Demo

<video width="100%" height="100%" controls>

  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-demo.mp4?alt=media&token=00569662-66de-4594-b688-940aef36417b" type="video/mp4">
</video>

### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge (as in this challenge we are not focusing on explaining about the react concepts)
- Basic knowledge of HTML

### Lets Begin!

Open terminal in the vs code and run these commands,

```
npx create-react-app tic-tac-toe
cd tic-tac-toe
npm start
```

After doing all of this, your UI would look like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-first-ui.JPG?alt=media&token=35b62cde-9bb7-4a29-9685-a6a33d5c873f)

### Folder Structure

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-folder-structure.JPG?alt=media&token=4d8364ca-80fa-4eee-ad5a-fc9f8769912e)

Run these commands in a new terminal (let the other terminal run our project),

```
mkdir src\components\common
type NUL > src\components\Game.js
type NUL > src\components\Square.js
type NUL > src\components\Board.js
type NUL > src\components\common\Utils.js
```

Don't get confused with the above commands, you can also create files or folders using file explorer manually.  
But if you remember these commands this will help you to increase your productivity and also make you look 'cool' while screen sharing :)

### Go to App.js and import Game.js

```js
import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
```

### App.css

```css
.App {
  text-align: center;
  height: 100vh;
}
```

### Game.js

```js
import React, { useState } from "react";
import { calculateWinner } from "./common/Utils";
import Board from "./Board";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },
  info: {
    fontSize: "2rem",
    opacity: "0.5",
    textShadow: "5px 5px #424242",
  },
};

const Game = () => {
  //board state initial = [null,null,null,null,null,null,null,null,null]
  const [board, setBoard] = useState(Array(9).fill(null));
  //state to track next turn
  const [xTurn, setXTurn] = useState(true);
  //variable to find winner (otherwise equals to null)
  const winner = calculateWinner(board);

  //everytime checks if winner is present or clicked on marked square then just returns
  //otherwise update board array's clicked index value with 'X' or 'O'
  const handleClick = (i) => {
    const tmpBoard = [...board];
    if (!!winner || !!tmpBoard[i]) return;

    tmpBoard[i] = xTurn ? "X" : "O";
    setBoard(tmpBoard);
    setXTurn(!xTurn);
  };

  const resetBoard = () => (
    <button onClick={() => setBoard(Array(9).fill(null))}>Start Game</button>
  );

  return (
    <div style={style.container}>
      <p style={style.info}>
        {winner ? "Winner: " + winner : "Next Player: " + (xTurn ? "X" : "O")}
      </p>
      <Board squares={board} handleClick={handleClick} />
      <div>{resetBoard()}</div>
    </div>
  );
};

export default Game;
```

### Board.js

```js
import React from "react";
import Square from "./Square";

const style = {
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  boxShadow: "#3c8be0 5px 5px 3px 0px",
};

const Board = ({ squares, handleClick }) => (
  <div style={style}>
    {squares.map((square, index) => (
      <Square key={index} value={square} onClick={() => handleClick(index)} />
    ))}
  </div>
);

export default Board;
```

### Square.js

```js
import React from "react";

const style = {
  background: "#e73d9f",
  border: "2px solid #4935ff",
  fontSize: "2rem",
  fontWeight: "800",
  cursor: "pointer",
  outline: "none",
};

const Square = ({ value, onClick }) => (
  <button style={style} onClick={onClick}>
    {value}
  </button>
);

export default Square;
```

### Utils.js

```js
//method to calculate winner based on possible win scenarios
export function calculateWinner(board) {
  const possibleWinSquares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < possibleWinSquares.length; i++) {
    const [a, b, c] = possibleWinSquares[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
```

### index.css

```css
body {
  /*add these lines after other css in body tag*/
  font-family: monospace;
  background-color: black;
  color: white;
}
button {
  font-family: inherit;
  font-size: 1.5rem;
  border-radius: 10px;
  color: black;
  border: none;
  font-weight: 600;
  background-color: #e7da3d;
}
```

### And that's it! You have created a TIC-TAC-TOE game.

### Final Result

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-final-ui.JPG?alt=media&token=13a9780e-fcc6-49a6-a625-4356c23d4f55)

### To run your localhost project on your Mobile devices -

1. open cmd and run command

```
ipconfig
```

2. copy IPv4 Address(looks like - 192.168.**.\***)
3. Connect you mobile device with the same WiFi/Internet networt
4. Open URL - 192.168.**.\***:3000 (Note : 3000 is your port number in which your project is running)
5. Enjoy your GAME :)
