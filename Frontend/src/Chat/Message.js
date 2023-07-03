import React, { useContext, useEffect, useRef } from "react";
import classes from "./Message.module.css"
import { AuthCtx } from "../store/authctx";

const Message = ({ message }) => {
    const auth = useContext(AuthCtx);
    const ref = useRef();
    
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const messageclass = message.sender === auth.currentUser.currentUser.id;
  //console.log(message)
  return (
    <div
      ref={ref}
    >
      <div className={`${classes["messages_user"]} ${
          !messageclass && classes.sec
        } `}>
        <p>{message.text}</p>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  );
};

export default Message;
