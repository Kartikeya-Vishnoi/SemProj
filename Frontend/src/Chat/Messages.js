import Message from "./Message";
import classes from "./SendMessage.module.css";
import { useState, useContext, useRef } from "react";
import { ChatContext } from "../store/ChatContext";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { AuthCtx } from "../store/authctx";
import { ReceiverContext } from "../store/ReceiverContext";

function Messages(props) {
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const ctx = useContext(ChatContext);
  const socket = useRef();
  const authctx = useContext(AuthCtx);
  const receiverctx = useContext(ReceiverContext);

  useEffect(() => {
    const fetchData = async () => {
      socket.current = io.connect("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        console.log(data);
        console.log("recieved something");
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          date: Date.now(),
        });
        console.log(arrivalMessage);
      });
    };
    fetchData();
  }, []);

  useEffect(()=>{
    window.onpopstate = () => {
      socket.current.emit("disconnected", authctx.currentUser.currentUser.id)
    }
  },[])

  useEffect(() => {
    console.log("I aint");
    arrivalMessage &&
      arrivalMessage.sender === receiverctx.receiverId.receiverId &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", authctx.currentUser.currentUser.id);
    socket.current.on("getUsers", (users) => {
      //console.log(users);
    });
  }, [authctx]);

  useEffect(() => {
    const unSub = async () => {
      let response, data;
      try {
        response = await fetch("http://localhost:8080/messages/getmessages", {
          method: "POST",
          body: JSON.stringify({
            conversationId: ctx.conversationId.conversationId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    unSub();
  }, [ctx]);

  async function sendmessagehandler(e) {
    e.preventDefault();
    socket.current.emit("sendMessage", {
      senderId: authctx.currentUser.currentUser.id,
      receiverId: receiverctx.receiverId.receiverId,
      text: text,
    });
    let response;
    try {
      response = await fetch("http://localhost:8080/messages/newmessage", {
        method: "POST",
        body: JSON.stringify({
          conversationId: ctx.conversationId.conversationId,
          sender: authctx.currentUser.currentUser.id,
          text: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.json().then((da) => {
        setMessages([...messages, da]);
      });
      console.log(messages);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        {messages === null ? (
          <></>
        ) : (
          messages.map((m) => <Message message={m} key={m.id} />)
        )}
      </div>
      <div className={classes.style}>
        <footer>
          <form onSubmit={sendmessagehandler}>
            <input
              type="text"
              required
              id="name"
              placeholder="Type Something..."
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </footer>
      </div>
    </>
  );
}

export default Messages;
