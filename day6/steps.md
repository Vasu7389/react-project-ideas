### Welcome to the #react30 Day 6 challenge.

In this challenge we will develop a game which you might already had played in Google Chrome when internet gets disconnected, which is 'The Dino Game'. We will develop the same game in this challenge using useRef, useEffect, useState hooks, setTimeout & setInterval.  
You will learn how to manipulate css styling based on some JS conditions. And how to get react jsx elements using useRef.  
I have written minimal code to create the game as per this challenge, obviously you can enhance the game by adding more features.
<br />

_If you can change html element's styling based on some user event like button press or mouse click then you can call it a game._  
<br />

### Demo

<video width="100%" height="100%" controls>

  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day6-demo.mp4?alt=media&token=2176d127-8575-4248-bd0f-41e42a2fa9a4" type="video/mp4">
</video>

### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge (as in this challenge we are not focusing on explaining about the react concepts)
- Basic knowledge of HTML & CSS

### Lets Begin!

Open terminal in the vs code and run these commands,

```
npx create-react-app dino-game
cd dino-game
npm start
```

After doing all of this, your UI would look like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-first-ui.JPG?alt=media&token=35b62cde-9bb7-4a29-9685-a6a33d5c873f)

Run these commands in a new terminal (let the other terminal run our project),

```
mkdir src\components\Dino
type NUL > src\components\Dino\Dino.js
type NUL > src\components\Dino\Dino.css
```

Don't get confused with the above commands, you can also create files or folders using file explorer manually.
Please also add 'trex.png' & 'cactus.png' in 'img' folder. You can get the images on any free website.

### Folder Structure

Note - I have removed few files which 'create-react-app' util gives us by default.  
You can also remove those but that is not mandatory step for this challenge.

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day6-folder.png?alt=media&token=9c4508e1-c666-45e7-a317-0330f1411adb)

### Lets add some code

For better understanding, I have added few comments in the code itself.

### Dino.js

```js
import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

function Dino() {
  //ref to get 'dino' html element in js
  const dinoRef = useRef();
  //ref to get 'cactus' html element in js
  const cactusRef = useRef();
  const [score, setScore] = useState(0);

  //method to add 'jump' class every '300ms' as the class jump css has jumping animation of 0.3s(300ms).
  //so on each key press we need to add animation and remove animation
  const jump = () => {
    if (!!dinoRef.current && dinoRef.current.classList != "jump") {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

  //useEffect to track whether dino position and cactus position is intersecting
  //if yes, then game over.
  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current dino Y position
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        // collision
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  //hook to call jump method on any keypress
  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <div className="game">
      Score : {score}
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
    </div>
  );
}

export default Dino;
```

### Dino.css

```css
.game {
  width: 600px;
  height: 225px;
  border: 1px solid black;
  margin: auto;
}

#dino {
  width: 50px;
  height: 50px;
  background-image: url(img/trex.png);
  background-size: 50px 50px;
  position: relative;
  top: 150px;
}

.jump {
  animation: jump 0.3s linear;
}

@keyframes jump {
  0% {
    top: 150px;
  }

  30% {
    top: 130px;
  }

  50% {
    top: 80px;
  }

  80% {
    top: 130px;
  }

  100% {
    top: 150px;
  }
}

#cactus {
  width: 20px;
  height: 40px;
  position: relative;
  top: 110px;
  left: 580px;
  background-image: url("img/cactus.png");
  background-size: 20px 40px;
  animation: block 1s infinite linear;
}

@keyframes block {
  0% {
    left: 580px;
  }

  100% {
    left: -5px;
  }
}
```

### App.js

```js
import "./App.css";
import Dino from "./components/Dino/Dino";

function App() {
  return (
    <div className="App">
      <Dino />
    </div>
  );
}

export default App;
```

And that's it! You have created your own Dino game.

### Final UI

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day6-final.JPG?alt=media&token=26dd6e12-4ebf-42a7-9d5e-d7042b6a4161)

### Enjoy your Game :)
