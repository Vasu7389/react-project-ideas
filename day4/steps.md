### Welcome to the #react30 Day 4 challenge.

In this challenge we will develop a stopwatch and a timer using basic React concepts with little JS programming logic around that.

### Demo

<video width="100%" height="100%" controls>

  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day4-demo.mp4?alt=media&token=f374a62c-c63c-4c20-a61b-c7123db2fb64" type="video/mp4">
</video>

### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge (as in this challenge we are not focusing on explaining about the react concepts)
- Basic knowledge of HTML & CSS (mobile responsive)

### Lets Begin!

Open terminal in the vs code and run these commands,

```
npx create-react-app stopwatch
cd stopwatch
npm start
```

After doing all of this, your UI would look like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-first-ui.JPG?alt=media&token=35b62cde-9bb7-4a29-9685-a6a33d5c873f)

Run these commands in a new terminal (let the other terminal run our project),

```
mkdir src\components\common
mkdir src\components\common\button
mkdir src\components\common\header
mkdir src\components\stopwatch
mkdir src\components\timer
type NUL > src\components\stopwatch\Stopwatch.js
type NUL > src\components\stopwatch\Stopwatch.css
type NUL > src\components\timer\Timer.js
type NUL > src\components\timer\Timer.css
type NUL > src\components\common\button\Button.js
type NUL > src\components\common\button\Button.css
type NUL > src\components\common\header\Header.js
type NUL > src\components\common\header\Header.css
```

Don't get confused with the above commands, you can also create files or folders using file explorer manually.

### Folder Structure

Note - I have removed few files which 'create-react-app' util gives us by default.  
You can also remove those but that is not mandatory step for this challenge.

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day4-folders.png?alt=media&token=7baf5159-3fb4-41f8-92d7-cfd0f1877f3c)

### Lets add some code

For better understanding, I have added few comments in the code itself.

### Stopwatch.js

```js
import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";

const Stopwatch = () => {
  //state to track whether stopwatch has started or not - to switch b/w 'pause' & 'start' text on jsx button
  //and if not started then to avoid the calculation - in useEffect
  const [isStarted, setIsStarted] = useState(false);
  //state to track millisecond(ms), minute(m), second(s) values in the UI
  const [[m, s, ms], setTimer] = useState([0, 0, 0]);

  //we are using JS's setInterval method to set [m,s,ms] values every 10ms
  //we need to clear the interval on component unmount otherwise useEffect will create infinite intervals to
  //update the [m,s,ms] state.
  //so the flow here is -> create an interval -> call onStart() -> setTimer done -> clear the interval
  // -> create new interval -> and so on.
  useEffect(() => {
    const timerId = setInterval(() => onStart(), 10);
    return () => clearInterval(timerId);
  });

  //logic to update minute based on seconds & seconds based on milliseconds value
  const onStart = () => {
    if (!isStarted) return;
    if (ms === 99 && s === 60) {
      //3rd
      setTimer([m + 1, 0, 0]);
    } else if (ms === 99) {
      //2nd
      setTimer([m, s + 1, 0]);
    } else {
      //1st
      setTimer([m, s, ms + 1]);
    }
  };

  const onReset = () => {
    setIsStarted(false);
    setTimer([0, 0, 0]);
  };

  return (
    <div className="stopwatch">
      <div className="container">
        <div className="clock" onClick={() => setIsStarted(true)}>
          <div className="clock-border-ring">
            <div className="clock-border-ring-inner"></div>
          </div>
          <div className="clock-timer">
            {m < 10 && 0}
            {m}:{s < 10 && 0}
            {s}:{ms < 10 && 0}
            {ms}
          </div>
        </div>
        <div className="button-row">
          <Button onClickHandler={onReset}>Reset</Button>
          <Button onClickHandler={() => setIsStarted(!isStarted)}>
            {isStarted ? <>Pause</> : <>Start</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
```

### Stopwatch.css

```css
.stopwatch {
  width: 100%;
}

.clock {
  width: 210px;
  height: 210px;
  font-size: 2rem;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow);
  margin: 10px;
  flex-direction: column;
  position: relative;
  cursor: pointer;
}

.clock-timer {
  position: absolute;
  top: 40%;
  left: 17%;
}

.clock-border-ring {
  border: 5px;
  background-image: linear-gradient(#9d00ff, #9d00ff, #2e91e5);
  border-radius: 50%;
  height: 95%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate-gradient 1s 1s infinite;
}
.clock-border-ring-inner {
  background: white;
  border-radius: 50%;
  height: 94%;
  width: 94%;
}

@keyframes rotate-gradient {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(36deg);
  }
  20% {
    transform: rotate(72deg);
  }
  30% {
    transform: rotate(108deg);
  }
  40% {
    transform: rotate(144deg);
  }
  50% {
    transform: rotate(180deg);
  }
  60% {
    transform: rotate(216deg);
  }
  70% {
    transform: rotate(252deg);
  }
  80% {
    transform: rotate(288deg);
  }
  90% {
    transform: rotate(324deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.button-row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin: 25px 0px;
  width: 100%;
}
```

### Timer.js

```js
import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Timer.css";

const Timer = () => {
  const [[h, m, s], setTimer] = useState([0, 0, 0]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timerID = setInterval(() => onStart(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  //same logic as stopwatch's code but here we are decreasing the [m,s,ms] state values
  const onStart = () => {
    if (h === 0 && m === 0 && s === 0) {
      setIsStarted(false);
      return;
    }
    if (!isStarted) return;
    if (m === 0 && s === 0) {
      //3rd
      setTimer([h - 1, 59, 59]);
    } else if (s === 0) {
      //2nd
      setTimer([h, m - 1, 59]);
    } else {
      //1st
      setTimer([h, m, s - 1]);
    }
  };

  const onReset = () => {
    setIsStarted(false);
    setTimer([0, 0, 0]);
  };

  return (
    <div className="timer">
      <div className="timer-row">
        <div className="timer-border-ring">
          <div className="timer-border-ring-inner"></div>
        </div>
        <div className="timer-input-title">
          <input
            type="number"
            className="timer-input"
            value={h}
            onChange={(e) => setTimer([e.target.value, m, s])}
          />
          <span>h</span>
        </div>
        <div className="timer-input-title">
          <input
            type="number"
            className="timer-input"
            value={m}
            onChange={(e) => setTimer([h, e.target.value, s])}
          />
          <span>m</span>
        </div>
        <div className="timer-input-title">
          <input
            type="number"
            className="timer-input"
            value={s}
            onChange={(e) => setTimer([h, m, e.target.value])}
          />
          <span>s</span>
        </div>
      </div>
      <div className="button-row">
        <Button onClickHandler={onReset}>Reset</Button>
        {isStarted ? (
          <Button onClickHandler={() => setIsStarted(false)}>Pause</Button>
        ) : (
          <Button
            onClickHandler={() => setIsStarted(true)}
            disabled={h === 0 && m === 0 && s === 0}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
```

### Timer.css

```css
.timer {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.button-row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin: 25px 0px;
  width: 100%;
}

.timer-row {
  width: 210px;
  height: 120px;
  font-weight: 500;
  border-radius: 7px;
  box-shadow: var(--shadow);
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-input-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 7px;
  z-index: 1;
}

.timer-input {
  font-size: 1.8rem;
  font-weight: 500;
  border: none;
  width: 35px;
  border-bottom: 2px solid rgb(97, 97, 97);
}

.timer-input:focus {
  font-size: 1.8rem;
  font-weight: 500;
  outline: none;
}

span {
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  color: rgb(97, 97, 97);
}

.timer-border-ring {
  border-radius: 7px;
  position: absolute;
  border: 5px;
  background-image: linear-gradient(#9d00ff, #9d00ff, #2e91e5);
  height: 97%;
  width: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-border-ring-inner {
  background: white;
  height: 92%;
  width: 95%;
  border-radius: 4px;
}
```

### Button.js

```js
import React from "react";
import "./Button.css";

const Button = ({ children, onClickHandler, disabled = false }) => {
  return (
    <button onClick={onClickHandler} className="buttons" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
```

### Button.css

```css
.buttons {
  box-shadow: var(--shadow);
  padding: 10px 25px;
  border-radius: 7px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  min-width: 32%;
  font-size: 1.1rem;
}

.buttons:hover {
  box-shadow: rgb(0 0 0 / 45%) 0px 5px 15px;
}
```

### Header.js

```js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const [header, setHeader] = useState(pathname);

  useEffect(() => {
    setHeader(pathname);
  }, [pathname]);

  return (
    <div className="header">
      <Link to="/" className={header === "/" ? "active" : ""}>
        Stopwatch
      </Link>
      <Link to="/timer" className={header === "/timer" ? "active" : ""}>
        Timer
      </Link>
    </div>
  );
};

export default Header;
```

### Header.css

```css
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  font-size: 1.3rem;
  font-weight: 500;
  height: 10vh;
  color: rgb(78, 78, 78);
}

.active {
  color: black;
  animation: animateFontSize 0.2s linear 0s;
  font-size: 2rem;
}

@keyframes animateFontSize {
  0% {
    font-size: 1.3rem;
  }
  25% {
    font-size: 1.5rem;
  }

  50% {
    font-size: 1.7rem;
  }

  75% {
    font-size: 1.9rem;
  }
  100% {
    font-size: 2rem;
  }
}
```

### Go to App.js and import relavant files and packages

```js
import React from "react";
//we are using react-router-dom package to switch between stopwath <-> timer
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./common/header/Header";
import Stopwatch from "./stopwatch/Stopwatch";
import Timer from "./timer/Timer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Stopwatch} />
            <Route path="/timer" component={Timer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
```

### App.css

```css
:root {
  --shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
}

.App {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.container {
  height: 85vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
```

### index.css

```css
body {
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background-color: inherit;
  border: none;
  font-family: inherit;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}

#root {
  width: 100%;
  max-width: 500px;
}

input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

### And that's it! You have created an app which has both STOPWATCH & TIMER features.

### Final UI

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day4-finalui.png?alt=media&token=b3dd6e55-f558-4b17-8d55-dcc1899cb2d2)

### Bonus: To run your localhost project on your Mobile devices -

1. open cmd and run command

```
ipconfig
```

2. copy IPv4 Address(looks like - 192.168.**.\***)
3. Connect you mobile device with the same WiFi/Internet networt
4. Open URL - 192.168.**.\***:3000 (Note : 3000 is your port number in which your project is running)
5. Enjoy your App :)
