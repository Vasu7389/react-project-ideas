import React, { useState } from "react";
import { send } from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactPage.css";

const jokeList = [
  "Why did the developer go broke? Because he used up all his cache.",
  "Why do I drink coffee? It always me to do stupid things faster and with more energy.",
  "A conference call is the best way to get a dozen people to say bye 300 times.",
  "How does NASA organize a party? They planet.",
  "You know what they say about a clean desk. It’s a sure sign of a cluttered desk drawer.",
  "What did one ocean say to the other?  Nothing, they just waved.",
  "Why did the can crusher quit his job? Because it was soda pressing.",
  "Whoever stole my copy of Microsoft Office, I will find you! You have my word!",
  "What did the full glass say to the empty glass? “You look drunk.”",
  "Who wins in a fight between Sunday and Monday? Sunday. Monday is a weekday.",
];

const ContactPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [joke, setJoke] = useState(
    jokeList[Math.floor(Math.random() * jokeList.length)]
  );
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(name, email, subject, message);

    send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      {
        from_name: name,
        to_name: "Vasu",
        message: { message, email, subject },
        reply_to: "",
      },
      process.env.REACT_APP_USER_ID
    )
      .then((response) => {
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Message failed to send, please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="contact-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="contact-header">contact</div>
      <div className="contact-info">
        <div className="contact-left">
          <span>{joke}</span>&#128518;
        </div>
        <div className="contact-right">
          <form className="contact-form" onSubmit={onFormSubmit}>
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="contact-form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="contact-form-message"
                type="text"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="contact-form-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
