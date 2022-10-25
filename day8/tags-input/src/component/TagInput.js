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
