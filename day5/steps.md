### Welcome to the #react30 Day 5 challenge.

In this challenge we will develop the snake game using useState, useEffect, useRef along with the basic JS concepts.

### Demo

<video width="100%" height="100%" controls>

  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day5-demo.mp4?alt=media&token=45e67011-53d6-4d11-815e-80d9a1000440" type="video/mp4">
</video>

### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge (as in this challenge we are not focusing on explaining about the react concepts)
- Basic knowledge of HTML & CSS

### Lets Begin!

Open terminal in the vs code and run these commands,

```
npx create-react-app snake-game
cd snake-game
npm start
```

After doing all of this, your UI would look like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-first-ui.JPG?alt=media&token=35b62cde-9bb7-4a29-9685-a6a33d5c873f)

Run these commands in a new terminal (let the other terminal run our project),

```
mkdir src\components\common
type NUL > src\components\Snake.js
type NUL > src\components\Food.js
```

Don't get confused with the above commands, you can also create files or folders using file explorer manually.

### Folder Structure

Note - I have removed few files which 'create-react-app' util gives us by default.  
You can also remove those but that is not mandatory step for this challenge.

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day5-folder.png?alt=media&token=cf32f88f-75e4-4a8f-a689-43caae880748)

### Lets add some code

For better understanding, I have added few comments in the code itself.

### Snake.js

```js
import React from "react";

//snake prop is an array of small boxes having x and y value
// we will set App.css -> position: relative
// here we gave -> position: absolute and top, left values in % to fix each element
// in snake array in the UI
function Snake({ snake }) {
  return (
    <div>
      {snake.map((box, i) => (
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#e7da3d",
            margin: "5px",
            position: "absolute",
            left: `${box.x}%`,
            top: `${box.y}%`,
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}

export default Snake;
```

### Food.js

```js
import React from "react";

//food is just a 15x15px box.
//position is an object with x & y property
function Food({ position }) {
  return (
    <div
      style={{
        width: "15px",
        height: "15px",
        backgroundColor: "#3dd1e7",
        margin: "3px",
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 0,
      }}
    />
  );
}

export default Food;
```

### App.js

```js
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Food from "./components/Food";
import Snake from "./components/Snake";

//method to get random x & y number between 0-96 for random food position
const randomFoodPosition = () => {
  const pos = { x: 0, y: 0 };
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  pos.x = x - (x % 4); // to get multiple of 4
  pos.y = y - (y % 4); // to get multiple of 4
  return pos;
};

const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ],
  direction: "ArrowRight",
  speed: 100,
};

function App() {
  //snake = [{x,y},{x,y},{x,y},{x,y},...]
  const [snake, setSnake] = useState(initialSnake.snake);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  //to set focus on big square html box on game start
  const playgroundRef = useRef();

  useEffect(() => {
    if (!isStarted) return;

    //if snake array last element touches the box boundary then game over
    if (
      snake[snake.length - 1].x === 100 ||
      snake[snake.length - 1].x === 0 ||
      snake[snake.length - 1].y === 100 ||
      snake[snake.length - 1].y === -4
    ) {
      setGameOver(true);
      return;
    }

    //interval needed to continuously move the snake by manipulating snake array item's x & y value
    //every 'speed' milliseconds
    const interval = setInterval(move, initialSnake.speed);
    return () => clearInterval(interval);
  });

  //method to update snake array's values on keyboard event
  const move = () => {
    const tmpSnake = [...snake];
    let x = tmpSnake[tmpSnake.length - 1].x,
      y = tmpSnake[tmpSnake.length - 1].y;
    switch (lastDirection) {
      case "ArrowUp":
        y -= 4; //move by -4% top
        break;
      case "ArrowRight":
        x += 4; //move by 4% right
        break;
      case "ArrowDown":
        y += 4; //move by 4% down
        break;
      case "ArrowLeft":
        x -= 4; //move by -4% left
        break;
      default:
        break;
    }

    tmpSnake.push({
      x,
      y,
    });
    // if food position === snake newly added position, then do not remove item from an array
    // otherwise remove everytime to get feel that snake is moving forward
    // i.e - add at end and remove at start in snake array
    if (x !== foodPosition.x || y !== foodPosition.y) tmpSnake.shift();
    else setFoodPosition(randomFoodPosition());
    setSnake(tmpSnake);
  };

  return (
    <div
      className="App"
      onKeyDown={(e) => setLastDirection(e.key)}
      ref={playgroundRef}
      tabIndex={0}
    >
      {isStarted && <div className="count"> score: {snake.length - 3}</div>}

      {!isStarted && (
        <>
          <button
            onClick={() => {
              setIsStarted(true);
              playgroundRef.current.focus();
            }}
            type="submit"
          >
            Start
          </button>
          <div className="arrow-msg text">Press Arrows keys to play!</div>
        </>
      )}
      {gameOver && (
        <>
          <div className="game-over text">Game Over!</div>
          <button
            onClick={() => {
              setIsStarted(true);
              setGameOver(false);
              setSnake(initialSnake.snake);
              setLastDirection(initialSnake.direction);
              playgroundRef.current.focus();
            }}
            type="submit"
          >
            Restart
          </button>
        </>
      )}
      <Snake snake={snake} lastDirection={lastDirection} />
      {!gameOver && (
        <>
          <Food position={foodPosition} />
        </>
      )}
    </div>
  );
}

export default App;
```

### App.css

```css
.App {
  width: 500px;
  height: 500px;
  border: 1px solid white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: monospace;
  border-radius: 10px;
}

button {
  font-family: inherit;
  font-size: 1.5rem;
  border-radius: 10px;
  color: black;
  width: 50%;
  max-width: 150px;
  height: 50px;
  border: none;
  background-color: #e73d9f;
  font-weight: 600;
  z-index: 4;
  cursor: pointer;
}

.text {
  color: #eb2d2d;
  z-index: 4;
  opacity: 0.5;
}

.arrow-msg {
  font-size: 1rem;
  margin: 10px;
}

.game-over {
  font-size: 3rem;
}

.count {
  position: absolute;
  font-size: 2rem;
  bottom: 0px;
  color: #eb2d2d;
  opacity: 0.5;
}
```

### index.css

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
```

And that's it! You have created your own Snake game.

### Final UI

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day5-final.png?alt=media&token=4607acd2-6660-4a58-862b-be87b855b607)

### Enjoy your Game :)
