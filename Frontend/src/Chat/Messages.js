import Message from "./Message";
import classes from "./SendMessage.module.css";

import { useState, useContext, useRef } from "react";
import { ChatContext } from "../store/ChatContext";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { AuthCtx } from "../store/authctx";
import { ReceiverContext } from "../store/ReceiverContext";
import {PrivateKeyContext} from "../store/PrivateKey"
import CryptoJS from 'crypto-js'

//problem yeh aa rhi hai ki mai abhi 'B' ki public key se 'A' ke text ko encrypt karke store kar rha hun, but kynki database unhi
//stored encrypted messages ko fetch kar rha hai in A's screen toh 'A' ko bhi usi ke send kiye hue ecrypted messages dikh rahe hain
function Messages(props) {
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const ctx = useContext(ChatContext);
  const socket = useRef();
  const authctx = useContext(AuthCtx);
  const receiverctx = useContext(ReceiverContext);
  const privatekey = useContext(PrivateKeyContext)
  const privateKey = (privatekey.privateKey.privateKey)
  // const publicKeyString = pubkey.publicKey.publicKey;
  useEffect(() => {
    const fetchData = async () => {
      socket.current = io.connect("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        console.log(data);
        // console.log("recieved something");
        //decrypt the arrived message here
        //console.log(data.senderId)
        const decrypted = CryptoJS.AES.decrypt(data.text, privateKey)
        const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(data.text);
        console.log(decryptedMessage)
        setArrivalMessage({
          sender: data.senderId,
          text: decryptedMessage,
          date: Date.now(),
        });
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
    // console.log("I aint");
    //console.log(arrivalMessage);
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
        const decryptedMessages = [];
        data.forEach(message => {
          const decrypted = CryptoJS.AES.decrypt(message.text, privateKey)
          const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
          const newmessage = {...message, text:decryptedMessage};
          decryptedMessages.push(newmessage);
        });
        console.log(decryptedMessages);
        //before setting messages we have decrypt
        setMessages(decryptedMessages);
      } catch (error) {
        console.log(error);
      }
    };
    unSub();
  }, [ctx]);

  async function sendmessagehandler(e) {
    e.preventDefault();
    // const publicKey = new NodeRSA();
    // publicKey.importKey(publicKeyString, 'pkcs8-public');

// Encrypt a message
// const encrypted = publicKey.encrypt(text, 'base64');

    //encrypt the text before sending
    const encryptedtext = CryptoJS.AES.encrypt(text, privateKey).toString();
    //console.log('Encrypted message:', encryptedtext);
    socket.current.emit("sendMessage", {
      senderId: authctx.currentUser.currentUser.id,
      receiverId: receiverctx.receiverId.receiverId,
      text: encryptedtext,
    });
    let response;
    try {
      response = await fetch("http://localhost:8080/messages/newmessage", {
        method: "POST",
        body: JSON.stringify({
          conversationId: ctx.conversationId.conversationId,
          sender: authctx.currentUser.currentUser.id,
          text: encryptedtext,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.json().then((message) => {
        // console.log(message)
        const decrypted = CryptoJS.AES.decrypt(message.text, privateKey)
        const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
        const newmessage = {...message, text:decryptedMessage}
        //console.log(decryptedMessage);
        setMessages([...messages, newmessage]);      
    });
      //console.log(messages);
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
