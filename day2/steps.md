Welcome to the #react30 Day 2 challenge.  
In this challenge you will be developing a `reusable custom form` component in which you can add as much input fields and buttons as you want. You can use that component in your future projects too to have `login` form, `registration` form or a data creation/updation form for any `CRUD` functionality.

### Demo

<video width="100%" height="100%" controls>

  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day2-video1.mp4?alt=media&token=3713f303-7178-4f37-b6dc-63ae504a7fe5" type="video/mp4">
</video>

#### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge (as in this challenge we are not focusing on explaining about the react concepts)
- Basic knowledge of HTML

### Lets Begin!

Create a folder structure like this,

-codin  
--react30 (this folder we'll use to put all our challenges day wise)  
---day2 (open this directory in the vs code)  
Final Path: ~codin\react30\day2\

Open terminal in the vs code and run these commands,

`npx create-react-app custom-form`  
`cd custom-form`  
`npm start`

After doing all of this, your UI would be like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day2-image1.png?alt=media&token=be5e8161-4ef4-40cf-83b9-37742616bb44)

#### Code Cleanup

Delete following files from the file explorer,  
counter-game\src\App.css  
counter-game\src\App.test.js  
counter-game\src\logo.svg  
counter-game\src\reportWebVitals.js  
counter-game\src\setupTests.js

Remove below lines form index.js

```js
import reportWebVitals from "./reportWebVitals";
reportWebVitals();
```

Go to App.js and remove these lines,

```js
import logo from "./logo.svg";
import "./App.css";
```

and remove all the JSX code and JSX,

```jsx
return <div className="App">CustomForm</div>;
```

#### Currently, App.js

```js
function App() {
  return <div className="App">CustomForm</div>;
}

export default App;
```

#### index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### Folder Structure

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day2-image2.png?alt=media&token=02e16789-f365-4038-a014-b17d2263c613)

#### UI

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day2-image3.png?alt=media&token=8357fa2c-ccb6-475b-bb1a-3e36e1443c10)

Run these commands in a new terminal (let the other terminal run our project),

`cd custom-form (run this command if you are in 'react30\day2>' path)`  
`mkdir src\components\CustomForm`  
`type NUL > src\components\CustomForm\CustomForm.js`  
`type NUL > src\components\CustomForm\CustomForm.css`

_Don't get confused with the above commands, you can also create files or folders using file explorer manually._
_But if you remember these commands this will help you to increase your productivity and also make you look 'cool' while screen sharing :)_

#### Go to CustomForm.js and add

```js
import React from "react";
import "./CustomForm.css";

function CustomForm() {
  return <div>CustomForm</div>;
}

export default CustomForm;
```

#### Import CustomForm.js in App.js like this,

```js
import CustomForm from "./components/CustomForm/CustomForm";

function App() {
  return (
    <div className="App">
      <CustomForm />
    </div>
  );
}

export default App;
```

#### Note

_Your UI should not have any changes after doing the above steps._

#### Now add this custom form logic in the CustomForm.js,

```js
//we will take props in 'props' object from the parent component
function CustomForm(props)
```

```jsx
//here we are looping through props keys
//and checking if key is 'input' then create an input element in html else a button element
{
  Object.keys(props).map((key) =>
    props[key].isInput ? (
      <>
        <label htmlFor={props[key].label}>{props[key].label}</label>
        <input
          className="form-input"
          key={key}
          ref={props[key].ref}
          type={props[key].type}
          id={props[key].label}
          placeholder={props[key].placeholder}
        />
      </>
    ) : (
      <button
        className="form-button"
        key={key}
        type="submit"
        onClick={props[key].handler}
      >
        {props[key].buttonText}
      </button>
    )
  );
}
```

#### Final CustomForm.js

```js
import React from "react";
import "./CustomForm.css";

function CustomForm(props) {
  return (
    <div>
      {Object.keys(props).map((key) =>
        props[key].isInput ? (
          <>
            <label htmlFor={props[key].label}>{props[key].label}</label>
            <input
              className="form-input"
              key={key}
              ref={props[key].ref}
              type={props[key].type}
              id={props[key].label}
              placeholder={props[key].placeholder}
            />
          </>
        ) : (
          <button
            className="form-button"
            key={key}
            type="submit"
            onClick={props[key].handler}
          >
            {props[key].buttonText}
          </button>
        )
      )}
    </div>
  );
}

export default CustomForm;
```

#### Usage

We are using useRef hook to link input fields to a reference variable so that we can get the values after submitting the form.
It needs bunch of properties to create an input fields or a button and we can call our component like this,

```jsx
<CustomForm
  username={{
    type: "text",
    label: "Username",
    placeholder: "Enter Username",
    ref: usernameRef,
    isInput: true,
  }}
  loginButton={{
    handler: handleLogin,
    buttonText: "Login",
    isInput: false,
  }}
/>
```

#### We also need to create 'ref' for each input field and a handler function for a button.

```js
const usernameRef = useRef();
const handleLogin = () => {
  console.log("login button clicked");
  console.log(usernameRef.current.value);
  console.log(passwordRef.current.value);
};
```

#### Final App.js

```js
import { useRef, useState } from "react";
import CustomForm from "./components/CustomForm/CustomForm";

function App() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleLogin = () => {
    console.log("login");
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    //make a login api call
  };
  const handleRegister = () => {
    console.log("register");
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    //make a register api call
  };
  return (
    <div className="App">
      <CustomForm
        username={{
          type: "text",
          label: "Username",
          placeholder: "Enter Username",
          ref: usernameRef,
          isInput: true,
        }}
        password={{
          type: "password",
          label: "Password",
          placeholder: "Enter Password",
          ref: passwordRef,
          isInput: true,
        }}
        loginButton={{
          handler: handleLogin,
          buttonText: "Login",
          isInput: false,
        }}
        registerButton={{
          handler: handleRegister,
          buttonText: "Register",
          isInput: false,
        }}
      />
    </div>
  );
}

export default App;
```

#### And that's it! You have created a reusable component which you can use in your future projects.

You can also send style props to this component so that it can work with your project theme too.

#### Styling in CustomForm.css

```css
* {
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.3px;
  color: #3d3d3d;
}

.form-container {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.2);
  padding: 50px 35px;
  outline: none;
  border: none;
}

label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin: 20px;
  margin-bottom: 10px;
}

.form-input {
  border: none;
  color: #383838;
  border-bottom: 2px solid #d1d1d4;
  margin-left: 20px;
  font-weight: 500;
  font-size: 16px;
  height: 30px;
  width: 88%;
  transition: 0.2s;
}

input:focus {
  outline: none;
  border-bottom-color: #6a679e;
}

button {
  width: 40%;
  background-color: #6a56b5;
  color: #e7e7e7;
  margin: 20px;
  height: 40px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-family: "Poppins", sans-serif;
}
```

#### Final Result

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day2-image4.png?alt=media&token=aeb2394f-cdf3-491e-ae8b-357ed6cb0dc9)

#### To run your localhost project on your Mobile devices -

1. open cmd and run command
   `ipconfig`
2. copy IPv4 Address(looks like - 192.168.**.\***)
3. Connect you mobile device with the same WiFi/Internet networt
4. Open URL - 192.168.**.\***:3000 (Note : 3000 is your port number in which your project is running)
5. Enjoy your form :)
6. Come back tomorrow for the #day3 challenge. Good day!
