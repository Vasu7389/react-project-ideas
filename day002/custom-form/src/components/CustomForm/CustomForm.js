import React from "react";
import "./CustomForm.css";

function CustomForm(props) {
  return (
    <div className="form-container">
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
