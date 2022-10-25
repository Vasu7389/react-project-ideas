### Welcome to the #react30 Day 8 challenge.

In this challenge we will develop an input box which can add tags without any external library.  
Only with just one component you can have an input box with the capability to input tags.  
There will be only one state which will carry all the user inputs with the help of onKeyUp JS event.  
<br />

### Demo

<video width="100%" height="100%" controls>
  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day8-demo.mp4?alt=media&token=25e402b0-1456-4570-87f5-7462d1d9c6e9" type="video/mp4">
</video>

### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge
- Basic knowledge of HTML & CSS

### Lets Begin!

Open terminal in the vs code and run these commands,

```
npx create-react-app tags-input
cd tags-input
npm start
```

After doing all of this, your UI should look like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-first-ui.JPG?alt=media&token=35b62cde-9bb7-4a29-9685-a6a33d5c873f)

### Folder Structure

Add a 'component' folder in the 'src' folder and create a new 'TagInput.js' file.

Note - I have removed few files which 'create-react-app' util gives us by default.  
You can also remove those but that is not mandatory step for this challenge.

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day8-folder.png?alt=media&token=53b5d57a-2bd1-4c8d-a180-580cc4db1c36)

### Lets add some code

For better understanding, I have added few comments in the code itself.

### TagInput.js

```js
import React, { useState } from "react";

const containerStyle = {
  padding: "20px",
  display: "inline-block",
  width: "300px",
  border: "1px solid darkgrey",
  borderRadius: "10px",
  background: "#EAEAEA",
};

const inputStyle = {
  display: "inline-block",
  fontSize: "0.9em",
  margin: "5px",
  width: "90%",
  border: "0",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "1rem",
};

const tagStyle = {
  display: "inline-block",
  backgroundColor: "#3C4048",
  margin: "5px",
  padding: "4px 10px",
  borderRadius: "10px",
  cursor: "pointer",
  color: "white",
};

const TagInput = () => {
  //state to save all user input in an array
  const [tags, setTags] = useState([]);

  const handleAddTag = (e) => {
    //if key not enter then don't add it
    if (e.key !== "Enter") return;

    const input = e.target.value;

    //if input is empty or "" then don't add it
    if (!input) return;
    //if the input already been added
    if (tags.includes(input)) return;

    setTags([...tags, input]);
    e.target.value = "";
  };

  const onDeleteTag = (tag) => {
    const filteredTags = tags.filter((t) => t !== tag);
    setTags(filteredTags);
  };

  return (
    <div style={containerStyle}>
      <h2>ADD SKILLS</h2>
      {tags.map((tag) => (
        <span key={tag} onClick={() => onDeleteTag(tag)} style={tagStyle}>
          &#x2716; {tag}
        </span>
      ))}
      <input
        style={inputStyle}
        onKeyUp={(e) => handleAddTag(e)}
        type="text"
        placeholder="Enter value..."
      />
    </div>
  );
};

export default TagInput;
```

### App.js

```js
import "./App.css";
import TagInput from "./component/TagInput";

function App() {
  return (
    <div className="App">
      <TagInput />
    </div>
  );
}

export default App;
```

### App.css

```css
.App {
  text-align: center;
  margin-top: 100px;
  font-family: monospace;
}

input:focus {
  outline: none;
}
```

And that's it! You have created an input box which you can use in your future projects by just copying & pasting the component.

### Final UI

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day8-final.png?alt=media&token=3a668e23-22e8-4e00-b0ed-93190cb6f6df)

### Happy learning :)
